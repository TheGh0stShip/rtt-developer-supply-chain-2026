import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const source = await readFile(path.join(root, 'src', 'payment-routing.mjs'));
const marker = (await readFile(path.join(root, 'src', 'build-marker.txt'), 'utf8')).trim();
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const artifact = {
  format: 'RTT-SYNTHETIC-ARTIFACT-V1',
  exercise_notice: 'AUTHORIZED EXERCISE — HARMLESS TEST ARTIFACT',
  package: packageJson.name,
  version: packageJson.version,
  build_marker: marker,
  source_sha256: createHash('sha256').update(source).digest('hex')
};
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist', 'test-artifact.json'), `${JSON.stringify(artifact, null, 2)}\n`);
process.stdout.write(`${artifact.version} ${artifact.build_marker}\n`);

