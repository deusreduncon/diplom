import "./AdminPanel.css"
import { Globe, CircleUserRound } from "lucide-react"
import Tabs from "./Tabs/Tabs"
function AdminPanel(){
    return(
        <div className="AdminPanel">
            <header className="admin-header">
                    <div className="admin-container">
                        <div className="admin-left">
                            <h1 className="admin-title">Админ панель</h1>
                            <span className="badge">Продвижение</span>
                        </div>
                        <div className="admin-right">
                            <button className="site-button" onClick={() => window.location.href = '/'}>
                            <Globe className="icon" />
                            Перейти на сайт
                            </button>
                        <div className="admin-user">
                            <div className="avatar">А</div>
                            <span className="username">Администратор</span>
                        </div>
                        </div>
                    </div>
            </header>
            <div className="mainPanel"><Tabs/></div>
        </div>
    )
}

export default AdminPanel