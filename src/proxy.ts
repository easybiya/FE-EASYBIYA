import { NextResponse, NextRequest } from 'next/server';

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api|_next|onboarding|oauth2|share|icons|images|favicon.ico).*)'],
};
