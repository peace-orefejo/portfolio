import { defineQuery } from "groq";

// --- Projects ---

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    year,
    role,
    description,
    summary,
    highlights,
    tags,
    liveUrl,
    repoUrl,
    featured,
    order
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    year,
    role,
    description,
    summary,
    highlights,
    tags,
    liveUrl,
    repoUrl
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    role,
    description,
    summary,
    highlights,
    body,
    media[]{
      _type,
      _key,
      caption,
      alt,
      url,
      asset
    },
    tags,
    liveUrl,
    repoUrl
  }
`);

// --- Blog Posts ---

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(coalesce(publishedAt, _updatedAt) desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    publishedAt,
    "author": author->{ name, image }
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    tags,
    publishedAt,
    "author": author->{ name, image, bio, socialLinks }
  }
`);

// --- Talks ---

export const talksQuery = defineQuery(`
  *[_type == "talk"] | order(date desc) {
    _id,
    title,
    event,
    date,
    description,
    tags,
    image,
    slidesUrl,
    recordingUrl,
    featured
  }
`);

// --- Author (for About / Contact section) ---

export const authorQuery = defineQuery(`
  *[_type == "author"][0] {
    _id,
    name,
    headline,
    bio,
    "bioText": pt::text(bio),
    image,
    skills,
    socialLinks,
    resumes[]{
      label,
      "url": file.asset->url,
      "filename": file.asset->originalFilename
    }
  }
`);
