type Bucket = {
  windowStartedAt: number;
  count: number;
};

const globalStore = globalThis as unknown as {
  __rateLimitBuckets?: Map<string, Bucket>;
};

const buckets: Map<string, Bucket> =
  globalStore.__rateLimitBuckets || new Map<string, Bucket>();

if (!globalStore.__rateLimitBuckets) {
  globalStore.__rateLimitBuckets = buckets;
}

export function checkRateLimit(key: string, windowMs: number, max: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket) {
    buckets.set(key, { windowStartedAt: now, count: 1 });
    return {
      allowed: true,
      remaining: Math.max(0, max - 1),
      resetMs: windowMs,
    };
  }

  const elapsed = now - bucket.windowStartedAt;
  if (elapsed > windowMs) {
    // reset window
    bucket.windowStartedAt = now;
    bucket.count = 1;
    return {
      allowed: true,
      remaining: Math.max(0, max - 1),
      resetMs: windowMs,
    };
  }

  if (bucket.count >= max) {
    return { allowed: false, remaining: 0, resetMs: windowMs - elapsed };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, max - bucket.count),
    resetMs: windowMs - elapsed,
  };
}
