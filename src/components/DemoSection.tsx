// landing/components/DemosSection.tsx
import React from "react";

interface VideoDemo {
  videoSrc: string;
  title: string;
}

const DemosSection: React.FC = () => {
  // You could also fetch this data from an API
  const videoDemos: VideoDemo[] = [
    {
      videoSrc: "/videos/606.mp4",
      title:
        'Find a subreddit focused on topics related to NYC, and post my question, "is car necessary" there',
    },
    {
      videoSrc: "/videos/81.mp4",
      title:
        "What is the duration required to first walk from Univ of Pittsburgh to starbucks on Craig Street, and then drive to Pittsburgh International Airport?",
    },
    {
      videoSrc: "/videos/776.mp4",
      title: "Delete all reviews from scammer carlo",
    },
    {
      videoSrc: "/videos/570.mp4",
      title:
        "Invite Jakub K, Alex Dills, Alex Hutnik and Benoît Blanchon as collaborator to my time tracking tool project repo",
    },
    {
      videoSrc: "/videos/557.mp4",
      title:
        "Create a repo named nolan_old_fans with movies directed by Christopher Nolan before 2010 in a README file",
    },
  ];

  return (
    <section className="demos-section py-16 px-5 relative overflow-hidden max-w-none mx-auto bg-gradient-to-br from-cyan-100 to-pink-100 text-purple-900 text-center">
      <h2
        id="demosTitle"
        className="text-4xl mb-8 font-semibold text-slate-700 opacity-0 transform translate-y-5 transition-all duration-1000 ease-in-out"
      >
        Video Demos
      </h2>
      <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1200 delay-400 ease-in-out">
        {videoDemos.map((demo, index) => (
          <div
            key={index}
            className="video-item rounded-lg overflow-hidden min-h-[533px] shadow-lg transition-all duration-400 ease-in-out hover:-translate-y-1 hover:scale-103 hover:shadow-xl"
          >
            <video
              src={demo.videoSrc}
              controls
              autoPlay
              muted
              className="w-full block min-h-[530px]"
            ></video>
            <h3 className="text-lg text-gray-800 mx-5 my-4 text-left font-medium leading-relaxed">
              {demo.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DemosSection;
