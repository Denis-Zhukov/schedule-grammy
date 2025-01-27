import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    userRole?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name: string;
      image: string;
      email: string;
    };
  }

  interface User {
    id: number;
  }
}
