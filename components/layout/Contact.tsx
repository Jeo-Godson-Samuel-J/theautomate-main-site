import React from 'react';

export default function Contact() {
    return (
        <section className="py-20 px-6 pb-60 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
                <img src="/starDust.svg" className="w-64 md:w-80 mb-8 mx-auto lg:mx-0" alt="" />
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                    Shape Your Future with <br /> Knowledge That Matters
                </h2>
                <p className="text-gray-600 max-w-md">
                    We simplify online education with honest reviews, verified discounts, and guides that help learners make the right choices.
                </p>
            </div>

            <div className="lg:w-1/2 w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-bold mb-8">
                    Contact Us
                </div>
                <h3 className="text-xl font-bold mb-8">Connect with us. We're waiting for your message</h3>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="First Name" className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-brand-blue" />
                        <input type="text" placeholder="Last Name" className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-brand-blue" />
                    </div>
                    <input type="email" placeholder="E-mail" className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-brand-blue" />
                    <textarea placeholder="Your Message" rows={4} className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-brand-blue resize-none"></textarea>
                    <button className="w-full bg-brand-dark text-white py-4 rounded-full font-bold text-lg hover:shadow-lg transition">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}