"use client";
import React, { useState } from 'react';
import { Mail, Phone, Share2, Linkedin, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FeatureIcon } from '@/components/ui/FeatureIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Page'
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
      } else {
        toast.error(result.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/theauto-mate' },
    { icon: Instagram, href: 'https://www.instagram.com/the.auto_mate' },
    { icon: Youtube, href: 'https://www.youtube.com/@the.auto-mate' },
    { icon: Twitter, href: '#' },
    { icon: Facebook, href: '#' },
  ];

  return (
    <div className="bg-white pt-24 md:pt-32 pb-20 overflow-hidden font-sans">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            We're Here To <span className="text-[#0166A7]">Help!</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg">
            We want to hear from you. Let us know how we can help.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 items-start">
          
          {/* Left: Form */}
          <div className="bg-[#f9fafb] rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Send us a Message</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-lg">
              Connect instantly and clearly with your audience anytime, anywhere, effortlessly. Would you like alternative versions or a different tone?
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-sm text-slate-500 font-medium ml-1">Name</Label>
                  <Input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name"
                    className="h-auto px-5 py-3.5 rounded-xl border-gray-200 bg-white focus-visible:ring-[#0166A7] text-slate-800 placeholder:text-slate-400 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-slate-500 font-medium ml-1">Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email"
                    className="h-auto px-5 py-3.5 rounded-xl border-gray-200 bg-white focus-visible:ring-[#0166A7] text-slate-800 placeholder:text-slate-400 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-sm text-slate-500 font-medium ml-1">Phone</Label>
                  <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone"
                    className="h-auto px-5 py-3.5 rounded-xl border-gray-200 bg-white focus-visible:ring-[#0166A7] text-slate-800 placeholder:text-slate-400 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-slate-500 font-medium ml-1">Date</Label>
                  <Input type="date" name="date" value={formData.date} onChange={handleChange} required
                    className="h-auto px-5 py-3.5 rounded-xl border-gray-200 bg-white focus-visible:ring-[#0166A7] text-slate-500 text-sm" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-slate-500 font-medium ml-1">Message</Label>
                <Textarea rows={5} name="message" value={formData.message} onChange={handleChange} required placeholder="Message"
                  className="px-5 py-3.5 rounded-xl border-gray-200 bg-white focus-visible:ring-[#0166A7] resize-none text-slate-800 placeholder:text-slate-400 text-sm" />
              </div>

              <Button type="submit" disabled={isSubmitting}
                className="w-full bg-[#0166A7] hover:bg-[#01538a] text-white h-auto py-4 rounded-xl text-base font-medium transition-all mt-2">
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </div>

          {/* Right: Info Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Email Card */}
            <div className="bg-[#f2f6fc] rounded-3xl p-8 flex items-start gap-5">
              <FeatureIcon icon={Mail} wrapperClassName="bg-[#e3ecf8]" iconClassName="text-[#0166A7]" />
              <div className="pt-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email us</h3>
                <p className="text-slate-500 text-sm mb-3">Email us for scheduling</p>
                <p className="text-sm font-semibold text-slate-800">help@theauto-mate.com</p>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-[#fef4f1] rounded-3xl p-8 flex items-start gap-5">
              <FeatureIcon icon={Share2} wrapperClassName="bg-[#fce7e2]" iconClassName="text-[#e86650]" />
              <div className="pt-1 w-full">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Follow us on</h3>
                <p className="text-slate-500 text-sm mb-4">Stay updated with our latest news</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                      <social.icon size={18} className="text-[#e86650]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-[#f0fdf4] rounded-3xl p-8 flex items-start gap-5">
              <FeatureIcon icon={Phone} wrapperClassName="bg-[#dcfce7]" iconClassName="text-[#16a34a]" />
              <div className="pt-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Contact us</h3>
                <p className="text-slate-500 text-sm mb-3">Call us for scheduling</p>
                <p className="text-sm font-semibold text-slate-800">+91-9361142819</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}