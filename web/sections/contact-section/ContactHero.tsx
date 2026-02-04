// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';

// export default function ContactPage() {
//     return (
//         <div className="bg-white pt-20 md:pt-32 pb-10 md:pb-20">
//             <div className="max-w-7xl mx-auto px-6">

//                 {/* --- MAIN SECTION: Content + Form --- */}
//                 <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start mb-16 md:mb-32">

//                     {/* Left Side: Text & Info */}
//                     <div className="flex flex-col items-center md:items-start lg:w-1/2 space-y-8">
//                         <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
//                     bg-linear-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-[1.2]">
//                             Get in <span>touch today</span>
//                         </h1>
//                         <p className="text-center md:text-left text-black-400 leading-relaxed max-w-md">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                             Amet, venenatis dictum et nec. Fringilla dictum tristique
//                             cras pellentesque morbi consequat.
//                         </p>

//                         {/* Contact Details */}
//                         <div className="flex flex-col items-center md:items-start space-y-6">
//                             <div className="flex items-center gap-4">
//                                 <Image src="/icons/mail.png" alt="Mail" width={32} height={32} />
//                                 <span className="font-bold text-[#1B262C] text-lg">help@theauto-mate.com</span>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <Image src="/icons/phone.png" alt="Phone" width={32} height={32} />
//                                 <span className="font-bold text-[#1B262C] text-lg">+91-9361142819</span>
//                             </div>
//                         </div>

//                         {/* Social Links */}
//                         <div className="flex items-center md:items-start pt-4 gap-4">
//                             <p className="font-bold text-[#1B262C] mb-4">Follow us on</p>
//                             <div className="flex gap-4">
//                                 <a href="#" className="hover:scale-110 transition-transform">
//                                     <Image src="/icons/linkedin.png" alt="LinkedIn" width={40} height={40} />
//                                 </a>
//                                 <a href="#" className="hover:scale-110 transition-transform">
//                                     <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} />
//                                 </a>
//                                 <a href="#" className="hover:scale-110 transition-transform">
//                                     <Image src="/icons/youtube.png" alt="YouTube" width={40} height={40} />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Side: Floating Form Card */}
//                     <div className="lg:w-1/2 w-full">
//                         <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black-50">
//                             <form className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <input type="text" placeholder="First Name" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
//                                     <input type="text" placeholder="Last Name" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
//                                 </div>
//                                 <input type="email" placeholder="E-mail" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
//                                 <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
//                                 <input type="text" placeholder="Subject" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
//                                 <textarea rows={4} placeholder="Your Message" className="w-full px-6 py-4 rounded-[30px] border border-gray-500 focus:outline-none focus:border-[#0166A7] resize-none" />

