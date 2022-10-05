import { writable } from 'svelte/store';

export const mainList = writable({stories:[]});
export const session = writable({user: null});
export const draggedItem = writable(null);
export const inItem = writable(null);