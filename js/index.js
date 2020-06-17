document.addEventListener('DOMContentLoaded', (event) => {

  const searchForm = document.getElementById('github-form');
  const userList = document.querySelector('#user-list');
  const repoList = document.querySelector('#repos-list');


  searchForm.addEventListener('submit', (submission) => {

    submission.preventDefault();

    let searchString = submission.target.search.value;
    let searchResult = userSearch(searchString);

    searchResult.then(listUsers);

  })


  function userSearch (input) {
    return fetch(`https://api.github.com/search/users?q=${input}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
      .then(r => r.json())
  }

  function repoSearch (user) {
    return fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
      .then(r => r.json())
  }

  function listUsers (searchResult) {
    userList.innerHTML = ''
    searchResult.items.forEach(user => {
      let newUserLi = document.createElement('li');
      let userName = user.login;

      newUserLi.innerText = userName;
      userList.appendChild(newUserLi);

      repoDisplayAction(newUserLi);
    });

  }

  function repoDisplayAction (userListItem) {
    let userName = userListItem.innerText;
    let userRepos = repoSearch(userName);

    userListItem.addEventListener('click', (onClick) => {
      repoList.innerHTML = ''
      userRepos.then(repos => {
        repos.forEach((repository) => {
          let newRepoLi = document.createElement('li');

          newRepoLi.innerHTML = `<a href=${repository.html_url}>${repository.name}</a>`

          repoList.appendChild(newRepoLi);
        });
      })
    })
  }

})
