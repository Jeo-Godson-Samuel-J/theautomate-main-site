import { defineField, defineType } from "sanity";

export default defineType({
    name: "faq",
    title: "FAQ",
    type: "document",

    fields: [
        defineField({
            name: "question",
            title: "Question",
            type: "string",
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "answer",
            title: "Answer",
            type: "text",
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Home", value: "home" },
                    { title: "Contact", value: "contact" }
                ]
            }
        }),

        defineField({
            name: "order",
            title: "Order",
            type: "number"
        })
    ]
});