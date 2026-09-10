import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                     radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-6 group">
                            <div className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                Intact Research
                            </div>
                        </Link>
                        <p className="text-gray-300 text-base leading-7 mb-8 font-light">
                            Leading market research and data analytics company providing comprehensive
                            insights to drive business growth and informed decision-making across industries.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-6">
                            <a href="#" className="group">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-800 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Contact & Address */}
                    <div className="space-y-8">
                        {/* Address */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Our Location
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed pl-8">
                                3rd Floor, D-2, Railway Road Samaipur,<br />
                                Yadav Nagar, New Delhi,<br />
                                North Delhi, Delhi, 110042
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact Information
                            </h4>
                            <div className="space-y-3 pl-8">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:harish.arya@intactresearch.org" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                        harish.arya@intactresearch.org
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">+91-9871155332</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">+91-9999988532</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Certificate */}
                    <div className="space-y-8">
                        {/* Navigation */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Quick Links
                            </h4>
                            <ul className="space-y-3 pl-8">
                                <li>
                                    <Link to="/" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 hover:pl-2">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 hover:pl-2">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 hover:pl-2">
                                        Our Services
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 hover:pl-2">
                                        Contact
                                    </Link>
                                </li>       
                            </ul>
                        </div>

                        {/* Certificate */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Certification
                            </h4>
                            <div className="pl-8">
                                <a  
                                href='/certificate.pdf'
                                target="-blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    </svg>
                                    View Certificate
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-light">
                            © 2025 INTACT MARKET RESEARCH INDIA PVT. LTD. - All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}