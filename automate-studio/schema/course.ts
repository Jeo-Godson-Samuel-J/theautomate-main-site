import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Course",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: Rule => Rule.min(0).max(5),
    }),

    defineField({
      name: "students",
      title: "Students",
      type: "number",
    }),

    defineField({
      name: "modules",
      title: "Modules",
      type: "number",
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Example: 12h 30m",
    }),

    defineField({
      name: "price",
      title: "Base Price",
      type: "number",
    }),

    defineField({
      name: "instructorName",
      title: "Instructor Name",
      type: "string",
    }),

    defineField({
      name: "instructorImage",
      title: "Instructor Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "about",
      title: "About Course",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "whatYouWillLearn",
      title: "What You'll Learn",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "whoIsThisCourseFor",
      title: "Who is this Course For",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "plans",
      title: "Available Plans",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "plan" }],
        },
      ],
    }),
  ],
});