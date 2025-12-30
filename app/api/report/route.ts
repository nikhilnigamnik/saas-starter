import { auth } from '@/lib/auth';
import { updateUserUsage } from '@/lib/queries/user';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { url } = await request.json();

  const response = await fetch(url);

  await updateUserUsage(session.user.id);

  return new Response(response.body);
}
