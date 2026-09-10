import { Fragment, useMemo, useState } from "react";
import calendarBase from "@data/calendar.json";
import papersBase from "@data/calculus/papers.json";
import problemsBase from "@data/programming/problems.json";
import {
  STATUS_LABEL,
  SUBJECT_LABEL,
  addDays,
  clearOverlay,
  countBy,
  daysUntil,
  downloadJson,
  formatLong,
  formatWeekday,
  loadOverlay,
  mergeEvents,
  mergeList,
  saveOverlay,
  startOfWeek,
  todayISO,
  weekday,
} from "./lib.js";

const PERIODS = [
  ["afternoon", "下午", "14:00–17:00"],
  ["evening", "晚上", "19:30–21:30"],
];

function applyOverlay(overlay) {
  return {
    events: mergeEvents(calendarBase.events, overlay.events || {}),
    papers: mergeList(papersBase.items, overlay.papers || {}),
    problems: mergeList(problemsBase.items, overlay.problems || {}),
  };
}

export default function App() {
  const [overlay, setOverlay] = useState(loadOverlay);
  const [tab, setTab] = useState("week");
  const [weekStart, setWeekStart] = useState(startOfWeek(todayISO()));
  const [selectedId, setSelectedId] = useState(null);
  const [dropCell, setDropCell] = useState(null);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");

  const data = useMemo(() => applyOverlay(overlay), [overlay]);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selected = data.events.find((e) => e.id === selectedId) || null;

  function commit(next) {
    setOverlay(next);
    saveOverlay(next);
  }

  function patchEvent(id, patch) {
    commit({
      ...overlay,
      events: { ...overlay.events, [id]: { ...(overlay.events?.[id] || {}), ...patch } },
    });
  }

  function patchProblem(id, patch) {
    commit({
      ...overlay,
      problems: { ...overlay.problems, [id]: { ...(overlay.problems?.[id] || {}), ...patch } },
    });
  }

  function patchPaper(id, patch) {
    commit({
      ...overlay,
      papers: { ...overlay.papers, [id]: { ...(overlay.papers?.[id] || {}), ...patch } },
    });
  }

  function moveEvent(id, date, period) {
    const ev = data.events.find((e) => e.id === id);
    if (!ev || ev.locked) return;
    patchEvent(id, { date, period, weekday: weekday(date) });
  }

  function addEvent(date, period) {
    const id = `evt-custom-${date}-${period}-${Date.now()}`;
    const block = calendarBase.timeBlocks[period];
    const ev = {
      id,
      date,
      weekday: weekday(date),
      period,
      start: block.start,
      end: block.end,
      subject: "programming",
      kind: "practice",
      title: "新時段",
      subtitle: "",
      status: "todo",
      locked: false,
      relatedProblemIds: [],
      relatedPaperId: null,
      notes: "",
    };
    commit({
      ...overlay,
      events: { ...overlay.events, [id]: ev },
    });
    setSelectedId(id);
  }

  function eventsIn(date, period) {
    return data.events
      .filter((e) => e.date === date && e.period === period)
      .sort((a, b) => a.start.localeCompare(b.start));
  }

  const today = todayISO();
  const todayEvents = data.events
    .filter((e) => e.date === today)
    .sort((a, b) => a.start.localeCompare(b.start));

  const star = data.problems.filter((p) => p.tags?.includes("1-star"));
  const graph = data.problems.filter((p) => p.source === "圖論起手");
  const starDone = countBy(star, (p) => p.status === "done");
  const graphDone = countBy(graph, (p) => p.status === "done");
  const paperDone = countBy(data.papers, (p) => p.status === "done");

  const problemMap = Object.fromEntries(data.problems.map((p) => [p.id, p]));
  const paperMap = Object.fromEntries(data.papers.map((p) => [p.id, p]));
  const tags = ["all", "1-star", "dfs", "bfs", "sort", "simulation", "graph"];

  const filteredProblems = data.problems.filter((p) => {
    const hay = `${p.title} ${p.uvaId} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();
    const okQ = !q || hay.includes(q.toLowerCase());
    const okT = tag === "all" || (p.tags || []).includes(tag) || p.category.toLowerCase() === tag;
    return okQ && okT;
  });

  function exportAll() {
    downloadJson("calendar.overlay.json", {
      events: data.events,
      papers: { ...papersBase, items: data.papers },
      problems: { ...problemsBase, items: data.problems },
    });
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="eyebrow">China Medical University · Medical Informatics</div>
          <h1>大一學習資料庫</h1>
          <div className="meta">
            {calendarBase.profile.school} {calendarBase.profile.department} · 微積分 {calendarBase.profile.teacher} · 程式 {calendarBase.profile.language}
          </div>
        </div>
        <div className="top-actions">
          <button onClick={exportAll}>匯出目前進度</button>
          <button
            className="ghost"
            onClick={() => {
              if (confirm("清除瀏覽器裡的調整，回到資料庫原始排程？")) {
                clearOverlay();
                window.location.reload();
              }
            }}
          >
            重設調整
          </button>
        </div>
      </header>

      <nav className="tabs">
        {[
          ["week", "週曆"],
          ["problems", "CPE 題庫"],
          ["papers", "微積分考卷"],
        ].map(([id, label]) => (
          <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </nav>

      {tab === "week" && (
        <div className="layout">
          <section>
            <div className="week-head">
              <h2 className="week-title serif">
                {formatLong(days[0])}–{formatLong(days[6])} 週
              </h2>
              <div className="row">
                <button onClick={() => setWeekStart(addDays(weekStart, -7))}>上一週</button>
                <button onClick={() => setWeekStart(startOfWeek(todayISO()))}>本週</button>
                <button onClick={() => setWeekStart(addDays(weekStart, 7))}>下一週</button>
              </div>
            </div>
            <div className="grid">
              <div />
              {days.map((d) => (
                <div key={d} className={`hd ${d === today ? "today" : ""}`}>
                  週{formatWeekday(d)}
                  <div>{formatLong(d)}</div>
                </div>
              ))}
              {PERIODS.map(([period, label, range]) => (
                <Fragment key={period}>
                  <div className="period-label" key={`p-${period}`}>
                    {label}
                    <br />
                    {range}
                  </div>
                  {days.map((d) => {
                    const list = eventsIn(d, period);
                    const over = dropCell === `${d}-${period}`;
                    return (
                      <div
                        key={`${d}-${period}`}
                        className={`cell ${over ? "drop" : ""}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDropCell(`${d}-${period}`);
                        }}
                        onDragLeave={() => setDropCell(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          const id = e.dataTransfer.getData("text/plain");
                          moveEvent(id, d, period);
                          setDropCell(null);
                        }}
                        onDoubleClick={() => addEvent(d, period)}
                      >
                        {list.length === 0 && <div className="empty">雙擊新增</div>}
                        {list.map((ev) => (
                          <article
                            key={ev.id}
                            className={`event ${ev.subject} ${ev.status === "done" ? "done" : ""}`}
                            draggable={!ev.locked}
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", ev.id);
                            }}
                            onClick={() => setSelectedId(ev.id)}
                          >
                            <div className="time">
                              {ev.start}–{ev.end} · {STATUS_LABEL[ev.status] || ev.status}
                              {ev.locked ? " · 固定" : ""}
                            </div>
                            <div className="title">{ev.title}</div>
                            {ev.subtitle && <div className="sub">{ev.subtitle}</div>}
                          </article>
                        ))}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            <p className="hint">拖曳卡片改期；考試與報名提醒鎖住。雙擊空格可加時段。調整只存在這個瀏覽器，請用「匯出目前進度」備份。</p>
          </section>

          <aside className="side">
            <div className="card">
              <h2>距離考試</h2>
              <div className="countdown">
                {calendarBase.exams.map((ex) => {
                  const n = daysUntil(ex.date);
                  return (
                    <div className="cd" key={ex.id}>
                      <span>
                        {ex.title}
                        <div className="hint">
                          {ex.date}
                          {ex.goal ? ` · ${ex.goal}` : ""}
                        </div>
                      </span>
                      <b>{n >= 0 ? `${n} 天` : "已過"}</b>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <h2>今天 {formatLong(today)}</h2>
              {todayEvents.length === 0 && <div className="empty">今天沒有排定時段。</div>}
              {todayEvents.map((ev) => (
                <div className={`task ${ev.subject}`} key={ev.id} onClick={() => setSelectedId(ev.id)}>
                  <b>
                    {ev.start} {ev.title}
                  </b>
                  <div className="hint">{ev.subtitle || SUBJECT_LABEL[ev.subject]}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <h2>進度</h2>
              <div className="hint">一顆星 {starDone.hit}/{starDone.total}</div>
              <div className="bar">
                <span style={{ width: `${starDone.pct}%` }} />
              </div>
              <div className="hint">BFS／DFS 起手 {graphDone.hit}/{graphDone.total}</div>
              <div className="bar">
                <span style={{ width: `${graphDone.pct}%` }} />
              </div>
              <div className="hint">外校考卷 {paperDone.hit}/{paperDone.total}</div>
              <div className="bar">
                <span style={{ width: `${paperDone.pct}%` }} />
              </div>
            </div>
          </aside>
        </div>
      )}

      {tab === "problems" && (
        <section>
          <div className="filters">
            <input placeholder="搜尋題名或 UVa 題號" value={q} onChange={(e) => setQ(e.target.value)} />
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "全部標籤" : t}
                </option>
              ))}
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>狀態</th>
                <th>來源</th>
                <th>題號</th>
                <th>題名</th>
                <th>標籤</th>
                <th>連結</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((p) => (
                <tr key={p.id}>
                  <td>
                    <select value={p.status} onChange={(e) => patchProblem(p.id, { status: e.target.value })}>
                      {["todo", "doing", "stuck", "done", "skipped"].map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s] || s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{p.source}</td>
                  <td>UVa {p.uvaId}</td>
                  <td>
                    {p.title}
                    {p.note && <div className="hint">{p.note}</div>}
                  </td>
                  <td>{(p.tags || []).join(" · ")}</td>
                  <td>
                    <a href={p.urls.vjudge} target="_blank" rel="noreferrer">
                      vjudge
                    </a>
                    {" · "}
                    <a href={p.urls.uvaPdf} target="_blank" rel="noreferrer">
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "papers" && (
        <section>
          <p className="hint">
            每周兩張外校卷已對到陽明交大公開的分章節考古題。PDF 在{" "}
            <code>data/calculus/papers/</code>，週曆裡也可開原站連結。課內作業仍優先。
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>狀態</th>
                <th>安排</th>
                <th>單元</th>
                <th>來源／章節</th>
                <th>題目</th>
              </tr>
            </thead>
            <tbody>
              {data.papers.map((p) => (
                <tr key={p.id}>
                  <td>
                    <select value={p.status} onChange={(e) => patchPaper(p.id, { status: e.target.value })}>
                      {["need-source", "todo", "doing", "done", "skipped"].map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s] || s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {p.scheduled} {p.slot}
                  </td>
                  <td>
                    {p.topic}
                    <div className="hint">{p.topicEn}</div>
                  </td>
                  <td>
                    {p.sourceSchool}
                    <div className="hint">{p.chapter}</div>
                  </td>
                  <td>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noreferrer">
                        開啟 PDF
                      </a>
                    ) : (
                      <span className="hint">{p.searchHint}</span>
                    )}
                    {p.note && <div className="hint">{p.note}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {selected && (
        <div className="editor">
          <h2 className="serif">{selected.title}</h2>
          <div className="hint">
            {selected.date} 週{formatWeekday(selected.date)} {selected.start}–{selected.end}
          </div>
          <label>標題</label>
          <input
            value={selected.title}
            disabled={selected.locked}
            onChange={(e) => patchEvent(selected.id, { title: e.target.value })}
          />
          <label>狀態</label>
          <select value={selected.status} onChange={(e) => patchEvent(selected.id, { status: e.target.value })}>
            {["todo", "doing", "done", "skipped"].map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
          {!selected.locked && (
            <>
              <label>改到日期</label>
              <input type="date" value={selected.date} onChange={(e) => moveEvent(selected.id, e.target.value, selected.period)} />
              <label>時段</label>
              <select value={selected.period} onChange={(e) => moveEvent(selected.id, selected.date, e.target.value)}>
                <option value="afternoon">下午</option>
                <option value="evening">晚上</option>
              </select>
            </>
          )}
          <label>備註</label>
          <textarea value={selected.notes || ""} onChange={(e) => patchEvent(selected.id, { notes: e.target.value })} />
          {selected.relatedPaperId && paperMap[selected.relatedPaperId] && (
            <div>
              <label>本時段考卷</label>
              <div className="hint">
                {paperMap[selected.relatedPaperId].sourceSchool} {paperMap[selected.relatedPaperId].chapter}
              </div>
              {paperMap[selected.relatedPaperId].url && (
                <a href={paperMap[selected.relatedPaperId].url} target="_blank" rel="noreferrer">
                  開啟 PDF
                </a>
              )}
            </div>
          )}
          {selected.relatedProblemIds?.length > 0 && (
            <div>
              <label>本時段題目</label>
              {selected.relatedProblemIds.map((id) => {
                const p = problemMap[id];
                if (!p) return <div key={id}>{id}</div>;
                return (
                  <div key={id} className="row" style={{ marginBottom: 6 }}>
                    <span>
                      UVa {p.uvaId} {p.title}
                    </span>
                    <select value={p.status} onChange={(e) => patchProblem(id, { status: e.target.value })}>
                      {["todo", "doing", "stuck", "done"].map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          )}
          <div className="actions">
            <button className="primary" onClick={() => setSelectedId(null)}>
              關閉
            </button>
            {!selected.locked && (
              <button
                onClick={() => {
                  patchEvent(selected.id, { status: "skipped", title: `${selected.title}（已取消）` });
                  setSelectedId(null);
                }}
              >
                這格跳過
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
