let githubForm = document.querySelector("#github-form");
let userList = document.querySelector("#user-list");
let reposList = document.querySelector("#repos-list");

let userSearchBtn = document.querySelector("#user-search");
let repoSearchBtn = document.querySelector("#repo-search");

userSearchBtn.addEventListener('click', () => {
    userSearchBtn.name = "submit";
    repoSearchBtn.name = "";
});

repoSearchBtn.addEventListener('click', () => {
   repoSearchBtn.name = "submit";
   userSearchBtn.name = "";
});

//add event listener submit to form
githubForm.addEventListener('submit', (e) => {
    e.preventDefault();
     userList.innerHTML = "";
    reposList.innerHTML = "";

    let inputValue = e.target.search.value; //search value
    
    if (e.target["user-search"].name === 'submit') {
        fetchUsers(inputValue); //call api fetch
    } else if (e.target["repo-search"].name === "submit") {
        // console.log("fetchRepo")
        fetchRepos(inputValue);
    }
});


function fetchRepos(repo) {
    let ROOT_URL = `https://api.github.com/search/repositories?q=${repo}`;
    fetch(`${ROOT_URL}`)
        .then(res => res.json())
        .then(reposObj => {
            reposObj.items.forEach(turnReposObjToHtml)
        });
}

//api fetch to search users
function fetchUsers(user) {
    let ROOT_URL = "https://api.github.com/search/users?q="
    fetch(`${ROOT_URL}${user}`)
    .then(res => res.json())
    .then(usersObj => {
        usersObj.items.forEach(turnUsersObjToHtml);
    });
}
    
function turnUsersObjToHtml(user) {
    let list = document.createElement('li');
    list.innerHTML = `
        <div class="user-profile">
            <img src="${user.avatar_url}" class="profile-img" width="90">
            <span>${user.login}</span>
            <a href="${user.html_url}" class="user-link" target="_blank">Github link</a>
            <button class="repo-btn">Repos</button>
        </div>
        `;

    userList.append(list);
    
    let repoBtn = list.querySelector('.repo-btn');

    repoBtn.addEventListener('click', () => {
        fetchUsersRepos(user.login);
    });
}

function fetchUsersRepos(user) {
    let URL = `https://api.github.com/users/${user}/repos`;
    fetch(`${URL}`)
    .then(res => res.json())
    .then(reposObj => {
        reposObj.forEach(turnReposObjToHtml)
    });
}

function turnReposObjToHtml(repo) {
    let list = document.createElement('li');
    list.innerHTML = `<a href=${repo.html_url} target="_blank">${repo.name}</a>`;
    reposList.append(list);
}
    



