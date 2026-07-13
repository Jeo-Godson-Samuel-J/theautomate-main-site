import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus } from 'lucide-react';
import type { FAQ } from "@/lib/types/faq";
import { getFAQs } from '@/lib/services/faq.services';

export default async function FAQSection() {
  const faqs = await getFAQs("contact");

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
              className="group border border-gray-100 bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all hover:shadow-md data-[state=open]:bg-[#0166A7] data-[state=open]:text-white data-[state=open]:shadow-[0_20px_40px_rgba(1,102,167,0.2)] data-[state=open]:scale-[1.02] data-[state=open]:border-transparent"
            >
              <AccordionTrigger
                className="
                    flex items-center justify-between gap-4 p-6
                    font-bold text-left text-[#1B262C]
                    group-data-[state=open]:text-white
                    hover:no-underline
                    [&>svg]:hidden
                  "
              >
                <span>{faq.question}</span>

                {/* + Toggle Button */}
                <span
                  className="
                      relative flex h-10 w-10 items-center justify-center
                      rounded-full bg-gray-100 text-[#1B262C]
                      transition-all duration-300
                      group-hover:bg-[#0166A7]/10
                      group-data-[state=open]:bg-white
                      group-data-[state=open]:text-[#0166A7]
                    "
                >
                  <Plus
                    className="
                        h-5 w-5
                        transition-transform duration-300 ease-out
                        group-data-[state=open]:rotate-45
                      "
                  />
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6 pt-0 text-sm text-gray-600 group-data-[state=open]:text-white/90 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
