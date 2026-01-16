import { writable } from "svelte/store";
import { type List } from "./api";

export let currentSearch = writable<List[] | null>(null);
export let startedFetchingLevels = writable<boolean>(false)
export let currentList = writable<List | null>(null);