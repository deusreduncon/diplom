import "./SettingsTab.css";
import { useEffect, useState, useMemo } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";

const SettingsTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", role: "user" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Ошибка при загрузке пользователей", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить пользователя?")) {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ name: user.name || "", role: user.role || "USER" });
  };

  const handleSave = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
    });
    setEditingUserId(null);
    fetchUsers();
  };

  // Фильтрация пользователей по поиску и роли
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search);

      const matchesRole = filterRole === "all" ? true : user.role === filterRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  if (loading) return <p className="loading-text">Загрузка пользователей...</p>;

  return (
    <div className="settings-wrapper">
      <h2 className="settings-title">Пользователи</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">Все роли</option>
          <option value="USER">Пользователь</option>
          <option value="ADMIN">Админ</option>
        </select>
      </div>

      <table className="settings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUserId === user.id ? (
                    <input
                      name="name"
                      id={`name-${user.id}`}
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name || "—"
                  )}
                </td>
                <td>{user.email}</td>
                <td>
                  {editingUserId === user.id ? (
                    <select
                      value={editedUser.role}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, role: e.target.value })
                      }
                    >
                      <option value="USER">Пользователь</option>
                      <option value="ADMIN">Админ</option>
                    </select>
                  ) : (
                    user.role || "user"
                  )}
                </td>
                <td className="actions">
                  {editingUserId === user.id ? (
                    <>
                      <button
                        className="action save"
                        onClick={() => handleSave(user.id)}
                        title="Сохранить"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="action cancel"
                        onClick={() => setEditingUserId(null)}
                        title="Отменить"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action edit"
                        onClick={() => handleEdit(user)}
                        title="Редактировать"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="action delete"
                        onClick={() => handleDelete(user.id)}
                        title="Удалить"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
                Пользователи не найдены
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsTab;
