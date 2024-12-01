const form = document.querySelector('#form_reg');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(document.querySelector("#firstName").value);
    // const name = document.querySelector("#firstName");
    // const user = document.querySelector("#username");
    // const pass = document.querySelector("#password");
    // const confirm = document.querySelector("#confirm");
    // const job = document.querySelector("#job");
    // const salary = document.querySelector("#salary");

    // const response = await fetch("/registration", {
    //    method: "POST",
    //    headers: {
    //         "Content-Type": "application/json"
    //    },
    //    body: JSON.stringify({
    //         name.value,
    //         user.value,
    //         pass.value,
    //         confirm.value,
    //         job.value,
    //         salary.value
    //    }) 
    // });

    // const data = await response.json();
    // console.log(data);    
});
