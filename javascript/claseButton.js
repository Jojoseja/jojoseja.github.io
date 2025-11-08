const claseButton = document.getElementById('clase-button');
function checkButton(){
    const repoLista = document.querySelectorAll('.repo-card');
    repoLista.forEach(repo =>{
        const repoName = repo.dataset.name;
        const regex = /clase_.*/;
        if (regex.test(repoName)){
            if (claseButton.checked){
                repo.classList.add('hidden-btn');
            } else {
                repo.classList.remove('hidden-btn');
            }
        }
    })
    
}

export function initClaseButton(){
    claseButton.addEventListener('input', e => {
    checkButton()
})
}