import CTA from "@/components/layout/CTA";
import FAQSection from "@/sections/contact-section/FAQSection";
import ContactHero from "@/sections/contact-section/ContactHero";

export default function ContactPage() {
    return (
        <main>
            <ContactHero />
            <FAQSection />

            <CTA
                icon="/icons/book.png"
                title="Start Learning Today"
                description="Join the next wave of innovation. Your journey to mastering automation starts with a single click."
                buttonText="Get The Course"
            />
        </main>
    );
}