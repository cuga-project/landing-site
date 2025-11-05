// landing/components/WelcomeBanner.tsx
import React from "react";

const WelcomeBanner: React.FC = () => {
  return (
    <section className="welcome-banner py-16 px-5 relative overflow-hidden max-w-none mx-auto bg-gradient-to-br from-cyan-100 to-pink-100 text-purple-900">
      <div className="welcome-banner-content relative max-w-4xl mx-auto transform translate-y-0 transition-transform duration-600 ease-in-out">
        <h1
          id="mainTitle"
          className="text-6xl mb-6 font-bold tracking-tighter text-purple-800 opacity-0 transform translate-y-8 transition-all duration-1200 ease-in-out"
          style={{
            transform: "scale(1)",
            display: "flex",
            justifyContent: "center",
            letterSpacing: "0px",
            fontWeight: 700,
            opacity: 1,
          }}
        >
          IBM CUGA
        </h1>
        <p className="text-xl text-purple-700 max-w-3xl mx-auto mb-10 opacity-0 transform translate-y-5 transition-all duration-1000 delay-300 ease-in-out">
          IBM's Computer using generalist agent ( CUGA ) is capable of achieving
          a wide range of tasks across different domains. By leveraging advanced
          capabilities, it can seamlessly operate on the web, interact with
          desktop applications, and integrate with APIs. Much like a human
          adapting to various activities, this agent does not require
          specialized programming for each task, making it highly versatile and
          efficient.
        </p>
      </div>
    </section>
  );
};

export default WelcomeBanner;
