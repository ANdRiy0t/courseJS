export function createAppHeader() {
    const header = document.createElement('header');
    
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
        .navbar-menu(anywhere) {
            padding: 0.5rem 1rem;
        }
        .navbar-menu {
            display: flex;
            gap: 1rem;
        }
        .navbar-menu a {
            color: #fff;
            text-decoration: none;
            padding: 0.5rem;
            cursor: pointer;
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
        .navbar-actions {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
        .navbar-actions button {
            background: #444;
            border: none;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
        }
        .navbar-actions button:hover {
            background: #555;
        }
        .navbar-actions input {
            padding: 0.5rem;
            border: none;
            border-radius: 4px;
            margin-right: 0.5rem;
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
            .navbar-actions {
                display: none;
            }
        }
    `;
    
    let username = localStorage.getItem('username') || 'Guest';
    
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <div class="navbar-brand">
            <a href="/">
                <img src="./images/bird-logo.svg" alt="Логотип застосунку" />
            </a>
        </div>
        <button class="navbar-toggler" aria-label="Toggle menu">☰</button>
        <div class="navbar-menu">
            <a id="home">Home</a>
            <a id="catalog-button">Articles</a>
            <a id="start-game">Flappy bird</a>
        </div>
        <div class="navbar-actions">
            <div class="navbar-user">
                Hello, <strong id="username">${username}</strong>!
            </div>
            <input type="text" id="registerInput" placeholder="Enter your name" style="display: none;" />
            <button id="registerButton">Реєстрація</button>
            <button id="logoutButton" style="display: ${username === 'Guest' ? 'none' : 'block'};">Logout</button>
        </div>
    `;

    header.appendChild(style);
    header.appendChild(nav);

    const toggler = header.querySelector('.navbar-toggler');
    const menu = header.querySelector('.navbar-menu');
    toggler.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    const registerButton = header.querySelector('#registerButton');
    const registerInput = header.querySelector('#registerInput');
    const usernameDisplay = header.querySelector('#username');
    const logoutButton = header.querySelector('#logoutButton');
    const navbarUser = header.querySelector('.navbar-user');

    registerButton.addEventListener('click', () => {
        if (registerInput.style.display === 'none') {
            registerInput.style.display = 'block';
            registerButton.textContent = 'Submit';
            navbarUser.style.display = 'none';
        } else {
            const newUsername = registerInput.value.trim();
            if (newUsername) {
                localStorage.setItem('username', newUsername);
                usernameDisplay.textContent = newUsername;
                registerInput.style.display = 'none';
                registerButton.textContent = 'Реєстрація';
                logoutButton.style.display = 'block';
                navbarUser.style.display = 'block';
                registerInput.value = '';
            } else {
                registerInput.style.display = 'none';
                registerButton.textContent = 'Реєстрація';
                navbarUser.style.display = 'block';
            }
        }
    });

    registerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            registerButton.click();
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        usernameDisplay.textContent = 'Guest';
        logoutButton.style.display = 'none';
        navbarUser.style.display = 'block';
    });

    return header;
}