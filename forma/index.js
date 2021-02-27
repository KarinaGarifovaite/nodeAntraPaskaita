let token;
let globalItems;
const url = "http://localhost:3000/api/v1/";


window.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    token = localStorage.getItem("todo-auth");
    if (!token) window.location.href = "login.html";
    getAllItems();
    getImage();
});

document.querySelector("#submitButton").addEventListener("click", async () => {
    let value = document.querySelector("#labelInput").value;
    let body = {
        label: value,
    };
    if (!value) return;
    try {
        const response = await fetch(url + "todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "todo-auth": token,
            },
            body: JSON.stringify(body),
        });
        if (response.status != 200) throw await response.json();

        let createdItem = await response.json();
        globalItems.push(createdItem)
        displayAllItems(globalItems)
        document.querySelector("#labelInput").value = "";

    } catch (err) {
        console.log(err);
    }
});

getAllItems = async () => {
    try {
        const response = await fetch(url + "todo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "todo-auth": token,
            },
        });
        if (response.status != 200) throw await response.json();
        let items = await response.json();
        globalItems = items;
        displayAllItems(items);
    } catch (err) {
        console.log(err);
    }
};

displayAllItems = (items) => {
    let ul = document.getElementById("list");
    let liItems = "";
    items.forEach((todo, index) => {
        liItems += `<li class="list-group-item d-flex justify-content-between">
              <input class="form-check-input me-1" type="checkbox" value="" ${
                todo.done ? "checked" : ""
              } onclick='changeStatus("${todo._id}", ${index})'>
              ${todo.label}
              <span class="badge bg-primary rounded-pill" onclick='removeItem("${todo._id}", ${index})'>X</span>
          </li>`;
    });
    ul.innerHTML = liItems;
};

changeStatus = async (id, index) => {
    console.log(globalItems);
    try {
        let body = {
            done: !globalItems[index].done,
        };
        const response = await fetch(url + "todo/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "todo-auth": token,
            },
            body: JSON.stringify(body),
        });
        if (response.status !== 200) throw await response.json();
        console.log(await response.json());
    } catch (err) {
        console.log(err);
    }
};

removeItem = async (id, index) => {
    try {
        globalItems.splice(index, 1);
        displayAllItems(globalItems)
        const response = await fetch(url + 'todo/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "todo-auth": token,
            },
        })
    } catch (err) {
        console.log(err)
    }
};

// logout

const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/user/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "todo-auth": token,
            },

        })
        if (response.status != 200) throw await response.json()
        localStorage.removeItem('todo-auth', token)
        console.log(await response.json())
        window.location.href = 'login.html'
    } catch (err) {
        console.log(err)
    }
})

//upload
document.getElementById('uploadFile').addEventListener('click', async () => {

    if (document.getElementById('fileInput').isDefaultNamespace.length === 0)
        return;
    let file = document.getElementById('fileInput').files[0];
    console.log(file);
    let formData = new FormData();
    formData.append('test', file);

    try {
        const response = await fetch(url + 'uploadImage', {
            method: 'POST',
            headers: {
                'todo-auth': token,
            },
            body: formData,
        });
        getImage();
    } catch (err) {
        console.log(err);
    }

});

getImage = async () => {

    try {
        const response = await fetch(url + "user/getAvatarURL", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "todo-auth": token,
            },
        });
        if (response.status != 200) throw await response.json();
        let items = await response.json();
        let imgCont = document.querySelector('#img-cont')
        imgCont.src = 'http://localhost:3000/' + items;

    } catch (err) {
        console.log(err)
    }
}