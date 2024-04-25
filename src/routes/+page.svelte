<script lang="ts">
	import {
		useHover,
		windowSize,
		title,
		network,
		mediaQuery,
		useInterval,
		counter
	} from '$lib/index.js';

	const [isHovered, hoverRef] = useHover();
	const titleStore = title();

	titleStore.set('on the server');

	const networkStore = network();

	/*******************/
	/*┌───────────────┐*/
	/*│ MEDIA QUERIES │*/
	/*└───────────────┘*/
	/*******************/
	const isLarge = mediaQuery('(min-width: 1024px)');
	const isPortrait = mediaQuery('(orientation: portrait)');

	const { width, height } = windowSize();

	const counterStore = counter();

	useInterval(() => {
		counterStore.inc();
	}, 1_000);
</script>

<main>
	<div>
		<h3>useHover</h3>

		<div use:hoverRef class="demo">Hover me</div>

		<span>
			Element is {$isHovered ? '' : 'not'} hovered
		</span>
	</div>

	<div>
		<h3>Window Size</h3>
		<table>
			<tbody>
				<tr><th>Width</th><td>{$width}</td></tr>
				<tr><th>Height</th><td>{$height}</td></tr>
			</tbody>
		</table>
	</div>

	<div>
		<h3>Title</h3>

		<input type="text" bind:value={$titleStore} />
	</div>

	<div>
		<h3>Network</h3>

		<div style="display: flex; flex-direction: column;">
			<span>{$networkStore.state}</span>
			<span>{$networkStore.since}</span>
		</div>
	</div>

	<div>
		<h3>Media Queries</h3>

		<div style="display: flex; flex-direction: column;">
			<span><b>Is Large:</b> {$isLarge}</span>
			<span><b>Is Portrait:</b> {$isPortrait}</span>
		</div>
	</div>

	<div>
		<h3>Counter + Interval</h3>

		{$counterStore}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(16rem, 90%), 1fr));
	}

	div.demo {
		width: 10rem;
		height: 10rem;
		outline: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
