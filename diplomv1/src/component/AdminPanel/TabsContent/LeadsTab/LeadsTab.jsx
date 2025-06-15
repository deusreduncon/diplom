import "./Leads.css";
import { Filter, Download, Search, Mail, Phone, Calendar, Eye, Edit, Trash2, X, Check } from "lucide-react";
import { useState, useEffect,useRef } from "react";
import jsPDF from "jspdf";
import { RobotoRegular } from "./Roboto-Regular.ttf-normal.js";



function getStatusText(status) {
  switch (status) {
    case "NEW": return "Новая";
    case "IN_PROGRESS": return "В процессе";
    case "DONE": return "Завершена";
    default: return "Неизвестно";
  }
}

function getStatusClass(status) {
  switch (status) {
    case "NEW": return "badge badge-blue";
    case "IN_PROGRESS": return "badge badge-yellow";
    case "DONE": return "badge badge-green";
    default: return "badge";
  }
}


const LeadsTab = () => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [viewingLead, setViewingLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    fetch("http://localhost:3001/applications")
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(console.error);
  };

  const filteredLeads = leads.filter(lead => {
  const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        lead.message.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus = statusFilter ? lead.status === statusFilter : true;

  return matchesSearch && matchesStatus;
});
  const getSourceName = (source) => {
  const sourceMap = {
    ads: "Контекстная реклама",
    smm: "SMM",
    email: "Email-маркетинг",
    direct: "Прямые обращения",
  };
  return sourceMap[source] || "Форма сайта";
}

  // Удаление заявки
  const handleDelete = async (id) => {
    if (!window.confirm("Удалить заявку?")) return;
    try {
      await fetch(`http://localhost:3001/applications/${id}`, { method: "DELETE" });
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (e) {
        console.error(e);
      alert("Ошибка удаления");
    }
  };

  // Начать редактирование
  const startEdit = (lead) => {
    setEditingId(lead.id);
    setEditStatus(lead.status);
    setEditMessage(lead.message);
  };

  // Отмена редактирования
  const cancelEdit = () => {
    setEditingId(null);
    setEditStatus("");
    setEditMessage("");
  };

    const toggleStatusFilter = (status) => {
        setStatusFilter(prev => prev === status ? "" : status);
        setShowFilterMenu(false);
  };

  // Сохранить изменения
  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus, message: editMessage }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLeads(leads.map(lead => (lead.id === id ? updated : lead)));
      cancelEdit();
    } catch {
      alert("Ошибка сохранения");
    }
  };

  // Просмотр заявки (просто показываем в модалке или внизу страницы)
  const handleView = (lead) => {
    setViewingLead(lead);
  };
  const closeView = () => setViewingLead(null);
