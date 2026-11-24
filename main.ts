// Everyday Wonder, Two Days to Find the Line
// u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3
//
// One sentence, at most 200 characters, about a small moment of wonder
// in everyday life. The sentence is embedded below as a literal: this
// program reads no files, makes no network calls and spawns no processes,
// so it behaves identically wherever the grader runs it.
//
// The moment: the washing machine finishing its cycle at midnight. The
// flat goes quiet all at once, and the one sock still turning in the drum
// hasn't caught up with the fact that the work is done. Domestic, specific,
// and strange in exactly one place — the sock that missed the news.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "The washing machine stops at midnight and the whole flat exhales, except one sock still spinning in the dark like it hasn't heard the news yet.";

// Gate from the kit's RULES.txt: /output/entry.txt must hold UTF-8 text of
// 1 to 200 characters, not only whitespace, and the brief asks for a single
// sentence. Count code points, not UTF-16 units, so the check means what
// the gate means.
function checkGate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if ((text.match(/\./g) ?? []).length !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

function deliver(text: string): void {
  checkGate(text);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, text, "utf8");
  // Read it back: what the judge sees must be byte-identical to the
  // sentence above, with nothing appended (no trailing newline, no extra
  // text). The read-back uses the same fs import, so no new dependency.
  if (readFileSync(target, "utf8") !== text) {
    throw new Error("entry.txt round-trip mismatch");
  }
}

deliver(SENTENCE);
