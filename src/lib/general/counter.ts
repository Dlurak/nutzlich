import { writable, get } from 'svelte/store';

export const counter = (start = 0) => {
	const { set, update, subscribe } = writable(start);

	return {
		subscribe,
		set,
		update,
		inc(amount = 1) {
			update((old) => old + amount);
			return get({ subscribe });
		},
		dec(amount = 1) {
			update((old) => old - amount);
			return get({ subscribe });
		}
	};
};
