import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: '', // 추후 등록
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
