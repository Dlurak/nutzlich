import type { Action } from 'svelte/action';

interface ClickOutsideProps {
	callback: (e: MouseEvent) => void;
}

export const clickOutside: Action<HTMLElement, ClickOutsideProps> = (node, props) => {
	const handleClick = (e: MouseEvent) => {
		if (!node.contains(<Node>e.target)) {
			props.callback(e);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
