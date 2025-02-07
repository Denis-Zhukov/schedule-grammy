export const envConfig = {
  API_TOKEN: process.env.API_TOKEN || process.env.BOT_TOKEN || '',
  ADMIN_ID: Number(process.env.ADMIN_ID) || 0,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || '',
  USERNAME_BOT: process.env.NEXT_PUBLIC_USERNAME_BOT || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  SERVER_URL: process.env.SERVER_URL || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || '',
  AUTH_SECRET: process.env.AUTH_SECRET || '',
  TOKEN_LIFETIME: Number(process.env.TOKEN_LIFETIME) || 7200,
  GOOGLE_VERIFICATION: process.env.GOOGLE_VERIFICATION || '',
} as const;
