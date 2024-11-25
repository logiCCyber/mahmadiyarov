// auth.js

// Получаем форму и добавляем обработчик события отправки формы
const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Отменяем стандартное поведение формы

    // Получаем данные из полей формы
    const username = document.querySelector('#login').value;
    const password = document.querySelector('#pass').value;

    // Отправляем запрос на сервер для авторизации
    const result = await fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    // Преобразуем ответ в JSON
    const data = await result.json();
    console.log(data);  // Логируем данные для отладки

    if (result.ok) {
        // Сохраняем токен в localStorage
        localStorage.setItem("token", data.token);

        // Перенаправляем в зависимости от роли
        if (data.role === "admin") {
            window.location.href = "/admin";  // Перенаправление на страницу администратора
        } else if (data.role === "client") {
            window.location.href = "/client";  // Перенаправление на страницу клиента
        }
    } else {
        console.log("Authorization failed");
        // Здесь можно добавить обработку ошибок, если авторизация не прошла
        alert("Ошибка авторизации. Пожалуйста, проверьте ваши данные.");
    }

    // Очищаем поля формы после отправки
    document.querySelector('#login').value = "";
    document.querySelector('#pass').value = "";
});
