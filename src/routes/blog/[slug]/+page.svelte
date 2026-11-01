<script lang="ts">
  import { urlFor } from "$lib/sanity/image";
  import { formatDate } from "$lib/utils/date";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.post.title} — Adepeju Orefejo</title>
  <meta name="description" content={data.post.excerpt ?? data.post.title} />

  <!-- Open Graph -->
  <meta property="og:title" content="{data.post.title} — Adepeju Orefejo" />
  <meta property="og:description" content={data.post.excerpt ?? data.post.title} />
  <meta property="og:url" content="https://adepejuorefejo.com/blog/{data.post.slug?.current}" />
  <meta property="og:type" content="article" />
  <!-- og:image / twitter:image are set in +layout.svelte from page data (data.ogImage) -->

  <!-- Twitter -->
  <meta name="twitter:title" content="{data.post.title} — Adepeju Orefejo" />
  <meta name="twitter:description" content={data.post.excerpt ?? data.post.title} />

  <!-- Canonical -->
  <link rel="canonical" href="https://adepejuorefejo.com/blog/{data.post.slug?.current}" />

  <!-- JSON-LD -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.post.title,
    "description": data.post.excerpt ?? "",
    "datePublished": data.post.publishedAt,
    "author": {
      "@type": "Person",
      "name": "Adepeju Orefejo",
      "url": "https://adepejuorefejo.com"
    },
    "url": `https://adepejuorefejo.com/blog/${data.post.slug?.current}`
  })}</script>`}
</svelte:head>

<article class="site-container post">
  <header class="head">
    <h1>{data.post.title}</h1>
    <div class="meta mono"><time>{formatDate(data.post.publishedAt)}</time>{#if data.post.tags?.length} · {data.post.tags.join(' · ')}{/if}</div>
  </header>

  {#if data.post.excerpt}
    <p class="lede">{data.post.excerpt}</p>
  {/if}

  {#if data.post.coverImage}
    <figure>
      <img
        src={urlFor(data.post.coverImage).width(1280).fit("max").auto("format").url()}
        alt={data.post.title}
      />
    </figure>
  {/if}

  {#if data.bodyHtml}
    <div class="prose prose-full max-w-none">
      {@html data.bodyHtml}
    </div>
  {/if}
</article>

<style>
  .post { display: flex; flex-direction: column; gap: 40px; padding-top: 48px; }
  .head { display: flex; flex-direction: column; gap: 10px; }
  h1 { margin: 0; font-family: var(--font-display); font-weight: 400; font-size: 44px; line-height: 1.1; letter-spacing: -0.01em; }
  .mono { font-family: var(--font-mono); font-size: 13px; line-height: 1.7; color: var(--color-muted); }
  .lede { margin: 0; font-size: 22px; line-height: 1.5; }
  figure { margin: 0; }
  figure img { width: 100%; height: auto; display: block; border: 1px solid var(--color-surface-border); }
  @media (max-width: 767px) { h1 { font-size: 36px; } .lede { font-size: 20px; } }
</style>
