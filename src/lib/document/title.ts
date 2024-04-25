import { useToggle } from '$lib/general/toggle.js';
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';

export function title() {
	const { subscribe, set } = writable('');
	const isMounted = useToggle(false);
	const isCustomSet = writable(false);

	const customSet = (newTitle: string) => {
		isCustomSet.set(true);
		set(newTitle);

		if (!get(isMounted)) return;

		document.title = newTitle;
		document.dispatchEvent(
			new CustomEvent('nutzlich-title', {
				detail: { newTitle }
			})
		);
	};

	onMount(() => {
		isMounted.set(true);
		customSet(get(isCustomSet) ? get({ subscribe }) : document.title);

		document.addEventListener('nutzlich-title', (e) => {
			// @ts-ignore
			const { newTitle } = e.detail as { newTitle: string };
			set(newTitle);
		});
	});

	const customUpdate = (callback: (oldTitle: string) => string) => {
		customSet(callback(get({ subscribe })));
	};

	return {
		subscribe,
		set: customSet,
		update: customUpdate
	};
}
