import "./DashboardTab.css";
import { useEffect, useState } from "react";


const getStatusText = (status) => {
  switch (status) {
    case "NEW":
      return "Новая";
    case "IN_PROGRESS":
      return "В работе";
    case "DONE":
      return "Завершена";
    default:
      return "Неизвестно";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "NEW":
      return "badge-green";
    case "IN_PROGRESS":
      return "badge-blue";
    case "DONE":
      return "badge-gray";
    default:
      return "badge-gray";
  }
};

export default function DashboardTab() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const defaultStats = {
        totalApplications: 0,
        newApplications: 0,
        inProgressApplications: 0,
        doneApplications: 0,
        totalUsers: 0,
        totalServices: 0,
        recentApplications: []
    };
    fetch("http://localhost:3001/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats({ ...defaultStats, ...data }))
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  }, []);

  if (!stats) return <p>Загрузка...</p>;

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <p className="stat-title">Всего заявок</p>
        <p className="stat-value">{stats.totalApplications}</p>
      </div>
      <div className="stat-card">
        <p className="stat-title">Пользователей</p>
        <p className="stat-value">{stats.totalUsers}</p>
      </div>
      <div className="stat-card">
        <p className="stat-title">Активные услуги</p>
        <p className="stat-value">6</p>
      </div>
      <div className="stat-card">
        <p className="stat-title">В работе</p>
        <p className="stat-value">{stats.inProgressApplications}</p>
      </div>

      <div className="card full-width">
        <h3>Последние заявки</h3>
        <div className="leads-list">
          {Array.isArray(stats.recentApplications) &&
            stats.recentApplications.map((lead) => (
                <div className="lead-item" key={lead.id}>
                <div>
                    <p className="lead-name">{lead.name}</p>
                    <p className="lead-email">{lead.email}</p>
                    <p className="lead-date">{new Date(lead.createdAt).toLocaleDateString("ru-RU")}</p>
                </div>
                <span className={`badge ${getStatusColor(lead.status)}`}>
                    {getStatusText(lead.status)}
                </span>
                </div>
            ))}
        </div>
      </div>

      <div className="card full-width">
        <h3>Статистика по статусам</h3>
        <div className="service-progress">
          <div className="service-row">
            <span>Новые</span>
            <div className="progress-bar">
              <div
                style={{ width: `${(stats.newApplications / stats.totalApplications) * 100 || 0}%` }}
                className="bar purple"
              ></div>
            </div>
            <span>{stats.newApplications}</span>
          </div>
          <div className="service-row">
            <span>В работе</span>
            <div className="progress-bar">
              <div
                style={{ width: `${(stats.inProgressApplications / stats.totalApplications) * 100 || 0}%` }}
                className="bar blue"
              ></div>
            </div>
            <span>{stats.inProgressApplications}</span>
          </div>
          <div className="service-row">
            <span>Завершено</span>
            <div className="progress-bar">
              <div
                style={{ width: `${(stats.doneApplications / stats.totalApplications) * 100 || 0}%` }}
                className="bar green"
              ></div>
            </div>
            <span>{stats.doneApplications}</span>
          </div>
        </div>
      </div>
    </div>
  );
}