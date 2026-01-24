export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {/* Left Side */}
                <img src="/A.svg" className="absolute left-[5%] top-[25%] w-14 md:w-20 opacity-[0.15]" alt="" />
                <img src="/A.svg" className="absolute left-[15%] top-[50%] w-14 md:w-20 opacity-[0.15]" alt="" />
                <img src="/A.svg" className="absolute left-[2%] top-[75%] w-14 md:w-20 opacity-[0.15]" alt="" />

                {/* Right Side */}
                <img src="/A.svg" className="absolute right-[5%] top-[30%] w-14 md:w-20 opacity-[0.15]" alt="" />
                <img src="/A.svg" className="absolute right-[12%] top-[55%] w-14 md:w-20 opacity-[0.15]" alt="" />
                <img src="/A.svg" className="absolute right-[3%] top-[80%] w-14 md:w-20 opacity-[0.15]" alt="" />
            </div>
            <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-deep via-brand-blue to-brand-sky leading-[1.2]">
                    Your Smart Way To learn <br /> Automation
                </h1>
                <p className="mt-6 text-gray-600 max-w-2xl text-lg">
                    Lead the next wave of innovation. Auto-Mate provides the critical automation skills to engineer tomorrow.
                </p>

                <button className="mt-10 bg-brand-dark text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:translate-y-[-2px] transition-all">
                    Start Learning
                </button>

                <div className="mt-24 w-full">
                    <p className="text-sm font-medium text-gray-500 mb-10">
                        We have trained over 1000+ students and they are now working in top MNC's
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 bg-white py-6 px-8 rounded-3xl">
                        <img src="/tcs.svg" className="h-8  transition" alt="TCS" />
                        <img src="/cognizant.svg" className="h-8 transition" alt="Cognizant" />
                        <img src="/amazon.svg" className="h-8 transition" alt="Amazon" />
                        <img src="/wipro.svg" className="h-8 transition" alt="Wipro" />
                        <img src="/zoho.svg" className="h-8 transition" alt="Zoho" />
                    </div>
                </div>
            </div>
        </section>
    );
}