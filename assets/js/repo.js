var issueContainerEl = document.querySelector('#issues-container');
var limitWarningEl = document.querySelector('#limit-warning');


var displayWarning = function(repo) {
    limitWarningEl.textContent = 'Showing first 30 issues ';
    var linkEl = document.createElement('a');
    linkEl.textContent = 'See More Issues on GitHub.com';
    linkEl.setAttribute('href', `https://github.com/${repo}/issues`);
    linkEl.setAttribute('target', '_blank');
    limitWarningEl.appendChild(linkEl);
};

var getIssues = function(repo) {
    var apiURL = `https://api.github.com/repos/${repo}/issues`;
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);
                if (response.headers.get('Link')) {
                    displayWarning(repo);
                }
            })
        } else {
            alert('Something went wrong with this request');
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = 'This Repo Has No Open Issues or PR\'s'
    }
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
    };
};
getIssues('facebook/react')