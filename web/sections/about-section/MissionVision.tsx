'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MissionVision = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Our Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-50 p-10 rounded-3xl shadow-sm border-l-4 border-[#1E90FF]"
                    >
                        <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We are a passionate team of Quality Assurance engineers with extensive expertise in QA methodologies and automation testing. With over a decade of experience, we bring enthusiasm, precision, and innovation to every project we undertake. Simply put—we love what we do. Our experience has given us deep insights into the unique challenges clients face. From delivering cutting-edge testing services to offering world-class training, we are dedicated to transforming how businesses achieve quality and efficiency through automation.
                        </p>
                    </motion.div>

                    {/* Our Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-blue-50 p-10 rounded-3xl shadow-sm border-l-4 border-[#1E90FF]"
                    >
                        <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To redefine excellence in QA and automation by offering transparent, high-quality services tailored to client needs. We aim to deliver results within committed timelines and at the most cost-effective rates by leveraging state-of-the-art tools and technologies.
                            <br></br>
                            At THE AUTO-MATE, we don’t just provide solutions—we build partnerships for success.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
