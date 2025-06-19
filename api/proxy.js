export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = await req.json ? await req.json() : await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(JSON.parse(data)));
    });

    const proxyRes = await fetch('https://wpw.my.id/api/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    const result = await proxyRes.json();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal Server Error" });
  }
}