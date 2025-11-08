const searchInput = document.getElementById('search-bar');


export function initSearchBar(){
    searchInput.addEventListener('input', e => {
        const repoLista = document.querySelectorAll('.repo-card');
        const value = e.target.value.trim().toLowerCase();
        repoLista.forEach(repo => {
            const repoName = repo.dataset.name.toLowerCase();
            const matches = repoName.includes(value);
            if (value === '' | matches) {
                repo.classList.remove('hidden');
            } else {
                repo.classList.add('hidden');
            }
        })
    })
}