export class CatalogPage {
    constructor() {
        this.dataStore = {};
        this.categories = [];
    }

    #initDOMContent(){
        const body = document.getElementById("main-container");
        body.innerHTML = `<nav class="mb-4">
                                <a href="#" id="homeLink" class="me-3">Додому</a>
                                <a href="#" id="catalogLink">Каталог</a>
                            </nav>
                            
                            <div id="content">
                                <h2>Ласкаво просимо!</h2>
                                <p>Оберіть категорію з меню.</p>
                            </div>`;
    }
    async init() {
        this.#initDOMContent();
        
        try {
            const [
                categories,
                toys,
                gifts,
                electronic,
                vacancies,
                food,
                programmingLanguages
            ] = await Promise.all([
                fetch('data/categories.json').then(r => r.json()),
                fetch('data/toys.json').then(r => r.json()),
                fetch('data/gifts.json').then(r => r.json()),
                fetch('data/electronic.json').then(r => r.json()),
                fetch('data/vacancies.json').then(r => r.json()),
                fetch('data/food.json').then(r => r.json()),
                fetch('data/programmingLanguages.json').then(r => r.json())
            ]);

            this.categories = categories;
            Object.assign(this.dataStore, {
                toys, gifts, electronic, vacancies, food, programmingLanguages
            });

            this._wireUpNav();
            this.showHome();
        }
        catch (err) {
            console.error('Не вдалось завантажити дані:', err);
            document.getElementById('content').innerHTML = `<div class="alert alert-danger">Помилка завантаження даних.</div>`;
        }
    }

    _wireUpNav() {
        document.getElementById('homeLink')
            .addEventListener('click', e => { e.preventDefault(); this.showHome(); });
        document.getElementById('catalogLink')
            .addEventListener('click', e => { e.preventDefault(); this.showCatalog(); });
    }

    showHome() {
        document.getElementById('content').innerHTML = `
      <h2>Ласкаво просимо!</h2>
      <p>Оберіть категорію з меню.</p>
    `;
    }

    showCatalog() {
        const html = [
            `<h2>Категорії</h2>`,
            `<ul class="list-group mb-3">`,
            ...this.categories.map(cat => `
        <li class="list-group-item">
          <a href="#" data-short="${cat.shortname}" class="cat-link">${cat.name}</a>
        </li>`),
            `</ul>`,
            `<button id="specialsBtn" class="btn btn-warning">Specials</button>`
        ].join('');

        const c = document.getElementById('content');
        c.innerHTML = html;

        c.querySelectorAll('.cat-link').forEach(a =>
            a.addEventListener('click', e => {
                e.preventDefault();
                this.loadCategory(e.currentTarget.dataset.short);
            })
        );
        c.querySelector('#specialsBtn')
            .addEventListener('click', () => {
                const rnd = this.categories[Math.floor(Math.random()*this.categories.length)];
                this.loadCategory(rnd.shortname);
            });
    }

    async loadCategory(shortname) {
        let items = this.dataStore[shortname];
        if (!items) {
            try {
                items = await fetch(`data/${shortname}.json`).then(r => r.json());
                this.dataStore[shortname] = items;
            }
            catch (err) {
                console.error(`Не вдалось завантажити ${shortname}.json:`, err);
                return;
            }
        }

        const cat = this.categories.find(c => c.shortname === shortname);
        const cards = items.map(item => `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="https://place-hold.it/200x200?text=${encodeURIComponent(item.name)}"
               class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text"><strong>Ціна:</strong> ${item.price}</p>
          </div>
        </div>
      </div>`).join('');

        document.getElementById('content').innerHTML = `
      <h2>${cat.name}</h2>
      <p>${cat.notes || ''}</p>
      <div class="row">${cards}</div>
    `;
    }
}