import { onMount } from 'svelte';

export const useInterval = (callback: () => void, timeMs: number) => {
	onMount(() => {
		const intervalId = setInterval(callback, timeMs);

		return () => clearInterval(intervalId);
	});
};
