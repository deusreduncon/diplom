import  { useState } from "react";
import "./Tabs.css"
import { BarChart3, Users, FileText, Edit, Settings } from "lucide-react";
import DashboardTab from "../TabsContent/DashboardTab/DashboardTab";
import Leads from "../TabsContent/LeadsTab/LeadsTab";
import ManagContent from "../TabsContent/ManagContent/ManagContent";
import SettingsTab from "../TabsContent/SettingsTab/SettingsTab"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="admin-tabs">
      <div className="tabs-list">
        <button
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <BarChart3 className="icon" />
          <span>Дашборд</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "leads" ? "active" : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          <Users className="icon" />
          <span>Заявки</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          <Edit className="icon" />
          <span>Контент</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="icon" />
          <span>Пользователи</span>
        </button>
      </div>

      <div className="tab-content">
      </div>
      <div className="tab-content">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "leads" && <Leads />}
        {activeTab === "content" && <ManagContent />}
        {activeTab === "settings" && <SettingsTab />}
        </div>
    </div>
  )
}

export default Tabs