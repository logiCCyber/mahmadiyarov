const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#login').value;
    const password = document.querySelector('#pass').value;

    const response = await fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await response.json();
    console.log(data.token);
    if(response.ok) {
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem("token");
            await fetch("/admin", {
            method: 'GET',
            headers: {
                    "Content-Type": "application/json", // Тип содержимого
                    "Authorization": `Bearer ${token}` // Заголовок авторизации
                }
            }); 
    } else {
         console.log("Toekn is not");   
    }        
});
