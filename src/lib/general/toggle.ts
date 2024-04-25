import { get, writable } from 'svelte/store';

export const useToggle = (start?: boolean) => {
	const { subscribe, set, update } = writable(start ?? false);

	return {
		subscribe,
		set,
		value() {
			return get({ subscribe });
		},
		toggle() {
			update((old) => !old);
			return get({ subscribe });
		}
	};
};
