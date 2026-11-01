<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Array<{
			_id: string;
			title: string;
			slug?: { current?: string };
			year?: string;
			role?: string;
			description: string;
			summary?: string;
			highlights?: string[];
			tags?: string[];
			liveUrl?: string;
			repoUrl?: string;
		}>;
		showViewAll?: boolean;
		title?: string;
	}

	let { projects, showViewAll = false, title = 'work' }: Props = $props();
</script>

<section id="projects" class="py-24 px-6">
	<div class="mx-auto max-w-6xl">

		<!-- Section label -->
		<div class="flex items-center justify-between mb-10 md:mb-16">
			<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">{title}</span>
			{#if showViewAll}
				<a href="/projects" class="text-sm text-[var(--color-primary)] hover:opacity-70 transition-opacity">
					see all →
				</a>
			{/if}
		</div>

		{#if projects.length > 0}
			<div class="flex flex-col">
				{#each projects as project, i (project._id)}
					<ProjectCard {project} index={i} />
				{/each}
			</div>
		{:else}
			<p class="text-sm text-[var(--color-muted)]">
				No projects yet — add them in <a href="/studio" class="text-[var(--color-primary)] hover:underline">Sanity Studio</a>.
			</p>
		{/if}

	</div>
</section>
