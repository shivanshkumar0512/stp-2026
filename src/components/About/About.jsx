import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const tabData = [
        {
            title: "Intact Vision & Profile",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            To establish long-lasting business association with our customers and providing them with market research, data collection & data analysis solutions through an open and transparent relationship aimed at achieving common goals.
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-700 text-sm mb-2">
                            <span className="text-orange-600">Mr. Kailash Arya - (Director, field-operations in charge)</span> <span className="text-blue-600">Mr. Jasbir Singh - (Director, heading corporate affairs & development for Intact)</span> <span className="font-medium">Industry Experience:</span>
                        </p>

                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                            <li>He has worked for HLL & IMRB as a senior operations executive</li>
                            <li>He has 12 years of experience in the field of Market Research.</li>
                            <li>He has worked for HLL, AC Nelson & TNS as senior operations executive.</li>
                            <li>He has effectively contributed in about 50 projects/assignments over this period for different organizations including Delhi-based NGO.</li>
                            <li>He is having immense experience in GIS & GPS mapping.</li>
                            <li>He has worked on several projects on geospatial related research studies.</li>
                            <li>He has 15 years operations experience in market research industry.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify text-sm">
                            Backed with 107 skilled personnel, INTACT MARKET RESEARCH INDIA Private Limited is a specialized service provider of channel and retail research. In addition, we are also in the ambit of Qualitative Research, Quantitative Research Consumer Research, Census and Mapping, and other services. We are providing professional Retail Channel Research Services for retailers and manufacturers, on-site as well as in-field. We aim to understand the key trends and challenges concerning the retail chains, along with the impact of various products on retailing, while offering channel and retail services. Further, we also try to identify various strategies that will address the new challenges.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="py-2 pr-4 font-medium text-gray-900 w-1/3">Year of Establishment</td>
                                    <td className="py-2 px-2 text-center">:</td>
                                    <td className="py-2 pl-4 text-gray-700">2015</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="py-2 pr-4 font-medium text-gray-900">Legal Status of Firm</td>
                                    <td className="py-2 px-2 text-center">:</td>
                                    <td className="py-2 pl-4 text-gray-700">Private Limited Company</td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 font-medium text-gray-900">Nature of Business</td>
                                    <td className="py-2 px-2 text-center">:</td>
                                    <td className="py-2 pl-4 text-gray-700">Service Provider</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="py-2 pr-4 font-medium text-gray-900">Number of Employees</td>
                                    <td className="py-2 px-2 text-center">:</td>
                                    <td className="py-2 pl-4 text-gray-700">51 to 100 People</td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 font-medium text-gray-900">Turnover</td>
                                    <td className="py-2 px-2 text-center">:</td>
                                    <td className="py-2 pl-4 text-gray-700">Rs. 5 - 10 Crore</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            title: "Why Us",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Our company is committed towards delivering its clients with high quality research based services that helps us in meeting the specific business demands of our clients successfully. Our services are also offered at a competitive price range that has helped us to retain our present patrons as well as make new clients in the global market.
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Today, we are successfully meeting the specific business demands of our clients thanks to our consistent approach towards delivering high quality research based services in the market. The prices of our services are so competitive in the market that, not only we are successfully able to retain our present patrons but also making new ones in the global market with our positive approach. We have been thoroughly assisted by our well established corporate offices as well as branch offices at Delhi, Mumbai, Kolkata, Chennai, Bangalore and other 6 Tier II & 8 Tier III cities in delivering competitively prices solutions to a wide range of our clients.
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 text-sm font-medium mb-2">Currently Intact Research is catering to both corporate as well as government clients. Here's a glimpse to some of the major market sections we cater to:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                            <li>Ad Agencies</li>
                            <li>FMCG Companies</li>
                            <li>Corporate Houses</li>
                            <li>Government offices</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "Philosophy & Team",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Through and through, our motto remains to help our clients in the successful identification of the best solution in the perspective of optimal cost -benefit ratio and to understand their needs according to the market. We offer high technology infrastructure facilities which help our customers in redefining and repositioning their market position and to strengthen our aim. All these facilities are backed up with cutting edge tools as well as strategic inputs and resources and thus it promises to make positive growth in today's competitive business environment.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Our aim is to consistently deliver quality end results and that is why all our research services are based on well-defined methodologies, which are regularly looked up by our top management and thus we successfully meet the specific goals of our clients. Our team ensures you get the best of services, thus bringing in the satisfaction quotient in main frame. No matter how big/small your project is, our specially designed research process delivers you nothing but what you exactly want out of our services.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Infrastructure",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Effective research requires in-depth insight of markets, competition and people. The more we understand the better will be marketing strategy. We follow a set methodology that guarantees the most effective results. A new business plan starts with meticulous, thorough fact-finding process. The hallmark of our company is insightful research analysis. Results of these focused analysis provides the data, which is very important for developing marketing solutions. The skills and rich experience of our analysts helps them to use both qualitative and quantitative techniques to analyze the market. Through and accurate analysis is essential to successful research. We also customize the research analysis to effectively and efficiently match the objective of the project. Most importantly, the entire research is planned to bring best solutions to build foundation and profitability.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Work Methodology",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Our company follows a neat work methodology. Everything is planned perfectly to ensure that there is smooth functioning of our business. We work towards promoting our goals & business objectives and intend to undertake aid, advance, and advice, encourage, promote & implement the following:
                        </p>
                    </div>
                    <div className="mb-4">
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                            <li>Primary (field survey) & secondary data-based research</li>
                            <li>Quantitative & qualitative research</li>
                            <li>Activities which promote quality of life</li>
                            <li>Propagate & work for protection of consumer rights</li>
                            <li>Collaborate and cooperate with organizations, institutions based in the country and abroad and meet their specific business requirements</li>
                            <li>Our available manpower and resources also focus on providing socio-economic development of people. We serve the mass that is in real need of social, financial and motivational support from us.</li>
                            <li>Research primarily focusing on sustainable development</li>
                            <li>Action-oriented research</li>
                            <li>To coordinate, assist & help government, NGOs and development agencies in program Implementation</li>
                            <li>To innovate tools & techniques to facilitate accomplishment of development programs</li>
                            <li>To facilitate participation of people in development programs</li>
                            <li>Potential activities capable of improving the quality of human lives in rural & urban areas</li>
                            <li>Programs related to social welfare.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "Market Strategy",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            We ensure that all the service offered by us is flawless of any defect. To ensure this we conduct a lot of surveys and research methodologies. We follow some strict market research strategies and process that are further explained in detail. The following are some of our research methodologies that we follow: Market Research Strategy:
                        </p>
                    </div>
                    <div className="mb-4">
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                            <li>Quantitative research</li>
                            <li>Qualitative research</li>
                            <li>Using market research data</li>
                            <li>Trend analysis</li>
                            <li>Market analysis for product launch</li>
                            <li>Market analysis for new product development</li>
                            <li>Market Research Processes:</li>
                            <li>Monitoring performance</li>
                            <li>Understanding the requirements of clients & successfully handling the tasks of team research</li>
                            <li>Conduct research surveys for professional services firms</li>
                            <li>Developing a research survey sample</li>
                            <li>Defining specific and customized research techniques for firms</li>
                            <li>Surveys completed over the Internet</li>
                            <li>Taking due care of the data protection issues relating to research surveys</li>
                            <li>Using external research companies for making derived results more genuine</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "Operation Process",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            We have divided our research goals under different heads for effective handling of our responsibilities and operation processes. Some of the prime sections are:
                        </p>
                    </div>
                    <div className="mb-4">
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                            <li>Achieving consistency in data collection especially in panel & tracking studies</li>
                            <li>Close adherence to proper sampling methodology like random, boosters, geographical spread/map sampling, purposive – door to door, pre-recruitment random, pre-recruitment geographical, spot recruitment</li>
                            <li>Conducting purposive address based interviews:</li>
                            <li>Generated by field using telephone directory, yellow pages and shop listing and other means</li>
                            <li>Approach Our responsibility begins immediately after receiving early warning note (EWN) where we start the initial field planning. This includes:</li>
                            <li>Arrangement of the field team</li>
                            <li>Job allocation to executive in charge (EIC)</li>
                            <li>Once the job is allocated, the EIC gets directly in touch with the researcher/client for further communications.</li>
                            <li>The complete operations are chalked out the moment entire field material is received</li>
                            <li>We immediately commence pre-testing of the questionnaire</li>
                            <li>It is handled by the supervisor in front of the EIC/Operations head/Company head</li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 text-sm">
                            We send the feedback on the quality of the questionnaire to the researcher/client for necessary action, if required.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Clientele",
            content: (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Our diverse client base includes leading corporations, government agencies, and research institutions across various industries. We have successfully delivered market research solutions to clients in FMCG, healthcare, telecommunications, automotive, and technology sectors.
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 text-sm font-medium mb-2">Our valued clients include:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                            <li>Multinational Corporations</li>
                            <li>Government Departments and PSUs</li>
                            <li>NGOs and Development Organizations</li>
                            <li>Academic and Research Institutions</li>
                            <li>Advertising and Marketing Agencies</li>
                            <li>Consulting Firms</li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed text-justify text-sm">
                            We take pride in maintaining long-term relationships with our clients, with many of them being repeat customers who trust our expertise and rely on our insights for their strategic decision-making processes.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-16 md:py-20 overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"></div>

                {/* Sophisticated Pattern Overlay */}
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
                            linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%)
                        `,
                        backgroundSize: '40px 40px, 40px 40px, 25px 25px'
                    }}></div>
                </div>

                {/* Floating Elegant Symbols */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Analytics Symbol */}
                    <div className="absolute top-16 left-8 opacity-20">
                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full opacity-70"></div>
                        </div>
                    </div>

                    {/* Trending Arrow */}
                    <div className="absolute top-24 right-16 opacity-20">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M10 30 L30 10 M30 10 L20 10 M30 10 L30 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Data Grid */}
                    <div className="absolute bottom-20 left-16 opacity-20">
                        <div className="grid grid-cols-3 gap-1">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-white rounded-sm"></div>
                            ))}
                        </div>
                    </div>

                    {/* Percentage Symbol */}
                    <div className="absolute bottom-24 right-20 opacity-20">
                        <div className="text-white text-3xl font-bold">%</div>
                    </div>

                    {/* Chart Bars */}
                    <div className="absolute top-32 left-1/4 opacity-20">
                        <div className="flex items-end space-x-1">
                            <div className="w-3 h-8 bg-white rounded-t"></div>
                            <div className="w-3 h-12 bg-white rounded-t"></div>
                            <div className="w-3 h-6 bg-white rounded-t"></div>
                            <div className="w-3 h-10 bg-white rounded-t"></div>
                        </div>
                    </div>

                    {/* Pie Chart Slice */}
                    <div className="absolute bottom-32 right-1/3 opacity-20">
                        <div className="w-10 h-10 border-3 border-white rounded-full relative">
                            <div className="absolute top-0 left-1/2 w-0 h-0 border-l-5 border-r-5 border-b-5 border-l-transparent border-r-transparent border-b-white transform -translate-x-1/2"></div>
                        </div>
                    </div>

                    {/* Data Points */}
                    <div className="absolute top-40 right-1/4 opacity-20">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>

                    {/* Additional Symbols */}
                    {/* Line Chart */}
                    <div className="absolute top-20 left-1/3 opacity-15">
                        <svg width="50" height="30" viewBox="0 0 50 30">
                            <path d="M5,25 L15,15 L25,20 L35,10 L45,15" stroke="white" strokeWidth="2" fill="none" />
                            <circle cx="5" cy="25" r="2" fill="white" />
                            <circle cx="15" cy="15" r="2" fill="white" />
                            <circle cx="25" cy="20" r="2" fill="white" />
                            <circle cx="35" cy="10" r="2" fill="white" />
                            <circle cx="45" cy="15" r="2" fill="white" />
                        </svg>
                    </div>

                    {/* Target Symbol */}
                    <div className="absolute bottom-16 left-1/3 opacity-15">
                        <div className="w-10 h-10 border-2 border-white rounded-full relative">
                            <div className="absolute inset-2 border-2 border-white rounded-full">
                                <div className="absolute inset-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Graph Symbol */}
                    <div className="absolute top-28 right-1/3 opacity-15">
                        <div className="grid grid-cols-4 gap-1">
                            <div className="w-2 h-4 bg-white"></div>
                            <div className="w-2 h-6 bg-white"></div>
                            <div className="w-2 h-3 bg-white"></div>
                            <div className="w-2 h-5 bg-white"></div>
                        </div>
                    </div>

                    {/* Diamond Shape */}
                    <div className="absolute bottom-40 right-16 opacity-15">
                        <div className="w-4 h-4 bg-white transform rotate-45"></div>
                    </div>

                    {/* Plus Symbol */}
                    <div className="absolute top-12 right-1/2 opacity-15">
                        <div className="text-white text-2xl font-bold">+</div>
                    </div>

                    {/* Triangle */}
                    <div className="absolute bottom-12 left-1/2 opacity-15">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative max-w-full mx-auto px-2 sm:px-4 lg:px-6">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            About <span className="text-blue-200">Intact Research</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                            Leading the way in <span className="text-white font-medium">market research</span> and <span className="text-white font-medium">data analytics</span> since our inception
                        </p>
                    </div>
                </div>
            </div>

            {/* Company Overview */}
            <div className="py-15 bg-gradient-to-tr from-blue-100 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Our Company
                        </h2>
                    </div>
                    <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
                        <div className="text-gray-700 leading-relaxed text-lg">
                            <p className="mb-6 text-justify">
                                Intact Market Research India Pvt. Ltd. is founded in 2015 by renowned market research professionals in India. It's an independent market research agency offering high quality marketing research, analysis and consulting services across India. In a very short time span today Intact research is a leading market research services provider company in the region.
                            </p>
                            <p className="mb-6 text-justify">
                                At Intact Research it is our pleasure to provide not only the best Market research services possible, but also the best in personalized client care services to you. We build a lasting relationship with you, instead of seeing you as just another business deal. Since our inception, we have established many friends among international companies by acting as their personal chauffer through the Indian and Asia Pacific Markets.
                            </p>
                            <p className="mb-6 text-justify">
                                With our exquisite range of services, we ensure that our clients enhance their businesses and get increased company profits. For this, an elaborate action oriented market research services at competitive costs in the market is offered to you. Our promise is to provide you with sound, honest advice so that you will be able to understand your market more clearly and grow your business beyond expectations.
                            </p>
                            <p className="text-justify">
                                Through our always expanding exclusive research network, currently spanning 100 cities within India along with affiliated partners across the region, we will always help you reach.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vision */}
            <div className="py-16 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Our <span className="text-blue-200">Vision</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6"></div>
                    </div>

                    <div className="bg-white/10 rounded-xl shadow-lg p-6 md:p-8 border border-blue-300 relative overflow-hidden backdrop-blur-sm">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 20% 50%, #60a5fa 1px, transparent 1px)`,
                                backgroundSize: '30px 30px'
                            }}></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 items-center relative z-10">
                            {/* Vision Image */}
                            <div className="flex justify-center md:justify-start">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {/* Decorative rings */}
                                    <div className="absolute -inset-4 border-2 border-blue-200 rounded-full opacity-30"></div>
                                    <div className="absolute -inset-8 border border-blue-100 rounded-full opacity-20"></div>
                                </div>
                            </div>

                            {/* Vision Statement */}
                            <div className="md:col-span-2 relative z-10">
                                <p className="text-lg md:text-xl text-white leading-relaxed text-justify font-light mb-4 drop-shadow-lg">
                                    To establish long-lasting and meaningful business relationships with our clients by providing comprehensive market research, data collection, and data analysis solutions. We are committed to fostering an open and transparent partnership, built on trust and collaboration, with a shared goal of driving informed decisions and sustainable growth.
                                </p>
                                <p className="text-base md:text-lg text-blue-100 font-medium italic text-center drop-shadow">
                                    Our vision is to be a trusted ally in our clients' journey toward success, delivering insights that truly matter.
                                </p>
                            </div>
                        </div>

                        {/* Decorative Bottom Element */}
                        <div className="flex justify-center mt-6 relative z-10">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Core Values */}
            <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">ABOUT INTACT RESEARCH</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Tab Navigation */}
                        <div className="flex flex-wrap border-b border-gray-200 bg-gray-200">
                            {tabData.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-6 py-4 text-sm font-medium border-r border-gray-200 transition-all duration-300 hover:bg-blue-50 ${activeTab === index
                                        ? 'text-white bg-gradient-to-r from-blue-800 to-blue-900 shadow-md'
                                        : 'text-gray-700 bg-gray-100 hover:text-blue-700'
                                        }`}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-8 md:p-10 bg-gray-100 min-h-[400px] relative">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 20% 50%, #3B82F6 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px'
                                }}></div>
                            </div>

                            {/* Content with Animation */}
                            <div className="relative z-10 transform transition-all duration-500 ease-in-out">
                                {tabData[activeTab].content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Partner with Us?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let us help you make informed decisions with our comprehensive research solutions
                    </p>
                    <button
                        onClick={() => {
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                // If contact section doesn't exist on current page, navigate to contact page
                                window.location.href = '/contact';
                            }
                        }}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    )
}