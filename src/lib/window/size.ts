import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';

export function windowSize() {
	const { set: setWidth, subscribe: subWidth } = writable(0);
	const { set: setHeight, subscribe: subHeight } = writable(0);
	const { update: updateStore, subscribe: subStore } = writable({ width: 0, height: 0 });

	const setStores = () => {
		const newWidth = window.innerWidth;
		const newHeight = window.innerHeight;

		if (newWidth !== get({ subscribe: subWidth })) setWidth(newWidth);
		if (newHeight !== get({ subscribe: subHeight })) setHeight(newHeight);
	};

	onMount(() => {
		setStores();
		window.addEventListener('resize', setStores);
	});

	subWidth((width) => updateStore((old) => ({ ...old, width })));
	subWidth((height) => updateStore((old) => ({ ...old, height })));

	return {
		width: { subscribe: subWidth },
		height: { subscribe: subHeight },
		store: { subscribe: subStore }
	};
}
