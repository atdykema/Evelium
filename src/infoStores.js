import { writable } from 'svelte/store';

export const mainList = writable({stories:new Set()});