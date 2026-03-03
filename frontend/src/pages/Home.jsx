import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://img.freepik.com/premium-photo/quotwidespread-littering-issue-indian-roadsidesquot-concept-littering-environmental-pollution-roadside-garbage-india-waste-management_864588-196933.jpg")`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Report Issues.<br />
            Build Better Communities.
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            A transparent platform connecting citizens with local authorities
            to resolve public infrastructure issues efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/report')}
              className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-200 transition shadow-lg"
            >
              Report an Issue
            </button>

            <button
              onClick={() => navigate('/track')}
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/20 transition border border-white/20"
            >
              Track Issues
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-slate-900">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 mb-16">
            Everything you need for effective issue management
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {[
              { icon: "📡", title: "Real-Time Tracking", desc: "Monitor issue status and resolution progress with live updates." },
              { icon: "📍", title: "Location-Based", desc: "Precise geolocation tagging for accurate issue identification." },
              { icon: "📊", title: "Analytics Dashboard", desc: "Comprehensive insights and statistics on reported issues." },
              { icon: "🤝", title: "Community Engagement", desc: "Upvote and comment on issues to show community support." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-2xl hover:scale-105 transition duration-300"
              >
                {/* Darker Cream Emoji Background */}
                <div className="w-14 h-14 bg-[#FFE0B2] hover:bg-[#FFD08A] rounded-xl flex items-center justify-center mb-5 mx-auto text-2xl transition">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-slate-800">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-gray-400 mb-16">
            Simple process from reporting to resolution
          </p>

          <div className="grid md:grid-cols-4 gap-10">

            {[
              { icon: "📝", title: "Report Issue", desc: "Submit detailed reports with photos and location." },
              { icon: "🔍", title: "Admin Reviews", desc: "Administrators verify and categorize the issue." },
              { icon: "🚧", title: "Take Action", desc: "Authorities are notified and begin resolution." },
              { icon: "✅", title: "Resolved", desc: "Citizens receive updates until completion." },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:scale-105 transition duration-300 shadow-md"
              >
                {/* Darker Cream Emoji Background */}
                <div className="w-16 h-16 bg-[#FFE0B2] hover:bg-[#FFD08A] rounded-full flex items-center justify-center text-2xl mx-auto mb-4 transition">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
