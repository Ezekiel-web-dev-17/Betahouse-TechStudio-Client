import React from "react";
import { useParams, Link } from "react-router-dom";
import { sampleBlogPosts } from "./Blog";
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiBookmark } from "react-icons/fi";

const BlogPost = () => {
  const { id } = useParams();
  const post = sampleBlogPosts.find((p) => p.id === id) || sampleBlogPosts[0];

  const relatedPosts = sampleBlogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9970] hover:underline mb-6"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        {/* Post Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-10">
          <span className="bg-[#3d9970]/10 text-[#3d9970] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div>
                <p className="font-bold text-gray-900">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <button
                onClick={() => alert("Article link copied to clipboard!")}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                title="Share Article"
              >
                <FiShare2 />
              </button>
              <button
                onClick={() => alert("Article saved to bookmarks!")}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                title="Bookmark Article"
              >
                <FiBookmark />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div className="mt-10 space-y-6 text-gray-700 text-lg leading-relaxed font-sans">
            <p className="text-xl font-medium text-gray-900 leading-normal">
              {post.excerpt}
            </p>
            <p>
              Navigating the real estate landscape requires careful planning, market awareness, and legal clarity. Whether you are a first-time home buyer or an experienced investor looking to expand your portfolio in West Africa, making informed decisions ensures maximum asset appreciation and security.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 pt-4">1. Verify Title Documentation Before Paying Commitments</h2>
            <p>
              Always demand physical inspection of official title documents. Ensure the title is registered with the Ministry of Physical Planning & Urban Development or Lands Bureau. A Certificate of Occupancy (C of O) or Governor's Consent gives you legal ownership rights and protects your land from future acquisition claims.
            </p>

            <blockquote className="border-l-4 border-[#3d9970] pl-6 py-2 italic text-gray-800 bg-[#3d9970]/5 rounded-r-lg font-serif">
              "In real estate, title integrity is the bedrock of investment security. Never compromise on legal verification."
            </blockquote>

            <h2 className="text-2xl font-bold text-gray-900 pt-4">2. Evaluate Structural & Environmental Integrity</h2>
            <p>
              Beyond aesthetic finishes, conduct structural assessments. Check soil quality, drainage channels in the neighborhood during rainy seasons, and verify builder reputation for off-plan acquisitions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 pt-4">3. Work With Verified Platforms</h2>
            <p>
              Using verified platforms like Betahouse ensures every property listing is pre-screened for legal cleanliness, authentic pricing, and clear seller identity.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <div key={rel.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#3d9970] uppercase">{rel.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 hover:text-[#3d9970] transition">
                    <Link to={`/blog/${rel.id}`}>{rel.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{rel.excerpt}</p>
                </div>
                <Link
                  to={`/blog/${rel.id}`}
                  className="text-xs font-bold text-[#3d9970] mt-4 inline-block hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
