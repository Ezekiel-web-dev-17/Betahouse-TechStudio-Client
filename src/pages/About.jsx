import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaUsers, FaAward, FaHandshake, FaCheckCircle } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const About = () => {
  const stats = [
    { label: "Properties Listed", value: "2,500+" },
    { label: "Happy Clients", value: "10,000+" },
    { label: "Cities Covered", value: "25+" },
    { label: "Years of Trust", value: "8+" },
  ];

  const values = [
    {
      title: "Trust & Transparency",
      description: "We provide complete openness in pricing, legal documentation, and property history with no hidden fees.",
      icon: <FaHandshake className="text-3xl text-[#3d9970]" />,
    },
    {
      title: "Premium Quality",
      description: "Every property listed on Betahouse undergoes thorough inspection to guarantee premium living standards.",
      icon: <FaBuilding className="text-3xl text-[#3d9970]" />,
    },
    {
      title: "Customer First",
      description: "Our dedicated agents provide personalized guidance from your initial search to key handover.",
      icon: <FaUsers className="text-3xl text-[#3d9970]" />,
    },
    {
      title: "Award-Winning Service",
      description: "Recognized as West Africa's most innovative prop-tech platform for seamless property acquisition.",
      icon: <FaAward className="text-3xl text-[#3d9970]" />,
    },
  ];

  const team = [
    {
      name: "Adewale Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Chidinma Okeke",
      role: "Head of Real Estate Operations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Babajide Sangoleye",
      role: "Lead Property Analyst",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1d293f] to-[#3d9970] text-white py-20 px-6 md:px-16 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <span className="bg-[#3d9970]/30 text-[#85e3b5] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase border border-[#3d9970]/50 inline-block mb-4">
            About Betahouse
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Redefining How You Discover & Own Real Estate
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            At Betahouse, we connect dreamers, investors, and families with verified, premium real estate solutions across Nigeria. Built on trust, modern design, and effortless transactions.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/properties"
              className="bg-[#3d9970] hover:bg-[#327e5c] text-white px-7 py-3.5 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg"
            >
              Explore Properties <BsArrowRight />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4">
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#3d9970]">{stat.value}</h3>
              <p className="text-gray-600 font-medium text-sm md:text-base mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 my-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#3d9970] font-bold text-sm tracking-wider uppercase">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Making Property Acquisition Seamless, Secure & Accessible
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with the objective of eliminating friction in property buying and renting, Betahouse merges intuitive technology with deep real estate expertise.
            </p>
            <div className="space-y-3">
              {[
                "100% Verified Property Documentation",
                "Virtual & On-Site Guided Tours",
                "Transparent Price Tagging & Flexible Payment Plans",
                "Dedicated Legal & Financial Assistance",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaCheckCircle className="text-[#3d9970] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              alt="Betahouse luxury property"
              className="rounded-2xl shadow-2xl w-full object-cover h-[420px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#3d9970] text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs">
              <p className="font-semibold text-lg">"Your dream home is no longer a distance away."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Betahouse?</h2>
            <p className="text-gray-600 mt-2">
              We hold ourselves to the highest standards to deliver peace of mind for every transaction.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-start">
                <div className="p-3 bg-[#3d9970]/10 rounded-xl mb-4">{val.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Leadership</h2>
          <p className="text-gray-600 mt-2">
            Driven professionals dedicated to bringing excellence to real estate.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#3d9970] font-medium text-sm mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="bg-[#1d293f] text-white rounded-3xl p-10 md:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-2xl">
            Ready to Find Your Next Home or Property Investment?
          </h2>
          <p className="text-gray-300 max-w-xl mb-8">
            Browse our curated listings or speak directly with one of our expert real estate advisors today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/properties"
              className="bg-[#3d9970] hover:bg-[#327e5c] text-white px-8 py-4 rounded-xl font-bold transition shadow-lg"
            >
              Browse All Properties
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
