import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;

  const authToken = cookies.get('accessToken')?.value;

  if (!authToken) {
    // 인증 토큰 없으면 리디렉트
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // 인증 토큰 있으면 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api|_next|onboarding|oauth2|share|public).*)'],
};
