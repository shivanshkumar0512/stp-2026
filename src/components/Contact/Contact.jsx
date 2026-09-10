import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = 'service_qeasp3d';
    const TEMPLATE_ID = 'template_hcwflwp';
    const PUBLIC_KEY = 'MQ_LyIhGJwwOIe8z1';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            company: formData.company || 'Not provided',
            subject: formData.subject,
            message: formData.message,
            to_name: 'IMR Team'
        };

        try {
            const result = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            console.log('Email sent successfully:', result);
            setSubmitStatus('success');

            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: ''
            });

            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);

        } catch (error) {
            console.error('Email sending failed:', error);
            setSubmitStatus('error');

            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24 overflow-hidden">
                {/* Enhanced Background Patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%)
            `,
                        backgroundSize: '50px 50px, 50px 50px, 30px 30px'
                    }}></div>
                </div>

                {/* Floating Service Icons & Symbols */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Analytics Chart Symbol - Top Left */}
                    <div className="absolute top-12 left-8 opacity-15">
                        <svg width="50" height="35" viewBox="0 0 50 35" className="text-white">
                            <path d="M8,30 L16,20 L24,25 L32,12 L42,16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="8" cy="30" r="2" fill="currentColor" />
                            <circle cx="16" cy="20" r="2" fill="currentColor" />
                            <circle cx="24" cy="25" r="2" fill="currentColor" />
                            <circle cx="32" cy="12" r="2" fill="currentColor" />
                            <circle cx="42" cy="16" r="2" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Pie Chart - Top Right */}
                    <div className="absolute top-16 right-12 opacity-12">
                        <div className="w-12 h-12 relative">
                            <div className="absolute inset-0 rounded-full" style={{
                                background: `conic-gradient(white 0deg 120deg, transparent 120deg 240deg, rgba(255,255,255,0.5) 240deg 360deg)`,
                                clipPath: 'circle(50%)'
                            }}></div>
                        </div>
                    </div>

                    {/* Bar Chart - Left Upper */}
                    <div className="absolute top-32 left-20 opacity-15">
                        <div className="flex items-end space-x-1">
                            <div className="w-3 h-8 bg-white rounded-t"></div>
                            <div className="w-3 h-12 bg-white rounded-t"></div>
                            <div className="w-3 h-6 bg-white rounded-t"></div>
                            <div className="w-3 h-10 bg-white rounded-t"></div>
                            <div className="w-3 h-7 bg-white rounded-t"></div>
                        </div>
                    </div>

                    {/* Target/Focus Symbol - Right Upper */}
                    <div className="absolute top-28 right-24 opacity-12">
                        <div className="w-16 h-16 relative">
                            <div className="absolute inset-0 border-2 border-white rounded-full"></div>
                            <div className="absolute inset-2 border border-white rounded-full"></div>
                            <div className="absolute inset-5 bg-white rounded-full"></div>
                        </div>
                    </div>

                    {/* Data Points Network - Bottom Left */}
                    <div className="absolute bottom-20 left-16 opacity-12">
                        <svg width="60" height="45" viewBox="0 0 60 45" className="text-white">
                            <path d="M8,40 L20,15 L35,30 L50,8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
                            <path d="M20,15 L35,8 L50,22" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
                            <circle cx="8" cy="40" r="3" fill="currentColor" />
                            <circle cx="20" cy="15" r="3" fill="currentColor" />
                            <circle cx="35" cy="30" r="3" fill="currentColor" />
                            <circle cx="50" cy="8" r="3" fill="currentColor" />
                            <circle cx="35" cy="8" r="3" fill="currentColor" />
                            <circle cx="50" cy="22" r="3" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Research Magnifying Glass - Bottom Right */}
                    <div className="absolute bottom-24 right-16 opacity-12">
                        <svg width="40" height="40" viewBox="0 0 40 40" className="text-white">
                            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M26 26 L36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Geometric Shapes - Scattered */}
                    <div className="absolute top-20 left-1/2 opacity-8">
                        <div className="w-6 h-6 bg-white transform rotate-45"></div>
                    </div>

                    <div className="absolute bottom-32 right-1/3 opacity-8">
                        <div className="w-5 h-5 bg-white" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                    </div>

                    {/* Data Visualization Grid - Center Right */}
                    <div className="absolute top-48 right-8 opacity-10">
                        <div className="grid grid-cols-3 gap-1">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
                            ))}
                        </div>
                    </div>

                    {/* Survey/Form Symbol - Center Left */}
                    <div className="absolute bottom-48 left-8 opacity-12">
                        <svg width="32" height="40" viewBox="0 0 32 40" className="text-white">
                            <rect x="4" y="4" width="24" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" rx="2" />
                            <line x1="8" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="8" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="8" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="26" cy="10" r="1.5" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Percentage Symbol - Upper Center */}
                    <div className="absolute top-36 left-1/3 opacity-15">
                        <div className="text-white text-3xl font-bold">%</div>
                    </div>

                    {/* Plus Symbol - Lower Center */}
                    <div className="absolute bottom-36 right-1/4 opacity-12">
                        <div className="text-white text-2xl font-bold">+</div>
                    </div>

                    {/* Hexagonal Pattern - Far Right */}
                    <div className="absolute top-44 right-4 opacity-8">
                        <svg width="45" height="45" viewBox="0 0 45 45" className="text-white">
                            <polygon points="22.5,4 35,11 35,25 22.5,32 10,25 10,11" stroke="currentColor" strokeWidth="1.5" fill="none" />
                            <polygon points="22.5,12 28,15 28,21 22.5,24 17,21 17,15" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                    </div>

                    {/* Additional Scattered Elements */}
                    <div className="absolute top-52 left-1/4 opacity-10">
                        <svg width="30" height="30" viewBox="0 0 30 30" className="text-white">
                            <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                            <circle cx="15" cy="15" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
                            <circle cx="15" cy="15" r="2" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="absolute bottom-12 left-1/3 opacity-8">
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="absolute top-60 right-1/2 opacity-8">
                        <svg width="25" height="25" viewBox="0 0 25 25" className="text-white">
                            <rect x="2" y="2" width="21" height="21" stroke="currentColor" strokeWidth="1" fill="none" rx="3" />
                            <line x1="8" y1="12.5" x2="17" y2="12.5" stroke="currentColor" strokeWidth="1" />
                            <line x1="12.5" y1="8" x2="12.5" y2="17" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Contact <span className="text-blue-200"> Us </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                        Connect with our research experts and transform your business insights today
                    </p>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="py-24 bg-gray-50 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '60px 60px'
                        }}
                    ></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            Let's Start a Conversation
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Get In{' '}
                            <span className="text-blue-600">
                                Touch
                            </span>
                        </h2>
                        <div className="w-32 h-1 bg-blue-600 mx-auto mb-8"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Ready to unlock powerful market insights? Our research experts are here to help you make data-driven decisions that drive success.
                        </p>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="mb-10 p-8 bg-green-50 border border-green-200 rounded-2xl shadow-lg animate-slide-in">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                                    <p className="text-green-700 leading-relaxed">
                                        Thank you for reaching out to us. Our team will review your message and get back to you within 24 hours with a comprehensive response.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-10 p-8 bg-red-50 border border-red-200 rounded-2xl shadow-lg animate-slide-in">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-xl font-bold text-red-800 mb-2">Message Failed to Send</h3>
                                    <p className="text-red-700 leading-relaxed">
                                        We apologize for the inconvenience. Please try again or contact us directly at{' '}
                                        <a href="mailto:info@intactresearch.com" className="font-semibold underline text-blue-600">
                                            info@intactresearch.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-10 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Form Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Name Field */}
                                    <div className="group">
                                        <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                                                placeholder="Enter your full name"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="group">
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                                                placeholder="your.email@company.com"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="group">
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Field */}
                                    <div className="group">
                                        <label htmlFor="company" className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                                            Company
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                                                placeholder="Your company name"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div className="group">
                                    <label htmlFor="subject" className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                                        Subject *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                                            placeholder="What research services do you need?"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="group">
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300 resize-none"
                                            placeholder="Tell us about your research needs, target market, timeline, and any specific requirements. The more details you provide, the better we can assist you."
                                        />
                                        <div className="absolute top-4 right-0 pr-6 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="text-center pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`group relative inline-flex items-center px-12 py-5 border border-transparent text-lg font-bold rounded-2xl text-white shadow-xl overflow-hidden ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transform hover:scale-105 active:scale-95'
                                            } transition-all duration-300`}
                                    >
                                        {/* Button Content */}
                                        <div className="relative flex items-center">
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending Your Message...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg className="ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                    </svg>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-24 relative overflow-hidden">
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `
                    radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
                    linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%)
                `,
                            backgroundSize: '50px 50px, 50px 50px, 30px 30px'
                        }}></div>
                    </div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 opacity-10">
                        <svg width="40" height="40" viewBox="0 0 40 40" className="text-white">
                            <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M12 20 L18 26 L28 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="absolute bottom-32 left-16 opacity-8">
                        <svg width="35" height="35" viewBox="0 0 35 35" className="text-white">
                            <rect x="5" y="5" width="25" height="25" stroke="currentColor" strokeWidth="1.5" fill="none" rx="3" />
                            <line x1="10" y1="15" x2="25" y2="15" stroke="currentColor" strokeWidth="1" />
                            <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1" />
                            <line x1="10" y1="25" x2="25" y2="25" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                    <div className="absolute top-1/3 left-1/4 opacity-12">
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-1/4 right-1/3 opacity-10">
                        <div className="w-6 h-6 bg-white/15 transform rotate-45"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold mb-6 backdrop-blur-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Multiple Ways to Connect
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Other Ways to{' '}
                            <span className="text-blue-200">
                                Reach Us
                            </span>
                        </h2>
                        <div className="w-32 h-1 bg-blue-300 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                            Choose the communication method that works best for you and your timeline
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Email Card */}
                        <div className="group bg-blue-800/50 border border-blue-600/30 rounded-3xl p-10 text-center hover:bg-blue-700/60 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm hover:border-blue-400/50">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Email Us</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                For detailed inquiries and comprehensive project discussions
                            </p>
                            <a
                                href="mailto:harish.arya@intactresearch.org"
                                className="inline-flex items-center text-blue-200 hover:text-blue-100 font-semibold text-lg group-hover:underline transition-colors"
                            >
                                harish.arya@intactresearch.org
                                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div className="group bg-blue-800/50 border border-blue-600/30 rounded-3xl p-10 text-center hover:bg-blue-700/60 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm hover:border-blue-400/50">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Call Us</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Speak directly with our research consultants<br />
                                <span className="text-sm text-blue-200">Monday - Friday, 9 AM - 6 PM EST</span>
                            </p>
                            <a
                                href="tel:+919871155332"
                                className="inline-flex items-center text-green-300 hover:text-green-200 font-semibold text-lg group-hover:underline transition-colors"
                            >
                                +91-9871155332
                                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Office Card */}
                        <div className="group bg-blue-800/50 border border-blue-600/30 rounded-3xl p-10 text-center hover:bg-blue-700/60 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm hover:border-blue-400/50">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Visit Our Office</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Schedule an in-person consultation at our branch
                            </p>
                            <div className="text-blue-200 font-semibold text-lg leading-relaxed">
                                3rd Floor, D-2, Railway Road Samaipur,<br />
                                Yadav Nagar, New Delhi,<br />
                                North Delhi, Delhi, 110042
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-20">
                        <p className="text-blue-100 text-xl mb-8 leading-relaxed font-bold tracking-wide">
                            Not sure which option is best for you? Start with our contact form above, and we'll get back to you within 24 hours.
                        </p>
                        
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in {
                    0% {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }

                .animate-slide-in {
                    animation: slide-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}
