// import CourseCard from '@/components/layout/CourseCard';

// const allCourses = [
//     // Row 1
//     { slug: 'playwright', title: 'Playwright', image: '/courses-banner/playwright.png', learners: '200+', duration: '100+', description: 'Playwright is to provide developers and testers with a single API to automate their web applications.' },
//     { slug: 'webdriverio', title: 'WebDriverIO', image: '/courses-banner/webdriveio.png', learners: '200+', duration: '100+', description: 'WebdriverIO is an all in one framework for your web app development.' },
//     { slug: 'appium', title: 'Appium', image: '/courses-banner/appium.png', learners: '150+', duration: '80+', description: 'Appium is a mobile application testing tool that is currently trending in Mobile Automation.' },
//     // Row 2
//     { slug: 'selenium', title: 'Selenium', image: '/courses-banner/selenium1.png', learners: '350+', duration: '100+', description: 'Selenium automates browsers. That\'s it! What you do with that power is entirely up to you.' },
//     { slug: 'sdet', title: 'SDET', image: '/courses-banner/sdet.png', learners: '230+', duration: '100+', description: 'SDET is an IT professional primarily responsible for the creation of automated test frameworks.' },
//     { slug: 'full-stack', title: 'Full Stack Automation', image: '/courses-banner/fsa.png', learners: '350+', duration: '100+', description: 'Full stack automation is a business methodology that automates digital processes.' },
//     // Row 3 (The missing row)
//     { slug: 'tricentis-tosca', title: 'Tricentis Tosca', image: '/courses-banner/tricentis.png', learners: '150+', duration: '80+', description: 'Tricentis Tosca is a flexibly deployed, continuous testing platform that accelerates end-to-end testing.' },
//     { slug: 'testcafe', title: 'TestCafe', image: '/courses-banner/testcafe.png', learners: '170+', duration: '100+', description: 'TestCafe is a user-friendly end-to-end testing framework. Free and open source test runner.' },
//     { slug: 'rest-api', title: 'Rest API automation', image: '/courses-banner/restapi.png', learners: '150+', duration: '180+', description: 'Rest-Assured is a Java-based library that is used to test RESTful Web Services.' },
// ];

// export default function CourseList() {
//     return (
//         <section className="py-8 px-6 md:py-20 bg-white">
//             <div className="mx-auto">
//                 <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Other Courses</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                     {allCourses.map((course) => (
//                         <CourseCard key={course.slug} {...course} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
import { client, urlFor } from "@/lib/sanity.client";
import CourseCard from "@/components/layout/CourseCard";
export const revalidate = 60;


const COURSES_QUERY = `
*[_type == "course"]{
  _id,
  title,
  slug,
  heroImage,
  students,
  hours,
  tagline
}
`;

export default async function CourseList() {
    const courses = await client.fetch(COURSES_QUERY);

    return (
        <section className="py-8 px-6 md:py-20 bg-white">
            <div className="mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Other Courses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course: any) => (
                        <CourseCard
                            key={course._id}
                            slug={course.slug.current}
                            title={course.title}
                            image={
                                course.heroImage
                                    ? urlFor(course.heroImage).width(400).url()
                                    : "/placeholder.png"
                            }
                            learners={course.students || "0+"}
                            duration={course.hours || "0+"}
                            description={course.tagline}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
