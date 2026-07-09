<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import { enter } from '$lib/actions/reveal';

	interface Resume {
		label?: string;
		url?: string;
		filename?: string;
	}

	interface Props {
		author: {
			name?: string;
			headline?: string;
			bio?: string;
			image?: object;
			socialLinks?: {
				github?: string;
				twitter?: string;
				linkedin?: string;
				email?: string;
			};
			resumes?: Resume[];
		} | null;
	}

	let { author }: Props = $props();

	const resumes = $derived((author?.resumes ?? []).filter((r) => r.url));

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<section class="flex flex-col justify-center px-6 pt-24 pb-16 md:min-h-screen">
	<div class="mx-auto max-w-6xl w-full">

		<!-- Top label row -->
		<div use:enter={{ delay: 0.05 }} class="flex items-center justify-between mb-10 md:mb-16">
			<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">software engineer</span>
			<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">Berlin, Germany</span>
		</div>

		<!-- Big name block -->
		<div class="mb-6 md:mb-12">
			<h1 use:enter={{ delay: 0.12, y: 16 }} class="text-[clamp(2.8rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight text-[var(--color-text)]">
				{author?.name?.split(' ')[0] ?? 'Adepeju'}
			</h1>
			<h1 use:enter={{ delay: 0.2, y: 16 }} class="text-[clamp(2.8rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight text-[var(--color-primary)]">
				{author?.name?.split(' ').slice(1).join(' ') ?? 'Orefejo'}
			</h1>
		</div>

		<!-- Bottom row: mobile = stacked (image on top), desktop = side by side -->
		<div use:enter={{ delay: 0.32 }} class="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 md:items-end">
			<div>
				{#if author?.headline}
					<p class="text-sm md:text-base text-[var(--color-muted)] leading-relaxed max-w-sm mb-6 md:mb-8">
						{author.headline}
					</p>
				{/if}

				<div class="flex items-center gap-6 flex-wrap">
					{#if resumes.length > 1}
						<div class="relative">
							<button
								type="button"
								onclick={toggleMenu}
								aria-haspopup="menu"
								aria-expanded={menuOpen}
								class="inline-flex items-center gap-2 text-sm text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
							>
								download résumé
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform {menuOpen ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							{#if menuOpen}
								<button
									type="button"
									tabindex="-1"
									aria-hidden="true"
									class="fixed inset-0 z-0 cursor-default"
									onclick={closeMenu}
								></button>
								<div
									role="menu"
									class="absolute left-0 top-full mt-2 z-10 min-w-[12rem] rounded-lg border border-[var(--color-surface-border)] bg-[var(--color-surface-alt)] py-1 shadow-lg"
								>
									{#each resumes as resume (resume.url)}
										<a
											role="menuitem"
											href="{resume.url}?dl={resume.filename ?? ''}"
											onclick={closeMenu}
											class="flex items-center justify-between gap-3 px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-muted)]/10 hover:text-[var(--color-primary)] transition-colors"
										>
											{resume.label ?? 'Résumé'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
											</svg>
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{:else}
						<a
							href={resumes.length === 1 ? `${resumes[0].url}?dl=${resumes[0].filename ?? ''}` : '/resume.pdf'}
							download
							class="inline-flex items-center gap-2 text-sm text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
						>
							download résumé
							<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
						</a>
					{/if}

					{#if author?.socialLinks}
						<div class="flex items-center gap-5">
							{#if author.socialLinks.github}
								<a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
									</svg>
								</a>
							{/if}
							{#if author.socialLinks.linkedin}
								<a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
								</a>
							{/if}
							{#if author.socialLinks.email}
								<a href="mailto:{author.socialLinks.email}" aria-label="Email" class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
									</svg>
								</a>
							{/if}
						</div>
					{/if}
				</div>
			</div>

			<!-- Profile image -->
			<div class="flex md:justify-end">
				{#if author?.image}
					<img
						src={urlFor(author.image).width(500).height(600).fit('crop').quality(90).url()}
						alt={author.name ?? 'Profile photo'}
						class="w-36 h-48 sm:w-48 sm:h-60 md:w-64 md:h-80 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
					/>
				{/if}
			</div>
		</div>

	</div>
</section>
