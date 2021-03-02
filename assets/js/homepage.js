var getUserRepos = function (user) {
    var apiURL = `https://api.github.com/users/${user}/repos`;
    var response = fetch(apiURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
    })
}
getUserRepos('phil4lif');