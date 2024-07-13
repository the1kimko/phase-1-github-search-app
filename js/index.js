document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    let searchType = "user";
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchInput = document.getElementById("search").value;
  
      if (searchType === "user") {
        fetchUserSearch(searchInput);
      } else {
        fetchRepoSearch(searchInput);
      }
    });
  
    function fetchUserSearch(searchTerm) {
      fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
        .then(response => response.json())
        .then(data => {
          userList.innerHTML = "";
          data.items.forEach(user => {
            const userItem = document.createElement("li");
            userItem.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}'s avatar" />
              <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            userItem.addEventListener("click", () => fetchUserRepos(user.login));
            userList.appendChild(userItem);
          });
        })
        .catch(error => console.error(error));
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
        .then(response => response.json())
        .then(data => {
          reposList.innerHTML = "";
          data.forEach(repo => {
            const repoItem = document.createElement("li");
            repoItem.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              <p>${repo.description}</p>
            `;
            reposList.appendChild(repoItem);
          });
        })
        .catch(error => console.error(error));
    }
  
    // Bonus: Toggle between user and repository search
    const toggleSearchTypeBtn = document.createElement("button");
    toggleSearchTypeBtn.textContent = "Search Repos";
    toggleSearchTypeBtn.addEventListener("click", () => {
      searchType = searchType === "user" ? "repo" : "user";
      toggleSearchTypeBtn.textContent = searchType === "user" ? "Search Repos" : "Search Users";
    });
    form.appendChild(toggleSearchTypeBtn);
  
    function fetchRepoSearch(searchTerm) {
      fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
        .then(response => response.json())
        .then(data => {
          reposList.innerHTML = "";
          data.items.forEach(repo => {
            const repoItem = document.createElement("li");
            repoItem.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              <p>${repo.description}</p>
            `;
            reposList.appendChild(repoItem);
          });
        })
        .catch(error => console.error(error));
    }
  });
  