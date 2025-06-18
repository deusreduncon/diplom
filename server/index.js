const express = require("express");
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());


// Регистрация
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(409).json({ message: "Пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  res.json({ message: "Пользователь создан", user: { id: newUser.id, name: newUser.name } });
});

// Логин
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email и пароль обязательны" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Пользователь не найден" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Неверный пароль" });
  }

  res.json({ message: "Успешный вход", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});



// Создание заявки

app.listen(PORT,'::', () => {
  console.log(`🚀 Сервер запущен на http://109.107.38.23:${PORT}`);
});


app.post('/applications', async (req, res) => {
  const { name, phone, email, message, userId, source } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  try {
    const newApplication = await prisma.application.create({
      data: {
        name,
        phone,
        email,
        message,
        userId,
        source,
      },
    });

    res.json({ message: 'Заявка сохранена', application: newApplication });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение всех заявок
app.get("/applications", async (_req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения заявок" });
  }
});

// Получение одной заявки
app.get('/applications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const application = await prisma.application.findUnique({
      where: { id: Number(id) }
    });
    if (!application) return res.status(404).json({ message: 'Заявка не найдена' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновление заявки
app.put('/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { status, message } = req.body;
  try {
    const updatedApp = await prisma.application.update({
      where: { id: Number(id) },
      data: { status, message },
    });
    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления заявки' });
  }
});

// Удаление заявки
app.delete('/applications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.application.delete({ where: { id: Number(id) } });
    res.json({ message: 'Заявка удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления заявки' });
  }
});

// Изменение статуса заявки
app.put("/applications/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['NEW', 'IN_PROGRESS', 'DONE'].includes(status)) {
    return res.status(400).json({ message: 'Неверный статус' });
  }
  try {
    const updated = await prisma.application.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления" });
  }
});

// Контент
app.get("/content", async (_req, res) => {
  const content = await prisma.content.findFirst();
  if (!content) return res.status(404).json({ message: "Content not found" });
  res.json(content);
});

app.put("/content/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.content.update({
      where: { id: Number(id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления контента" });
  }
});

// Настройки
app.get("/settings", async (_req, res) => {
  const settings = await prisma.settings.findFirst();
  res.json(settings);
});

app.put("/settings/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updated = await prisma.settings.update({ where: { id: Number(id) }, data });
  res.json(updated);
});

// Дашборд
app.get("/dashboard/stats", async (_req, res) => {
  try {
    const totalApplications = await prisma.application.count();
    const newApplications = await prisma.application.count({ where: { status: "NEW" } });
    const inProgressApplications = await prisma.application.count({ where: { status: "IN_PROGRESS" } });
    const doneApplications = await prisma.application.count({ where: { status: "DONE" } });

    const totalUsers = await prisma.user.count();
    const totalServices = await prisma.service.count({ where: { active: true } });

    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        status: true
      }
    });

    res.json({
      totalApplications,
      newApplications,
      inProgressApplications,
      doneApplications,
      totalUsers,
      totalServices,
      recentApplications
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Пользователи
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении пользователей" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID пользователя" });
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Пользователь не найден или ошибка при удалении" });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID пользователя" });
  }

  if (!name || !role) {
    return res.status(400).json({ error: "Требуется имя и роль пользователя" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, role },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Пользователь не найден или ошибка при обновлении" });
  }
});

// Профиль
app.put("/profile/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID пользователя" });
  }

  const { name, email, phone } = req.body;

  if (email) {
    const emailInUse = await prisma.user.findFirst({
      where: { email, NOT: { id } },
    });
    if (emailInUse) {
      return res.status(400).json({ error: "Email уже используется" });
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, phone },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Не удалось обновить профиль" });
  }
});


// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

async function createAdminIfNotExists() {
  const email = "admin@example.com";
  const password = "admin123";

  // Проверяем, есть ли уже админ
  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (existingAdmin) {
    console.log("Админ уже существует");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Админ создан:", admin);
}

// Запускаем после старта сервера
createAdminIfNotExists().catch(console.error);

