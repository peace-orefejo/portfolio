import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description:
        'Short tagline shown in the hero, e.g. "Full-Stack Developer & Open Source Enthusiast"',
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "email", title: "Email", type: "string" }),
      ],
    }),
    defineField({
      name: "resumes",
      title: "Résumés",
      description:
        "Upload one or more résumés (PDFs). Each gets a label shown in the hero download menu.",
      type: "array",
      of: [
        defineField({
          name: "resume",
          title: "Résumé",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "Frontend", "Backend", "General"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "file",
              title: "PDF File",
              type: "file",
              options: { accept: ".pdf" },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "file.asset.originalFilename" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
