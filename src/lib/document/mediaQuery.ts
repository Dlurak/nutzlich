import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const mediaQuery = (query: string) => {
	const { subscribe, set } = writable(false);

	onMount(() => {
		const mq = window.matchMedia(query);
		set(mq.matches);

		const handleChange = (e: MediaQueryListEvent) => set(e.matches);

		mq.addEventListener('change', handleChange);
		return () => mq.removeEventListener('change', handleChange);
	});

	return { subscribe };
};
