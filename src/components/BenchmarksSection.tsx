// landing/components/BenchmarksSection.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Benchmark {
  name: string;
  accuracy: string;
  link: string;
}

const BenchmarksSection: React.FC = () => {
  // You could also fetch this data from an API
  const benchmarks: Benchmark[] = [
    {
      name: "Webarena",
      accuracy: "61.7%",
      link: "https://results.cuga.dev",
    },
  ];

  return (
    <section className="benchmarks-section py- px-5 relative overflow-hidden max-w-none mx-auto bg-gradient-to-br from-cyan-100 to-pink-100 text-purple-900 text-center">
      <h2
        id="benchmarksTitle"
        className="text-4xl mb-8 font-semibold text-slate-800 opacity-0 transform translate-y-5 transition-all duration-1000 ease-in-out"
      >
        Benchmark Results
      </h2>
      <table className="benchmark-table w-4/5 border-collapse mt-8 opacity-0 transform translate-y-8 transition-all duration-1200 delay-500 ease-in-out mx-auto">
        <thead>
          <tr>
            <th className="py-4 px-5 text-left border-b border-gray-200 bg-gray-300 text-gray-600 font-semibold">
              Name
            </th>
            <th className="py-4 px-5 text-left border-b border-gray-200 bg-gray-300 text-gray-600 font-semibold">
              Accuracy
            </th>
            <th className="py-4 px-5 text-left border-b border-gray-200 bg-gray-300 text-gray-600 font-semibold">
              Trajectories Link
            </th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((benchmark, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "hover:bg-gray-100"
                  : "bg-gray-50 hover:bg-gray-100"
              }
            >
              <td className="py-4 px-5 text-left border-b border-gray-200">
                {benchmark.name}
              </td>
              <td className="py-4 px-5 text-left border-b border-gray-200">
                {benchmark.accuracy}
              </td>
              <td className="py-4 px-5 text-left border-b border-gray-200">
                <Link
                  to={`/dashboard`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View Trajectories
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BenchmarksSection;
