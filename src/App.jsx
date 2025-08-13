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
        {/* Homepage */}
        <Route index element={<Home sidebar={sidebar} />} />
        <Route
          path="/youtube-clone-repo"
          element={<Home sidebar={sidebar} />}
        />

        {/* Video route for dev */}
        <Route path="/video/:categoryId/:videoId" element={<Video />} />

        {/* Video route for production */}
        <Route
          path="/youtube-clone-repo/video/:categoryId/:videoId"
          element={<Video />}
        />
      </Routes>
    </>
  );
};

export default App;
