import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">
            <div className="absolute inset-0 pointer-events-none">
                {/* Left Side */}
                <Image 
                  src="/A.svg" 
                  className="absolute left-[5%] top-[25%] w-14 md:w-20 opacity-85" 
                  alt="" 
                  width={80}
                  height={80}
                  priority
                />
                <Image 
                  src="/A.svg" 
                  className="absolute left-[15%] top-[50%] w-14 md:w-20 opacity-85" 
                  alt="" 
                  width={80}
                  height={80}
                />
                <Image 
                  src="/A.svg" 
                  className="absolute left-[2%] top-[75%] w-14 md:w-20 opacity-85" 
                  alt="" 
                  width={80}
                  height={80}
                />

                {/* Right Side */}
                <Image 
                  src="/A.svg" 
                  className="absolute right-[5%] top-[30%] w-14 md:w-20 opacity-85" 
                  alt="" 
                  width={80}
                  height={80}
                />
                <Image 
                  src="/A.svg" 
                  className="absolute right-[12%] top-[55%] w-14 md:w-20 opacity-85" 
                  alt="" 
                  width={80}
                  height={80}
                />
                <Image 
                  src="/A.svg" 
                  className="absolute right-[3%] top-[80%] w-14 md:w-20 opacity-85" 
                  alt="" 
                  width={80}
                  height={80}
                />
            </div>
            <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                    bg-linear-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-[1.2]">
                    Your Smart Way To learn <br /> Automation
                </h1>

                <p className="mt-6 text-black text-lg text-center whitespace-nowrap overflow-hidden px-4">
                  <span className="inline-block animate-marquee">
                    Lead the next wave of innovation. Auto-Mate provides the critical automation skills to engineer tomorrow.
                  </span>
                </p>

                <button className="mt-10 bg-brand-dark text-white px-10 py-3 rounded-full text-lg font-bold shadow-lg hover:translate-y-[-2px] transition-all">
                    Start Learning
                </button>

                <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
                    <p className="text-sm sm:text-base md:text-lg font-medium text-black text-center mb-4 sm:mb-6 md:mb-8 px-2">
                        We have trained over <span className="font-bold">1000+ students</span> now working at top MNC&apos;s
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 md:gap-6 bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-200">
                        <div className="relative h-7 sm:h-8 md:h-9 w-full">
                          <Image 
                            src="/tcs.svg" 
                            fill 
                            className="object-contain transition-transform duration-200 hover:scale-105" 
                            alt="TCS" 
                            sizes="(max-width: 640px) 33vw, 20vw"
                          />
                        </div>
                        <div className="relative h-7 sm:h-8 md:h-9 w-full">
                          <Image 
                            src="/cognizant.svg" 
                            fill 
                            className="object-contain transition-transform duration-200 hover:scale-105" 
                            alt="Cognizant" 
                            sizes="(max-width: 640px) 33vw, 20vw"
                          />
                        </div>
                        <div className="relative h-7 sm:h-8 md:h-9 w-full">
                          <Image 
                            src="/amazon.svg" 
                            fill 
                            className="object-contain transition-transform duration-200 hover:scale-105" 
                            alt="Amazon" 
                            sizes="(max-width: 640px) 33vw, 20vw"
                          />
                        </div>
                        <div className="relative h-7 sm:h-8 md:h-9 w-full">
                          <Image 
                            src="/wipro.svg" 
                            fill 
                            className="object-contain transition-transform duration-200 hover:scale-105" 
                            alt="Wipro" 
                            sizes="(max-width: 640px) 33vw, 20vw"
                          />
                        </div>
                        <div className="relative h-7 sm:h-8 md:h-9 w-full">
                          <Image 
                            src="/zoho.svg" 
                            fill 
                            className="object-contain transition-transform duration-200 hover:scale-105" 
                            alt="Zoho" 
                            sizes="(max-width: 640px) 33vw, 20vw"
                          />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}