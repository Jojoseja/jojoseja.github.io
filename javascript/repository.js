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
        repoCard.innerHTML=
        `<div class="repo-card-box">
            <div><a href="${element.html_url}">${element.name}</a></div>
            <div><p>${element.clone_url}</p></div>
        </div>
        `
        repoGrid.appendChild(repoCard);
    });
}
export function initRepositories(){
    displayRepos(loadRepositories());
}
