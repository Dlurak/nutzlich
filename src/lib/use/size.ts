import { writable } from 'svelte/store';

type Size = {
	width: number;
	height: number;
};

interface SizeActionProps {
	onResize: (size: Size) => void;
}

const sizeAction = (node: HTMLElement, props: SizeActionProps) => {
	const handler = () => {
		props.onResize({
			width: node.offsetWidth,
			height: node.offsetHeight
		});
	};

	const ro = new ResizeObserver(handler);
	ro.observe(node);

	handler();

	return {};
};

export const useSize = () => {
	const { subscribe, set } = writable<Size | null>(null);

	const sizeRef = (node: HTMLElement) => sizeAction(node, { onResize: set });

	return [{ subscribe }, sizeRef] as const;
};
