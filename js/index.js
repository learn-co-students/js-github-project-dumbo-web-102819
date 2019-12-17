const gitForm = document.getElementById("github-form")
const userListUl = document.getElementById("user-list")
const userRepoUL = document.getElementById("repos-list")

gitForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    let searchInput = evt.target['search'].value
  
    fetch(`https://api.github.com/search/users?q=${searchInput}`)
    .then(r => r.json())
    .then(usersArr => {
         usersArr.items.forEach((user) => {
             turnJSONtoHTML(user)
         })
             
         })
         evt.target.reset() 
    }
        )

function turnJSONtoHTML(user){
    let userDiv = document.createElement("div")
    userDiv.innerHTML = `<p>${user.login}</p><p>${user.html_url}</p><img src="${user.avatar_url}" alt=${user.login}>`
    userListUl.append(userDiv)

    userDiv.addEventListener("click", (evt) => {
        
        fetch(`https://api.github.com/users/${user.login}/repos`)
        .then(r => r.json())
        .then(reposArr => { 
            reposArr.forEach((repo) => {
                
                let repoLi = document.createElement("li")
              
                repoLi.innerText = repo.html_url
                userRepoUL.append(repoLi)
                
                
            })
        })
    })
    


}