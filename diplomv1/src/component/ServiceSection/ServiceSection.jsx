import { Megaphone, ArrowRight,Smartphone,Globe,Target,ChartBar,Zap} from 'lucide-react';
import "./ServiceSection.css"
import Table from "./table/Table"

function ServiceSection(){
    return(
        <div className="TableSection">
            <div className="TextSection">
                <h1>Наши Услуги</h1>
                <p>Комплексные решение для развититя вашего бизнеса</p>
            </div>
            <div className='Tables'>
                <Table/>
            <Table
                 icon={<Smartphone size={32} color="#FFFFFF" />}
                 iconBgColor="#3174F1"
                 arrowColor="#3F85F6"
                 title="SMM продвижение"
                 description="Создание и ведение социальных сетей. Увеличиваем охваты, вовлеченность и конверсии в продажи."
                 items={[
                    'Контент-стратегия',
                    'Таргетированная реклама',
                    'Работа с блогерами'
                 ]}
            />
            <Table
                 icon={<Globe size={32} color="#FFFFFF" />}
                 iconBgColor="#544EE8"
                 arrowColor="#6265F1"
                 title="SEO оптимизация"
                 description="Продвижение сайтов в поисковых системах. Выводим в ТОП по ключевым запросам вашей ниши."
                 items={[
                    'Технический аудит',
                    'Контент-маркетинг',
                    'Линкбилдинг'
                 ]}
            />
            <Table
                 icon={<Target size={32} color="#FFFFFF" />}
                 iconBgColor="#1BB152"
                 arrowColor="#22C55E"
                 title="Брендинг"
                 description="Создание уникального образа бренда. От логотипа до полного фирменного стиля и позиционирования."
                 items={[
                    'Разработка логотипа',
                    'Фирменный стиль',
                    'Нейминг'
                 ]}
            />
            <Table
                 icon={<ChartBar size={32} color="#FFFFFF" />}
                 iconBgColor="#EF610F"
                 arrowColor="#FA8534"
                 title="Веб-аналитика"
                 description="Настройка систем аналитики и отчетности. Принимайте решения на основе данных, а не догадок."
                 items={[
                    'Google Analytics',
                    'Яндекс.Метрика',
                    'Дашборды'
                 ]}
            />
            <Table
                 icon={<Zap size={32} color="#FFFFFF" />}
                 iconBgColor="#E94394"
                 arrowColor="#EC4798"
                 title="Креативы"
                 description="Разработка рекламных материалов: баннеры, видео, лендинги. Креативы, которые продают."
                 items={[
                    'Дизайн баннеров',
                    'ТВидеопродакшн',
                    'Landing Page'
                 ]}
            />
            </div>
        </div>
    )
}

export default ServiceSection