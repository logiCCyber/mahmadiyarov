const form = document.querySelector('#form_reg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Получаем значения полей формы
    const name = document.querySelector('[name="name"]').value;
    const user = document.querySelector('[name="user"]').value;
    const pass = document.querySelector('[name="pass"]').value;
    const confirm = document.querySelector('[name="confirm"]').value;
    const job = document.querySelector('[name="job"]').value;
    const salary = document.querySelector('[name="salary"]').value;
    console.log(pass, name);
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
    console.log(data);
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
