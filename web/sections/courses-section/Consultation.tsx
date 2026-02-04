// "use client"
// import Image from 'next/image';
// import { Button } from "@/components/ui/button"

// export default function Consultation() {
//     const patternGrid = Array.from({ length: 30 });

//     return (
//         <section className="py-8 pb-24 mb-24 sm:py-12 bg-white">
//             <div className="mx-auto px-6 md:px-12">
//                 <div className="relative overflow-hidden rounded-[40px] bg-linear-to-r from-[#0166A7] via-[#2B71B8] to-[#C6DFF2] min-h-[300px] flex items-center shadow-2xl">

//                     {/* --- THE PATTERN GRID ---
//                         Hidden on mobile for clarity; absolute on desktop.
//                     */}
//                     <div className="absolute right-0 top-0 h-full w-[45%] hidden lg:flex items-center justify-end pr-10 pointer-events-none">
//                         <div className="grid grid-cols-5 grid-rows-6 gap-x-10 gap-y-6">
//                             {patternGrid.map((_, i) => (
//                                 <div key={i} className="w-8 h-12 flex items-center justify-center opacity-40">
//                                     <Image
//                                         src="/line.png"
//                                         alt=""
//                                         width={32}
//                                         height={48}
//                                         className="object-contain"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* --- CONTENT CONTAINER --- */}
//                     <div className="relative z-20 w-full px-8 md:px-20 py-12 flex flex-col lg:flex-row justify-between items-center gap-10">

//                         {/* Left Side: Icon & Messaging */}
//                         <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-6 lg:gap-8">
//                             <div className="shrink-0 bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
//                                 <Image
//                                     src="/icons/consultation.png"
//                                     alt="Consultation"
//                                     width={80}
//                                     height={80}
//                                     className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
//                                 />
//                             </div>
//                             <div className="text-white">
//                                 <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
//                                     Need A Consultation?
//                                 </h2>
//                                 <p className="text-blue-50 text-lg lg:text-xl mt-2 font-light">
//                                     We are here to answer your questions
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Right Side: Responsive Button Alignment */}
//                         <div className="w-full lg:w-auto flex justify-center lg:block lg:px-8">
//                             <Button className="w-full lg:w-auto bg-[#163E72] hover:bg-[#0d2646] text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl border border-white/20 whitespace-nowrap active:scale-95">
//                                 Contact Us
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }