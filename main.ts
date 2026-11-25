import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { JOKE } from './joke.ts';

// Dad Joke Showdown: one dad joke, written to /output/entry.txt and nothing else.
// Final pass: check the gate's exact shape before writing so the judge only ever
// sees a valid, single-line, UTF-8 text between 1 and 200 characters.
const line = JOKE;
const length = Array.from(line).length;

function assertValid(value: string, size: number): void {
  if (size < 1 || size > 200) throw new Error(`dad joke must be 1-200 chars, got ${size}`);
  if (value.trim().length === 0) throw new Error('dad joke must not be blank');
  if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(value)) {
    throw new Error('dad joke must be one clean line');
  }
}

assertValid(line, length);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), line, 'utf8');
console.log(`dad joke written, length ${length}`);
