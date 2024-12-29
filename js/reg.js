(() => {
  'use strict'

  // Получаем все формы с классом .needs-validation
  const forms = document.querySelectorAll('.needs-validation')

  // Перебираем формы и добавляем обработчик события
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', async (event) => {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Проверяем, совпадают ли пароли
      if (password !== confirmPassword) {
        event.preventDefault();
        event.stopPropagation();
        const confirmField = document.getElementById("confirmPassword");
        confirmField.setCustomValidity("Пароли не совпадают");
        confirmField.reportValidity(); // Показываем сообщение об ошибке
      } else {
        document.getElementById("confirmPassword").setCustomValidity(""); // Сбрасываем ошибку
      }

      // Останавливаем отправку формы, если она невалидна
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
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
            username: document.getElementById("username").value,
            password: password,
            salary: document.getElementById("salary").value,
          })
        });

        const data = await response.json();
        console.log(data);
      }

      // Добавляем класс для отображения ошибок валидации
      form.classList.add('was-validated');
    }, false);
  });
})();
