import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = user.id;

  try {
    // 1️⃣ storage 삭제
    const { data: files } = await supabaseAdmin.storage
      .from('easybiya')
      .list(`properties/${userId}`);

    if (files && files.length > 0) {
      const paths = files.map((file) => `properties/${userId}/${file.name}`);

      await supabaseAdmin.storage.from('easybiya').remove(paths);
    }

    // 2️⃣ property 삭제
    await supabaseAdmin.from('property').delete().eq('user_id', userId);

    // 3️⃣ users 삭제
    await supabaseAdmin.from('users').delete().eq('id', userId);

    // 4️⃣ auth 삭제 (마지막)
    await supabaseAdmin.auth.admin.deleteUser(userId);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Delete failed' });
  }
}
