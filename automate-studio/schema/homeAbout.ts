import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeAbout",
  title: "Home About Section",
  type: "document",

  fields: [
    /* ── Heading ── */
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading text (the portion before the highlight).",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "highlightText",
      title: "Highlight Text",
      type: "string",
      description: "Portion of the heading rendered in brand blue (#0166A7).",
      validation: (Rule) => Rule.required(),
    }),

    /* ── Body ── */
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Paragraph copy displayed below the heading.",
      validation: (Rule) => Rule.required(),
    }),

    /* ── Hero Image ── */
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    /* ── Floating Completion Card ── */
    defineField({
      name: "completionTitle",
      title: "Completion Card Title",
      type: "string",
      description: 'Label shown above the percentage, e.g. "Course Completion".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "completionPercentage",
      title: "Completion Percentage",
      type: "number",
      description: "Numeric value 0–100 shown in the floating card.",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),

    /* ── Statistics ── */
    defineField({
      name: "statOneNumber",
      title: "Stat 1 – Number",
      type: "string",
      description: 'Large bold figure, e.g. "10,000+".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "statOneDescription",
      title: "Stat 1 – Description",
      type: "string",
      description: 'Short label below the number, e.g. "Students Trained".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "statTwoNumber",
      title: "Stat 2 – Number",
      type: "string",
      description: 'Large bold figure, e.g. "95%".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "statTwoDescription",
      title: "Stat 2 – Description",
      type: "string",
      description: 'Short label below the number, e.g. "Placement Rate".',
      validation: (Rule) => Rule.required(),
    }),

    /* ── CTA ── */
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: 'CTA label, e.g. "Learn More".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "url",
      description: "Destination URL for the CTA button.",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https"],
        }),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Home About Section",
        media,
      };
    },
  },
});
