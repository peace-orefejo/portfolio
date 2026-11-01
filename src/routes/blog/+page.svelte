<script lang="ts">
	import { formatDateShort } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Writing — Adepeju Orefejo</title>
	<meta name="description" content="Articles, tutorials, and thoughts on engineering, systems, and things I find interesting." />

	<!-- Open Graph -->
	<meta property="og:title" content="Writing — Adepeju Orefejo" />
	<meta property="og:description" content="Articles, tutorials, and thoughts on engineering, systems, and things I find interesting." />
	<meta property="og:url" content="https://adepejuorefejo.com/blog" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Writing — Adepeju Orefejo" />
	<meta name="twitter:description" content="Articles, tutorials, and thoughts on engineering, systems, and things I find interesting." />

	<!-- Canonical -->
	<link rel="canonical" href="https://adepejuorefejo.com/blog" />
</svelte:head>

<div class="site-container page">
	<span class="label">Writing{#if data.preview} · draft preview{/if}</span>
	{#if data.posts?.length > 0}
		{#each data.posts as post (post._id)}
			<a href="/blog/{post.slug?.current}" class="row link">
				<span class="muted mono">{formatDateShort(post.publishedAt ?? '')}</span>
				<span>{post.title}</span>
			</a>
		{/each}
	{:else}
		<p class="muted">Nothing here yet.</p>
	{/if}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 20px; padding-top: 72px; }
	a { color: var(--color-text); text-decoration: none; }
	a:hover { color: var(--color-primary); }
	.muted { color: var(--color-muted); }
	.link:hover > span:not(.muted) { color: var(--color-primary); }
	.link:hover .muted { color: var(--color-text); }
	.mono { font-family: var(--font-mono); font-size: 13px; }
	p { margin: 0; }
	@media (max-width: 767px) { .page { padding-top: 56px; } }
</style>
