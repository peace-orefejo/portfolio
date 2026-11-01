<script lang="ts">
	import { marked } from 'marked';
	import { linkLabel } from '$lib';
	import { urlFor } from '$lib/sanity/image';

	type ImageMedia = {
		_type: 'image';
		_key: string;
		asset?: unknown;
		caption?: string;
		alt?: string;
	};
	type VideoMedia = {
		_type: 'video';
		_key: string;
		url: string;
		caption?: string;
	};
	type MediaItem = ImageMedia | VideoMedia;

	let { data } = $props<{
		data: {
			project: {
				_id: string;
				title: string;
				slug?: { current?: string };
				year?: string;
				role?: string;
				description: string;
				hardPart?: string;
				summary?: string;
				highlights?: string[];
				body?: string;
				media?: MediaItem[];
				tags?: string[];
				liveUrl?: string;
				repoUrl?: string;
			};
		};
	}>();

	const project = $derived(data.project);

	function videoEmbed(rawUrl: string): { kind: 'iframe' | 'file'; src: string } {
		try {
			const url = new URL(rawUrl);
			const host = url.hostname.replace(/^www\./, '');

			if (host === 'youtube.com' || host === 'm.youtube.com') {
				const id = url.searchParams.get('v');
				if (id) return { kind: 'iframe', src: `https://www.youtube.com/embed/${id}` };
			}
			if (host === 'youtu.be') {
				const id = url.pathname.slice(1);
				if (id) return { kind: 'iframe', src: `https://www.youtube.com/embed/${id}` };
			}
			if (host === 'vimeo.com') {
				const id = url.pathname.split('/').filter(Boolean).pop();
				if (id) return { kind: 'iframe', src: `https://player.vimeo.com/video/${id}` };
			}
		} catch {}
		return { kind: 'file', src: rawUrl };
	}

	const projectLinks = $derived.by(() => {
		const out: { label: string; href: string }[] = [];
		if (project.liveUrl) out.push({ label: `${linkLabel(project.liveUrl)} ↗`, href: project.liveUrl });
		if (project.repoUrl) out.push({ label: `${linkLabel(project.repoUrl, 'code')} ↗`, href: project.repoUrl });
		return out;
	});

	const meta = $derived([project.year, project.role].filter(Boolean).join(' · '));

	const heroMedia = $derived(project.media?.[0]);

	function slugify(text: string) {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	type Part = { kind: 'html'; html: string } | { kind: 'media'; item: MediaItem };

	const MEDIA_TOKEN = /^\s*\{\{\s*media:(\d+)\s*\}\}\s*$/;

	const parsed = $derived.by(() => {
		const body = typeof project.body === 'string' ? project.body : '';
		const media: MediaItem[] = project.media ?? [];
		const used = new Set<number>([0]);

		function toParts(markdown: string): Part[] {
			const parts: Part[] = [];
			let buffer: string[] = [];
			const flush = () => {
				const text = buffer.join('\n').trim();
				if (text) parts.push({ kind: 'html', html: marked.parse(text) as string });
				buffer = [];
			};
			for (const line of markdown.split('\n')) {
				const match = line.match(MEDIA_TOKEN);
				const index = match ? Number(match[1]) - 1 : -1;
				if (match && media[index]) {
					flush();
					used.add(index);
					parts.push({ kind: 'media', item: media[index] });
				} else {
					buffer.push(line);
				}
			}
			flush();
			return parts;
		}

		const chunks = body.split(/^## +/m);
		const intro = toParts(chunks.shift() ?? '');
		const sections = chunks.map((chunk: string) => {
			const newline = chunk.indexOf('\n');
			const title = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
			const content = newline === -1 ? '' : chunk.slice(newline + 1);
			return { id: slugify(title), title, parts: toParts(content) };
		});
		const rest = media.filter((_, i) => !used.has(i));
		if (sections.length) {
			rest.forEach((item, k) => {
				const at = Math.max(0, Math.round(((k + 1) * sections.length) / (rest.length + 1)) - 1);
				sections[at].parts.push({ kind: 'media', item });
			});
			return { intro, sections, rest: [] as MediaItem[] };
		}
		return { intro, sections, rest };
	});

</script>

<svelte:head>
	<title>{project.title} — Adepeju Orefejo</title>
	<meta name="description" content={project.description} />

	<meta property="og:title" content="{project.title} — Adepeju Orefejo" />
	<meta property="og:description" content={project.description} />
	<meta property="og:url" content="https://adepejuorefejo.com/projects/{project.slug?.current}" />
	<meta property="og:type" content="article" />

	<meta name="twitter:title" content="{project.title} — Adepeju Orefejo" />
	<meta name="twitter:description" content={project.description} />

	<link rel="canonical" href="https://adepejuorefejo.com/projects/{project.slug?.current}" />
</svelte:head>

{#snippet mediaFigure(item: MediaItem, cls: string)}
	{#if item._type === 'image' && item.asset}
		<figure class={cls}>
			<img
				src={urlFor(item).width(1440).fit('max').auto('format').url()}
				alt={item.alt ?? item.caption ?? ''}
				loading={cls === 'hero-figure' ? 'eager' : 'lazy'}
			/>
			{#if item.caption}<figcaption>{item.caption}</figcaption>{/if}
		</figure>
	{:else if item._type === 'video' && item.url}
		{@const embed = videoEmbed(item.url)}
		<figure class={cls}>
			{#if embed.kind === 'iframe'}
				<div class="video">
					<iframe
						src={embed.src}
						title={item.caption ?? 'Video'}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			{:else}
				<video src={embed.src} controls playsinline>
					<track kind="captions" />
				</video>
			{/if}
			{#if item.caption}<figcaption>{item.caption}</figcaption>{/if}
		</figure>
	{/if}
{/snippet}

{#snippet parts(list: Part[])}
	{#each list as part, i (i)}
		{#if part.kind === 'html'}
			<div class="md">{@html part.html}</div>
		{:else}
			{@render mediaFigure(part.item, 'inline-figure')}
		{/if}
	{/each}
{/snippet}

<div class="case site-container">
	<article>
		<div class="head">
			<h1>{project.title.trim()}</h1>
			<div class="meta mono">
				{meta}{#each projectLinks as link, i (link.href)}{meta || i > 0 ? ' · ' : ''}<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>{/each}
			</div>
		</div>

		{#if project.description}<p class="lede">{project.description}</p>{/if}

		{#if heroMedia}
			{@render mediaFigure(heroMedia, 'hero-figure')}
		{/if}

		{#if parsed.intro.length}
			<div class="block">{@render parts(parsed.intro)}</div>
		{/if}

		{#each parsed.sections as section (section.id)}
			<section id={section.id} class="block">
				<span class="label">{section.title}</span>
				{@render parts(section.parts)}
			</section>
		{/each}

		{#each parsed.rest as item (item._key)}
			{@render mediaFigure(item, 'more-figure')}
		{/each}

		{#if project.tags?.length}
			<section id="stack" class="stack">
				<span class="label">Stack</span>
				<div class="stack-list mono">{project.tags.map((t: string) => t.trim()).join(' · ')}</div>
			</section>
		{/if}
	</article>
</div>

<style>
	.case {
		padding-top: 48px;
	}

	a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
	}

	article {
		display: flex;
		flex-direction: column;
		gap: 64px;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 56px;
		line-height: 1.05;
		letter-spacing: -0.01em;
	}

	.mono {
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.7;
		color: var(--color-muted);
	}

	.meta a {
		color: var(--color-muted);
	}

	.meta a:hover {
		color: var(--color-primary);
	}

	.lede {
		margin: 0;
		font-size: 22px;
		line-height: 1.5;
	}

	figure {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0;
	}

	figure img,
	figure video,
	.video {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		border: 1px solid var(--color-surface-border);
		display: block;
	}

	.video {
		aspect-ratio: 16 / 9;
	}

	.video iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}

	figcaption {
		color: var(--color-muted);
		font-size: 14px;
		font-style: italic;
	}

	.block {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.md :global(p) {
		margin: 0 0 16px 0;
	}

	.md :global(p:last-child) {
		margin-bottom: 0;
	}

	.md :global(h3) {
		margin: 12px 0 0 0;
		font-size: 18px;
		font-weight: 500;
		line-height: 1.6;
	}

	.md :global(h3 + p) {
		color: var(--color-muted);
	}

	.md :global(a) {
		color: var(--color-text);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 1px;
	}

	.md :global(a:hover) {
		color: var(--color-primary);
	}

	.md :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	.md :global(pre) {
		margin: 0 0 16px 0;
		padding: 20px 24px;
		border: 1px solid var(--color-surface-border);
		background: var(--color-surface-alt);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.6;
	}

	.md :global(ul),
	.md :global(ol) {
		margin: 0 0 16px 0;
		padding-left: 1.25em;
	}

	.inline-figure {
		margin-top: 8px;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-top: 24px;
		border-top: 1px solid var(--color-surface-border);
	}

	@media (max-width: 767px) {
		h1 {
			font-size: 44px;
		}

		.lede {
			font-size: 20px;
		}

		article {
			gap: 56px;
		}
	}
</style>
