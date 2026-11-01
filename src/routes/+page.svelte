<script lang="ts">
	import { SOCIAL_LINKS } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Project = {
		_id: string;
		title: string;
		slug?: { current?: string };
		description?: string;
		liveUrl?: string;
		repoUrl?: string;
	};

	const author = $derived(data.author);
	const headline = $derived(author?.headline ?? '');
	const links = SOCIAL_LINKS;

	const FALLBACK_BIO = [
		"I build products end to end, and lately the parts that make AI agents safe to put in front of people. Five years of TypeScript and React on the front, Node and Python behind; the last two building and evaluating LLM agents in production. I'm interested in the unglamorous parts: what happens when the model is wrong, how you know, and what you promise a user you'll never do."
	];

	const bioParagraphs = $derived.by(() => {
		const bio = (author?.bio ?? '').trim();
		if (!bio) return FALLBACK_BIO;
		return bio.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean);
	});

	const resumeHref = $derived.by(() => {
		const resume = (author?.resumes ?? []).find((r: { url?: string }) => r.url);
		return resume ? `${resume.url}?dl=${resume.filename ?? ''}` : '/resume.pdf';
	});

	const projects = $derived((data.featuredProjects ?? []) as Project[]);
	const posts = $derived(data.recentPosts ?? []);

	function monthYear(dateString: string) {
		const date = new Date(dateString);
		if (!dateString || isNaN(date.getTime())) return 'Draft';
		return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
	}

	function handle(url: string) {
		try {
			return new URL(url).pathname.replace(/^\/(in\/)?/, '').replace(/\/$/, '');
		} catch {
			return url;
		}
	}
</script>

<svelte:head>
	<title>Adepeju Orefejo — Software Engineer</title>
	<meta name="description" content={headline} />

	<meta property="og:title" content="Adepeju Orefejo — Software Engineer" />
	<meta property="og:description" content={headline} />
	<meta property="og:url" content="https://adepejuorefejo.com" />
	<meta property="og:type" content="website" />

	<meta name="twitter:title" content="Adepeju Orefejo — Software Engineer" />
	<meta name="twitter:description" content={headline} />

	<link rel="canonical" href="https://adepejuorefejo.com" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: author?.name ?? 'Adepeju Peace Orefejo',
		url: 'https://adepejuorefejo.com',
		jobTitle: 'Software Engineer',
		sameAs: [links.github, links.linkedin]
	})}</script>`}
</svelte:head>

<div class="home site-container">
	<header id="about" class="intro">
		{#each bioParagraphs as paragraph, i (i)}
			<p>{paragraph}</p>
		{/each}
		<p class="now">
			Currently at <a href="https://creator.co" target="_blank" rel="noopener noreferrer">Creator.co</a>,
			building <a href="https://veracivic.com" target="_blank" rel="noopener noreferrer">Vera Civic</a>,
			and maintaining <a href="https://github.com/peace-orefejo/attest" target="_blank" rel="noopener noreferrer">attest</a>.
		</p>
	</header>

	{#if projects.length}
		<section id="work" class="list">
			<span class="label">Projects</span>
			{#each projects as project (project._id)}
				<a href="/projects/{project.slug?.current}" class="row link">
					<span class="title">{project.title.trim()}</span>
					{#if project.description}<span class="muted">{project.description}</span>{/if}
				</a>
			{/each}
		</section>
	{/if}

	{#if posts.length}
		<section id="writing" class="list">
			<span class="label">Writing</span>
			{#each posts as post (post._id)}
				<a href="/blog/{post.slug?.current}" class="row link">
					<span class="muted mono">{monthYear(post.publishedAt ?? '')}</span>
					<span>{post.title}</span>
				</a>
			{/each}
			<a href="/blog" class="more">All writing →</a>
		</section>
	{/if}

	<section id="talk" class="list">
		<span class="label">Elsewhere</span>
		<div class="row"><span class="muted">Email</span><a href="mailto:{links.email}">{links.email}</a></div>
		<div class="row"><span class="muted">GitHub</span><a href={links.github} target="_blank" rel="noopener noreferrer">{handle(links.github)}</a></div>
		<div class="row"><span class="muted">LinkedIn</span><a href={links.linkedin} target="_blank" rel="noopener noreferrer">{handle(links.linkedin)}</a></div>
		<div class="row"><span class="muted">Résumé</span><a href={resumeHref} download>Download PDF ↓</a></div>
	</section>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 72px;
		padding-top: 24px;
	}

	a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
	}

	p {
		margin: 0;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.now,
	.muted {
		color: var(--color-muted);
	}

	.mono {
		font-family: var(--font-mono);
		font-size: 13px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 24px;
		line-height: 1.2;
	}

	.more {
		color: var(--color-muted);
		font-size: 14px;
	}

	/* The whole row is the link; hovering anywhere colours the title. */
	.link:hover .title,
	.link:hover > span:not(.muted) {
		color: var(--color-primary);
	}

	.link:hover .muted {
		color: var(--color-text);
	}

	.list a {
		overflow-wrap: anywhere;
	}

	@media (max-width: 767px) {
		.home {
			gap: 56px;
		}

		#work {
			gap: 24px;
		}
	}
</style>
