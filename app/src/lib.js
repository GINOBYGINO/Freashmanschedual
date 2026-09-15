const KEY = "cmu-mi-freshman-db-v1";

export const STATUS_LABEL = {
  todo: "未開始",
  doing: "進行中",
  done: "完成",
  skipped: "跳過",
  stuck: "卡住",
  "need-source": "待找卷",
};

export const RATING_OPTIONS = ["boss", "top", "npc", "roadside"];

export const RATING_LABEL = {
  "": "未評",
  boss: "魔王",
  top: "頂尖",
  npc: "NPC",
  roadside: "路邊一條",
};

export const SUBJECT_LABEL = {
  calculus: "微積分",
  programming: "程式",
  project: "專案",
  exam: "考試",
  holiday: "假期",
};

export function todayISO() {
  const now = new Date();
  const t = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return t.toISOString().slice(0, 10);
}

export function addDays(iso, n) {
  const d = new Date(`${iso}T12:00:00+08:00`);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function weekday(iso) {
  const n = new Date(`${iso}T12:00:00+08:00`).getDay();
  return n === 0 ? 7 : n;
}

export function startOfWeek(iso) {
  return addDays(iso, 1 - weekday(iso));
}

export function formatWeekday(iso) {
  return ["", "一", "二", "三", "四", "五", "六", "日"][weekday(iso)];
}

export function formatLong(iso) {
  const [, m, d] = iso.split("-");
  return `${Number(m)}/${Number(d)}`;
}

export function daysUntil(iso, from = todayISO()) {
  const a = new Date(`${from}T12:00:00+08:00`);
  const b = new Date(`${iso}T12:00:00+08:00`);
  return Math.round((b - a) / 86400000);
}

export function loadOverlay() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || {};
    return {
      events: raw.events || {},
      problems: raw.problems || {},
      papers: raw.papers || {},
    };
  } catch {
    return { events: {}, problems: {}, papers: {} };
  }
}

export function saveOverlay(overlay) {
  localStorage.setItem(KEY, JSON.stringify(overlay));
}

export function clearOverlay() {
  localStorage.removeItem(KEY);
}

export function mergeList(baseItems, overlayMap) {
  return baseItems.map((item) => ({ ...item, ...(overlayMap[item.id] || {}) }));
}

export function mergeEvents(baseItems, overlayMap) {
  const merged = mergeList(baseItems, overlayMap);
  const seen = new Set(baseItems.map((item) => item.id));
  for (const [id, patch] of Object.entries(overlayMap || {})) {
    if (!seen.has(id) && patch?.date) merged.push({ ...patch, id });
  }
  return merged;
}

export function countBy(items, pred) {
  const hit = items.filter(pred).length;
  return { hit, total: items.length, pct: items.length ? Math.round((100 * hit) / items.length) : 0 };
}

export function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
