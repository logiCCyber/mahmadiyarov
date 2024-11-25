const result = await fetch("/", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username,
        password
    })
});

const data = await result.json();
console.log(data);  // Логируем данные, чтобы удостовериться, что они правильные

if (result.ok) {
    // Сохраняем токен в localStorage
    localStorage.setItem("token", data.token);

    if (data.role === "admin") {
        window.location.href = "/admin";
    } else if (data.role === "client") {
        window.location.href = "/client";
    }
} else {
    console.log("Authorization failed");
}
