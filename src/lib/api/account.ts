import { supabase } from '@/lib/supabaseClient';
import axios from 'axios';

export const deleteAccount = async () => {
  const { data: session } = await supabase.auth.getSession();
  const { data } = await axios.post(
    '/api/delete-user',
    {},
    {
      headers: {
        Authorization: `Bearer ${session?.session?.access_token}`,
      },
    },
  );

  return data;
};
