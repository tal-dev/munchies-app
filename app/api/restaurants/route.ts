import { NextResponse } from 'next/server';
import { getCached, setCache, getExpiredCache } from '@/lib/cache';

const API_BASE = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api';

export async function GET() {
  const cacheKey = 'GET:/restaurants';
  
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const response = await fetch(`${API_BASE}/restaurants`);
    const data = await response.json();
    
    setCache(cacheKey, data);
    return NextResponse.json(data);
  } catch (error) {
    const staleData = getExpiredCache(cacheKey);
    if (staleData) {
      return NextResponse.json(staleData);
    }
    
    return NextResponse.json(
      { message: 'Something went wrong, please try again later.' },
      { status: 502 }
    );
  }
}
