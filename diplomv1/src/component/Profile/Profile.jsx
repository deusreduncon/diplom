import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";

const Profile = ({ user, setUser }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    const navigate = useNavigate();
    useEffect(() => {
        setFormData({
        name: user?.name || '',
        email: user?.email || ''
        });
  }, [user]);

    // Загрузка заявок пользователя
    useEffect(() => {
        if (user?.id) {
            fetch(`http://109.172.38.23:3001/applications?userId=${user.id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Ошибка загрузки заявок');
                    return res.json();
                })
                .then(data => {
                    const userApplications = Array.isArray(data)
                        ? data.filter(app => app.userId === user.id)
                        : [];
                    setApplications(userApplications);
                })
                .catch(err => {
                    console.error("Ошибка загрузки заявок:", err);
                    setApplications([]);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleUpdateProfile = () => {
        fetch(`http://109.172.38.23:3001/profile/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error("Ошибка сервера");
                return res.json();
            })
            .then((updatedUser) => {
                setUser(updatedUser);
                setFormData({ name: updatedUser.name, email: updatedUser.email }); // <- добавлено!
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setEditMode(false);
                alert("Профиль успешно обновлён!");
        })
            .catch(err => {
                console.error("Ошибка:", err);
                alert("Ошибка при обновлении: " + err.message);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'NEW': 'Ожидает рассмотрения',
            'IN_PROGRESS': 'В работе',
            'DONE': 'Завершена'
        };
        return statusMap[status] || status;
    };

    if (!user) return <div className="auth-alert">Пожалуйста, войдите в систему</div>;
    if (loading) return <div className="loading">Загрузка профиля...</div>;

    return (
        <div className="profile-page">
            <div className="profile-main-container">
                <h1 className="profile-title">Профиль пользователя</h1>

                <div className="profile-card">
                    {editMode ? (
                        <div className="profile-edit-wrapper">
                            <div className="profile-field-group">
                                <label className="profile-field-label">Имя:</label>
                                <input
                                    className="profile-field-input"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="profile-field-group">
                                <label className="profile-field-label">Email:</label>
                                <input
                                    className="profile-field-input"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="profile-action-buttons">
                                <button
                                    className="profile-btn profile-save"
                                    onClick={handleUpdateProfile}
                                >
                                    Сохранить
                                </button>
                                <button
                                    className="profile-btn profile-cancel"
                                    onClick={() => setEditMode(false)}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-view">
                            <h2 className="profile-username">{formData.name}</h2>
                            <p className="profile-info">
                                <strong>Email:</strong> {formData.email}
                            </p>
                            <div className="profile-view-actions">
                                <button
                                    className="profile-btn profile-edit"
                                    onClick={() => setEditMode(true)}
                                >
                                    Редактировать профиль
                                </button>
                                <button
                                    className="profile-btn profile-logout"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="profile-requests-section">
                    <h2 className="profile-requests-title">Ваши заявки ({applications.length})</h2>
                    {applications.length > 0 ? (
                        <div className="profile-requests-grid">
                            {applications.map(app => (
                                <div key={app.id} className="profile-request-card">
                                    <div className="request-header">
                                        <span className={`request-status request-${app.status.toLowerCase()}`}>
                                            {getStatusBadge(app.status)}
                                        </span>
                                        <span className="request-date">
                                            {formatDate(app.createdAt)}
                                        </span>
                                    </div>
                                    <div className="request-body">
                                        <p className="request-message">{app.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="profile-no-requests">
                            <p className="no-requests-message">У вас пока нет заявок</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;