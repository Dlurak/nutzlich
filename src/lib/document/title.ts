import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';

export function title() {
	const { subscribe, set } = writable('');

	const customSet = (newTitle: string) => {
		document.title = newTitle;
		set(newTitle);
	};

	onMount(() => {
		customSet(document.title);
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
