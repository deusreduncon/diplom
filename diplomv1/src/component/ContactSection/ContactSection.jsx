import './ContactSection.css'
import { Phone,Mail,MapPin } from 'lucide-react'
import ContactTable from './ContactTable/ContactTable'

function ContactSection(){
    return(
        <div className='ContactSection'>
            <div className='ContactText'>
                <div className='ConUs'>
                    <h1>Свяжитесь с нами!</h1>
                    <p>Готовы обсудить ваш проект?<br/>Мы всегда на связи и готовы помочь вашему бизнесу расти.</p>
                    <div className='Contact'>
                        <ContactTable/>
                        <ContactTable
                            icon={<Mail size={24} color='#FFFFFF'/>}
                            iconBgColor ="#1BBF80"
                            title='Email'
                            description='info@prodvizhenie.ru'
                        />
                        <ContactTable
                            icon={<MapPin size={24} color='#FFFFFF'/>}
                            iconBgColor ="#F45C2C"
                            title='Адрес'
                            description='г. Москва, ул. Тверская, д. 1, офис 100'
                        />
                    </div>
                </div>
            </div>
            <div className='Application'>
                <div className='AplicationText'>
                    <h1>Оставьте заявку</h1>
                    <p>Заполните форму свяжемся с вами в течение 15 минут</p>
                </div>
                <div className='FormSpace'>
                    <input type='text' placeholder='Ваше имя' className='InputInfo'/>
                    <input type="tel" placeholder='Телефон' className='InputInfo'/>
                    <input type="email" placeholder='Email' className='InputInfo'/>
                    <textarea  placeholder='Расскажите о вашем проекте' className='PlaceInfo'/>
                    <button className='ApplicationConfirm'>Отправить Заявку</button>
                </div>
                <div className='confident'><p>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p></div>
            </div>
        </div>
    )
}

export default ContactSection