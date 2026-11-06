function sorted(values: readonly number[]): number[] {
  if (
    !Array.isArray(values) ||
    values.length < 1 ||
    values.length > 1000000 ||
    values.some((v) => typeof v !== 'number' || !Number.isFinite(v))
  )
    throw new TypeError('Expected nonempty finite sample');
  return [...values].sort((a, b) => a - b);
}
export function empiricalCdf(values: readonly number[], x: number): number {
  if (typeof x !== 'number' || !Number.isFinite(x)) throw new TypeError('Query must be finite');
  const s = sorted(values);
  let lo = 0,
    hi = s.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (s[m]! <= x) lo = m + 1;
    else hi = m;
  }
  return lo / s.length;
}
export function sampleQuantile(values: readonly number[], q: number): number {
  if (typeof q !== 'number' || !Number.isFinite(q) || q < 0 || q > 1)
    throw new RangeError('Quantile must be in [0,1]');
  const s = sorted(values),
    position = (s.length - 1) * q,
    lo = Math.floor(position),
    f = position - lo;
  return s[lo]! * (1 - f) + s[Math.min(lo + 1, s.length - 1)]! * f;
}
