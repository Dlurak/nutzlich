<script lang="ts">
	import { useHover } from '$lib/index.js';

	const [isHovered, hoverRef] = useHover();
</script>

<div>
	<div use:hoverRef class="demo">Hover me</div>

	<span>
		Element is {$isHovered ? '' : 'not'} hovered
	</span>
</div>

<!--
<div>
	<table>
		<tbody>
			<tr><th>Width</th><td>{$sizing.width}</td></tr>
			<tr><th>Height</th><td>{$sizing.height}</td></tr>
		</tbody>
	</table>
</div>
-->

<style>
	div.demo {
		width: 10rem;
		height: 10rem;
		outline: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
