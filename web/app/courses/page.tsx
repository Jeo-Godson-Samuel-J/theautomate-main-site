import CourseHero from '@/sections/courses-section/CourseHero';
import CourseList from '@/sections/courses-section/CourseList';
import UniqueFeature from '@/sections/courses-section/UniqueFeature';
import CaseStudies from '@/sections/courses-section/CaseStudies';
import Consultation from '@/sections/courses-section/Consultation';

export default function CoursesPage() {
    return (
        <main className="pt-20 mx-auto max-w-7xl"> {/* Standard space for Navbar */}
            <CourseHero />
            <CourseList />
            <UniqueFeature />
            <CaseStudies />
            <Consultation />
        </main>
    );
}