import { writable } from "svelte/store";
import { type List } from "./api";

export let currentSearch = writable<List[] | null>(null);
export let currentList = writable<List | null>(null);