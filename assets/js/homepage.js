var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector('#repo-search-term')

var formSubmitHandler = function (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = '';
    } else {
        alert('Please Enter a GitHub Username!');
    }
}

var displayRepos = function(repos, searchTerm) {
    repoSearchTerm.textContent = searchTerm;
    if (repos.length === 0) {
        repoContainerEl.textContent = "No Repos Found For This User";
        return;
    }
    repoContainerEl.textContent = '';

    for(let i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + '/' + repos[i].name;
        var repoEl = document.createElement('a');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';
        repoEl.setAttribute('href', `./single-repo.html?repo=${repoName}`);
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);
        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = '<i class="fas fa-times status-icon icon-danger"></i>' 
            + repos[i].open_issues_count + ' issues';
        } else {
            statusEl.innerHTML = '<i class="fas fa-check-square status-icon icon-success"></i>';
        }
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}

var getUserRepos = function (user) {
    var apiURL = `https://api.github.com/users/${user}/repos`;
    var response = fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert('Error: Not Found');
        }
    })
    .catch(function(error) {
        alert('Unable to Connect to GitHub!')
    })
}

userFormEl.addEventListener("submit", formSubmitHandler);
