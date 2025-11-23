interface CacheEntry {
  data: any;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

const TTL = 5 * 60 * 1000;

export function getCached(key: string): any | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

export function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + TTL
  });
}

export function getExpiredCache(key: string): any | null {
  const entry = cache.get(key);
  return entry ? entry.data : null;
}
