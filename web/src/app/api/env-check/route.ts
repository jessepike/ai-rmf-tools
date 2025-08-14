// Optional: avoid caching so you always see current env status
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    env: process.env.VERCEL_ENV,                 // "production" | "preview" | "development"
    hasPublicUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasPublicAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY, // should be false for client-only apps
  });
}
