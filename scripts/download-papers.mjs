import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "data", "calculus", "papers");
mkdirSync(outDir, { recursive: true });

const BASE = "https://calculus.math.nycu.edu.tw";

/** 蔡老師單元 → 陽明交大 Stewart 章節考古題（學校公開檔） */
export const PAPER_SOURCES = [
  {
    lectureDate: "2026-09-16",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "11.1 Sequences",
    file: "nycu-11.1-sequences.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260724111637632.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39538`,
    note: "數列極限、單調有界。11.2 在官網被標成 Sequences，實際是級數。",
  },
  {
    lectureDate: "2026-09-16",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "11.2 Series",
    file: "nycu-11.2-series.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260724111649197.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39538`,
    note: "無窮級數。若蔡老師本週只教數列、還沒教級數，這張可改期到以後。",
  },
  {
    lectureDate: "2026-09-23",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "2.3 Limit Laws",
    file: "nycu-2.3-limits.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723152921487.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-09-23",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "2.6 Limits at Infinity",
    file: "nycu-2.6-limits-infinity.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723153209945.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-09-30",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "2.5 Continuity",
    file: "nycu-2.5-continuity.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723153144104.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
    note: "連續，內含中間值定理相關題。",
  },
  {
    lectureDate: "2026-09-30",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "4.1 Maximum and Minimum Values",
    file: "nycu-4.1-maxmin.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154953781.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-10-07",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "2.4 Precise Definition of a Limit",
    file: "nycu-2.4-epsilon-delta.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723153107949.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
    note: "ε-δ。中間值定理的證明底子；計算題較少。",
  },
  {
    lectureDate: "2026-10-07",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "2.5 Continuity（IVT 再練）",
    file: "nycu-2.5-continuity.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723153144104.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
    note: "與 9/30 卷 A 同檔。這週只挑 IVT／找根／連續相關題重做。",
  },
  {
    lectureDate: "2026-10-14",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "2.8 The Derivative as a Function",
    file: "nycu-2.8-derivative.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723153240065.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-10-14",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "3.1 Derivatives of Polynomials and Exponential Functions",
    file: "nycu-3.1-diff-poly-exp.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154032082.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-10-21",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "3.3 Derivatives of Trigonometric Functions",
    file: "nycu-3.3-trig-diff.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154059494.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-10-21",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "3.4 The Chain Rule",
    file: "nycu-3.4-chain-rule.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154259484.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-04",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "3.5 Implicit Differentiation",
    file: "nycu-3.5-implicit.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154748390.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-04",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "3.6 Derivatives of Logarithmic Functions",
    file: "nycu-3.6-log-diff.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154830482.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-11",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "3.9 Related Rates",
    file: "nycu-3.9-related-rates.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723154906676.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-11",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "4.3 How Derivatives Affect the Shape of a Graph",
    file: "nycu-4.3-shape.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723155104149.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-18",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "4.5 Summary of Curve Sketching",
    file: "nycu-4.5-curve-sketch.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723155205807.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-18",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "4.7 Optimization Problems",
    file: "nycu-4.7-optimization.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723155238984.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-25",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "4.2 The Mean Value Theorem",
    file: "nycu-4.2-mvt.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723155029993.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-11-25",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "4.4 L'Hospital's Rule",
    file: "nycu-4.4-lhopital.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723155137659.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-12-02",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "5.1 Areas and Distances",
    file: "nycu-5.1-areas.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723155923048.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-12-02",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "5.2 The Definite Integral",
    file: "nycu-5.2-definite-integral.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723160007665.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-12-09",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "5.3 The Fundamental Theorem of Calculus",
    file: "nycu-5.3-ftc.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723160038294.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-12-09",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "5.5 The Substitution Rule",
    file: "nycu-5.5-substitution.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723160141933.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-12-16",
    slot: "A",
    sourceSchool: "陽明交大",
    chapter: "7.1 Integration by Parts",
    file: "nycu-7.1-parts.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723160445178.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
  {
    lectureDate: "2026-12-16",
    slot: "B",
    sourceSchool: "陽明交大",
    chapter: "7.2 Trigonometric Integrals",
    file: "nycu-7.2-trig-integrals.pdf",
    url: `${BASE}/userfiles/calculusmathch/files/20260723160512582.pdf`,
    indexPage: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
  },
];

async function download(src) {
  const dest = join(outDir, src.file);
  if (existsSync(dest)) {
    console.log("skip", src.file);
    return;
  }
  const res = await fetch(src.url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${src.file} HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000 || buf.subarray(0, 4).toString() !== "%PDF") {
    throw new Error(`${src.file} not a PDF (${buf.length} bytes)`);
  }
  writeFileSync(dest, buf);
  console.log("ok", src.file, buf.length);
}

async function main() {
  const unique = [];
  const seen = new Set();
  for (const s of PAPER_SOURCES) {
    if (seen.has(s.file)) continue;
    seen.add(s.file);
    unique.push(s);
  }
  for (const s of unique) await download(s);
  writeFileSync(
    join(root, "data", "calculus", "sources.json"),
    JSON.stringify(
      {
        attribution:
          "試題來自國立陽明交通大學微積分教學小組公開頁，僅供個人練習。請至原站確認最新檔。",
        indexes: {
          calc1ByChapter: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39536`,
          calc2ByChapter: `${BASE}/calculusmath/ch/app/artwebsite/view?module=artwebsite&id=39538`,
          ntuPastExams: "https://www.math.ntu.edu.tw/~calc/cl_n_34455.html",
          nthuOcw: "https://ocw.nthu.edu.tw/course-news/7/64",
        },
        papers: PAPER_SOURCES,
      },
      null,
      2
    )
  );
}

const isDirectRun = process.argv[1]
  ? fileURLToPath(import.meta.url).replace(/\\/g, "/").toLowerCase() ===
    join(process.argv[1]).replace(/\\/g, "/").toLowerCase()
  : false;
if (isDirectRun) {
  await main();
}
