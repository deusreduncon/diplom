import { useParams,Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Target, BarChart3, TrendingUp, Users } from "lucide-react";
import "./LeadsDetail.css"
import { useState } from "react";

const servicesData = {
        ads: {
                category: "Цифровой маркетинг",
                title: "Контекстная реклама",
                description:
                "Привлекаем целевых клиентов через Яндекс.Директ и Google Ads. Настраиваем, ведем и оптимизируем рекламные кампании с гарантированным ROI от 300%.",
                items: ["Аудит текущих компаний", "Сбор семантики", "A/B тестирование"],
                highlights: [
                "Быстрый запуск за 3 дня",
                "Гарантия результата",
                "Прозрачная отчетность",
    ]
  },
  smm: {
            category: "Социальные сети",
            title: "SMM продвижение",
            description:
            "Создание и ведение соцсетей. Увеличиваем охваты, вовлеченность и конверсии.",
            items: ["Контент-стратегия", "Таргетированная реклама", "Работа с блогерами"],
            highlights: [
            "Рост подписчиков от 30% в месяц",
            "Контент под ключ",
            "Ежемесячные отчёты",
            ]
  },
  seo: {
            category: "Поисковое продвижение",
            title: "SEO оптимизация",
            description:
            "Продвигаем сайт в топ поисковых систем. Фокус на ROI, контент и техническое состояние сайта.",
            items: ["Технический аудит", "Контент-маркетинг", "Линкбилдинг"],
            highlights: [
            "Рост трафика от 50% за 3 месяца",
            "Отчёты по ключевым словам",
            "Полный аудит сайта",
            ]
  },
  brand: {
            category: "Брендинг",
            title: "Брендинг",
            description:
            "Продвижение сайтов в поисковых системах. Выводим в ТОП по ключевым запросам вашей ниши.",
            items: ["Технический аудит", "Контент-маркетинг", "Линкбилдинг"],
            highlights: [
            "Разработка логотипа",
            "Фирменный стиль",
            "Нейминг",
            ]
  },
  webanalytics: {
            category: "Аналитика",
            title: "Веб-аналитика",
            description:
            "Настройка систем аналитики и отчетности. Принимайте решения на основе данных, а не догадок.",
            items: ["Технический аудит", "Контент-маркетинг", "Линкбилдинг"],
            highlights: [
            "Разработка логотипа",
            "Фирменный стиль",
            "Нейминг",
            ]
        },
    zap:{
        category: "Креатив",
        title: "Креативы",
        description:
        "Создание уникального образа бренда. От логотипа до полного фирменного стиля и позиционирования",
        items: ["Технический аудит", "Контент-маркетинг", "Линкбилдинг"],
        highlights: [
            "Дизайн баннеров",
            "ТВидеопродакшн",
            "Landing Page",
        ]
    }
}
    

function LeadDetails() {
  const { slug } = useParams();
  const service = servicesData[slug];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId')|| 1;

    const dataToSend = {
      ...formData,
      userId,
      source: slug, // Указываем источник
    };

    try {
      const response = await fetch("http://localhost:3001/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        console.error("Ошибка при отправке заявки");
        const errorData = await response.json(); // 🟢 добавлено
        console.error("Ошибка при отправке заявки:", errorData.message); 
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  if (!service) {
    return <div className="p-6 text-red-500">Услуга не найдена</div>;
  }
  
  return (
     <div className="lead-container">
      {/* Шапка */}
      <header className="lead-header">
        <div className="lead-header-content">
          <div className="back-link">
            <Link to="/" className="link">
              <ArrowLeft size={20} /> <span>Вернуться на главную</span>
            </Link>
          </div>
          <div className="category">{service.category}</div>
          <h1 className="title">{service.title}</h1>
          <p className="description">{service.description}</p>
          <div className="highlights">
            {service.highlights.map((item, i) => (
              <div key={i} className="highlight-item">
                <CheckCircle size={18} color="#22c55e" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </header>
      <div className="main-content">
        <div className="section-container">
            <section className="what-we-do left-section">
                <h2 className="section-title">Что мы делаем</h2>
                    <div className="Card-Grid">
                    <div className="Card">
                        <div className="card-icon purple">
                        <Target size={24} color="#ffffff" />
                        </div>
                        <h3 className="card-title">Настройка кампаний</h3>
                        <p className="card-text">
                        Создаем эффективные рекламные кампании с точным таргетингом на вашу целевую аудиторию.
                        </p>
                    </div>

                    <div className="Card">
                        <div className="card-icon blue">
                        <BarChart3 size={24} color="#ffffff" />
                        </div>
                        <h3 className="card-title">Оптимизация</h3>
                        <p className="card-text">
                        Постоянно анализируем и улучшаем показатели для снижения стоимости клика и увеличения конверсий.
                        </p>
                    </div>

                    <div className="Card">
                        <div className="card-icon green">
                        <TrendingUp size={24} color="#ffffff" />
                        </div>
                        <h3 className="card-title">Масштабирование</h3>
                        <p className="card-text">
                        Увеличиваем бюджеты на эффективные кампании и расширяем охват для роста продаж.
                        </p>
                    </div>

                    <div className="Card">
                        <div className="card-icon orange">
                        <Users size={24} color="#ffffff" />
                        </div>
                        <h3 className="card-title">Аналитика</h3>
                        <p className="card-text">
                        Предоставляем детальные отчеты с анализом эффективности и рекомендациями по улучшению.
                        </p>
                    </div>
                    </div>
                </section>

                <aside className="right-section">
                        <div className='Form_section'>
                            <h2 className="section-title">Оставьте заявку</h2>
                            <form className="lead-form"onSubmit={handleSubmit}>
                                <input type="text" placeholder="Ваше имя" name="name"  
                                value={formData.name}
                                onChange={handleChange} required />
                                <input type="tel" placeholder="Телефон" name="phone" value={formData.phone} onChange={handleChange} required />
                                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}required />
                                <textarea
                                placeholder="Расскажите о вашем проекте"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                required
                                />
                                <button type="submit">Отправить</button>
                                {success && <p className="success-message">Заявка отправлена успешно!</p>}
                            </form>
                        </div>
                        <div className="ContactBlock">
                            <div className="ContactInner">
                                <h2 className="ContactTitle">Свяжитесь с нами</h2>
                                <p className="Contact_text">
                                    Если у вас остались вопросы — напишите или позвоните. Мы всегда на связи и готовы помочь!
                                </p>
                                <ul className="ContactList">
                                    <li><strong>Email:</strong> support@example.com</li>
                                    <li><strong>Телефон:</strong> +7 (999) 123-45-67</li>
                                    <li><strong>Адрес:</strong> г. Москва, ул. Примерная, 123</li>
                                </ul>
                            </div>
                        </div>
                </aside>
            </div>
        </div>
    </div>
  )
}

export default LeadDetails;