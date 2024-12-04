document.addEventListener("DOMContentLoaded", () => {
  const employeeForm = document.getElementById("employee-form");
  const editButton = document.getElementById("edit-button");
  const deleteButton = document.getElementById("delete-button");

  // Событие для редактирования
  editButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const selectedEmployee = document.getElementById("employee-select").value;
    const name = document.getElementById("firstName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const jobTitle = document.querySelector("select[class='form-select  bg-secondary text-light border-dark.job']").value;
    const salary = document.getElementById("salary").value;

    if (!selectedEmployee) {
      alert("Please select an employee to edit.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("job", jobTitle);
    formData.append("salary", salary);

    try {
      const response = await fetch(`/update/${selectedEmployee}`, {
        method: "PUT",
        body: formData,
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

    const selectedEmployee = document.querySelector("select[class='form-select  bg-secondary text-light border-dark']").value;

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
