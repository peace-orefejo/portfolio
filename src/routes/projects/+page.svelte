<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects — Adepeju Orefejo</title>
	<meta name="description" content="A collection of projects I've built — full-stack apps, research, and open source work." />

	<!-- Open Graph -->
	<meta property="og:title" content="Projects — Adepeju Orefejo" />
	<meta property="og:description" content="A collection of projects I've built — full-stack apps, research, and open source work." />
	<meta property="og:url" content="https://adepejuorefejo.com/projects" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Projects — Adepeju Orefejo" />
	<meta name="twitter:description" content="A collection of projects I've built — full-stack apps, research, and open source work." />

	<!-- Canonical -->
	<link rel="canonical" href="https://adepejuorefejo.com/projects" />
</svelte:head>


<div class="site-container page">
	<span class="label">All projects</span>
	{#each data.projects ?? [] as project (project._id)}
		<a href="/projects/{project.slug?.current}" class="row link">
			<span class="title">{project.title.trim()}</span>
			<span class="muted">{#if project.year}<span class="mono">{project.year}</span> · {/if}{project.description}</span>
		</a>
	{/each}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 20px; padding-top: 72px; }
	a { color: var(--color-text); text-decoration: none; }
	a:hover { color: var(--color-primary); }
	.title { font-family: var(--font-display); font-style: italic; font-size: 24px; line-height: 1.2; }
	.muted { color: var(--color-muted); }
	.link:hover .title { color: var(--color-primary); }
	.link:hover .muted { color: var(--color-text); }
	.mono { font-family: var(--font-mono); font-size: 13px; }
	@media (max-width: 767px) { .page { gap: 24px; padding-top: 56px; } }
</style>