/////////////
/////////////
/////////////
/////////////
/////////////
    jsPDF.API.events.push([
  "addFonts",
  function () {
    this.addFileToVFS("Roboto-Regular.ttf", RobotoRegular);
    this.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  },
]);

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.setFont("Roboto");
  doc.setFontSize(14);
  doc.text("Заявки (клиент, контакты, сообщение)", 14, 18);

  let y = 30;
  leads.forEach((lead, index) => {
    const lines = [
      `Клиент: ${lead.name}`,
      `Email: ${lead.email}`,
      `Телефон: ${lead.phone}`,
      `Сообщение: ${
        lead.message.length > 100 ? lead.message.slice(0, 97) + "…" : lead.message
      }`,
      "",
    ];
    lines.forEach((line) => {
      doc.text(line, 14, y);
      y += 10;
    });
    if (y > 270 && index !== leads.length - 1) {
      doc.addPage();
      y = 20;
    }
  });
  doc.save("leads_export.pdf");
};
    const exportSingleLeadToPDF = (lead) => {
    const doc = new jsPDF();

    doc.setFont("Roboto", "normal"); // <-- правильное имя шрифта
    doc.setFontSize(14);
    doc.text("Данные заявки", 14, 18);

    const lines = [
        `Клиент: ${lead.name}`,
        `Email: ${lead.email}`,
        `Телефон: ${lead.phone}`,
        `Сообщение: ${lead.message}`
    ];
    lines.forEach((line, index) => {
        doc.text(line, 14, 30 + index * 10);
    });

    doc.save(`Заявка_${lead.name || "клиент"}.pdf`);
};
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
            setViewingLead(null);
            }
        };
        const handleEscape = (event) => {
            if (event.key === "Escape") {
            setViewingLead(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

  return (
    <div className="leads-wrapper">
      <div className="leads-header">
        <h2>Управление заявками</h2>
        <div className="leads-buttons">
            <div className="filter-dropdown">
                <button className={`btn-outline ${statusFilter ? "active" : ""}`}
                onClick={() => setShowFilterMenu(prev => !prev)}>
                <Filter size={16} />
                <span>Фильтр</span>
          </button>
            {showFilterMenu && (
                <div className={`filter-menu ${showFilterMenu ? "show" : ""}`}>
                    <div onClick={() => toggleStatusFilter("NEW")} className={statusFilter === "NEW" ? "selected" : ""}>Новая</div>
                    <div onClick={() => toggleStatusFilter("IN_PROGRESS")} className={statusFilter === "IN_PROGRESS" ? "selected" : ""}>В процессе</div>
                    <div onClick={() => toggleStatusFilter("DONE")} className={statusFilter === "DONE" ? "selected" : ""}>Завершена</div>
                    <div onClick={() => toggleStatusFilter("")} className={statusFilter === "" ? "selected" : ""}>Сбросить</div>
                </div>
            )}
            </div>
          <button className="btn-outline"onClick={exportToPDF}>
            <Download size={16} />
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Все заявки ({filteredLeads.length})</h3>
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Поиск заявок..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="card-content">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Клиент</th>
                <th>Контакты</th>
                <th>Сообщение</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Источник</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>
                    <div className="contact">
                      <Mail size={12} /> {lead.email}
                    </div>
                    <div className="contact">
                      <Phone size={12} /> {lead.phone}
                    </div>
                  </td>
                        <td className="truncate" onClick={() => {
                                if (editingId !== lead.id) startEdit(lead);
                                }}>
                                {editingId === lead.id ? (
                                <textarea
                                value={editMessage}
                                onChange={(e) => setEditMessage(e.target.value)}
                                rows={3}
                                autoFocus
                                onClick={(e) => e.stopPropagation()} // предотврати повторный вызов startEdit
                                />
                            ) : (
                                lead.message
                            )}
                        </td>
                  <td className="date">
                    <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                  <td>{editingId === lead.id ? (
                        <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                        >
                            <option value="NEW">Новая</option>
                            <option value="IN_PROGRESS">В процессе</option>
                            <option value="DONE">Завершена</option>
                        </select>
                        ) : (
                            <span className={getStatusClass(lead.status)}>{getStatusText(lead.status)}</span>)}
                    </td>
                  <td>{getSourceName(lead.source)}</td>
                  <td>
                    <div className="action-buttons">
                      {editingId === lead.id ? (
                        <>
                          <button title="Сохранить" onClick={() => saveEdit(lead.id)}><Check size={18} /></button>
                          <button title="Отмена" onClick={cancelEdit}><X size={18} /></button>
                        </>
                      ) : (
                        <>
                          <button title="Просмотр" onClick={() => handleView(lead)}><Eye size={18} /></button>
                          <button title="Редактировать" onClick={() => startEdit(lead)}><Edit size={18} /></button>
                          <button title="Удалить" className="danger" onClick={() => handleDelete(lead.id)}><Trash2 size={18} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Модалка просмотра */}
          {viewingLead && (
            <div className="modal-backdrop">
                <div className="modal-content" ref={modalRef}>
                <h3>Просмотр заявки</h3>
                <p><strong>Клиент:</strong> {viewingLead.name}</p>
                <p><strong>Email:</strong> {viewingLead.email}</p>
                <p><strong>Телефон:</strong> {viewingLead.phone}</p>
                <p><strong>Сообщение:</strong> {viewingLead.message}</p>
                <p><strong>Дата:</strong> {new Date(viewingLead.createdAt).toLocaleString("ru-RU")}</p>
                <p><strong>Статус:</strong> {getStatusText(viewingLead.status)}</p>
                <button className="btn-close" onClick={closeView}>Закрыть</button>
                <button
                        className="btn-outlineModal"
                        onClick={() => exportSingleLeadToPDF(viewingLead)}
                    >
                        <Download size={16} style={{ marginRight: 6 }} />
                        Экспорт в PDF
                    </button>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LeadsTab;