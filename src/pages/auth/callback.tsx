import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import Spinner from '@/components/Spinner';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        router.replace('/login');
        return;
      }

      if (data.session) {
        router.replace('/');
      }
    };

    handleAuth();
  }, []);

  return (
    <>
      <Spinner />
    </>
  );
}
