'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryProps {
    courseName: string;
    price: number;
    batch: string;
}

export default function OrderSummary({ courseName, price, batch }: SummaryProps) {
    return (
        <div className='mx-auto p-8'>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                <Card className="border-none shadow-2xl overflow-hidden rounded-[32px] bg-white">
                    {/* Header */}
                    <div className="bg-[#0A3D62] p-5 md:p-6 text-white text-center">
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em]">Order Summary</p>
                    </div>

                    <CardContent className="p-6 md:p-8 space-y-6">
                        {/* Course Details Row */}
                        <div className="flex justify-between items-start gap-4 border-b border-gray-50 pb-6">
                            <div className="space-y-1">
                                <h3 className="font-bold text-[#0A3D62] text-lg leading-tight">{courseName}</h3>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-md w-fit">
                                    <Clock className="w-3.5 h-3.5 text-[#1E90FF]" />
                                    <span className="text-xs font-semibold text-[#1E90FF] capitalize">{batch} Batch</span>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-[#0A3D62] whitespace-nowrap">₹{price}</span>
                        </div>

                        {/* Pricing Table */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">₹{price}.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax / Processing</span>
                                <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-0.5 rounded">Free</span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                <span className="font-bold text-[#0A3D62]">Grand Total</span>
                                <div className="text-right">
                                    <span className="block font-black text-3xl text-[#1E90FF]">₹{price}</span>
                                    <span className="text-[10px] text-gray-400 font-medium italic">Inclusive of all taxes</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <Button
                            className="w-full bg-[#1B262C] hover:bg-gray-500 h-14 md:h-16 rounded-full text-sm font-bold transition-all duration-300 shadow-xl active:scale-95"
                            onClick={() => {/* Trigger Razorpay */ }}
                        >
                            <CreditCard className="w-5 h-5 mr-3" />
                            Proceed to Payment
                        </Button>

                        {/* Trust Footer */}
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-[11px] font-medium uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            Verified & Secure Checkout
                        </div>
                    </CardContent>
                </Card>

                {/* Trust Badge - More compact on mobile */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl border-l-4 border-[#1E90FF] flex items-center gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1E90FF]">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className="text-xs md:text-sm text-blue-900 font-semibold italic">
                        Join 5,000+ students already mastering automation.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}