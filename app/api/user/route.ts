import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return NextResponse.json(session);
}
