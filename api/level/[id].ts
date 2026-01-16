export default async function handler(req: any, res: any) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).end();
        return;
    }

    const { id } = req.query;

    if (!id) {
        res.status(400).json({ error: 'Missing list ID' });
        return;
    }

    try {
        const response = await fetch(`https://gdbrowser.com/api/level/${id}`);
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fetch failed' });
    }
}