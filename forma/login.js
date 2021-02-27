let form = document.querySelector('#form');
let singUp = document.querySelector('#sign-up')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    let data = {
        username,
        password
    }
    try {
        const response = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.status != 200) throw await response.json()
        let token = response.headers.get('todo-auth');
        localStorage.setItem('todo-auth', token)
        console.log(await response.json())
        window.location.href = 'index.html'
    } catch (err) {
        alert(err)
    }
})

singUp.addEventListener('click', async () => {
    window.location.href = 'sign-up.html'
})