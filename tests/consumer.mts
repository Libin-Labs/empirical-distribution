import * as api from '@lp-labs/empirical-distribution';
import { empiricalCdf, sampleQuantile } from '@lp-labs/empirical-distribution';
const p = empiricalCdf([1, 2, 2, 4], 2);
const q = sampleQuantile([1, 2, 2, 4], 0.5);
if (p !== 0.75 || q !== 2) throw new Error('Empirical summary mismatch');
// @ts-expect-error invalid argument must be rejected by declarations
api.empiricalCdf(1, 1);
