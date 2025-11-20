// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const testSupabase = async () => {
      try {
        // Simple ping: get current timestamp from Supabase
        const { data, error } = await supabase.from('pg_stat_database' as any).select('datid').limit(1);

        if (error) {
          console.error('Supabase test error:', error);
          setStatus('error');
          setMessage(error.message);
        } else {
          setStatus('ok');
          setMessage('Connected to Supabase successfully 🚀');
        }
      } catch (err: any) {
        console.error('Supabase test exception:', err);
        setStatus('error');
        setMessage(err?.message ?? 'Unknown error');
      }
    };

    testSupabase();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Outcome – Setup Test</h1>
      <p className="mb-2">
        Supabase connection status:{' '}
        <span className={status === 'ok' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-yellow-400'}>
          {status.toUpperCase()}
        </span>
      </p>
      {message && <p className="opacity-80 mt-2 text-sm">{message}</p>}
      <p className="mt-8 text-xs opacity-50">
        Once this works, we’ll replace this page with your real Outcome dashboard.
      </p>
    </main>
  );
}
