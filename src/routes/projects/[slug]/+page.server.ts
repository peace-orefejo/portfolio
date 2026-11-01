import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity/client";
import { projectBySlugQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug });

  if (!project) {
    error(404, "Project not found");
  }

  return { project };
};
