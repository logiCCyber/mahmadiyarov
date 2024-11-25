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

    const data = await result.json();
    
    if (result.ok) {
        // Сохраняем токен в localStorage
        localStorage.setItem("token", data.token);

        // Перенаправляем в зависимости от роли
        if (data.role === 'admin') {
            window.location.href = "/admin"; // Перенаправление на страницу администратора
        } else if (data.role === 'client') {
            window.location.href = "/client";  // Перенаправление на страницу клиента
        }
    } else {
        console.log("Authorization failed");
    }
});
