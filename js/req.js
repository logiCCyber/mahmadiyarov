// Функция для получения токена из cookies
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

const accessToResource = async function () {
    // Получаем токен из cookie
    const token = getCookie("token");
    console.log(token);

    if (!token) {
        // Если токена нет, перенаправляем на страницу входа
        console.log("No token found, redirecting to login...");
        window.location.href = "/login";
        return; // Завершаем выполнение функции
    }

    console.log("Authorization:", `Bearer ${token}`);
    try {
        const result = await fetch("/admin", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
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
