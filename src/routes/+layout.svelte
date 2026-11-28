<script lang="ts">
	import { provideProjectBrand } from '../lib/branding';
	import type { Component } from 'svelte';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	const brandName = provideProjectBrand();
	// Optional native GDPR entry, synchronized by Tooling, not a hard dependency.
	const PrivacyRuntime = import.meta.glob<Component<{ scope: 'app' | 'front'; language?: string }>>(
		'../lib/modules/gdpr/Runtime.svelte',
		{ eager: true, import: 'default' }
	)['../lib/modules/gdpr/Runtime.svelte'];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{$brandName}</title>
</svelte:head>

{@render children()}

{#if PrivacyRuntime}
	<PrivacyRuntime
		scope="front"
		language={typeof navigator === 'undefined' ? 'fr' : navigator.language}
	/>
{/if}
