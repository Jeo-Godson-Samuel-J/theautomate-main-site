import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog",
  type: "document",

  fields: [
    /* -----------------------------
       BASIC METADATA
    ----------------------------- */

    defineField({
      name: "title",
      title: "Blog Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Short Description / Excerpt",
      type: "text",
      rows: 3,
      description: "Shown in blog listing pages & SEO",
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Example: 5",
      validation: (Rule) => Rule.min(1),
    }),

    /* -----------------------------
       HERO SECTION
    ----------------------------- */

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    /* -----------------------------
       MAIN CONTENT
    ----------------------------- */

    defineField({
      name: "content",
      title: "Blog Content",
      type: "array",
      of: [
        /* Rich text blocks */
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Inline Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "External Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },

        /* Code block */
        {
          type: "code",
          title: "Code Block",
          options: {
            language: "javascript",
            withFilename: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    /* -----------------------------
       SEO (OPTIONAL BUT IMPORTANT)
    ----------------------------- */

    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date
          ? new Date(date).toDateString()
          : "No publish date",
      };
    },
  },
});
