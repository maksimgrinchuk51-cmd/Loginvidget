// Твоя адреса API (порт 5284, як у тебе в терміналі)
// Твоя адреса API 
const API_URL = "https://myapi-production-dbce.up.railway.app/api"; // <-- Закінчується на /api

// ==========================================
// ЛОГІКА РЕЄСТРАЦІЇ (Sign up)
// ==========================================

// 1. Шукаємо кнопку реєстрації в HTML за її ID "submitbtn"
const registerButton = document.getElementById("submitbtn");

// Перевіряємо, чи є ця кнопка на сторінці (щоб не було помилок на сторінці логіна)
if (registerButton) {
    registerButton.addEventListener("click", async function() {
        // 2. Беремо дані, які ввів користувач
        const loginValue = document.getElementById("regUsername").value;
        const passwordValue = document.getElementById("regPassword").value;

        // Перевірка, щоб поля не були пусті
        if(!loginValue || !passwordValue) {
            alert("Будь ласка, заповніть логін і пароль");
            return;
        }

        try {
            // 3. Відправляємо запит на сервер
            // ВИПРАВЛЕНО: Видалено зайвий "/api" з URL. Тепер це `${API_URL}/register`
            const response = await fetch(`https://myapi-production-dbce.up.railway.app/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    login: loginValue, 
                    password: passwordValue 
                })
            });

            // Перевіряємо, чи отримали ми відповідь
            if (!response.ok) {
                 // Отримаємо тіло помилки, навіть якщо це 400, 404 або 500
                const errorData = await response.json();
                alert("Помилка: " + (errorData.message || response.statusText));
                return;
            }

            const data = await response.json();

            // 4. Дивимось на результат
            alert("Успіх: " + (data.message || "Реєстрація пройшла успішно!"));
            // Тут можна перекинути на сторінку входу, якщо хочеш:
            // window.location.href = "login.html"; 
            
        } catch (error) {
            console.error("Помилка:", error);
            alert("Не вдалося з'єднатися з сервером. Перевір, чи запущено API.");
        }
    });
}

// ==========================================
// ЛОГІКА ВХОДУ (LOGIN)
// ==========================================

// 1. Шукаємо кнопку входу в HTML за її ID "loginBtn"
const loginButton = document.getElementById("loginBtn");

if (loginButton) {
    loginButton.addEventListener("click", async function() {
        // 2. Беремо дані
        const loginValue = document.getElementById("loginUsername").value;
        const passwordValue = document.getElementById("loginPassword").value;

        if(!loginValue || !passwordValue) {
            alert("Будь ласка, заповніть всі поля");
            return;
        }

        try {
            // 3. Відправляємо запит
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    login: loginValue, 
                    password: passwordValue 
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Помилка: " + (errorData.message || response.statusText));
                return;
            }

            const data = await response.json();

            // 4. Результат
            alert("Вхід успішний! Ваш ID: " + (data.userId || "ID не знайдено"));
            // Тут можна перекинути на головну сторінку сайту
            // window.location.href = "dashboard.html"; 
            
        } catch (error) {
            console.error("Помилка:", error);
            alert("Сервер не відповідає.");
        }
    });
}

// ==========================================
// ПЕРЕХОДИ МІЖ СТОРІНКАМИ (Посилання)
// ==========================================


const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");


if (goRegister) {
  goRegister.addEventListener("click", function (e) {
    e.preventDefault();
    // Виправлення: використовуємо register.html, оскільки він є на Vercel
    window.location.href = "register.html"; 
  });
}

if (goLogin) {
  goLogin.addEventListener("click", function (e) {
    e.preventDefault();
    // Виправлення: використовуємо login.html
    window.location.href = "login.html"; 
  });
}
