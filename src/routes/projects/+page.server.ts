import { client } from "$lib/sanity/client";
import { projectsQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const projects = await client.fetch(projectsQuery);
    return { projects: projects ?? [] };
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return { projects: [] };
  }
};
