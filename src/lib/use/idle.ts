import { useToggle } from '$lib/index.js';
import { onMount } from 'svelte';
import { writable, get } from 'svelte/store';

type Event = keyof WindowEventMap;

const getMs = () => new Date().getTime();

export const useIdle = (ms = 3_000) => {
	const idle = useToggle(false);
	const lastMouseMove = writable(getMs());

	onMount(() => {
		let timeoutId = NaN;

		const handleTimeout = () => idle.set(true);
		const handler = () => {
			idle.set(false);

			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(handleTimeout, ms);
		};

		const events: Event[] = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

		timeoutId = window.setTimeout(handleTimeout, ms);
		events.forEach((e) => window.addEventListener(e, handler));

		return () => {
			events.forEach((e) => window.removeEventListener(e, handler));
			window.clearTimeout(timeoutId);
		};
	});

	lastMouseMove.subscribe(() => {
		setTimeout(() => {
			if (get(lastMouseMove) >= getMs() - ms) idle.set(true);
		}, ms);
	});

	return { subscribe: idle.subscribe };
};
