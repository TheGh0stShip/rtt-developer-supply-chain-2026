export const BUILD_MARKER = 'TRUSTED-R1';
export const VERSION = '1.0.0';

export function routeSyntheticPayment(record) {
  if (!record || record.synthetic !== true) throw new Error('synthetic records only');
  return { id: record.id, route: 'EXERCISE-CLEARING', status: 'TEST-ONLY' };
}

