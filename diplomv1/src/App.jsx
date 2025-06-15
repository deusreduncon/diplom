import ContactSection from "./component/ContactSection/ContactSection"
import Footer from "./component/Footer/Footer"
import HeroSection from "./component/HeroSection/HeroSection"
import ServiceSection from "./component/ServiceSection/ServiceSection"
import  { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from "./component/AdminPanel/AdminPanel"
import LeadDetails from "./component/ServiceSection/LeadsDetail/LeadsDetail";
import { ContentProvider } from "./component/context/ContentContext";
import Profile from './component/Profile/Profile';
 function App(){
    const [user, setUser] = useState(null);
    const [content, setContent] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoadingUser(false);
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/content")
      .then(res => res.json())
      .then(data => {
        setContent(data);
      })
      .catch(err => {
        console.error("Ошибка загрузки контента:", err);
      })
      .finally(() => setLoading(false));
  }, []);
      if (loadingUser||loading) {
        return <div>Загрузка...</div>; // Можно сюда вставить спиннер или пустой экран
    }
    return(
        <ContentProvider>
            <Router>
                <Routes>
                    <Route
                    path="/admin"
                    element={
                        user && user.role === "ADMIN" ? (
                        <AdminPanel />
                        ) : (
                        <Navigate to="/" replace />
                        )
                    }
                    />
                    <Route
                    path="/"
                    element={
                        <>
                        <HeroSection user={user} setUser={setUser} />
                        <ServiceSection />
                        <ContactSection user={user} contact={content}  />
                        <Footer />
                        </>
                    }
                    />
                    <Route path="/leads/:slug" element={<LeadDetails/>} />
                    <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                </Routes>
        </Router>
    </ContentProvider>
       
    )
}

export default App