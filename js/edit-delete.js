document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("edit-button");
  const deleteButton = document.getElementById("delete-button");

  // Событие для редактирования
  editButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const selectedEmployee = document.getElementById("employee-select").value;
    const name = document.getElementById("firstName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const jobTitle = document.querySelector("select[class='form-select bg-secondary text-light border-dark']").value;
    const salary = document.getElementById("salary").value;

    if (!selectedEmployee) {
      alert("Please select an employee to edit.");
      return;
    }

    const updateData = {
      name,
      username,
      password,
      job: jobTitle,
      salary
    };

    try {
      const response = await fetch(`/update/${selectedEmployee}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Отправка данных как JSON
      });

      const result = await response.json();
      if (result.success) {
        alert("Employee updated successfully!");
      } else {
        alert("Failed to update employee: " + result.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  });

  // Событие для удаления
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const selectedEmployee = document.getElementById("employee-select").value;

    if (!selectedEmployee) {
      alert("Please select an employee to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(`/delete/${selectedEmployee}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        alert("Employee deleted successfully!");
        // Обновляем список сотрудников
        document.querySelector(`option[value="${selectedEmployee}"]`).remove();
      } else {
        alert("Failed to delete employee: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  });
});
