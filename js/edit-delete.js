// Получение элементов формы и кнопок
const form = document.getElementById('employee-form');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');

// Функция для отправки данных на сервер
async function sendRequest(url, method, data = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error.message);
    alert(`Operation failed: ${error.message}`);
  }
}

// Обработчик для редактирования сотрудника
editButton.addEventListener('click', async () => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()); // Преобразуем FormData в объект

  const result = await sendRequest('/api/employee', 'PUT', data);
  if (result) {
    alert('Employee updated successfully!');
  }
});

// Обработчик для удаления сотрудника
deleteButton.addEventListener('click', async () => {
  const username = form.querySelector('#username').value;

  if (!username) {
    alert('Please provide a username to delete.');
    return;
  }

  const result = await sendRequest(`/api/employee/${username}`, 'DELETE');
  if (result) {
    alert('Employee deleted successfully!');
  }
});
