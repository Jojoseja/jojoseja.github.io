import { initRepositories} from './repository.js';
import { initClaseButton } from './claseButton.js';
import { initSearchBar } from './searchBar.js';

document.addEventListener('DOMContentLoaded', () => {
    initRepositories();
    initClaseButton();
    initSearchBar();
})