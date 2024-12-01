const form = document.querySelector('#form_reg');
console.log("super");
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector("#firstName").value;
    const user = document.querySelector("#username").value;
    const pass = document.querySelector("#password").value;
    const confirm = document.querySelector("#confirm").value;
    const job = document.querySelector("#job").value;
    const salary = document.querySelector("#salary").value;

    const response = await fetch("/registration", {
       method: "POST",
       headers: {
            "Content-Type": "application/json"
       },
       body: JSON.stringify({
            name,
            user,
            pass,
            confirm,
            job,
            salary
       }) 
    });

    const data = await response.json();
    console.log(data);    
});
