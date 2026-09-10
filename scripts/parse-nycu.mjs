import { readFileSync, writeFileSync } from "node:fs";

function parse(path) {
  const html = readFileSync(path, "utf8");
  const rows = [...html.matchAll(/<tr>[\s\S]*?<\/tr>/g)];
  const out = [];
  for (const r of rows) {
    const ch = (r[0].match(/CHAPTER[^>]*><strong>([^<]+)/) || [])[1];
    const href = (r[0].match(/href="([^"]+\.pdf)"/) || [])[1];
    if (ch || href) {
      out.push({
        chapter: (ch || "").replace(/\s+/g, " ").trim(),
        href,
      });
    }
  }
  return out;
}

const ch2 = parse(process.env.TEMP + "/nycu-ch2.html");
const ch1 = parse(process.env.TEMP + "/nycu-ch1.html");
writeFileSync("data/calculus/nycu-chapter-index.json", JSON.stringify({ calc1: ch1, calc2: ch2 }, null, 2));
console.log("calc1", ch1.length, "calc2", ch2.length);
console.log("--- calc1 ---");
for (const x of ch1) console.log(x.chapter, x.href);
console.log("--- calc2 first 15 ---");
for (const x of ch2.slice(0, 15)) console.log(x.chapter, x.href);
