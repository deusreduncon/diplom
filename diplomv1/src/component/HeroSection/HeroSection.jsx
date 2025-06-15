import  { useEffect, useState } from 'react';
import './HeroSection.css';
import { LogIn, UserRound } from 'lucide-react';
import Modal from '../Modal/Modal';
import { useNavigate } from "react-router-dom"; 
import ContactSection from '../ContactSection/ContactSection'; 



const HeroSection = () => {
    const [particles, setParticles] = useState([]);
    const [modalActive, setIsModalActive] = useState(false);
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [heroTitle, setHeroTitle] = useState("Загрузка...");
    const [heroSubtitle, setHeroSubtitle] = useState("");
    const scrollToContact = () => {
        const section = document.getElementById('contact-section');
            if (section) {
            section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',     
            });
        };
    }
    const navigate = useNavigate();
    useEffect(() => {
         const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        // Генерация частиц
        const particlesArray = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 5 + 2,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: Math.random() * 10 + 10
        }));
        setParticles(particlesArray);

        fetch("http://localhost:3001/content")
        .then(res => res.json())
        .then(data => {
            if (data) {
                setHeroTitle(data.heroTitle || "Заголовок");
                setHeroSubtitle(data.heroSubtitle || "Подзаголовок");
            }
        })
        .catch(err => console.error("Ошибка загрузки контента:", err));
    }, []);
    const handleLoginSuccess = (userData) => {
            console.log("handleLoginSuccess userData:", userData);
            setUser(userData);
            setIsModalActive(false);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem('token');
            if (userData.role === "ADMIN") {
                navigate("/admin");
            }else{
                navigate("/")
            }
        };
    const handleLogout = () => {
            localStorage.removeItem("user");
            localStorage.removeItem('token');
            setUser(null);
            setMenuOpen(true);
            navigate("/");
        };

        
    return (
        <div className="Hero">
            {/* Плавающие волны */}
            <div className="wave"></div>
            <div className="wave"></div>
             {!user ? (
                <button className="login-btn" onClick={() => setIsModalActive(true)}>
                <LogIn size={18} />
                <span>Войти</span>
                </button>
            ) : (
                <div className="user-info"onClick={() => setMenuOpen(prev => !prev)}>
                    <UserRound size={18}/>
                    <span>{user.name}</span>
                     {menuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => navigate('/profile')}>Профиль</button>
                            {user?.role === 'ADMIN' && (
                                <button onClick={() => navigate('/admin')}>Админ панель</button>
                            )}
                            <button onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                    )}
                </div>
            )}
            <Modal active = {modalActive} setActive ={setIsModalActive} setUser={setUser} onLoginSuccess={handleLoginSuccess}>
                    
            </Modal>
            {/* Плавающие частицы */}
            {particles.map(particle => (
                <div 
                    key={particle.id}
                    className="particle"
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: `${particle.left}%`,
                        bottom: '-10px',
                        animation: `floatParticle ${particle.duration}s linear ${particle.delay}s infinite`
                    }}
                />
            ))}

            <div className="HeroText">
                <h1>{heroTitle}</h1>
                <p>{heroSubtitle}</p>
                <div className="HeroButtons">
                    <div className="button">
                        <button onClick={scrollToContact}>Получить консультацию</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
