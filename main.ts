// Vending Machine Pickup Line v2 — make.fun bounty entry
// One line, spoken by the vending machine itself to a passing human.
// Fresh premise: the button panel lights up for them; the punch is the
// machine keeping the change for a first date.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Every button I have lights up when you walk past — press B7 and I'll drop the snacks and keep the change for our first date.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate validation: the entry must be 1–200 characters, a single non-blank line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${LINE.length}`);
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Verify the file round-trips exactly: one line plus a single trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`Wrote ${LINE.length} chars to ${outPath}`);
