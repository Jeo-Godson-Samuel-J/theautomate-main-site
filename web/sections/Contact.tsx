'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

const formSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    // Auto-hide toast after 5 seconds
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setShowToast(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setToastType('success');
                setToastMessage('Thank you! Your message has been sent successfully.');
                setShowToast(true);
                reset();
            } else {
                throw new Error(result.error || 'Failed to submit the form. Please try again.');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            setToastType('error');
            setToastMessage(error.message || 'Something went wrong. Please try again later.');
            setShowToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white text-black pb-24 relative">
            {/* Toast Notification */}
            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
                    }`}
            >
                <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${toastType === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    {toastType === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <p className="font-medium">{toastMessage}</p>
                    <button
                        onClick={() => setShowToast(false)}
                        className="ml-4 p-1 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="py-10 md:py-20 px-6 pb-20 md:pb-60 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                <div className="lg:w-1/2 relative">
                    <Image src="/starDust.svg" width={320} height={320} className="w-64 md:w-80 mb-8 mx-auto lg:mx-0" alt="" />
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
                    <h3 className="text-xl font-bold mb-8">Connect with us. We&apos;re waiting for your message</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <input
                                    {...register('firstName')}
                                    type="text"
                                    placeholder="First Name"
                                    className={`w-full p-4 rounded-2xl border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder-black transition-colors`}
                                />
                                {errors.firstName && <p className="text-xs text-red-500 ml-2">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-1">
                                <input
                                    {...register('lastName')}
                                    type="text"
                                    placeholder="Last Name"
                                    className={`w-full p-4 rounded-2xl border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder-black transition-colors`}
                                />
                                {errors.lastName && <p className="text-xs text-red-500 ml-2">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="E-mail"
                                className={`w-full p-4 rounded-2xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder-black transition-colors`}
                            />
                            {errors.email && <p className="text-xs text-red-500 ml-2">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <input
                                {...register('phoneNumber')}
                                type="tel"
                                placeholder="Phone Number"
                                className={`w-full p-4 rounded-2xl border-2 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder-black transition-colors`}
                            />
                            {errors.phoneNumber && <p className="text-xs text-red-500 ml-2">{errors.phoneNumber.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <input
                                {...register('subject')}
                                type="text"
                                placeholder="Subject"
                                className={`w-full p-4 rounded-2xl border-2 ${errors.subject ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder-black transition-colors`}
                            />
                            {errors.subject && <p className="text-xs text-red-500 ml-2">{errors.subject.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <textarea
                                {...register('message')}
                                placeholder="Your Message"
                                rows={4}
                                className={`w-full p-4 rounded-2xl border-2 ${errors.message ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 resize-none placeholder-black transition-colors`}
                            ></textarea>
                            {errors.message && <p className="text-xs text-red-500 ml-2">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-dark text-white py-4 rounded-full font-bold text-lg hover:bg-brand-blue transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
