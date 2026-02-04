import BannerCTA from "@/components/layout/BannerCTA";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/sections/contact-section/FAQSection";
import ContactHero from "@/sections/contact-section/ContactHero";

export default function ContactPage() {
    return (
        <main>
            <ContactHero />
            <FAQSection />

            <BannerCTA
                icon="/icons/book.png"
                title="Start Learning Today"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonText="Get The Course"
            />
        </main>
    );
}