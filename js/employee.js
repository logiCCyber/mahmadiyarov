const form = document.querySelector('#form_reg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Получаем значения полей формы
    const name = document.querySelector('#firstName');
    const user = document.querySelector('#username');
    const pass = document.querySelector('#password');
    const confirm = document.querySelector('#confirm');
    const job = document.querySelector('#job');
    const salary = document.querySelector('#salary');

    try {
         if (pass !== confirm) {
        alert("Passwords do not match.");
        return;
    }
        // Отправляем данные на сервер
        const response = await fetch("/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                user,
                pass,
                job,
                salary
            })
        });

        // Получаем ответ сервера
        const data = await response.json();

        // Если успех, показываем сообщение
        if (data.success) {
            alert("The employee is added");
            form.reset(); // Сброс формы после успешной регистрации
        } else {
            alert("There was an error adding the employee.");
        }
    } catch (error) {
        console.error("Request failed", error);
        alert("An error occurred. Please try again.");
    }
});
