/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path = [] } = req.query;

  const normalizedPath = Array.isArray(path) ? path : [path];

  const targetUrl = `http://54.180.148.155:8080/${normalizedPath.join('/')}`;

  try {
    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...Object.fromEntries(
          Object.entries(req.headers).map(([key, value]) => [key, String(value)]),
        ),
        host: '54.180.148.155',
        'Content-Type': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method || '') ? undefined : req.body,
    });

    // 백엔드 응답 받아오기
    const contentType = backendResponse.headers.get('content-type');
    const data = await (contentType?.includes('application/json')
      ? backendResponse.json()
      : backendResponse.text());

    // 클라이언트로 그대로 전달
    res.status(backendResponse.status);

    if (typeof data === 'string') {
      res.send(data);
    } else {
      res.json(data);
    }
  } catch (error: any) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
}
