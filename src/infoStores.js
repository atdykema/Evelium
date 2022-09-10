import { writable } from 'svelte/store';

export const mainList = writable({stories:[]});
export const session = writable({user: null});
export const dragged = writable({});
export const mouseCoords = writable({coords: [0,0]});