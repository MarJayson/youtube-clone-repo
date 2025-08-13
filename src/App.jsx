import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        {/* Index route ensures it loads immediately at the root */}
        <Route index element={<Home sidebar={sidebar} />} />

        {/* Video page */}
        <Route path="/video/:categoryId/:videoId" element={<Video />} />

        {/* Catch-all fallback to Home */}
        <Route path="*" element={<Home sidebar={sidebar} />} />
      </Routes>
    </>
  );
};

export default App;
