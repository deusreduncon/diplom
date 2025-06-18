import "./Footer.css"
function Footer(){
     const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',     
            });
        }
    };
    return(
        <div className="Footer">
            <div className="FooterInfo">
                <div className="FooterText">
                    <h3>ПРОДВИЖЕНИЕ</h3>
                    <p>Рекламное агенство полного цикла</p>
                </div>
                <div className="FooterNav">
                    <a onClick={() => scrollToSection('services-section')}>Услуги</a>
                    <a onClick={() => scrollToSection('contact-section')}>Контакты</a>
                    <a href="/about">О нас</a>
                </div>
                <div className="bordert"></div>
                <div className="RightsReserved">© 2024 ООО "Продвижение" Все права защищены.</div>
            </div>
        </div>
    )
}

export default Footer