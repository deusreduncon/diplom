import  { useEffect, useState } from 'react';
import './HeroSection.css';
import { LogIn } from 'lucide-react';
import Modal from '../Modal/Modal';

const HeroSection = () => {
    const [particles, setParticles] = useState([]);
    const [modalActive, setIsModalActive] = useState(false);
    useEffect(() => {
        // Генерация частиц
        const particlesArray = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 5 + 2,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: Math.random() * 10 + 10
        }));
        setParticles(particlesArray);

        // Можно добавить другие эффекты при необходимости
    }, []);
    return (
        <div className="Hero">
            {/* Плавающие волны */}
            <div className="wave"></div>
            <div className="wave"></div>
            <button className="login-btn" onClick={()=>setIsModalActive(true)}>
                <LogIn size={18} />
                <span>Войти</span>
            </button>
            <Modal active = {modalActive} setActive ={setIsModalActive}>
                    
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
                <h1>ПРОДВИЖЕНИЕ</h1>
                <p>Превращаем ваши идеи в успешные рекламные компании</p>
                <div className="HeroButtons">
                    <div className="button">
                        <button>Получить консультацию</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
