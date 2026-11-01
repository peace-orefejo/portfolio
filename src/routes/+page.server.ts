import { client } from "$lib/sanity/client";
import {
  authorQuery,
  featuredProjectsQuery,
  postsQuery,
} from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const [author, featuredProjects, allPosts] = await Promise.all([
      client.fetch(authorQuery),
      client.fetch(featuredProjectsQuery),
      client.fetch(postsQuery),
    ]);

    return {
      author: author ?? null,
      featuredProjects: featuredProjects ?? [],
      recentPosts: (allPosts ?? []).slice(0, 3),
    };
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return { author: null, featuredProjects: [], recentPosts: [] };
  }
};
