import { supabase } from '@/lib/supabase/client';
export const dynamic = 'force-dynamic';

export async function GET() {
  // public health probe
  const health = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`);
  // SDK wiring probe (no auth required)
  const { data, error } = await supabase.auth.getSession();
  return Response.json({
    healthOk: health.ok,
    sdkWorks: !error,
    hasSession: !!data?.session
  });
}
