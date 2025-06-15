import './ContactSection.css'
import { Phone,Mail,MapPin } from 'lucide-react'
import ContactTable from './ContactTable/ContactTable'
import  { useState } from 'react';

function ContactSection({user,contact}){
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Только зарегистрированные пользователи могут отправлять заявки.");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          userId: user.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Ошибка при отправке заявки");
        setSuccess("");
      } else {
        setSuccess("Заявка успешно отправлена!");
        setError("");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setError("Сервер не отвечает");
      setSuccess("");
      console.error(err);
    }
  };
    return(
        <div  id="contact-section" className='ContactSection'>
            <div className='ContactText'>
                <div className='ConUs'>
                    <h1>Свяжитесь с нами!</h1>
                    <p>Готовы обсудить ваш проект?<br/>Мы всегда на связи и готовы помочь вашему бизнесу расти.</p>
                    <div className='Contact'>
                        <ContactTable
                            description={contact.phone}
                        />
                        <ContactTable
                            icon={<Mail size={24} color='#FFFFFF'/>}
                            iconBgColor ="#1BBF80"
                            title='Email'
                            description={contact.email}
                        />
                        <ContactTable
                            icon={<MapPin size={24} color='#FFFFFF'/>}
                            iconBgColor ="#F45C2C"
                            title='Адрес'
                            description={contact.address}
                        />
                    </div>
                </div>
            </div>
            <div className='Application'>
                    <div className='AplicationText'>
                        <h1>Оставьте заявку</h1>
                        <p>Заполните форму свяжемся с вами в течение 15 минут</p>
                    </div>
                    <form className='FormSpace' onSubmit={handleSubmit}>
                        <input
                        type='text'
                        placeholder='Ваше имя'
                        className='InputInfo'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        />
                        <input
                        type="tel"
                        placeholder='Телефон'
                        className='InputInfo'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        />
                        <input
                        type="email"
                        placeholder='Email'
                        className='InputInfo'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        />
                        <textarea
                        placeholder='Расскажите о вашем проекте'
                        className='PlaceInfo'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}
                        <button className='ApplicationConfirm' type="submit">Отправить Заявку</button>
                    </form>
                    <div className='confident'>
                        <p>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                    </div>
                </div>
        </div>
    )
}

export default ContactSection