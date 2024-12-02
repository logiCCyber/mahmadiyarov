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
        // Отправляем данные на сервер
        const response = await fetch("/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                user: user.value,
                pass: pass.value,
                confirm: confirm.value,
                job: job.value,
                salary: salary.value,
            })
        });

        // Получаем ответ сервера
        const data = await response.json();

        // Если успех, показываем сообщение
        if (data.success) {
            alert("The employee is added");
        } else {
            alert("There was an error adding the employee.");
        }
    } catch (error) {
        console.error("Request failed", error);
        alert("An error occurred. Please try again.");
    }
});
