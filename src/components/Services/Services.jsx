import React from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Qualitative Research",
      description: "In-depth qualitative research including focus groups, interviews, and ethnographic studies to understand consumer behavior and motivations.",
      features: ["Focus Groups", "In-depth Interviews", "Ethnographic Studies", "Online Communities"],
      icon: "🎯"
    },
    {
      id: 2,
      title: "Quantitative Research",
      description: "Statistical research methods including surveys, polls, and data analysis to provide measurable insights and trends.",
      features: ["Online Surveys", "Telephone Interviews", "Face-to-face Surveys", "Statistical Analysis"],
      icon: "📊"
    },
    {
      id: 3,
      title: "Social Research",
      description: "Research focused on social issues, community studies, and public opinion to understand societal trends and behaviors.",
      features: ["Community Studies", "Public Opinion Polls", "Social Impact Assessment", "Demographic Analysis"],
      icon: "👥"
    },
    {
      id: 4,
      title: "Analytics",
      description: "Advanced data analytics and business intelligence solutions to transform raw data into actionable insights.",
      features: ["Data Mining", "Predictive Analytics", "Business Intelligence", "Custom Dashboards"],
      icon: "📈"
    },
    {
      id: 5,
      title: "Business Research",
      description: "Comprehensive business research including market analysis, competitive intelligence, and strategic planning support.",
      features: ["Market Analysis", "Competitive Intelligence", "Industry Reports", "Strategic Planning"],
      icon: "💼"
    },
    {
      id: 6,
      title: "Consulting",
      description: "Expert consulting services to help businesses make informed decisions based on research findings and market insights.",
      features: ["Strategic Consulting", "Market Entry Strategy", "Brand Positioning", "Customer Journey Mapping"],
      icon: "💡"
    }
  ];

  return (
    <div className="bg-white">
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
            Our <span className="text-blue-200">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
            Comprehensive market research solutions tailored to your business needs
          </p>
        </div>
      </div>

      {/* Service Information Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Market Research Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-10"></div>
            <div className="max-4xl  space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                Market Research Services is the process of systematic gathering, recording and analyzing of data about customers, competitors and the market. Market Research Services by Intact research provides the best possible platform to create a business plan, launch a new product or service, fine tune existing products and services, expand into new markets etc.
              </p>
              <p>
                Intact researches help companies make better business decisions by it Market Research Services reports, about the development and marketing of new products. Intact research represents the true voice of the consumer in a company. We specialize in hard-to-find information. We go beyond the obvious, providing you with forecasts & insights from veteran marketing pros. and we do all our Market Research Services with unmatched speed.
              </p>
              <p>
                Intact research provides a comprehensive range of Market Research Services and Market Research Consulting Services reflecting our experience and strong capabilities.
              </p>
            </div>
          </div>

          {/* Service Categories */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Services Offered</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Column 1 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Advertising Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Automotive Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Channel and Retail Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Industrial Research</span>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Social Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Rural Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Tele Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Consumer Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Census and Mapping</span>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Qualitative Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Quantitative Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Research Support Services</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Online Panel across 65+ countries</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">International Fieldwork</span>
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Market Entry Studies</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Brand Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Digital Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Healthcare Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Financial Services Research</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Services */}
          <div className="bg-gray-50 rounded-xl p-6 lg:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">The services offered under this category include:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Focus Group Discussions</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">One To One Interviews</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Ethnography Service</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Automobile Reviews</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Product Test Service</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Product Placements</span>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Product Segmentation Test</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Ad Test Survey</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Personal Interviews</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Self Compile Interview</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Web Based Survey</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Media Test Services</span>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Shopping Research Services</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Telephonic Interviews</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">CATI Services</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Customer Satisfaction Survey</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Retail Audit and Interview</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Mystery Audit</span>
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Online Surveys</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Mobile Research</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Data Analytics</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Panel Management</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Report Writing</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Consultation Services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="text-4xl mb-4 text-center">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      Get Quote
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Research Service Section (matched margins, larger text) */}
      <div className="relative py-28 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none">
          <div className="absolute -top-40 -left-32 w-[28rem] h-[28rem] bg-blue-600/25 blur-3xl rounded-full"></div>
          <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] bg-indigo-700/25 blur-3xl rounded-full"></div>
        </div>
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)",
              backgroundSize: "40px 40px"
            }} />
        </div>

        {/* UPDATED: Matched margins with service grid section */}
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white drop-shadow-sm">
              Advanced Traffic Research
            </h2>
            <div className="mt-6 flex justify-center">
              <span className="h-1.5 w-40 rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"></span>
            </div>
            <p className="mt-8 text-xl md:text-2xl leading-relaxed text-blue-100/90 font-light max-w-4xl mx-auto">
              Actionable mobility intelligence using AI video analytics, sensor fusion and geo‑referenced audits—optimizing networks, safety and investment decisions.
            </p>
          </div>

          {/* Content section */}
          <div>
            <p className="text-blue-100/90 leading-relaxed text-lg md:text-xl font-light mb-12 max-w-5xl mx-auto">
              Our Traffic Research suite transforms raw movement into strategic evidence. Below are core study domains delivering both baseline and high‑resolution insight for planners, consultants and infrastructure stakeholders.
            </p>

            {/* Domains Panel with larger text and professional styling */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-500/20 to-indigo-500/30 backdrop-blur-xl border border-white/20"></div>
              <div className="relative p-8 md:p-12 lg:p-16">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-10 flex items-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 mr-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13a4 4 0 014-4h11a3 3 0 013 3v0a3 3 0 01-3 3h-3l-4 4v-4H7a4 4 0 01-4-4z" />
                    </svg>
                  </span>
                  Core Study Domains
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[
                    { title: "Classified Traffic Volume Counts (T.V.C.)", desc: "Multi‑class vehicle counts (peak/off‑peak) feeding capacity, emission & investment models." },
                    { title: "VVD Survey (24 Hours)", desc: "Continuous volume–speed–direction capture delivering diurnal flow & saturation profiles." },
                    { title: "Origin Destination (O.D.) Surveys", desc: "Trip matrices revealing corridor dependence, diversion & demand redistribution." },
                    { title: "Intersection Count", desc: "Turning movement analytics to recalibrate signal timing & mitigate conflicts." },
                    { title: "Speed & Delay Studies", desc: "Running speed, control delay & bottleneck diagnostics for LOS reliability." },
                    { title: "Willingness To Pay Analysis", desc: "User valuation inputs for tolling, parking & premium mobility schemes." },
                    { title: "Road Network Inventory", desc: "Asset & geometry catalog enabling compliance, maintenance & upgrade plans." },
                    { title: "Parking Behavior Study", desc: "Analysis of parking patterns, occupancy rates & turnover to optimize facilities." },
                    { title: "Pedestrian & Bicycle Counts", desc: "Dedicated counts for non-motorized users to inform multimodal planning." }
                  ].map(card => (
                    <li key={card.title} className="group relative p-8 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition shadow-lg hover:shadow-xl">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1.5 w-4 h-4 rounded-sm bg-gradient-to-br from-cyan-400 to-blue-500 shadow-inner shadow-cyan-400/30 group-hover:scale-110 transition-transform"></div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-blue-50 group-hover:text-white leading-tight mb-2">
                            {card.title}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-blue-100/80">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Professional stats display + CTA */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                  <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
                    {[
                      { k: "99.2%", l: "Data Accuracy" },
                      { k: "24H", l: "Continuous VVD" },
                      { k: "65+", l: "City Projects" }
                    ].map(m => (
                      <div key={m.k} className="text-center rounded-xl bg-white/10 border border-white/15 py-6 px-3 shadow-lg">
                        <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{m.k}</div>
                        <div className="text-xs md:text-sm uppercase tracking-wide text-blue-100/80 font-semibold mt-1">{m.l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="md:ml-auto">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white text-lg font-semibold tracking-wide shadow-lg shadow-blue-900/40 hover:shadow-blue-800/60 hover:from-blue-600 hover:via-indigo-600 hover:to-indigo-700 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Request Detailed Proposal
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image gallery with professional overlay */}
        <div className="mt-16">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                src: "/images/services-img-1.jpg",
                cap: "Macro flow capture & classification"
              },
              {
                src: "/images/services-img-2.jpg",
                cap: "Analyst KPI dashboard"
              },
              {
                src: "/images/services-img-3.jpg",
                cap: "Intersection AI sensing"
              }
            ].map(img => (
              <figure key={img.cap} className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl group cursor-pointer">
                <img src={img.src} alt={img.cap} className="w-full h-64 object-cover transition duration-500 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <p className="text-sm md:text-base font-medium text-white">{img.cap}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Our Services */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our <span className="text-blue-600">Services?</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-gray-600">Our experienced researchers and analysts bring deep industry knowledge to every project.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Customized Solutions</h3>
                    <p className="text-gray-600">Every project is tailored to meet your specific business objectives and requirements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Delivery</h3>
                    <p className="text-gray-600">We understand the importance of deadlines and deliver high-quality results on time.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/home-img-1.jpg"
                alt="Research Team"
                className="rounded-xl shadow-lg "
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your research needs and get a customized quote
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105 shadow-lg"
          >
            Contact Us Today
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}