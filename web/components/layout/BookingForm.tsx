"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
    courseSlug: string;
}

export default function BookingForm({ courseSlug }: BookingFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const searchParams = new URLSearchParams({
            course: courseSlug,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        });

        router.push(`/payment?${searchParams.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-8 py-4 rounded-full bg-slate-50 border border-slate-200 focus:border-[#1E90FF] outline-none"
            />
            <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-8 py-4 rounded-full bg-slate-50 border border-slate-200 focus:border-[#1E90FF] outline-none"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-8 py-4 rounded-full bg-slate-50 border border-slate-200 focus:border-[#1E90FF] outline-none"
            />
            <textarea
                name="message"
                rows={4}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-8 py-4 rounded-[30px] bg-slate-50 border border-slate-200 focus:border-[#1E90FF] outline-none"
            />
            <button
                type="submit"
                className="w-full bg-[#163E72] hover:bg-[#0A3D62] text-white py-4 rounded-full font-black text-xl shadow-xl transition-all active:scale-95"
            >
                Book Now
            </button>
        </form>
    );
}
