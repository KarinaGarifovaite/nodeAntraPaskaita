let form = document.querySelector('#form');
let login = document.querySelector('#login');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    let email = document.querySelector('#email').value

    let data = {
        username,
        password,
        email
    }
    try {
        const response = await fetch('http://localhost:3000/api/v1/user/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.status != 200) throw await response.json()
        window.location.href = 'login.html'
    } catch (err) {
        console.log(err)
    }
})

login.addEventListener('click', () => {
    window.location.href = 'login.html'
})