import { createContext, useState, useEffect } from "react";

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [contentId, setContentId] = useState(null);

  useEffect(() => {
    fetch("http://109.172.38.23:3001/content")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setContent(data);
          setContentId(data.id);
        }
      })
      .catch((err) => console.error("Ошибка загрузки контента", err));
  }, []);

  const updateContent = (newData) => {
    setContent((prev) => ({ ...prev, ...newData }));
  };

  return (
    <ContentContext.Provider value={{ content, contentId, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};