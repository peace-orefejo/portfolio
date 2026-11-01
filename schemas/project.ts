import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2024" or "2023 – now"',
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "Full-stack", "Design + Frontend", "Research"',
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "One-line tagline shown under the title.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "hardPart",
      title: "The hard part",
      type: "string",
      description:
        'One sentence shown under the description on the homepage, e.g. "The hard part: …"',
    }),
    defineField({
      name: "snippet",
      title: "Terminal snippet",
      type: "text",
      rows: 12,
      description:
        "Optional terminal output shown on the homepage instead of the first image. Lines starting with $ are highlighted.",
    }),
    defineField({
      name: "summary",
      title: "Rich summary",
      type: "text",
      rows: 8,
      description:
        "The longer story — what the project is, why it exists, the problem it solves, what makes it interesting. Plain text, paragraphs separated by blank lines.",
      validation: (rule) => rule.max(2000),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Short bullet points — what you built, shipped, measured. Keep each under ~120 chars.",
    }),
    defineField({
      name: "media",
      title: "Media gallery",
      type: "array",
      description:
        "Images and videos shown on the project detail page. Drag to reorder. Videos accept YouTube, Vimeo, or direct .mp4 URLs.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "alt",
              title: "Alt text",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          name: "video",
          title: "Video",
          fields: [
            {
              name: "url",
              title: "Video URL",
              type: "url",
              description: "YouTube, Vimeo, or direct .mp4 URL",
              validation: (rule) => rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
          preview: {
            select: { title: "caption", subtitle: "url" },
            prepare({ title, subtitle }) {
              return { title: title || "Video", subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Case study (long form)",
      type: "text",
      rows: 20,
      description:
        "Full case study shown on the project detail page. Markdown supported — use ## headings, **bold**, `code`, lists, links, etc.",
    }),
    defineField({
      name: "tags",
      title: "Tech Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "repoUrl",
      title: "Repository URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
