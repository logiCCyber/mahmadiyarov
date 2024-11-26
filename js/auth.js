const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Останавливаем отправку формы

    const username = document.querySelector('#login').value; // Получаем логин
    const password = document.querySelector('#pass').value; // Получаем пароль

    try {
        // Запрос на авторизацию
        const response = await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }) // Отправляем данные в формате JSON
        });

        const data = await response.json(); // Получаем ответ в формате JSON
        console.log(data.token);

});
