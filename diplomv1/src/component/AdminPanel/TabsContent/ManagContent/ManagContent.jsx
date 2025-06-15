import "./ManageContent.css";

import { useState, useEffect } from "react";


const ManageContent = () => {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contentId, setContentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/content")
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setHeroTitle(data.heroTitle || "");
          setHeroSubtitle(data.heroSubtitle || "");
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setAddress(data.address || "");
          setContentId(data.id);
        } else {
          alert("Контент не найден или отсутствует id");
        }
      })
      .catch(err => {
        console.error("Ошибка загрузки контента", err);
        alert("Ошибка загрузки контента");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!contentId) {
      alert("Контент ещё не загружен");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/content/${contentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroTitle,
          heroSubtitle,
          email,
          phone,
          address,
        }),
      });
      if (!res.ok) throw new Error("Ошибка сервера при сохранении");
      alert("Контент успешно обновлён");
    } catch (err) {
      console.error("Ошибка при сохранении", err);
      alert("Ошибка при сохранении");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="content-wrapper">
  <h2 className="section-title">Управление контентом</h2>
  <div className="content-grid">

    {/* Hero-секция */}
    <div className="content-card">
      <div className="card-header">
        <h3>Hero-секция</h3>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Подзаголовок</label>
          <textarea
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Контактная секция */}
    <div className="content-card">
      <div className="card-header">
        <h3>Контакты</h3>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Адрес</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="btn-gradient" onClick={handleSave}>
            Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default ManageContent;