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
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.status === 401) {
            // Если статус 401, значит неверные данные
            throw new Error("Invalid credentials");
        }

        if (!response.ok) {
            // Обработка других ошибок
            throw new Error("An error occurred");
        }

        const data = await response.json();
        const token = data.token;

        // Сохраняем токен в cookie
        document.cookie = `token=${token}; path=/; max-age=3600`; // Токен действителен 1 час

        window.location.href = "/admin"; // Перенаправляем пользователя
        console.log(token);

    } catch (error) {
        console.log(error.message);
        alert("Username or password incorrect"); // Показываем ошибку, если что-то пошло не так
    }
});
