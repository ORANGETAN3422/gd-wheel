import { writable } from "svelte/store";
import { type List } from "./api";

export let currentList = writable<List[] | null>(null);