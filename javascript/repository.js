import { colors } from "./colors.js";

async function loadRepositories(){
    try {
        const response = await fetch(`https://api.github.com/users/jojoseja/repos?sort=updated&per_page=20`);
        var res = await response.json();
        displayRepos(res);
        return res;
    } catch (error){
        console.log("Error");
    }
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    return navigator.clipboard.writeText(text);
  }
}

function displayRepos(repoList){
    const repoGrid = document.getElementById("repo-grid");
    var repoArray = Array.from(repoList);
    //cargar repositorios
    repoArray.forEach(element => {
        const tierColor = colors[repoGrid.children.length % colors.length];
        const repoCard = document.createElement('div');
        repoCard.style.border = "solid 10px " + tierColor;

        repoCard.className='repo-card';
        repoCard.setAttribute('data-name', element.name);

        const btnId = element.id;
        const urlHTTPS = element.clone_url;
        const urlSSH = element.ssh_url;

        repoCard.innerHTML=
        `<div class="repo-card-box">
            <div><a href="${element.html_url}">${element.name}</a></div>
            <div>
            <button class="btn btn-https" data-url="${urlHTTPS}">Copy URL</button>
            <button class="btn btn-shh" data-url="${urlSSH}">Copy SSH</button>
            </div>
        </div>
        `

        repoGrid.appendChild(repoCard);
    });
}

const grid = document.getElementById('repo-grid');
grid.addEventListener('click', e => {
    if (e.target.classList.contains("btn")) {
        const button = e.target;
        const url = button.dataset.url;
        copyTextToClipboard(url)
    }
})



export function initRepositories(){
    displayRepos(loadRepositories());
}
