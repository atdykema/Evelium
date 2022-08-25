import { writable } from 'svelte/store';

export const mainList = writable({stories:new Set()});
export const session = writable({user: null});