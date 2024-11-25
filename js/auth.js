
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
        body: JSON.stringify({
            username,
            password
        })
    });

    if (result.ok) { // Успешная авторизация
        const data = await result.json();
        localStorage.setItem("token", data.token); // Сохраняем токен
        window.location.href = "/admin"; // Перенаправление на admin.html
    } else {
        console.log("Authorization failed");
    }
    username.value = "";
    password.value = "";
});
