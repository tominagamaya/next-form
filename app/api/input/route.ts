import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const firstName = req.nextUrl.searchParams.get('firstName');
  const lastName = req.nextUrl.searchParams.get('lastName');
  const url = `https://jsonplaceholder.typicode.com/posts`;

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: firstName,
      body: lastName,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const jsonResult = await res.json();
  return NextResponse.json({ jsonResult });
}