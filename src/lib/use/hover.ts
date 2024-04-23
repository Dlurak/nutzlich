import { writable } from 'svelte/store';

interface HoverActionProps {
	onEnter: () => void;
	onLeave: () => void;
}

function hoverAction(node: HTMLElement, props: HoverActionProps) {
	node.addEventListener('mouseenter', props.onEnter);
	node.addEventListener('mouseleave', props.onLeave);

	return {
		destroy() {
			node.removeEventListener('mouseenter', props.onEnter);
			node.removeEventListener('mouseleave', props.onLeave);
		}
	};
}

export const useHover = () => {
	const { subscribe, set } = writable(false);

	const hoverRef = (node: HTMLElement) =>
		hoverAction(node, {
			onEnter: () => set(true),
			onLeave: () => set(false)
		});

	const store = { subscribe };

	return [store, hoverRef] as const;
};
