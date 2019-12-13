const searchForm = document.querySelector('#github-form')
const searchSelector = document.querySelector('#search-select')
let userList = document.querySelector('#user-list')
let repoList = document.querySelector('#repos-list')
let searchType = searchSelector.value
searchSelector.addEventListener("change", event => searchType = event.target.value)
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchValue = event.target.search.value
    searchType === 'user' ? makeJSONtoHTML(searchValue) : repoSearch(searchValue)
})

const clearList = (list) => {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
}
function repoSearch(input) {
    clearList(userList)
    clearList(repoList)
    fetch(`https://api.github.com/search/repositories?q=${input}`,{
        headers: {
            'accept':'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(json => {
        let reposArray = json.items
        reposArray.forEach(repo => {
            let repoLi = document.createElement('li')
            repoLi.innerHTML = `<a href=${repo.html_url}>${repo.name}</a> By: <a href=${repo.owner.html_url}>${repo.owner.login}</a>`
            repoList.append(repoLi)
        })
    })
}
function makeJSONtoHTML(input) {
    clearList(userList)
    clearList(repoList)
    fetch(`https://api.github.com/search/users?q=${input}`,{
        headers: {
            'accept':'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(json => {
        let usersArray = json.items
        usersArray.forEach(user => {
            let userLi = document.createElement('li')
            userLi.innerText = user.login
            userLi.addEventListener('click', () => {
                liEventHandling(user)
            })
            userList.append(userLi)
        });
    })
}

const liEventHandling = (userObj) => {
    let repoList = document.querySelector('#repos-list')
    clearList(repoList)
    fetch(`https://api.github.com/users/${userObj.login}/repos`,{
        hearders: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(json => {
        let reposArray = json
        console.log(reposArray)
        reposArray.forEach( repo => {
            let repoLi = document.createElement('li')
            repoLi.innerHTML = `<a href=${repo.html_url}>${repo.name}</a>`
            repoList.append(repoLi)
        })   
    })
}
