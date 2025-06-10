import './ContactTable.css'
import { Phone,Mail,MapPin } from 'lucide-react'
function ContactTable({
    icon = <Phone size={24} color='#FFFFFF'/>,
    title = "Телефон",
    description = "+7 (495) 123-45-67",
    iconBgColor ="#7769F6"
}){
    return(
        <div className='ContactTable'>
            <div className = "ContactImg" style={{backgroundColor:iconBgColor}}>{icon}</div>
            <div className='Conn'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ContactTable