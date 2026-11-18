<script lang="ts">
	import { onMount } from 'svelte';
	import { generatedTranslation } from '../lib/i18n/generated-translations';

	// Front has no account or token: use a static French fallback until hydration.
	let language = $state('fr');
	onMount(() => {
		language = navigator.language;
	});
	const title = $derived(generatedTranslation(language, 'front.system.welcome.title') ?? 'Bienvenue sur SvelteKit');
	const docs = $derived(generatedTranslation(language, 'front.system.welcome.docs') ?? 'Consulter la documentation SvelteKit');
</script>

<h1>{title}</h1>
<p><a href="https://svelte.dev/docs/kit">{docs}</a></p>
