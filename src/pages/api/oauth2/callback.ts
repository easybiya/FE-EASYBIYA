import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const access_token = searchParams.get('access_token');
  const is_new_member = searchParams.get('is_new_member');

  const redirectUrl = is_new_member === 'true' ? '/institution' : '/';

  const response = NextResponse.redirect(new URL(redirectUrl, req.url));

  if (access_token) {
    response.cookies.set('accessToken', access_token, {
      path: '/',
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }

  if (is_new_member) {
    response.cookies.set('isNewMember', is_new_member, {
      path: '/',
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }

  return response;
}
