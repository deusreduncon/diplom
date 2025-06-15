const express = require("express");
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt= require('bcryptjs');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());



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

  // Успешный логин — возвращаем минимальную информацию о пользователе
  res.json({ message: "Успешный вход", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

app.post('/applications', async (req, res) => {
  const { name, phone, email, message, userId,source } = req.body;

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
app.delete('/applications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.application.delete({ where: { id: Number(id) } });
    res.json({ message: 'Заявка удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления заявки' });
  }
});
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

// 📄 Услуги (ServiceTab)

// 📄 Контент (ManageContent)
app.get("/content", async (_req, res) => {
  const content = await prisma.content.findFirst();
  console.log("Content from DB:", content);
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

// 📄 Настройки (SettingsTab)
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
    } );

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

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error("Ошибка при получении пользователей:", err);
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
    console.error(`Ошибка при удалении пользователя с id=${id}:`, err);
    // Если пользователь не найден — Prisma выбросит ошибку, можно проверить её тип и вернуть 404, иначе 500
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
    console.error(`Ошибка при обновлении пользователя с id=${id}:`, err);
    res.status(500).json({ error: "Пользователь не найден или ошибка при обновлении" });
  }
});

