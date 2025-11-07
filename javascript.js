class repository{
    //ToDo: Add repository class
}

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
        const repoCard = document.createElement('div');
        repoCard.className='repo-card';
        repoCard.setAttribute('data-name', element.name);
        repoCard.innerHTML=
        `
        <div><a href="${element.html_url}">${element.name}</a></div>
        <div><p>${element.clone_url}</p></div>
        `

        repoGrid.appendChild(repoCard);
    });
}

displayRepos(loadRepositories());

//Search Engine
const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('input', e => {
    const repoLista = document.querySelectorAll('.repo-card');
    const value = e.target.value.trim().toLowerCase();
    repoLista.forEach(repo => {
        const repoName = repo.dataset.name;
        console.log(repoName);
        const matches = repoName.includes(value);
        if (value === '' | matches) {
            repo.classList.remove('hidden');
        } else {
            repo.classList.add('hidden');
        }
    })
})


const claseButton = document.getElementById('clase-button');
function checkButton(){
    const repoLista = document.querySelectorAll('.repo-card');
    repoLista.forEach(repo =>{
        const repoName = repo.dataset.name;
        const regex = /clase_.*/;
        if (regex.test(repoName)){
            if (claseButton.checked){
                repo.classList.add('hidden');
            } else {
                repo.classList.remove('hidden');
            }
        }
    })
    
}
claseButton.addEventListener('input', e => {
    checkButton()
})

