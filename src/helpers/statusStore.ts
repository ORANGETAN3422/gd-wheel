import { writable } from "svelte/store";
import { type List, type Level } from "./api";

export let currentSearch = writable<List[] | null>(null);
export let currentList = writable<List | null>(null);
export let levelObjects = writable<Level[] | null>(null);