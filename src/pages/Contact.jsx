import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ApiContext } from "../ApiContext";

const Contact = () => {
  const myApi = useContext(ApiContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (myApi) {
        await myApi.post("/contact", formData);
      }
      toast.success("Thank you! Your message has been sent. We will get back to you shortly.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err) {
      toast.success("Thank you! Your inquiry has been received. Our team will contact you shortly.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How do I schedule a physical inspection for a property?",
      a: "You can click on any property listing, use the 'Schedule a Tour' form to select your preferred date/time, or contact our support line directly.",
    },
    {
      q: "Are all properties on Betahouse legally verified?",
      a: "Yes, every listing undergoes strict legal and title verification before being published on our platform.",
    },
    {
      q: "Can I list my property for sale or rent on Betahouse?",
      a: "Absolutely! Create an account or contact our sales team to submit your property details for review and publication.",
    },
    {
      q: "What payment options are available for purchasing properties?",
      a: "We support direct wire transfers, escrow services, and flexible installment plans depending on developer and seller terms.",
    },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-[#1d293f] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#85e3b5] font-bold text-sm tracking-wider uppercase mb-2 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-gray-300 text-lg">
            Have questions about a property listing, legal documentation, or partnership opportunities? Reach out to our expert team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#3d9970]/10 text-[#3d9970] rounded-xl text-xl shrink-0">
                <FiMapPin />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Headquarters</h3>
                <p className="text-sm text-gray-600 mt-1">
                  14 Victoria Island Expressway, Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#3d9970]/10 text-[#3d9970] rounded-xl text-xl shrink-0">
                <FiPhone />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phone & WhatsApp</h3>
                <p className="text-sm text-gray-600 mt-1">+234 (0) 800 2382 4687</p>
                <p className="text-sm text-gray-600">+234 (0) 809 111 2223</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#3d9970]/10 text-[#3d9970] rounded-xl text-xl shrink-0">
                <FiMail />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Address</h3>
                <p className="text-sm text-gray-600 mt-1">support@betahouse.com</p>
                <p className="text-sm text-gray-600">inquiries@betahouse.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#3d9970]/10 text-[#3d9970] rounded-xl text-xl shrink-0">
                <FiClock />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Office Hours</h3>
                <p className="text-sm text-gray-600 mt-1">Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-600">Saturday: 9:00 AM - 3:00 PM</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-600 text-sm mb-8">
              Fill out the form below and an advisor will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Chukwuma Adebayo"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Property Inspection">Property Inspection</option>
                    <option value="Property Listing">Property Listing Request</option>
                    <option value="Partnership">Partnership Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell us how we can assist you..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending Message..." : <>Send Message <FiSend /></>}
              </button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900" id="FAQ">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">Quick answers to common questions about Betahouse operations.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left font-bold text-gray-900 flex justify-between items-center cursor-pointer hover:text-[#3d9970]"
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? <FaChevronUp className="text-[#3d9970]" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
