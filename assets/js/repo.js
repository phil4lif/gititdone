var issueContainerEl = document.querySelector('#issues-container');

var getIssues = function(repo) {
    var apiURL = `https://api.github.com/repos/${repo}/issues`;
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);
            })
        } else {
            alert('Something went wrong with this request');
        }
    });
}

var displayIssues = function(issues) {
    for (var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        var titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        var typeEl = document.createElement('span');

        if (issues[i].pull_request) {
            typeEl.textContent = '(PR)'
        } else {
            typeEl.textContent = '(Issue)'
        }
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}
getIssues('phil4lif/gititdone')