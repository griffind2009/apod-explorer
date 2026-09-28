import type { Apod } from '@/types/apod';

const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

function isApod(value: unknown): value is Apod {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.date === 'string' &&
    typeof item.title === 'string' &&
    typeof item.explanation === 'string' &&
    typeof item.url === 'string' &&
    typeof item.media_type === 'string'
  );
}

export async function getApods(count = 9): Promise<Apod[]> {
  const url = new URL(NASA_APOD_URL);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('count', String(count));

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`NASA APOD request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isApod)) {
    throw new Error('NASA APOD returned an unexpected response.');
  }

  return [...data].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getApodByDate(date: string): Promise<Apod | null> {
  const url = new URL(NASA_APOD_URL);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('date', date);

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`NASA APOD request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  return isApod(data) ? data : null;
}
