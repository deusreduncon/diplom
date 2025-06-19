import { Megaphone, ArrowRight,Smartphone,Globe,Target,ChartBar,Zap} from 'lucide-react';
import "./ServiceSection.css"
import Table from "./table/Table"

function ServiceSection(){
    
    const services = [
    {
      icon: <Megaphone size={32} color="#FFFFFF" />,
      iconBgColor: "#A149F2",
      arrowColor: "#A149F2",
      title: "Контекстная реклама",
      description: "Яндекс.Директ и Google Ads. Настройка, ведение и оптимизация рекламных кампаний с гарантированным ROI.",
      items: [
        "Аудит текущих компаний",
        "Сбор семантики",
        "A/B тестирование"
      ],
      slug: "ads"
    },
    {
      icon: <Smartphone size={32} color="#FFFFFF" />,
      iconBgColor: "#3174F1",
      arrowColor: "#3F85F6",
      title: "SMM продвижение",
      description: "Создание и ведение социальных сетей. Увеличиваем охваты, вовлеченность и конверсии в продажи.",
      items: [
        "Контент-стратегия",
        "Таргетированная реклама",
        "Работа с блогерами"
      ],
      slug: "smm"
    },
    {
      icon: <Globe size={32} color="#FFFFFF" />,
      iconBgColor: "#544EE8",
      arrowColor: "#6265F1",
      title: "SEO оптимизация",
      description: "Продвижение сайтов в поисковых системах. Выводим в ТОП по ключевым запросам вашей ниши.",
      items: [
        "Технический аудит",
        "Контент-маркетинг",
        "Линкбилдинг"
      ],
      slug: "seo"
    },
    {
      icon: <Target size={32} color="#FFFFFF" />,
      iconBgColor: "#1BB152",
      arrowColor: "#22C55E",
      title: "Брендинг",
      description: "Продвижение сайтов в поисковых системах. Выводим в ТОП по ключевым запросам вашей ниши.",
      items: [
        'Разработка логотипа',
        'Фирменный стиль',
        'Нейминг'
      ],
      slug: "brand"
    },
    {
      icon:<ChartBar size={32} color="#FFFFFF" />,
      iconBgColor:"#EF610F",
      arrowColor:"#FA8534",
      title:"Веб-аналитика",
      description:"Настройка систем аналитики и отчетности. Принимайте решения на основе данных, а не догадок.",
      items:[
             'Google Analytics',
              'Яндекс.Метрика',
              'Дашборды'
            ],
      slug: "webanalytics"
    },
    {
        icon: <Printer size={32} color="#FFFFFF" />,
        iconBgColor: "#B71C1C",
        arrowColor: "#E53935",
        title: "Печатная продукция",
        description: "Производство листовок, буклетов, каталогов и другой рекламной полиграфии для бизнеса.",
        items: [
            "Листовки",
            "Буклеты",
            "Каталоги",
            "Плакаты"
        ],
        slug: "print-products"
    },
    {
        icon: <Gift size={32} color="#FFFFFF" />,
        iconBgColor: "#4E342E",
        arrowColor: "#6D4C41",
        title: "Сувенирная продукция",
        description: "Изготовление брендированных сувениров для продвижения вашей компании и подарков клиентам.",
        items: [
            "Флешки с логотипом",
            "Кружки",
            "Блокноты",
            "Брендированные ручки"
        ],
        slug: "souvenir-products"
    },
    {
        icon: <BadgeCheck size={32} color="#FFFFFF" />,
        iconBgColor: "#283593",
        arrowColor: "#3949AB",
        title: "Корпоративная продукция",
        description: "Полный цикл разработки и печати корпоративных материалов: от визиток до брендированных пакетов.",
        items: [
            "Визитки",
            "Фирменные бланки",
            "Конверты",
            "Папки"
        ],
        slug: "corporate-products"
    },
    {
        icon: <Package size={32} color="#FFFFFF" />,
        iconBgColor: "#00695C",
        arrowColor: "#26A69A",
        title: "Упаковка и этикетки",
        description: "Разработка и печать упаковки, стикеров и этикеток для продукции любой категории.",
        items: [
            "Коробки",
            "Стикеры",
            "Этикетки",
            "Бирки"
        ],
        slug: "packaging-labels"
    },
    {
        icon: <Calendar size={32} color="#FFFFFF" />,
        iconBgColor: "#FF6F00",
        arrowColor: "#FFA000",
        title: "Календари",
        description: "Печать настольных, настенных и перекидных календарей для корпоративного и рекламного использования.",
        items: [
            "Настольные календари",
            "Настенные календари",
            "Перекидные календари",
            "Карманные календари"
        ],
        slug: "calendars"
    },
    {
        icon: <Store size={32} color="#FFFFFF" />,
        iconBgColor: "#4527A0",
        arrowColor: "#673AB7",
        title: "POS-материалы",
        description: "Изготовление рекламных материалов для мест продаж: воблеры, шелфтокеры, дисплеи.",
        items: [
            "Воблеры",
            "Шелфтокеры",
            "Дисплеи",
            "Стойки"
        ],
        slug: "pos-materials"
    },
    {
        icon:<Zap size={32} color="#FFFFFF" />,
        iconBgColor:"#E94394",
        arrowColor:"#EC4798",
        title:"Креативы",
        description:"Создание уникального образа бренда. От логотипа до полного фирменного стиля и позиционирования.",
        items:[
            'Дизайн баннеров',
            'ТВидеопродакшн',
            'Landing Page'
        ],
        slug: "zap"
    }
  ];
    return(
        <div id="services-section" className="TableSection">
            <div className="TextSection">
                <h1>Наши Услуги</h1>
                <p>Комплексные решение для развититя вашего бизнеса</p>
            </div>
            <div className='Tables'>
                <div className="Tables">
                    {services.map((service) => (
                    <Table key={service.slug} {...service} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServiceSection