import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'masterclassHero',
    title: 'Masterclass Hero Section',
    type: 'document',

    fields: [

        // LEFT SIDE CONTENT
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),

        // RIGHT SIDE IMAGE
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),

        // EVENT DETAILS
        defineField({
            name: 'eventDetails',
            title: 'Event Details',
            type: 'object',
            fields: [

                defineField({
                    name: 'date',
                    title: 'Date',
                    type: 'date',
                    validation: (Rule) => Rule.required(),
                }),

                defineField({
                    name: 'time',
                    title: 'Time',
                    type: 'string',
                    description: 'Example: 10:00 AM IST',
                }),

                defineField({
                    name: 'duration',
                    title: 'Duration',
                    type: 'string',
                    description: 'Example: 90 Minutes',
                }),

                defineField({
                    name: 'format',
                    title: 'Format',
                    type: 'string',
                    description: 'Example: Live Online',
                }),
            ],
        }),

        // BONUS SECTION
        defineField({
            name: 'bonus',
            title: 'Bonus Section',
            type: 'object',
            fields: [

                defineField({
                    name: 'bonusText',
                    title: 'Bonus Text',
                    type: 'string',
                    description: 'Example: Bonus: testron.ai Framework',
                }),

                defineField({
                    name: 'bonusHighlight',
                    title: 'Bonus Highlight',
                    type: 'string',
                    description: 'Example: ₹42,994+ Resources',
                }),
            ],
        }),

        // PRICING / CTA
        defineField({
            name: 'pricing',
            title: 'Pricing',
            type: 'object',
            fields: [

                defineField({
                    name: 'price',
                    title: 'Price',
                    type: 'number',
                    validation: (Rule) => Rule.required().positive(),
                }),

                defineField({
                    name: 'originalPrice',
                    title: 'Original Price',
                    type: 'number',
                }),

                defineField({
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    initialValue: 'Secure Your Spot',
                }),
            ],
        }),

        // REMAINING SEATS
        defineField({
            name: 'remainingSeats',
            title: 'Remaining Seats',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),

    ],
})
