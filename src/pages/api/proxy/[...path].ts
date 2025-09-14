import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

export async function POST(req: NextRequest) {
  return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}

// 공통 프록시 함수
async function proxyRequest(req: NextRequest) {
  const url = req.url.replace(req.nextUrl.origin, 'http://54.180.148.155:8080');

  const backendResponse = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD'].includes(req.method!) ? undefined : await req.text(),
  });

  const data = await backendResponse.text();
  return new NextResponse(data, {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}
