// Твоя адреса API (порт 5284, як у тебе в терміналі)
const API_URL = "myapi-production-dbce.up.railway.app";

// ==========================================
// ЛОГІКА РЕЄСТРАЦІЇ
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
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    login: loginValue, 
                    password: passwordValue 
                })
            });

            const data = await response.json();

            // 4. Дивимось на результат
            if (response.ok) {
                alert("Успіх: " + data.message);
                // Тут можна перекинути на сторінку входу, якщо хочеш:
                // window.location.href = "login.html"; 
            } else {
                // Якщо помилка (наприклад, такий юзер вже є)
                alert("Помилка: " + data.message);
            }
        } catch (error) {
            console.error("Помилка:", error);
            alert("Не вдалося з'єднатися з сервером. Перевір, чи запущено dotnet run");
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
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    login: loginValue, 
                    password: passwordValue 
                })
            });

            const data = await response.json();

            // 4. Результат
            if (response.ok) {
                alert("Вхід успішний! Ваш ID: " + data.userId);
                // Тут можна перекинути на головну сторінку сайту
                // window.location.href = "dashboard.html"; 
            } else {
                alert("Помилка: " + data.message);
            }
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
    window.location.href = "register.html";
  });
}

if (goLogin) {
  goLogin.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "login.html";
  });
}

