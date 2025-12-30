import { auth } from '@/lib/auth';
import { isUsageExceeded, updateUserUsage } from '@/lib/queries/user';
import { analyzeSEO } from '@/lib/seo';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { fetch } from 'undici';

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isExceeded = await isUsageExceeded(session.user.id);
  if (isExceeded) {
    return NextResponse.json(
      { error: 'Usage exceeded, please upgrade your plan' },
      { status: 402 },
    );
  }

  const { url } = await request.json();

  try {
    const res = await fetch(url);
    const html = await res.text();

    const seoReport = analyzeSEO(html, url);
    await updateUserUsage(session.user.id);

    return NextResponse.json(seoReport);
  } catch (error) {
    console.error('SEO analysis error:', error);
    return NextResponse.json({ error: 'Failed to fetch or analyze website' }, { status: 500 });
  }
}
