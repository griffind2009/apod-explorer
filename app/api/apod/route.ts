import { NextResponse } from 'next/server';
import { getApodByDate, getApods } from '@/lib/apod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const count = Number(searchParams.get('count') || '9');

  try {
    if (date) {
      const apod = await getApodByDate(date);
      if (!apod) return NextResponse.json({ error: 'APOD not found' }, { status: 404 });
      return NextResponse.json(apod);
    }

    if (!Number.isInteger(count) || count < 1 || count > 100) {
      return NextResponse.json({ error: 'count must be an integer between 1 and 100' }, { status: 400 });
    }

    return NextResponse.json(await getApods(count));
  } catch (error) {
    console.error('APOD API error', error);
    return NextResponse.json({ error: 'Unable to retrieve APOD data' }, { status: 502 });
  }
}
