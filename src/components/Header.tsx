// landing/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="pt-8 absolute top-0 left-0 z-50 w-full">
      <nav className="max-w-6xl mx-auto flex justify-end items-center px-5">
        <ul className="cugaitems flex list-none p-0 m-0">
          <li className="ml-5">
            <a
              href="#docs"
              className="no-underline text-white font-medium text-lg px-2 py-2 rounded-3xl bg-teal-700 bg-opacity-85 transition-all duration-300 ease-in-out inline-block hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none nav-link-disabled"
            >
              Docs
            </a>
          </li>
          <li className="ml-5">
            <a
              href="#paper"
              className="no-underline text-white font-medium text-lg px-2 py-2 rounded-3xl bg-teal-700 bg-opacity-85 transition-all duration-300 ease-in-out inline-block hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none nav-link-disabled"
            >
              Paper
            </a>
          </li>
          <li className="ml-5">
            <a
              target="_blank"
              href="https://forms.office.com/r/GjLf7a7fju"
              rel="noopener noreferrer"
              className="no-underline text-white font-medium text-lg px-2 py-2 rounded-3xl bg-teal-700 bg-opacity-85 transition-all duration-300 ease-in-out inline-block hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
