import { onMount } from 'svelte';
import { writable } from 'svelte/store';

type NetworkOnline = {
	isOnline: true;
	isOffline: false;
	state: 'online';
	since: Date;
	reliable: boolean;
};

type NetworkOffline = {
	isOnline: false;
	isOffline: true;
	state: 'offline';
	since: Date;
	reliable: boolean;
};

type NetworkState = 'online' | 'offline';

const createNewDict = (state: NetworkState) => {
	if (state === 'online')
		return {
			isOnline: true,
			isOffline: false,
			state: 'online',
			since: new Date(),
			reliable: true
		} satisfies NetworkOnline;

	return {
		isOnline: false,
		isOffline: true,
		state: 'offline',
		since: new Date(),
		reliable: true
	} satisfies NetworkOffline;
};

export function network() {
	const { set, subscribe } = writable<NetworkOnline | NetworkOffline>({
		isOnline: true,
		isOffline: false,
		state: 'online',
		since: new Date(),
		reliable: false
	});

	onMount(() => {
		set(createNewDict(navigator.onLine ? 'online' : 'offline'));

		const handleOnline = () => set(createNewDict('online'));
		const handleOffline = () => set(createNewDict('offline'));

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	});

	return { subscribe };
}
