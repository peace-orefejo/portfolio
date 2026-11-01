<script lang="ts">
	const year = new Date().getFullYear();
</script>

<div class="site-container">
	<footer>
		<span>&copy; {year} Adepeju Orefejo</span>

		{#if import.meta.env.DEV}
			<a href="/studio">studio ↗</a>
		{/if}
	</footer>
</div>

<style>
	footer {
		margin-top: 72px;
		border-top: 1px solid var(--color-surface-border);
		padding: 24px 0 96px 0;
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		color: var(--color-muted);
	}

	a {
		color: var(--color-muted);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
	}
</style>
