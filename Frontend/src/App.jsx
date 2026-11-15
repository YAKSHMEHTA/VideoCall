import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import "./App.css";
import Auth from "./Pages/Auth";
import VideoPage from "./Pages/VideoPage";
import AskUsername from "./Pages/AskUsername";
import History from "./Pages/History";
import Home from "./Pages/Home";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth></Auth>}></Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/room/:url" element={<VideoPage />} />
            <Route path="/history" element={<History/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
