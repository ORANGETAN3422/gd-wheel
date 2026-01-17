export default async function handler(req: any, res: any) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).end();
        return;
    }

    const { query, url } = req;
    const pathMatch = url?.match(/\/api\/search\/([^?]+)/);
    const idsParam = pathMatch ? pathMatch[1] : null;

    if (!idsParam) {
        res.status(400).json({ error: 'Missing level IDs in path' });
        return;
    }

    try {
        let gdUrl = `https://gdbrowser.com/api/search/${idsParam}`;
        const params = new URLSearchParams(query as Record<string, string>).toString();
        if (params) gdUrl += `?${params}`;

        const response = await fetch(gdUrl);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fetch failed', details: (err as Error).message });
    }
}
