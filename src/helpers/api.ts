export interface List {
    name: string;
    id: string;
    description: string;
    author: string;
    playerID: number;
    accountID: string;
    difficulty: string;
    downloads: number;
    likes: number;
    disliked: boolean;
    length: string;
    platformer: boolean;
    stars: number;
    orbs: number;
    diamonds: number;
    featured: boolean;
    epic: boolean;
    epicValue: number;
    legendary: boolean;
    mythic: boolean;
    gameVersion: string;
    uploaded: string;
    updated: string;
    version: number;
    copiedID: string;
    twoPlayer: boolean;
    officialSong: null;
    customSong: string;
    coins: number;
    verifiedCoins: boolean;
    starsRequested: number;
    ldm: boolean;
    objects: number;
    large: boolean;
    cp: number;
    partialDiff: string;
    difficultyFace: string;
    listAccountID: string;
    listAuthor: string;
    isList: boolean;
    levelIDs: string[];
    uploadedTimestamp: number;
    updatedTimestamp: number;
    listDiamonds: number;
    listLevelsRequired: number;
    results: null;
    pages: null;
}

const listEndpoint = "https://gd-wheel.vercel.app/api/list/"

export async function fetchList(id: number | string, page: number = 0): Promise<List[] | null> {
    try {
        const response = await fetch(`${listEndpoint}${id}?page=${page}&count=10`);
        if (!response.ok) throw new Error(`Response Status: ${response.status}`);

        const result: List[] = await response.json();
        return result;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}