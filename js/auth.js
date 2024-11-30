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

        // Перенаправляем в зависимости от роли пользователя
        const decoded = jwt.decode(token);
        if (decoded.role === 'admin') {
            window.location.href = "/admin";  // Перенаправляем в админскую панель
        } else if (decoded.role === 'client') {
            window.location.href = "/client";  // Перенаправляем на страницу клиента
        }

    } catch (error) {
        console.log(error.message);
        alert("Username or password incorrect");
    }
});
