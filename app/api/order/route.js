export async function POST(request) {
  const body = await request.json();
  
  const response = await fetch('https://hook.eu1.make.com/zpq3mu8ullvwak1e2hyw5927l83pb7oq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
