document.addEventListener("DOMContentLoaded", () => {
  const employeeSelect = document.getElementById("employee");
  const updateButton = document.getElementById("updateButton");
  const deleteButton = document.getElementById("deleteButton");

  // Обработчик для кнопки обновления
  updateButton.addEventListener("click", async () => {
    const selectedEmployeeId = employeeSelect.value;

    if (!selectedEmployeeId) {
      alert("Please select an employee to update.");
      return;
    }

    try {
      const response = await fetch(`/update/${selectedEmployeeId}`, {
        method: "PUT", // Предполагается, что обновление использует метод PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Данные для обновления можно передать здесь
          name: "Updated Name",
          job: "Updated Job",
        }),
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

  // Обработчик для кнопки удаления
  deleteButton.addEventListener("click", async () => {
    const selectedEmployeeId = employeeSelect.value;

    if (!selectedEmployeeId) {
      alert("Please select an employee to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(`/delete/${selectedEmployeeId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        alert("Employee deleted successfully!");
        // Обновление списка сотрудников после удаления
        employeeSelect.querySelector(`option[value="${selectedEmployeeId}"]`).remove();
      } else {
        alert("Failed to delete employee: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  });
});
