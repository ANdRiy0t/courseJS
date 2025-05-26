// app-header.js
export function createAppHeader() {
    const header = document.createElement('header');

    // Створюємо елемент style для CSS
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #222;
            color: #fff;
            padding: 0.5rem 1rem;
            margin-top: auto;
        }
        .navbar-brand img {
            height: 40px;
        }
        .navbar-toggler {
            display: none;
            font-size: 1.5rem;
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
        }
        .navbar-menu {
            display: flex;
            gap: 1rem;
        }
        .navbar-menu a {
            color: #fff;
            text-decoration: none;
            padding: 0.5rem;
            transition: background 0.2s;
        }
        .navbar-menu a:hover {
            background: #444;
            border-radius: 4px;
        }
        .navbar-user {
            margin-left: 1rem;
            font-size: 0.9rem;
        }
        @media (max-width: 768px) {
            .navbar-toggler {
                display: block;
            }
            .navbar-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #222;
                flex-direction: column;
                display: none;
            }
            .navbar-menu.show {
                display: flex;
            }
            .navbar-user {
                display: none;
            }
        }
    `;

    // Створюємо HTML-структуру
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <div class="navbar-brand">
            <a href="/">
                <img src="logo.png" alt="Логотип застосунку" />
            </a>
        </div>
        <button class="navbar-toggler" aria-label="Toggle menu">☰</button>
        <div class="navbar-menu">
            <a>Home</a>
            <a id="catalog-button">Catalog</a>
            <a id="start-game">Flappy bird</a>
        </div>
        <div class="navbar-user">
            Hello, <strong>Guest</strong>!
        </div>
    `;

    // Додаємо style та nav до header
    header.appendChild(style);
    header.appendChild(nav);

    // Додаємо обробник подій для кнопки toggler
    const toggler = header.querySelector('.navbar-toggler');
    const menu = header.querySelector('.navbar-menu');
    toggler.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    return header;
}