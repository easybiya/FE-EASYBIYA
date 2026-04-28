import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;

  try {
    const { data: files } = await supabaseAdmin.storage
      .from('easybiya')
      .list(`properties/${userId}`);

    if (files && files.length > 0) {
      const paths = files.map((file) => `properties/${userId}/${file.name}`);
      await supabaseAdmin.storage.from('easybiya').remove(paths);
    }

    await supabaseAdmin.from('property').delete().eq('user_id', userId);
    await supabaseAdmin.from('users').delete().eq('id', userId);
    await supabaseAdmin.auth.admin.deleteUser(userId);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
