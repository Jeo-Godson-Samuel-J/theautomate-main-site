'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          source: 'Contact Page'
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Whether you have a question about our services or you&apos;re ready to automate your business, our team is here to help you every step of the way.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <div className="flex items-center gap-4">
                <Image src="/icons/mail.png" alt="Mail" width={32} height={32} />
                <span className="font-bold text-[#1B262C] text-lg text-nowrap">help@theauto-mate.com</span>
              </div>
              <div className="flex items-center gap-4 text-nowrap">
                <Image src="/icons/phone.png" alt="Phone" width={32} height={32} />
                <span className="font-bold text-[#1B262C] text-lg">+91-93611 42819</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-start pt-2">
              <p className="font-bold text-[#1B262C] mb-4">Follow us on</p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/theauto-mate" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/icons/linkedin.png" alt="LinkedIn" width={40} height={40} />
                </a>
                <a href="https://www.instagram.com/the.auto_mate" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} />
                </a>
                <a href="https://www.youtube.com/@the.auto-mate" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
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

            <div className="relative z-10 bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black-50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First Name"
                    className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                    className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="E-mail"
                  className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:border-[#0166A7]"
                />
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  className="w-full px-6 py-4 rounded-[30px] border border-gray-500 focus:outline-none focus:border-[#0166A7] resize-none"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#163E72] hover:bg-[#0166A7] text-white py-7 rounded-full text-lg font-bold transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Info Cards --- */}
        <div className="relative z-10">
          {/* Subtle background accent */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EAF6FF] via-white to-[#F7FBFF] rounded-[60px]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6 md:p-10">
            {[
              {
                icon: 'support.png',
                title: 'Support',
                email: 'support@theauto-mate.com',
                desc: 'Need help or facing an issue? Our support team is here to assist you quickly and reliably.',
              },
              {
                icon: 'sales.png',
                title: 'Sales',
                email: 'sales@theauto-mate.com',
                desc: 'Looking to onboard or scale? Talk to sales for plans, demos, and enterprise solutions.',
              },
              {
                icon: 'partnerships.png',
                title: 'Partnerships',
                email: 'partnerships@theauto-mate.com',
                desc: 'Interested in collaborating or integrating? Let’s explore partnership opportunities.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative bg-white rounded-[36px] p-10 
                   border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                   transition-all duration-300 ease-out
                   hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(1,102,167,0.18)]"
              >
                {/* Glow Ring */}
                <div className="absolute inset-0 rounded-[36px] opacity-0 
                        group-hover:opacity-100 transition duration-300
                        bg-gradient-to-r from-[#0166A7]/20 to-[#00B4D8]/20 blur-xl -z-10" />

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#F1F8FF] 
                          flex items-center justify-center
                          group-hover:scale-110 transition-transform">
                    <Image
                      src={`/icons/${card.icon}`}
                      alt={card.title}
                      width={36}
                      height={36}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#1B262C] text-center mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* CTA */}
                <div className="flex justify-center">
                  <a
                    href={`mailto:${card.email}`}
                    className="inline-flex items-center gap-2 
                       px-6 py-3 rounded-full
                       bg-[#0166A7] text-white text-sm font-medium
                       transition-all duration-300
                       hover:bg-[#014F82] hover:gap-3"
                  >
                    Contact {card.title}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}