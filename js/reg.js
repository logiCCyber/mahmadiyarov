(() => {
  'use strict'

  // Получаем все формы с классом .needs-validation
  const forms = document.querySelectorAll('.needs-validation')

  // Перебираем формы и добавляем обработчик события
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', async (event) => {
      // Останавливаем отправку формы, если она невалидна
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        // Если форма валидна, выполняем асинхронный запрос
        event.preventDefault(); // Останавливаем стандартную отправку формы

        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            password: document.getElementById("password").value,
            salary: document.getElementById("salary").value,
          })
        });

        const data = await response.json();
        console.log(data);
      }

      // Добавляем класс для отображения ошибок валидации
      form.classList.add('was-validated')
    }, false)
  })
})();
