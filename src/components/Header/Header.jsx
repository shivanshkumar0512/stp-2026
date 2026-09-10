import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/images/IMRI_logo.jpg"
                            alt="IMRI Logo"
                            className='h-10 w-auto mr-3'
                        />
                        <div className="text-2xl font-bold text-blue-900">
                            Intact Market Research India Pvt. Ltd.
                        </div>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors duration-200 ${
                                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors duration-200 ${
                                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors duration-200 ${
                                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors duration-200 ${
                                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <Link
                            to="/contact"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <NavLink
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${
                                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${
                                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                    }`
                                }
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                to="/services"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${
                                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                    }`
                                }
                            >
                                Services
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${
                                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                                    }`
                                }
                            >
                                Contact
                            </NavLink>
                            <Link
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                            >
                                Get Quote
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}