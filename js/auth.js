// client-side JavaScript (например, в login.js)
const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#login').value;
    const password = document.querySelector('#pass').value;

    try {
        const response = await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 401) {
            throw new Error("Invalid credentials");
        }

        if (!response.ok) {
            throw new Error("An error occurred");
        }

        const data = await response.json();
        const token = data.token;

        // Сохраняем токен в cookie
        document.cookie = `token=${token}; path=/; max-age=3600`;  // Токен действителен 1 час

        // Теперь перенаправляем в зависимости от роли пользователя
        // Роль пользователя передается на сервере в токене
        // Редиректим в /admin или /client в зависимости от роли
        if (token) {
            // Отправляем токен на сервер для проверки роли
            const decoded = JSON.parse(atob(token.split('.')[1])); // Декодируем payload токена (без проверки подписи)
            const userRole = decoded.role;  // Извлекаем роль пользователя

            if (userRole === 'admin') {
                window.location.href = "/admin";  // Перенаправляем в админскую панель
            } else if (userRole === 'client') {
                window.location.href = "/client";  // Перенаправляем на страницу клиента
            }
        }

    } catch (error) {
        console.log(error.message);
        alert("Username or password incorrect");
    }
});