//                                 <Button className="w-full bg-[#163E72] hover:bg-[#0166A7] text-white py-7 rounded-full text-lg font-bold transition-all">
//                                     Submit
//                                 </Button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- BOTTOM SECTION: Info Cards --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {[
//                         { icon: 'support.png', title: 'Support', email: 'support@theauto-mate.com' },
//                         { icon: 'sales.png', title: 'Sales', email: 'sales@theauto-mate.com' },
//                         { icon: 'partnerships.png', title: 'Partnerships', email: 'Partnerships@theauto-mate.com' },
//                     ].map((card) => (
//                         <div key={card.title} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
//                             <div className="mb-6">
//                                 <Image src={`/icons/${card.icon}`} alt={card.title} width={60} height={60} />
//                             </div>
//                             <h3 className="text-xl font-bold text-[#1B262C] mb-2">{card.title}</h3>
//                             <a href={`mailto:${card.email}`} className="text-[#0166A7] font-medium mb-4 hover:underline">{card.email}</a>
//                             <p className="text-black-500 text-sm leading-relaxed">
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                                 Amet, venenatis dictum et nec. Fringilla dictum tristique.
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </div>
//     );
// }
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
    return (
        <div className="bg-white pt-20 md:pt-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- MAIN SECTION: Content + Form --- */}
                <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start mb-16 md:mb-32">

                    {/* Left Side: Text & Info */}
                    <div className="flex flex-col items-center md:items-start lg:w-1/2 space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                    bg-linear-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-[1.2]">
                            Get in <span>touch today</span>
                        </h1>
                        <p className="text-center md:text-left text-black-400 leading-relaxed max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Amet, venenatis dictum et nec. Fringilla dictum tristique
                            cras pellentesque morbi consequat.
                        </p>

                        {/* Contact Details */}
                        <div className="flex flex-col items-center md:items-start space-y-6">
                            <div className="flex items-center gap-4">
                                <Image src="/icons/mail.png" alt="Mail" width={32} height={32} />
                                <span className="font-bold text-[#1B262C] text-lg">help@theauto-mate.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Image src="/icons/phone.png" alt="Phone" width={32} height={32} />
                                <span className="font-bold text-[#1B262C] text-lg">+91-9361142819</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col items-center md:items-start pt-2">
                            <p className="font-bold text-[#1B262C] mb-4">Follow us on</p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:scale-110 transition-transform">
                                    <Image src="/icons/linkedin.png" alt="LinkedIn" width={40} height={40} />
                                </a>
                                <a href="#" className="hover:scale-110 transition-transform">
                                    <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} />
                                </a>
                                <a href="#" className="hover:scale-110 transition-transform">
                                    <Image src="/icons/youtube.png" alt="YouTube" width={40} height={40} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Floating Form Card with Background SVGs */}
                    <div className="lg:w-1/2 w-full relative">

                        {/* --- BACKGROUND SVGS NEAR FORM --- */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            {/* Top Left */}
                            <Image src="/A.svg" className="absolute -left-10 -top-10 w-20 md:w-32 opacity-15" alt="" width={120} height={120} />
                            {/* Bottom Right */}
                            <Image src="/A.svg" className="absolute -right-12 -bottom-10 w-24 md:w-36 opacity-15" alt="" width={120} height={120} />
                            {/* Middle Left */}
                            <Image src="/A.svg" className="absolute -left-16 bottom-1/4 w-16 md:w-24 opacity-15" alt="" width={80} height={80} />
                            {/* Top Right */}
                            <Image src="/A.svg" className="absolute right-0 top-1/4 w-20 md:w-28 opacity-5" alt="" width={100} height={100} />
                        </div>

                        <div className="relative z-10 bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black-50 backdrop-blur-sm bg-white/90">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
                                    <input type="text" placeholder="Last Name" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
                                </div>
                                <input type="email" placeholder="E-mail" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
                                <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
                                <input type="text" placeholder="Subject" className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]" />
                                <textarea rows={4} placeholder="Your Message" className="w-full px-6 py-4 rounded-[30px] border border-gray-500 focus:outline-none focus:border-[#0166A7] resize-none" />

                                <Button className="w-full bg-[#163E72] hover:bg-[#0166A7] text-white py-7 rounded-full text-lg font-bold transition-all">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: Info Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {[
                        { icon: 'support.png', title: 'Support', email: 'support@theauto-mate.com' },
                        { icon: 'sales.png', title: 'Sales', email: 'sales@theauto-mate.com' },
                        { icon: 'partnerships.png', title: 'Partnerships', email: 'Partnerships@theauto-mate.com' },
                    ].map((card) => (
                        <div key={card.title} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-6">
                                <Image src={`/icons/${card.icon}`} alt={card.title} width={60} height={60} />
                            </div>
                            <h3 className="text-xl font-bold text-[#1B262C] mb-2">{card.title}</h3>
                            <a href={`mailto:${card.email}`} className="text-[#0166A7] font-medium mb-4 hover:underline">{card.email}</a>
                            <p className="text-black-500 text-sm leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Amet, venenatis dictum et nec. Fringilla dictum tristique.
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}