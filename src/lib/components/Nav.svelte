<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let dark = $state(browser ? document.documentElement.classList.contains('dark') : false);

	$effect(() => {
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		} catch {}
	});

	const isHome = $derived($page.url.pathname === '/');
</script>

<header class="site-container">
	<nav>
		<div class="who">
			{#if isHome}
				<span class="name">Adepeju Peace Orefejo</span>
				<span class="sub">Software engineer, Berlin</span>
			{:else}
				<a href="/" class="back">← Adepeju Peace Orefejo</a>
			{/if}
		</div>
		<button
			type="button"
			class="theme"
			onclick={() => (dark = !dark)}
			aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
		>◐</button>
	</nav>
</header>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-top: 112px;
	}

	.who {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.name {
		font-family: var(--font-display);
		font-size: 30px;
		line-height: 1.1;
		letter-spacing: -0.01em;
	}

	.sub,
	.back {
		color: var(--color-muted);
	}

	.back {
		text-decoration: none;
	}

	.back:hover {
		color: var(--color-primary);
	}

	.theme {
		background: none;
		border: 0;
		color: var(--color-muted);
		font-family: inherit;
		font-size: 16px;
		line-height: 1;
		width: 44px;
		height: 44px;
		margin: -14px -14px -14px 0;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme:hover {
		color: var(--color-text);
	}

	@media (max-width: 767px) {
		nav {
			padding-top: 64px;
		}

		.name {
			font-size: 28px;
		}
	}
</style>
