'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'What topics are included in the course?',
    a: 'Our courses cover everything from Playwright and Selenium to advanced CI/CD pipelines and AI-driven testing.',
  },
  {
    q: 'Do you have a refund policy?',
    a: 'Yes, we offer a 7-day money-back guarantee if you are not satisfied with the content.',
  },
  {
    q: 'When was the course recorded?',
    a: 'All courses are updated monthly to ensure they align with the latest industry versions.',
  },
  {
    q: 'Do you have a free trial for the course?',
    a: 'Absolutely! You can access the first two modules of any course for free.',
  },
  {
    q: 'Do you offer discounts for students?',
    a: 'Yes, we provide a 40% discount for verified students and recent graduates.',
  },
  {
    q: 'Do you provide placement support?',
    a: 'We offer resume reviews, mock interviews, and direct referrals to our partner network.',
  },
  {
    q: 'How long can I access the course?',
    a: 'You get lifetime access to the course materials and all future updates.',
  },
  {
    q: 'Is offline classes available?',
    a: 'Currently, we focus on high-quality digital learning, but we do hold quarterly physical bootcamps.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B262C] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Everything you need to know before enrolling. Clear answers, no fluff.
          </p>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <div
                className="group bg-white rounded-[25px] border border-gray-100
                           shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                           transition-all hover:shadow-md"
              >
                <AccordionTrigger
                  className="
                    flex items-center justify-between gap-4 p-6
                    font-bold text-left text-[#1B262C]
                    hover:no-underline
                    [&>svg]:hidden
                  "
                >
                  <span>{faq.q}</span>

                  {/* + Toggle Button */}
                  <span
                    className="
                      relative flex h-10 w-10 items-center justify-center
                      rounded-full bg-gray-100 text-[#1B262C]
                      transition-all duration-300

                      /* 👉 HOVER EFFECT GOES HERE 👈 */
                      /* Example: hover:bg-[#0166A7]/10 hover:scale-105 */

                      data-[state=open]:bg-[#0166A7]
                      data-[state=open]:text-white
                    "
                  >
                    <Plus
                      className="
                        h-5 w-5
                        transition-transform duration-300 ease-out
                        data-[state=open]:rotate-90
                      "
                    />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
