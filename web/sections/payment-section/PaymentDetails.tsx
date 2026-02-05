'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DetailsProps {
    setCourseKey: (val: string) => void;
    setBatch: (val: string) => void;
    currentCourse: string;
    currentBatch: string;
}

export default function PaymentDetails({ setCourseKey, setBatch, currentCourse, currentBatch }: DetailsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-10"
        >
            {/* Personal Details Section */}
            <section className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-300">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-300">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#1E90FF]">
                        <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-[#0A3D62]">Personal Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                        <Input id="name" placeholder="John Doe" className="h-12 rounded-xl focus:ring-[#1E90FF]" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                        <Input id="phone" placeholder="+91 00000 00000" className="h-12 rounded-xl" />
                    </div>
                </div>
            </section>

            {/* Course Preferences Section */}
            <section className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-300">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-50">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#1E90FF]">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-[#0A3D62]">Course Preferences</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Select Course</Label>
                        <Select value={currentCourse} onValueChange={setCourseKey}>
                            <SelectTrigger className="h-12 rounded-xl bg-white">
                                <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="playwright">Playwright + GenAI</SelectItem>
                                <SelectItem value="selenium">Advanced Selenium</SelectItem>
                                <SelectItem value="devops">DevOps for QA</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Batch Type</Label>
                        <Select value={currentBatch} onValueChange={setBatch}>
                            <SelectTrigger className="h-12 rounded-xl bg-white">
                                <SelectValue placeholder="Select Batch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="weekday">Weekday (Mon-Fri)</SelectItem>
                                <SelectItem value="weekend">Weekend (Sat-Sun)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                        <Label htmlFor="comments" className="text-sm font-semibold text-gray-700">Additional Comments</Label>
                        <textarea
                            id="comments"
                            className="w-full min-h-[120px] rounded-xl border border-input px-3 py-3 text-sm focus:ring-2 focus:ring-[#1E90FF] outline-none transition-all"
                            placeholder="Tell us about your goals..."
                        />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}