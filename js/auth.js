const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#login').value;
    const password = document.querySelector('#pass').value;

    const response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    try {
        if (response.status === 401) {
            throw new Error("Invalid credentials");
            alert("Username or password incorrect");
        }

        if (!response.ok) {
            throw new Error("An error occurred");
        }

        const data = await response.json();
        const token = data.token;

        // Сохраняем токен в cookie
        document.cookie = `token=${token}; path=/; max-age=3600`; // Токен действителен 1 час

        window.location.href = "/admin";
        console.log(token);

    } catch (error) {
        console.log(error.message);
    }
});
