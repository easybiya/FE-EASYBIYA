declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

export {};
