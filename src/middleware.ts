import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;

  const authToken = cookies.get('accessToken')?.value;
  // const isNewMember = cookies.get('isNewMember')?.value;

  if (!authToken) {
    // 인증 토큰 없으면 리다이렉트
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // if (isNewMember === 'true') {
  //   // 신규 회원은 등록 페이지로 리다이렉트
  //   return NextResponse.redirect(new URL('/property/institution', request.url));
  // }

  // 인증 토큰 있으면 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api|_next|onboarding|oauth2|share|icons|images|favicon.ico).*)'],
};
