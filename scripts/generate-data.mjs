import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAPER_SOURCES } from "./download-papers.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data");

mkdirSync(join(dataDir, "calculus", "papers"), { recursive: true });
mkdirSync(join(dataDir, "programming", "solutions"), { recursive: true });

const uvaPdf = (id) => {
  const n = Number(id);
  return `https://onlinejudge.org/external/${Math.floor(n / 100)}/${n}.pdf`;
};
const vjudge = (id) => `https://vjudge.net/problem/UVA-${id}`;

const STAR_CATEGORIES = [
  ["基礎", 1, 7],
  ["字元與字串", 8, 13],
  ["數學計算", 14, 24],
  ["進位制轉換", 25, 29],
  ["質數因數與倍數", 30, 35],
  ["幾何與座標", 36, 39],
  ["排序與中位數", 40, 43],
  ["模擬", 44, 48],
  ["其他", 49, 49],
];

const STAR = [
  [1, "Vito's family", "10406", "10041", ["sort", "median"]],
  [2, "Hashmat the brave warrior", "10407", "10055", ["math"]],
  [3, "Primary Arithmetic", "10404", "10035", ["math", "simulation"]],
  [4, "The 3n + 1 problem", "10400", "100", ["math", "simulation"]],
  [5, "You can say 11", "10460", "10929", ["math", "string"]],
  [6, "Bangla Numbers", "10414", "10101", ["math", "string"]],
  [7, "List of Conquests", "21924", "10420", ["string", "map"]],
  [8, "What's Cryptanalysis?", "10402", "10008", ["string", "sort"]],
  [9, "Decode the Mad man", "10425", "10222", ["string"]],
  [10, "Summing Digits", "10473", "11332", ["math"]],
  [11, "Common Permutation", "10567", "10252", ["string"]],
  [12, "Rotating Sentences", "21914", "490", ["string"]],
  [13, "TeX Quotes", "22131", "272", ["string"]],
  [14, "Doom's Day Algorithm", "22801", "12019", ["math", "date"]],
  [15, "Jolly Jumpers", "10405", "10038", ["array"]],
  [16, "What is the Probability!!", "10408", "10056", ["math"]],
  [17, "The Hotel with Infinite Rooms", "10417", "10170", ["math"]],
  [18, "498'", "10431", "10268", ["math"]],
  [19, "Odd Sum", "10453", "10783", ["math"]],
  [20, "Beat the Spread!", "10454", "10812", ["math"]],
  [21, "Symmetric Matrix", "10478", "11349", ["array"]],
  [22, "Square Numbers", "10480", "11461", ["math"]],
  [23, "B2-Sequence", "23621", "11063", ["array"]],
  [24, "Back to High School Physics", "10411", "10071", ["math"]],
  [25, "An Easy Problem!", "10413", "10093", ["base"]],
  [26, "Fibonaccimal Base", "10401", "948", ["base"]],
  [27, "Funny Encryption Method", "10403", "10019", ["base"]],
  [28, "Parity", "10461", "10931", ["base"]],
  [29, "Cheapest Base", "10466", "11005", ["base"]],
  [30, "Hartals", "10517", "10050", ["math"]],
  [31, "All You Need Is Love!", "10421", "10193", ["number-theory"]],
  [32, "Divide, But Not Quite Conquer!", "10419", "10190", ["math"]],
  [33, "Simply Emirp", "10428", "10235", ["prime"]],
  [34, "2 the 9s", "10458", "10922", ["math"]],
  [35, "GCD", "11076", "11417", ["number-theory"]],
  [36, "Largest Square", "10456", "10908", ["geometry", "array"]],
  [37, "Satellites", "10424", "10221", ["geometry"]],
  [38, "Can You Solve It?", "10447", "10642", ["geometry"]],
  [39, "Fourth Point!!", "10566", "10242", ["geometry"]],
  [40, "A mid-summer night's dream", "10409", "10057", ["sort", "median"]],
  [41, "Tell me the frequencies!", "10410", "10062", ["sort", "string"]],
  [42, "Train Swapping", "22811", "299", ["sort"]],
  [43, "Hardwood Species", "10426", "10226", ["sort", "map"]],
  [44, "Minesweeper", "10418", "10189", ["simulation"]],
  [45, "Die Game", "11019", "10409", ["simulation"]],
  [46, "Eb Alto Saxophone Player", "11020", "10415", ["simulation"]],
  [47, "Mutant Flatworld Explorers", "23641", "118", ["simulation"]],
  [48, "Cola", "11067", "11150", ["math", "simulation"]],
  [49, "Sort! Sort!! and Sort!!!", "11069", "11321", ["sort"]],
];

