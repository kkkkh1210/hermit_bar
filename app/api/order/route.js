export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://hook.eu1.make.com/zpq3mu8ullvwak1e2hyw5927l83pb7oq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log('Make response:', response.status, text);

    return new Response(JSON.stringify({ ok: true, status: response.status }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
