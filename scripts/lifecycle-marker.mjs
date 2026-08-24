import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

if (!process.env.RTT_EXERCISE_ID || process.env.RTT_SYNTHETIC_REPO !== '1') {
  throw new Error('exercise lifecycle script refused: synthetic authorization environment is absent');
}
const out = path.join(process.cwd(), '.rtt', 'evidence');
await mkdir(out, { recursive: true });
await writeFile(path.join(out, 'lifecycle-script.json'), `${JSON.stringify({
  timestamp_utc: new Date().toISOString(),
  exercise_id: process.env.RTT_EXERCISE_ID,
  notice: 'AUTHORIZED EXERCISE lifecycle-script execution beneath the developer toolchain'
})}\n`);

