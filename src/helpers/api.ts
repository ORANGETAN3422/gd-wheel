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

export interface Level {
    name: string;
    id: string;
    description: string;
    author: string;
    playerID: string;
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
    editorTime: number;
    totalEditorTime: number;
    version: number;
    copiedID: string;
    twoPlayer: boolean;
    officialSong: number;
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
    songName: string;
    songAuthor: string;
    songSize: string;
    songID: string;
    songLink: string;
}

const listEndpoint = "https://gd-wheel.vercel.app/api/list/"
const levelsEndpoint = "https://gd-wheel.vercel.app/api/level/";
const searchEndpoint = "https://gd-wheel.vercel.app/api/search/";

export async function searchList(ids: number[], listId: number, count: number = 100) {
    try {
        if (!ids.length) throw new Error("No level IDs provided");

        const idsParam = ids.join(",");
        const url = `${searchEndpoint}${idsParam}?list=${listId}&count=${count}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error((error as Error).message);
    }
}

//111237270,84861791,8424015,126442761,93733469,111405214,126776080,72229921,48627268,61315162,72636568,86673549,108751617,56526475,78910392,83068877,58019251,108010060,117862307,5350819,79178142,61437016,20225411,41627993,55520?list=947840&count=100

export async function fetchLevel(id: number) {
    try {
        const response = await fetch(`${levelsEndpoint}${id}`);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error((error as Error).message);
    }
}

export async function fetchLists(id: number | string, page: number = 0): Promise<List[] | null> {
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

export async function fetchList(id: number): Promise<List | null> {
    try {
        const response = await fetch(`${listEndpoint}${id}`);
        if (!response.ok) throw new Error(`Response Status: ${response.status}`);

        const result: List[] = await response.json();
        return result[0];
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}