import { envConfig } from '@/env-config';

export async function GET(): Promise<Response> {
  const baseUrl = envConfig.SERVER_URL;

  const routes = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/auth/sign-in`, lastModified: new Date().toISOString() },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>${route.url}</loc>
          <lastmod>${route.lastModified}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`,
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
