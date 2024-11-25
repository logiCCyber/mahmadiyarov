// auth.js

const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#login').value;
    const password = document.querySelector('#pass').value;

    const result = await fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const data = await result.json();
    console.log(data);

    if (result.ok) {
        localStorage.setItem("token", data.token);
        if (data.role === "admin") {
            window.location.href = "/admin"; // Переход на страницу администратора
        } else if (data.role === "client") {
            window.location.href = "/client"; // Переход на страницу клиента
        }
    } else {
        alert("Ошибка авторизации");
    }

    document.querySelector('#login').value = "";
    document.querySelector('#pass').value = "";
});

// Проверка токена перед доступом к защищенным маршрутам
const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
        const response = await fetch("/admin", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log('Token is valid');
        } else {
            console.log('Token is invalid');
            window.location.href = "/"; // Перенаправление, если токен недействителен
        }
    } else {
        window.location.href = "/"; // Перенаправление на страницу входа, если нет токена
    }
};

// Вызываем проверку на защищенных страницах
if (window.location.pathname === '/admin' || window.location.pathname === '/client') {
    checkAuth();
}
