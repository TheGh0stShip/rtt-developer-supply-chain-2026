import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const artifactPath = path.join(process.cwd(), 'dist', 'test-artifact.json');
const content = await readFile(artifactPath);
const artifact = JSON.parse(content);
if (artifact.format !== 'RTT-SYNTHETIC-ARTIFACT-V1') throw new Error('unexpected artifact format');
const receipt = {
  timestamp_utc: new Date().toISOString(),
  notice: 'AUTHORIZED EXERCISE downstream-consumption receipt',
  artifact_sha256: createHash('sha256').update(content).digest('hex'),
  observed_version: artifact.version,
  observed_build_marker: artifact.build_marker,
  integrity_state: artifact.build_marker === 'TRUSTED-R1' ? 'TRUSTED' : 'TAMPERED-HARMLESS'
};
await mkdir(path.join(process.cwd(), 'dist'), { recursive: true });
await writeFile(path.join(process.cwd(), 'dist', 'downstream-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${receipt.integrity_state}\n`);

