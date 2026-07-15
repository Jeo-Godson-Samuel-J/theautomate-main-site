import { defineField, defineType } from "sanity";

export default defineType({
    name: "homeHighlight",
    title: "Home Highlight",
    type: "document",

    fields: [
        defineField({
            name: "leftImage",
            title: "Left Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "rightImage",
            title: "Right Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "statisticNumber",
            title: "Statistic Number",
            type: "string",
        }),

        defineField({
            name: "statisticHeading",
            title: "Statistic Heading",
            type: "string",
        }),

        defineField({
            name: "studentAvatars",
            title: "Student Avatars",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),

        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            rows: 4,
        }),

        defineField({
            name: "quoteAuthor",
            title: "Quote Author",
            type: "string",
        }),

        defineField({
            name: "quoteSubtitle",
            title: "Quote Subtitle",
            type: "string",
        }),
    ],

    preview: {
        select: {
            title: "statisticHeading",
            media: "leftImage",
        },
    },
});