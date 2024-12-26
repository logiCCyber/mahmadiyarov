
document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            password: document.getElementById("password").value,
            salary: document.getElementById("salary").value,
        })
    });

    const data = await response.json();
    console.log(data);
});

console.log("asdfasdf");