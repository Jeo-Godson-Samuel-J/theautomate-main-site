import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",

  fields: [
    /* ---------------- HEADER ---------------- */

    defineField({
      name: "title",
      title: "Case Study Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "banner",
      title: "Banner Image (Full Width)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    /* ---------------- CLIENT INFO ---------------- */

    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
    }),

    defineField({
      name: "clientDescription",
      title: "Client Description",
      type: "text",
      rows: 2,
    }),

    /* ---------------- CONTENT SECTIONS ---------------- */

    defineField({
      name: "sections",
      title: "Case Study Sections",
      type: "array",
      of: [
        {
          type: "object",
          title: "Section",
          fields: [
            {
              name: "heading",
              title: "Section Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Content",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "heading",
              subtitle: "content",
            },
          },
        },
      ],
    }),

    /* ---------------- OPTIONAL STATS ---------------- */

    defineField({
      name: "results",
      title: "Key Results (Optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Example: '25% reduction in discrepancies'",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "banner",
      client: "clientName",
    },
    prepare({ title, media, client }) {
      return {
        title,
        media,
        subtitle: client ? `Client: ${client}` : "",
      };
    },
  },
});
