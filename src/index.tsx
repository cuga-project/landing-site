import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import QuizPage from "./components/QuizPage";
import LandingPage from "./redesign/LandingPage";
import BlueLandingPage from "./redesign/BlueLandingPage";

function ScrollToHash() {
  const { pathname, hash, key } = useLocation();
  useLayoutEffect(() => {
    if (!hash) return;
    // The destination exists only after React has mounted the new route.
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<BlueLandingPage />} />
        <Route path="/concept-1" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
