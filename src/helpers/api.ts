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
let levelsEndpoint = "https://gd-wheel.vercel.app/api/level/";

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