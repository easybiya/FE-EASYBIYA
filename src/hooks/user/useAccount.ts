import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

const useAccount = () => {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error('로그인이 필요합니다');
      return user;
    },
  });
};

export default useAccount;
