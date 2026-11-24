<script lang="ts">
	import { provideProjectBrand } from '../lib/branding';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	const brandName = provideProjectBrand();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{$brandName}</title>
</svelte:head>

{@render children()}
