export const config = {
  API_TOKEN: process.env.API_TOKEN || '',
  ADMIN_ID: Number(process.env.ADMIN_ID) || 0,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || '',
  USERNAME_BOT:
    process.env.USERNAME_BOT || process.env.NEXT_PUBLIC_USERNAME_BOT || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  SERVER_URL: process.env.SERVER_URL || '',
} as const;
