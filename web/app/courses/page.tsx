import CourseHero from '@/sections/courses-section/CourseHero';
import CourseList from '@/sections/courses-section/CourseList';
import UniqueFeature from '@/sections/courses-section/UniqueFeature';
import BannerCTA from '@/components/layout/BannerCTA';

export default function CoursesPage() {
    return (
        <main className="pt-20 mx-auto max-w-7xl"> {/* Standard space for Navbar */}
            <CourseList />
            <UniqueFeature />
            <BannerCTA
                icon="/icons/consultation.png"
                title="Need A Consultation?"
                description="We are here to answer your questions"
                buttonText="Contact Us"
            />
        </main>
    );
}