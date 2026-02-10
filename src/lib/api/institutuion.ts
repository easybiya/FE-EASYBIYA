import { Institution } from '@/types';
import { supabase } from '../supabaseClient';

export const getInstitutions = async (): Promise<Institution> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error('로그인이 필요합니다');

  const { data, error } = await supabase
    .from('users')
    .select('favorate_place')
    .eq('id', user.id)
    .single();

  if (error) throw error;

  return data.favorate_place;
};

export const updateInstitution = async (body: Institution) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error('로그인이 필요합니다');

  const { error } = await supabase
    .from('users')
    .update({
      favorate_place: body,
    })
    .eq('id', user.id);

  if (error) throw error;

  return true;
};
