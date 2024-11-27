const accessToResource = async function () {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        // Если токена нет, перенаправляем на страницу входа
        window.location.href = "/login";
        return; // Завершаем выполнение функции
    }
    console.log("Authorization:", `Bearer ${token}`);
    try {
        const result = await fetch("/admin", {
            method: "GET",
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlcklkIjoxMDAsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoicm9vdCIsInBhc3N3b3JkIjoiMTIzIn0sImlhdCI6MTczMjcyMTY2NiwiZXhwIjoxNzMyNzI1MjY2fQ.vHUblIPw6vFEOUuY24zrBLo4936BS99oOOyeBDK2k_g`
            }
        });
        
        // Проверяем, успешен ли ответ
        if (!result.ok) {
            if (result.status === 401 || result.status === 403) {
                // Если токен недействителен, перенаправляем на страницу входа
                window.location.href = "/login";
            } else {
                // Обработка других ошибок
                throw new Error(`Error: ${result.status}`);
            }
        }

        const data = await result.json(); // Обрабатываем успешный ответ
        console.log("Access granted:", data);

    } catch (error) {
        // Ловим сетевые ошибки или другие неожиданные проблемы
        console.error("An error occurred:", error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    accessToResource();
});
