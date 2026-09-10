import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';



export default function Home() {
    // Slideshow state
    const [currentSlide, setCurrentSlide] = useState(1) // Start at 1 (first real slide)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const [openFAQ, setOpenFAQ] = useState(null)

    const slides = [
        {
            title: "Advanced Data Analytics",
            subtitle: "Unlock Business Potential",
            description: "Leverage cutting-edge analytics tools and AI-powered insights to drive sustainable growth and efficiency.",
            image: '/images/slider-img-2.jpg',
            buttonText: "Explore Analytics"
        },
        {
            title: "Transforming Data Into Strategic Insights",
            subtitle: "Market Research Excellence",
            description: "We provide comprehensive market research and data analytics solutions to help businesses make informed decisions.",
            image: '/images/slider-img-1.jpg',
            buttonText: "Get Started Today"
        },

        {
            title: "Consumer Behavior Insights",
            subtitle: "Understand Your Market",
            description: "Deep dive into consumer preferences and behavior patterns through comprehensive surveys and focus groups.",
            image:  '/images/slider-img-3.jpg',
            buttonText: "Learn More"
        }
    ]

    // Create extended slides array for infinite loop
    const extendedSlides = [
        slides[slides.length - 1], // Last slide at the beginning
        ...slides,
        slides[0] // First slide at the end
    ]

    // Auto-advance slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    // Handle transitions
    useEffect(() => {
        if (currentSlide === 0) {
            // If at clone of last slide, jump to real last slide
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentSlide(slides.length)
                setTimeout(() => setIsTransitioning(true), 5000)
            }, 2000)
        } else if (currentSlide === slides.length + 1) {
            // If at clone of first slide, jump to real first slide
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentSlide(1)
                setTimeout(() => setIsTransitioning(true), 5000)
            }, 2000)
        }
    }, [currentSlide, slides.length])

    const nextSlide = () => {
        setCurrentSlide(prev => prev + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => prev - 1)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index + 1) // +1 because we have a clone at the beginning
    }

    // Get current slide index for indicators (0-based)
    const getIndicatorIndex = () => {
        if (currentSlide === 0) return slides.length - 1
        if (currentSlide === slides.length + 1) return 0
        return currentSlide - 1
    }

    return (
        <div className="bg-white">
            {/* Hero Slideshow Section */}
            <div className="relative h-screen overflow-hidden">
                <div
                    className={`flex h-full ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {extendedSlides.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-full relative"
                        >
                            {/* Background Image with controlled opacity */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-opacity duration-5000"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    opacity: 0.85  // Make background image more opaque (85%)
                                }}
                            />

                            {/* Gradient overlay for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-blue-900/40 to-transparent"></div>

                            {/* Content with animations */}
                            <div className="relative z-10 flex items-center justify-center h-full">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                    <div>
                                        <p className="text-yellow-300 text-xl md:text-xl font-medium mb-2 animate-[fadeIn_0.7s_ease-in]">
                                            {slide.subtitle}
                                        </p>
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-[fadeIn_0.9s_ease-in]">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed animate-[fadeIn_1.1s_ease-in]">
                                            {slide.description}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-[fadeIn_1.3s_ease-in]">
                                            <Link
                                                to="/contact"
                                                className="btn-gradient-enhanced"
                                            >
                                                {slide.buttonText}
                                            </Link>
                                            <Link
                                                to="/about"
                                                className="btn-glass"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:from-white/30 hover:to-white/20 transition-all duration-300 hover:scale-110 group"
                >
                    <svg className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-gradient-to-l from-white/20 to-white/10 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:from-white/30 hover:to-white/20 transition-all duration-300 hover:scale-110 group"
                >
                    <svg className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === getIndicatorIndex()
                                ? 'bg-white scale-125 shadow-lg'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Text Section */}
            <div className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                    <h2 className="text-2xl md:text-4xl font-bold uppercase text-gray-900 mb-12 text-center px-4 md:px-8 lg:px-16">
                        To understand how consumers really think and feel, it is vital to go beyond words.
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="flex-shrink-0">
                            <div className="bg-white p-8">
                                <div className="text-left">
                                    <div className="text-6xl font-bold text-yellow-500 mb-2 leading-none">10+YEARS</div>
                                    <div className="text-4xl font-bold text-violet-950 mb-1 uppercase tracking-wide">OF EXPERIENCE</div>

                                </div>
                            </div>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                                "It is not possible to make a realistic test of the effectiveness of a commercial in a laboratory situation in advance of real-life exposure. Until this simple but uncomfortable truth is grasped much advertising research will go on being sterile and unproductive…"
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Specialties Section */}
            <div className="py-20 bg-gradient-to-tr from-blue-800 to-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Qualitative Research */}
                        <div className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                Qualitative Research
                            </h3>
                        </div>

                        {/* Quantitative Research */}
                        <div className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-green-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 transition-colors duration-300">
                                <svg className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                Quantitative Research
                            </h3>
                        </div>

                        {/* Social Research */}
                        <div className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-purple-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                                <svg className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                                Social Research
                            </h3>
                        </div>

                        {/* Analytics */}
                        <div className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-orange-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                                <svg className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                                Analytics
                            </h3>
                        </div>

                        {/* Business Research */}
                        <div className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-red-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors duration-300">
                                <svg className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                                Business Research
                            </h3>
                        </div>

                        {/* Consulting */}
                        <div className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-teal-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-500 transition-colors duration-300">
                                <svg className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2m4 8H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                                Consulting
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who We Are Section */}
            <div className="relative py-12 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"

                />
                <div className="absolute inset-0 bg-white bg-opacity-85"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src= '/images/home-img-1.jpg'
                                    alt="Market Research Team"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <div className="mb-4">
                                <span className="text-yellow-500 font-semibold text-lg tracking-wide uppercase">About Us</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                WHO WE ARE
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p className="text-lg">
                                    <span className="font-semibold text-blue-600">Intact Market Research India Pvt. Ltd.</span> is founded in 2015 by renowned market research professionals in India. It's an independent market research agency offering high quality marketing research, analysis and consulting services across India.
                                </p>
                                <p>
                                    In a very short time span today Intact research is a leading market research services provider company in the region.
                                </p>
                                <p>
                                    Intact research works exclusively with companies looking for a personal guide through the varied cultures in India and helping them to connect with the local populace and delivering a unique perspective on the market situation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tagline Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Transform Data Into
                            <span className="text-yellow-400"> Strategic Success</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                            We turn market insights into business growth.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg text-blue-200">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                                Make Informed Decisions
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                                Understand Your Market
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                                Stay Ahead of Competition
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Services Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        {/* Left Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                OUR GREAT <span className="text-yellow-500">SERVICES</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p className="text-lg">
                                    <span className="italic">Intact research provides a comprehensive range of</span>{' '}
                                    <span className="font-semibold text-blue-600">Market Research Services</span>{' '}
                                    <span className="italic">and</span>{' '}
                                    <span className="font-semibold text-blue-600">Market Research Consulting Services</span>{' '}
                                    <span className="italic">reflecting our experience and strong capabilities.</span>
                                </p>
                                <p className="text-gray-600">
                                    Market Research Services is the process of systematic gathering, recording and analyzing of data about customers, competitors and the market. Market Research Services by Intact research provides the best possible platform for strategic decision making and business growth.
                                </p>
                            </div>
                        </div>

                        {/* Right Images */}
                        <div className="flex gap-6 justify-center">
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src= '/images/home-img-2.jpg'
                                    alt="Business Meeting"
                                    className="w-56 h-80 object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src= '/images/home-img-2.jpg'
                                    alt="Team Collaboration"
                                    className="w-56 h-80 object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Icons Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {/* Qualitative Research */}
                        <Link to="/services" className="text-center group cursor-pointer">
                            <div className="relative w-28 h-28 mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                                {/* Percentage progress circle */}
                                <svg className="w-full h-full transform rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="text-yellow-400 transition-all duration-500 group-hover:text-yellow-500"
                                        strokeDasharray="85, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{
                                            transition: 'stroke-dasharray 0.5s ease-in-out',
                                        }}
                                    />
                                </svg>
                                {/* Inner white circle with better icon */}
                                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-yellow-50">
                                    <svg className="w-9 h-9 text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9m-9-4h9m-9-4h9m-9-4h9M4 16l2 2 4-4M4 8l2 2 4-4" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-yellow-600 transition-colors duration-300">
                                QUALITATIVE<br />RESEARCH
                            </h3>
                        </Link>

                        {/* Quantitative Research */}
                        <Link to="/services" className="text-center group cursor-pointer">
                            <div className="relative w-28 h-28 mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                                <svg className="w-full h-full transform rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="text-yellow-400 transition-all duration-500 group-hover:text-yellow-500"
                                        strokeDasharray="92, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-yellow-50">
                                    <svg className="w-9 h-9 text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-yellow-600 transition-colors duration-300">
                                QUANTITATIVE<br />RESEARCH
                            </h3>
                        </Link>

                        {/* Social Research */}
                        <Link to="/services" className="text-center group cursor-pointer">
                            <div className="relative w-28 h-28 mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                                <svg className="w-full h-full transform rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="text-yellow-400 transition-all duration-500 group-hover:text-yellow-500"
                                        strokeDasharray="78, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-yellow-50">
                                    <svg className="w-9 h-9 text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-yellow-600 transition-colors duration-300">
                                SOCIAL RESEARCH
                            </h3>
                        </Link>

                        {/* Analytics */}
                        <Link to="/services" className="text-center group cursor-pointer">
                            <div className="relative w-28 h-28 mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                                <svg className="w-full h-full transform rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="text-yellow-400 transition-all duration-500 group-hover:text-yellow-500"
                                        strokeDasharray="88, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-yellow-50">
                                    <svg className="w-9 h-9 text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-yellow-600 transition-colors duration-300">
                                ANALYTICS
                            </h3>
                        </Link>

                        {/* Business Research */}
                        <Link to="/services" className="text-center group cursor-pointer">
                            <div className="relative w-28 h-28 mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                                <svg className="w-full h-full transform rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="text-yellow-400 transition-all duration-500 group-hover:text-yellow-500"
                                        strokeDasharray="82, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-yellow-50">
                                    <svg className="w-9 h-9 text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-yellow-600 transition-colors duration-300">
                                BUSINESS RESEARCH
                            </h3>
                        </Link>

                        {/* Consulting */}
                        <Link to="/services" className="text-center group cursor-pointer">
                            <div className="relative w-28 h-28 mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                                <svg className="w-full h-full transform rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="text-yellow-400 transition-all duration-500 group-hover:text-yellow-500"
                                        strokeDasharray="90, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-yellow-50">
                                    <svg className="w-9 h-9 text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-yellow-600 transition-colors duration-300">
                                CONSULTING
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>

            {/* FAQ and Contact Section */}
            <div className="py-20 bg-gradient-to-tr from-gray-300 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* FAQ Section - Left */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="mb-8">
                                <span className="text-yellow-500 font-semibold text-lg tracking-wide uppercase">Support</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                                    Frequently Asked <span className="text-blue-600">Questions</span>
                                </h2>
                                <p className="text-gray-600">
                                    Intact researches help companies make better business decisions.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* FAQ Item 1 */}
                                <div className="group border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300">
                                    <button
                                        onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                                        className="w-full px-6 py-4 text-left bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:bg-blue-50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                                Why we need to analyze market for business?

                                            </h3>
                                            <svg
                                                className={`w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-all duration-300 ${openFAQ === 1 ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    {openFAQ === 1 && (
                                        <div className="px-6 py-4 bg-white border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">
                                                Understanding how your market works and what customers want is vital. Industry analysis and market research can identify where to focus your efforts.


                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="group border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300">
                                    <button
                                        onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                                        className="w-full px-6 py-4 text-left bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:bg-blue-50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                                What are the benefits of hiring a Market Research Agency?

                                            </h3>
                                            <svg
                                                className={`w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-all duration-300 ${openFAQ === 2 ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    {openFAQ === 2 && (
                                        <div className="px-6 py-4 bg-white border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">
                                                Market research Agency can give you insight into your market, your competitors, your products, your marketing and your customers which will help you in getting one step forward in the market than your competitors.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="group border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300">
                                    <button
                                        onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                                        className="w-full px-6 py-4 text-left bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:bg-blue-50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                                How can Market Research help in product establishment?
                                            </h3>
                                            <svg
                                                className={`w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-all duration-300 ${openFAQ === 3 ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    {openFAQ === 3 && (
                                        <div className="px-6 py-4 bg-white border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">
                                                Product research lets you understand what customers want, allowing you to tailor your product to meet the customer’s needs and give you a competitive edge in the market.


                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Section - Right */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
                            <div className="mb-8">
                                <span className="text-yellow-400 font-semibold text-lg tracking-wide uppercase">Get In Touch</span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                                    Ready to Start Your <span className="text-yellow-400">Research Project?</span>
                                </h2>
                                <p className="text-blue-100 leading-relaxed mb-8">
                                    Let's discuss your market research needs and how we can help you make data-driven decisions.
                                </p>

                                {/* Contact Us Button */}
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center w-full justify-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-8"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Contact Us Now
                                </Link>
                            </div>

                            {/* Why Choose Us */}
                            <div className="mt-8 pt-8 border-t border-blue-500">
                                <h3 className="text-xl font-bold text-white mb-4">Why Choose Intact Research?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        <span className="text-blue-100">10+ Years of Experience</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        <span className="text-blue-100">Expert Research Team</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        <span className="text-blue-100">Customized Solutions</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        <span className="text-blue-100">Fast Turnaround Time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}