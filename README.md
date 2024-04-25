# Nutzlich

A bunch of useful svelte utilities.

## Installation

```bash
npm i nutzlich
```

```bash
yarn add nutzlich
```

```bash
pnpm add nutzlich
```

```bash
bun add nutzlich
```

## Quick-Guide

### Hover

```svelte
<script>
	import { useHover } from 'nutzlich';

	const [isHovered, hoverRef] = useHover();
</script>

<div use:hoverRef>
	{$isHovered ? 'Hovered' : 'Not hovered'}
</div>
```

### Window Size

```svelte
<script>
	import { windowSize } from 'nutzlich';

	const { width, height } = windowSize();
</script>

<b>Width</b>
{$width}
<b>Height</b>
{$height}
```

### Title

```svelte
<script>
	import { title } from 'nutzlich';

	const titleStore = title();
</script>

<label>Update title</label>
<input type="text" bind:value={$titleStore} />
```

### Network

```svelte
<script>
	import { network } from 'nutzlich';

	const networkStore = network();
</script>

<span>
	Since {$networkStore.since.toLocaleString()}
	{$networkStore.state}
</span>
```

### Media Query

```svelte
<script>
	import { mediaQuery } from 'nutzlich';

	const isLarge = mediaQuery('(min-width: 1024px)');
	const isPortrait = mediaQuery('(orientation: portrait)');
</script>

<span>
	Is large: {$isLarge} <br />
	Is Portrait: {$isPortrait}
</span>
```
