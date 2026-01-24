const courseData = [
    { title: "Selenium", img: "/selenium.svg.svg", learners: "350+", color: "bg-[#00AD00]" },
    { title: "SDET", img: "/SDET.svg", learners: "350+", color: "bg-[#0A2540]" },
    { title: "Full Stack Automation", img: "/FSA.svg", learners: "350+", color: "bg-white" },
];

export default function Courses() {
    return (
        <section className="py-20 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Popular Courses</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {courseData.map((course, i) => (
                    <div key={i} className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-gray-100">
                        <div className={`h-56 flex items-center justify-center p-8 ${course.color}`}>
                            <img src={course.img} alt={course.title} className="max-h-full object-contain" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                            <div className="flex text-blue-500 mb-4">{"★★★★★"}</div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                <span>⏱ 100+ hrs</span>
                                <span>👥 {course.learners} Successful Learners</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-8">
                                Master the latest tools and frameworks used by top industry professionals.
                            </p>
                            <button className="w-full bg-brand-blue text-white py-3 rounded-full font-bold hover:bg-brand-dark transition">
                                Learn more
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-16">
                <button className="bg-brand-dark text-white px-12 py-4 rounded-full font-bold text-lg">See more</button>
            </div>
        </section>
    );
}