const categoryOf = (n) =>
  STAR_CATEGORIES.find(([, a, b]) => n >= a && n <= b)?.[0] ?? "其他";

const starProblems = STAR.map(([n, title, cpe, uva, extra]) => ({
  id: `uva-${uva}`,
  source: "CPE一顆星",
  collectionIndex: n,
  cpeId: `CPE${cpe}`,
  uvaId: String(uva),
  title,
  category: categoryOf(n),
  tags: ["1-star", "cpe", ...extra],
  difficulty: 1,
  language: "C++",
  status: "todo",
  minutes: null,
  note: "",
  urls: {
    uvaPdf: uvaPdf(uva),
    vjudge: vjudge(uva),
  },
}));

const graphProblems = [
  {
    id: "uva-572",
    source: "圖論起手",
    uvaId: "572",
    title: "Oil Deposits",
    category: "DFS",
    tags: ["dfs", "grid", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "網格連通塊（flood fill）。10/6 前至少做完這題與 Knight Moves。",
    urls: { uvaPdf: uvaPdf(572), vjudge: vjudge(572) },
  },
  {
    id: "uva-459",
    source: "圖論起手",
    uvaId: "459",
    title: "Graph Connectivity",
    category: "DFS",
    tags: ["dfs", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "無向圖連通塊。",
    urls: { uvaPdf: uvaPdf(459), vjudge: vjudge(459) },
  },
  {
    id: "uva-469",
    source: "圖論起手",
    uvaId: "469",
    title: "Wetlands of Florida",
    category: "DFS",
    tags: ["dfs", "grid", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "網格 DFS 計面積。",
    urls: { uvaPdf: uvaPdf(469), vjudge: vjudge(469) },
  },
  {
    id: "uva-11953",
    source: "圖論起手",
    uvaId: "11953",
    title: "Battleships",
    category: "DFS",
    tags: ["dfs", "grid", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "網格連通塊變形。",
    urls: { uvaPdf: uvaPdf(11953), vjudge: vjudge(11953) },
  },
  {
    id: "uva-11518",
    source: "圖論起手",
    uvaId: "11518",
    title: "Dominos 2",
    category: "DFS",
    tags: ["dfs", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "有向圖可達。",
    urls: { uvaPdf: uvaPdf(11518), vjudge: vjudge(11518) },
  },
  {
    id: "uva-10004",
    source: "圖論起手",
    uvaId: "10004",
    title: "Bicoloring",
    category: "BFS",
    tags: ["bfs", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "二分圖著色，BFS／DFS 都可以。",
    urls: { uvaPdf: uvaPdf(10004), vjudge: vjudge(10004) },
  },
  {
    id: "uva-439",
    source: "圖論起手",
    uvaId: "439",
    title: "Knight Moves",
    category: "BFS",
    tags: ["bfs", "grid", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "棋盤最短步。無權重最短路一律 BFS。",
    urls: { uvaPdf: uvaPdf(439), vjudge: vjudge(439) },
  },
  {
    id: "uva-532",
    source: "圖論起手",
    uvaId: "532",
    title: "Dungeon Master",
    category: "BFS",
    tags: ["bfs", "grid", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "三維迷宮最短路。",
    urls: { uvaPdf: uvaPdf(532), vjudge: vjudge(532) },
  },
  {
    id: "uva-10653",
    source: "圖論起手",
    uvaId: "10653",
    title: "Bombs! NO they are Mines!!",
    category: "BFS",
    tags: ["bfs", "grid", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "大網格最短路，注意常數。",
    urls: { uvaPdf: uvaPdf(10653), vjudge: vjudge(10653) },
  },
  {
    id: "uva-336",
    source: "圖論起手",
    uvaId: "336",
    title: "A Node Too Far",
    category: "BFS",
    tags: ["bfs", "graph"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "限制層數的 BFS。",
    urls: { uvaPdf: uvaPdf(336), vjudge: vjudge(336) },
  },
  {
    id: "uva-429",
    source: "圖論起手",
    uvaId: "429",
    title: "Word Transformation",
    category: "BFS",
    tags: ["bfs", "graph", "string"],
    difficulty: 2,
    language: "C++",
    status: "todo",
    minutes: null,
    note: "單字圖最短路。",
    urls: { uvaPdf: uvaPdf(429), vjudge: vjudge(429) },
  },
];

const problems = {
  updatedAt: "2026-09-09",
  language: "C++",
  judgeNote: "優先在瘋狂程設或 vjudge／UVa 交題，C++ 編譯選項接近 CPE 現場。",
  items: [...starProblems, ...graphProblems],
};

const lectures = [
  ["2026-09-09", "簡介", "Introduction", "intro"],
  ["2026-09-16", "數列與收斂", "Sequences and Convergence", "practice"],
  ["2026-09-23", "極限", "Limits", "practice"],
  ["2026-09-30", "連續與極值", "Continuity and Extreme Value", "practice"],
  ["2026-10-07", "中間值定理", "The Intermediate Value Theorem", "practice"],
  ["2026-10-14", "微分", "Derivatives", "practice"],
  ["2026-10-21", "微分技巧", "Differentiating Techniques", "practice"],
  ["2026-10-28", "期中考", "Midterm Exam", "exam"],
  ["2026-11-04", "微分技巧", "Differentiating Techniques", "practice"],
  ["2026-11-11", "微分與極值", "Derivatives and Extreme Value", "practice"],
  ["2026-11-18", "微分與極值", "Derivatives and Extreme Value", "practice"],
  ["2026-11-25", "均值定理", "The Mean Value Theorem", "practice"],
  ["2026-12-02", "積分", "Integration", "practice"],
  ["2026-12-09", "微積分基本定理", "The Fundamental Theorem of Calculus", "practice"],
  ["2026-12-16", "積分技巧", "Integration Techniques", "practice"],
  ["2026-12-23", "期末考", "Final Exam", "exam"],
];

const addDays = (iso, days) => {
  const d = new Date(`${iso}T12:00:00+08:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const weekday = (iso) => {
  const d = new Date(`${iso}T12:00:00+08:00`);
  const n = d.getDay();
  return n === 0 ? 7 : n;
};

const sourceOf = (date, slot) =>
  PAPER_SOURCES.find((s) => s.lectureDate === date && s.slot === slot);

const applySource = (paper, date, slot, fallbackNote) => {
  const src = sourceOf(date, slot);
  if (!src) {
    paper.note = fallbackNote;
    return paper;
  }
  paper.sourceSchool = src.sourceSchool;
  paper.chapter = src.chapter;
  paper.file = `data/calculus/papers/${src.file}`;
  paper.url = src.url;
  paper.status = "todo";
  paper.note = src.note || fallbackNote;
  return paper;
};

const papers = [];
for (const [date, topic, en, kind] of lectures) {
  if (kind !== "practice") continue;
  const paperA = applySource(
    {
      id: `paper-${date}-A`,
      lectureDate: date,
      topic,
      topicEn: en,
      slot: "A",
      scheduled: addDays(date, 1),
      period: "evening",
      sourceSchool: "",
      chapter: "",
      file: "",
      url: "",
      searchHint: `${topic} 微積分 考古題 台大 OR 清大 OR 陽明交大 OR 成大`,
      status: "need-source",
      score: null,
      errors: [],
    },
    date,
    "A",
    "周四晚上：當週單元外校考卷第一張。"
  );
  const paperB = applySource(
    {
      id: `paper-${date}-B`,
      lectureDate: date,
      topic,
      topicEn: en,
      slot: "B",
      scheduled: addDays(date, 5),
      period: "afternoon",
      sourceSchool: "",
      chapter: "",
      file: "",
      url: "",
      searchHint: `${topic} 微積分 小考 期中 考古題`,
      status: "need-source",
      score: null,
      errors: [],
    },
    date,
    "B",
    "下周一下午：同一單元第二張。周一晚上做錯題與本週整理。"
  );
  papers.push(paperA, paperB);
}

const papersDoc = {
  course: {
    school: "中國醫藥大學",
    department: "醫療資訊學系",
    teacher: "蔡豐聲",
    teacherEn: "Feng-Sheng Tsai",
    term: "2026 上學期",
  },
  items: papers,
};

const SLOTS = [
  {
    weekday: 1,
    period: "afternoon",
    start: "14:00",
    end: "17:00",
    subject: "calculus",
    title: "微積分",
  },
  {
    weekday: 1,
    period: "evening",
    start: "19:30",
    end: "21:30",
    subject: "calculus",
    title: "微積分與本週整理",
  },
  {
    weekday: 2,
    period: "evening",
    start: "19:30",
    end: "21:30",
    subject: "programming",
    title: "程式（CPE）",
  },
  {
    weekday: 3,
    period: "evening",
    start: "19:30",
    end: "21:30",
    subject: "project",
    title: "專案",
  },
  {
    weekday: 4,
    period: "evening",
    start: "19:30",
    end: "21:30",
    subject: "calculus",
    title: "微積分",
  },
  {
    weekday: 5,
    period: "afternoon",
    start: "14:00",
    end: "17:00",
    subject: "calculus",
    title: "微積分",
  },
  {
    weekday: 5,
    period: "evening",
    start: "19:30",
    end: "21:30",
    subject: "programming",
    title: "程式（CPE）",
  },
];

const PROGRAM_PLAN = [
  ["2026-09-08", ["uva-10055", "uva-10071", "uva-100"]],
  ["2026-09-11", ["uva-10035", "uva-10783", "uva-11332"]],
  ["2026-09-15", ["uva-10041", "uva-299", "uva-10008"]],
  ["2026-09-18", ["uva-272", "uva-10929", "uva-10038"]],
  ["2026-09-22", ["uva-10189", "uva-118", "uva-11150"]],
  ["2026-09-29", ["uva-572", "uva-439", "uva-10004"]],
  ["2026-10-02", ["uva-459", "uva-532", "uva-336"]],
  ["2026-10-09", ["uva-10653", "uva-469"]],
  ["2026-10-13", ["uva-11953", "uva-11518"]],
  ["2026-10-16", ["uva-429", "uva-10420"]],
  ["2026-10-20", ["uva-10226", "uva-10062"]],
  ["2026-10-23", ["uva-11417", "uva-10235"]],
  ["2026-10-27", ["uva-10908", "uva-10242"]],
  ["2026-10-30", ["uva-12019", "uva-10101"]],
  ["2026-11-03", ["uva-11005", "uva-10931"]],
  ["2026-11-06", ["uva-10050", "uva-10193"]],
  ["2026-11-10", ["uva-10252", "uva-490"]],
  ["2026-11-13", ["uva-10222", "uva-11349"]],
  ["2026-11-17", ["uva-10170", "uva-10268"]],
  ["2026-11-20", ["uva-10812", "uva-11461"]],
  ["2026-11-24", ["uva-11063", "uva-10093"]],
  ["2026-11-27", ["uva-948", "uva-10019"]],
  ["2026-12-01", ["uva-10190", "uva-10922"]],
  ["2026-12-04", ["uva-10221", "uva-10642"]],
  ["2026-12-11", ["uva-10057", "uva-10409"]],
  ["2026-12-15", ["uva-10415", "uva-10056"]],
];

const planMap = Object.fromEntries(PROGRAM_PLAN);

const paperByDate = {};
for (const p of papers) {
  paperByDate[`${p.scheduled}-${p.period}`] = p;
}

const lectureByDate = Object.fromEntries(lectures.map((x) => [x[0], x]));

const events = [];
const start = new Date("2026-09-07T12:00:00+08:00");
const end = new Date("2026-12-25T12:00:00+08:00");

for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
  const iso = d.toISOString().slice(0, 10);
  const wd = weekday(iso);
  const lecture = lectureByDate[iso];

  if (iso === "2026-10-06") {
    events.push({
      id: `evt-${iso}-cpe`,
      date: iso,
      weekday: 2,
      period: "evening",
      start: "18:40",
      end: "21:40",
      subject: "exam",
      kind: "cpe",
      title: "CPE 檢定",
      subtitle: "目標 2 題、挑戰 3 題｜報到約 17:30",
      status: "todo",
      locked: true,
      relatedProblemIds: [],
      relatedPaperId: null,
      notes: "報名 9/22–10/02。現場 C++。當日一般程式時段取消。無故缺席會取消下一場。",
    });
    continue;
  }
  if (iso === "2026-12-08") {
    events.push({
      id: `evt-${iso}-cpe`,
      date: iso,
      weekday: 2,
      period: "evening",
      start: "18:40",
      end: "21:40",
      subject: "exam",
      kind: "cpe",
      title: "CPE 檢定",
      subtitle: "本學期主戰場｜目標 3–4 題",
      status: "todo",
      locked: true,
      relatedProblemIds: [],
      relatedPaperId: null,
      notes: "報名 11/24–12/04。",
    });
    continue;
  }

  for (const slot of SLOTS) {
    if (slot.weekday !== wd) continue;

    const ev = {
      id: `evt-${iso}-w${wd}-${slot.period}`,
      date: iso,
      weekday: wd,
      period: slot.period,
      start: slot.start,
      end: slot.end,
      subject: slot.subject,
      kind: "practice",
      title: slot.title,
      subtitle: "",
      status: "todo",
      locked: false,
      relatedProblemIds: [],
      relatedPaperId: null,
      notes: "",
    };

    if (iso === "2026-09-25" && wd === 5) {
      ev.subject = "holiday";
      ev.kind = "holiday";
      ev.title = "中秋節";
      ev.subtitle = "原微積分／程式時段可改期";
      ev.locked = false;
      events.push(ev);
      continue;
    }

    if (lecture && slot.weekday === 3) {
      if (lecture[3] === "exam") {
        events.push({
          ...ev,
          id: `evt-${iso}-exam-afternoon`,
          period: "afternoon",
          start: "14:00",
          end: "17:00",
          subject: "exam",
          kind: "exam",
          title: lecture[1],
          subtitle: lecture[2],
          locked: true,
          notes:
            iso === "2026-12-23"
              ? "期末考日。課表未寫確切鐘點，先佔下午與晚上；公布後再改。"
              : "期中考日。當日專案暫停。",
        });
        ev.subject = "exam";
        ev.kind = "exam";
        ev.title = lecture[1];
        ev.subtitle = "晚上時段保留給考試／複習，不排專案";
        ev.locked = true;
      } else {
        ev.kind = "lecture";
        ev.subject = "calculus";
        ev.title = `微積分課：${lecture[1]}`;
        ev.subtitle = lecture[2];
        ev.notes = "周三為上課日。晚上時段可做專案，但先上完課再排。";
      }
    }

    const paper = paperByDate[`${iso}-${slot.period}`];
    if (paper && slot.subject === "calculus") {
      ev.title = `外校考卷 ${paper.slot}｜${paper.topic}`;
      ev.subtitle = paper.chapter
        ? `${paper.sourceSchool} ${paper.chapter}`
        : "尚未放入 PDF";
      ev.relatedPaperId = paper.id;
      ev.kind = "paper";
      ev.notes = paper.note;
    } else if (slot.weekday === 1 && slot.period === "evening") {
      const prevLecture = lectures.find((L) => addDays(L[0], 5) === iso && L[3] === "practice");
      if (prevLecture) {
        ev.title = `錯題＋本週整理｜${prevLecture[1]}`;
        ev.kind = "review";
        ev.notes = "把考卷 A/B 的錯因寫進 error-log，不要只對數。";
      }
    } else if (slot.weekday === 5 && slot.period === "afternoon" && slot.subject === "calculus") {
      const weekLecture = lectures.find((L) => {
        const diff =
          (new Date(`${iso}T12:00:00+08:00`) - new Date(`${L[0]}T12:00:00+08:00`)) /
          86400000;
        return diff >= 0 && diff < 7 && L[3] === "practice";
      });
      if (weekLecture) {
        ev.title = `課內作業｜${weekLecture[1]}`;
        ev.kind = "homework";
        ev.notes = "GPA 優先：先完成蔡老師作業與習題，再做外校卷。";
      }
    }

    if (slot.subject === "programming") {
      const ids = planMap[iso];
      if (ids) {
        ev.relatedProblemIds = ids;
        ev.subtitle = ids.map((id) => id.replace("uva-", "UVa ")).join("、");
        ev.notes = "做不完就拖到下一個程式時段，不要跳題只求數量。";
      } else {
        ev.subtitle = "複習錯題或補一顆星";
        ev.kind = "review";
      }
    }

    if (iso === "2026-09-09" && slot.weekday === 3) {
      ev.title = "微積分課：簡介";
      ev.subtitle = "Introduction｜蔡豐聲";
      ev.kind = "lecture";
      ev.subject = "calculus";
    }

    if (iso < "2026-09-16" && slot.subject === "calculus" && ev.kind === "practice") {
      ev.title = "預習｜數列與收斂";
      ev.notes = "簡介週先對齊課綱與符號。第一張外校卷從 9/17 開始。";
    }

    events.push(ev);
  }
}

events.push({
  id: "evt-2026-09-22-register",
  date: "2026-09-22",
  weekday: 1,
  period: "afternoon",
  start: "14:25",
  end: "14:40",
  subject: "exam",
  kind: "reminder",
  title: "CPE 10/6 報名開始",
  subtitle: "https://cpe.mcu.edu.tw ｜截止 10/02 18:00",
  status: "todo",
  locked: true,
  relatedProblemIds: [],
  relatedPaperId: null,
  notes: "大專生免費。先註冊再報名。無故缺席會取消下一場。",
});

const calendar = {
  profile: {
    school: "中國醫藥大學",
    department: "醫療資訊學系",
    teacher: "蔡豐聲",
    language: "C++",
    termStart: "2026-09-07",
    termEnd: "2026-12-25",
  },
  timeBlocks: {
    afternoon: { start: "14:00", end: "17:00", label: "下午" },
    evening: { start: "19:30", end: "21:30", label: "晚上" },
  },
  slotTemplates: SLOTS,
  exams: [
    {
      id: "cpe-2026-10-06",
      date: "2026-10-06",
      title: "CPE",
      register: "2026-09-22 ~ 2026-10-02",
      goal: "穩定 2 題、挑戰 3 題",
    },
    {
      id: "midterm",
      date: "2026-10-28",
      title: "微積分期中考",
      goal: "GPA",
    },
    {
      id: "cpe-2026-12-08",
      date: "2026-12-08",
      title: "CPE",
      register: "2026-11-24 ~ 2026-12-04",
      goal: "3–4 題",
    },
    {
      id: "final",
      date: "2026-12-23",
      title: "微積分期末考",
      goal: "GPA",
    },
  ],
  lectures: lectures.map(([date, topic, topicEn, kind]) => ({
    date,
    topic,
    topicEn,
    kind,
  })),
  events,
};

writeFileSync(join(dataDir, "programming", "problems.json"), JSON.stringify(problems, null, 2));
writeFileSync(join(dataDir, "calculus", "papers.json"), JSON.stringify(papersDoc, null, 2));
writeFileSync(join(dataDir, "calendar.json"), JSON.stringify(calendar, null, 2));

console.log({
  problems: problems.items.length,
  papers: papers.length,
  events: events.length,
});
