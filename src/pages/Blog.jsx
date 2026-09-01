import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiClock, FiUser, FiArrowRight } from "react-icons/fi";

export const sampleBlogPosts = [
  {
    id: "1",
    title: "10 Key Factors to Inspect Before Buying Property in Lagos",
    category: "Real Estate Tips",
    date: "Aug 24, 2026",
    readTime: "5 min read",
    author: "Adewale Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    excerpt: "Navigating real estate purchases requires due diligence. From title verification to flood risk checks, here is your essential pre-purchase checklist.",
    featured: true,
  },
  {
    id: "2",
    title: "Understanding Land Titles in Nigeria: C of O vs Governor's Consent",
    category: "Legal & Documentation",
    date: "Aug 18, 2026",
    readTime: "7 min read",
    author: "Chidinma Okeke",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    excerpt: "Confused about title documents? Learn the key differences between Certificate of Occupancy, Governor's Consent, and Gazette titles before investing.",
    featured: false,
  },
  {
    id: "3",
    title: "Top 5 Emerging Neighborhoods for High ROI Investments in 2026",
    category: "Market Trends",
    date: "Aug 10, 2026",
    readTime: "4 min read",
    author: "Babajide Sangoleye",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    excerpt: "Explore the fastest-growing residential and commercial zones offering high rental yields and capital appreciation this year.",
    featured: false,
  },
  {
    id: "4",
    title: "Modern Interior Decor Trends for Luxury Apartments",
    category: "Home & Decor",
    date: "Jul 29, 2026",
    readTime: "6 min read",
    author: "Amara Davies",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    excerpt: "Transform your living space with minimal aesthetics, smart home integrations, and sustainable furniture choices for modern urban living.",
    featured: false,
  },
  {
    id: "5",
    title: "How Off-Plan Property Buying Works & How to Protect Your Investment",
    category: "Investment Guide",
    date: "Jul 15, 2026",
    readTime: "8 min read",
    author: "Adewale Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800",
    excerpt: "Off-plan property buying can secure lower prices. Here is how to verify developer track records and structure milestone payments safely.",
    featured: false,
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Real Estate Tips", "Market Trends", "Legal & Documentation", "Home & Decor", "Investment Guide"];

  const filteredPosts = sampleBlogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = sampleBlogPosts.find((p) => p.featured) || sampleBlogPosts[0];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="bg-[#1d293f] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#85e3b5] font-bold text-sm tracking-wider uppercase mb-2 block">
            Betahouse Insights & News
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Real Estate Insights, Trends & Guides
          </h1>
          <p className="text-gray-300 text-lg">
            Stay updated with expert advice, market analyses, and home ownership tips tailored for Nigeria.
          </p>

          {/* Search input */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search articles, topics or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-900 pl-12 pr-4 py-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap gap-2 justify-center">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#3d9970] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Featured Post (only show if no search/category filter active or matches) */}
        {selectedCategory === "All" && !searchTerm && featuredPost && (
          <div className="mb-14 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 grid md:grid-cols-2">
            <div className="h-64 md:h-auto overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#3d9970] uppercase tracking-wide mb-3">
                  <span className="bg-[#3d9970]/10 px-3 py-1 rounded-md">{featuredPost.category}</span>
                  <span>Featured Post</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug hover:text-[#3d9970] transition">
                  <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.authorAvatar}
                    alt={featuredPost.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{featuredPost.author}</p>
                    <p className="text-xs text-gray-500">{featuredPost.date} • {featuredPost.readTime}</p>
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="bg-[#3d9970] hover:bg-[#327e5c] text-white p-3 rounded-full transition shadow"
                >
                  <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Articles */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-[#3d9970] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#3d9970] text-xs font-bold px-3 py-1 rounded-full shadow">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#3d9970] transition line-clamp-2">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-gray-700">{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-xs font-bold text-[#3d9970] hover:underline flex items-center gap-1"
                  >
                    Read More <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
