class GitHubCarousel {
            constructor() {
                this.currentIndex = 0;
                this.repos = [];
                this.cardsPerView = 3;
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('carouselDots');
                this.init();
            }

            async init() {
                await this.loadRepositories();
                this.updateCardsPerView();
                this.createDots();
                this.bindEvents();
                this.updateCarousel();
                this.showCarousel();
            }

            async loadRepositories() {
                const username = 'jojoseja';
                
                try {
                    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch repositories');
                    }
                    
                    this.repos = await response.json();
                    console.log(response);
                    this.renderCards();
                } catch (error) {
                    console.error('Error loading repositories:', error);
                    this.loadDemoData();
                }
            }

            
            renderCards() {
                this.track.innerHTML = '';
                
                this.repos.forEach(repo => {
                    const card = this.createRepoCard(repo);
                    this.track.appendChild(card);
                });
            }

            createRepoCard(repo) {
                const card = document.createElement('div');
                card.className = 'repo-card';
                card.onclick = () => window.open(repo.html_url, '_blank');

                const languageColor = this.getLanguageColor(repo.language);

                card.innerHTML = `
                    <div class="repo-header">
                        <svg class="repo-icon" viewBox="0 0 16 16">
                            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                        </svg>
                        <a href="${repo.html_url}" class="repo-name" target="_blank">${repo.name}</a>
                        <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
                    </div>
                    <p class="repo-description">${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        ${repo.language ? `
                        <span class="stat">
                            <span class="language-dot" style="background-color: ${languageColor}"></span>
                            ${repo.language}
                        </span>` : ''}
                        <span class="stat">
                            <svg class="stat-icon" viewBox="0 0 16 16">
                                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                        <span class="stat">
                            <svg class="stat-icon" viewBox="0 0 16 16">
                                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z"/>
                            </svg>
                            ${repo.forks_count}
                        </span>
                    </div>
                `;

                return card;
            }

            getLanguageColor(language) {
                const colors = {
                    'JavaScript': '#f1e05a',
                    'TypeScript': '#2b7489',
                    'Python': '#3572a5',
                    'Java': '#b07219',
                    'C++': '#f34b7d',
                    'C#': '#239120',
                    'PHP': '#4f5d95',
                    'Ruby': '#701516',
                    'Go': '#00add8',
                    'Rust': '#dea584',
                    'Swift': '#ffac45',
                    'Kotlin': '#f18e33',
                    'HTML': '#e34c26',
                    'CSS': '#1572b6'
                };
                return colors[language] || '#586069';
            }

            updateCardsPerView() {
                const width = window.innerWidth;
                if (width < 768) {
                    this.cardsPerView = 1;
                } else if (width < 1024) {
                    this.cardsPerView = 2;
                } else {
                    this.cardsPerView = 3;
                }
            }

            createDots() {
                this.dotsContainer.innerHTML = '';
                const totalSlides = Math.ceil(this.repos.length / this.cardsPerView);
                
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'dot';
                    dot.onclick = () => this.goToSlide(i);
                    this.dotsContainer.appendChild(dot);
                }
            }

            bindEvents() {
                this.prevBtn.onclick = () => this.prevSlide();
                this.nextBtn.onclick = () => this.nextSlide();
                
                window.addEventListener('resize', () => {
                    this.updateCardsPerView();
                    this.createDots();
                    this.updateCarousel();
                });

                // Touch/swipe support
                let startX = 0;
                let isDragging = false;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });

                this.track.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                    
                    isDragging = false;
                });
            }

            prevSlide() {
                const totalSlides = Math.ceil(this.repos.length / this.cardsPerView);
                this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : totalSlides - 1;
                this.updateCarousel();
            }

            nextSlide() {
                const totalSlides = Math.ceil(this.repos.length / this.cardsPerView);
                this.currentIndex = this.currentIndex < totalSlides - 1 ? this.currentIndex + 1 : 0;
                this.updateCarousel();
            }

            goToSlide(index) {
                this.currentIndex = index;
                this.updateCarousel();
            }

            updateCarousel() {
                const cardWidth = 350 + 16; // card width + gap
                const offset = -this.currentIndex * cardWidth * this.cardsPerView;
                this.track.style.transform = `translateX(${offset}px)`;

                // Update dots
                const dots = this.dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });

                // Update navigation buttons
                const totalSlides = Math.ceil(this.repos.length / this.cardsPerView);
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex === totalSlides - 1;
            }

            showCarousel() {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('carouselWrapper').style.display = 'block';
                document.getElementById('carouselNav').style.display = 'flex';
            }
        }

document.addEventListener('DOMContentLoaded', () => {
    new GitHubCarousel();
    });