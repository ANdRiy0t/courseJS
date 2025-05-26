// footer.js
export class CustomFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
      <style>
        .site-footer {
          background: #222;
          color: #ddd;
          padding: 40px 20px;
          font-family: "Montserrat", sans-serif;
        }
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          gap: 30px;
          justify-content: space-between;
        }
        .footer-section {
          flex: 1 1 200px;
        }
        .footer-title {
          margin-bottom: 12px;
          font-size: 1.2rem;
          color: #fff;
        }
        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-section ul li {
          margin-bottom: 6px;
        }
        #user-greeting {
          font-size: 1rem;
          margin: 0;
        }
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-section {
            max-width: 400px;
          }
        }
      </style>

      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-section developers">
            <h4 class="footer-title">Розробники</h4>
            <ul>
              <li>Іван Іваненко</li>
              <li>Марія Петренко</li>
              <li>Сергій Коваленко</li>
            </ul>
          </div>

          <div class="footer-section user-info">
            <h4 class="footer-title">Ваш статус</h4>
            <p id="user-greeting">Привіт, <strong>Гість</strong>!</p>
          </div>

          <div class="footer-section copyright">
            <p>© 2025 Test Project Всі права захищені.</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </footer>
    `;
    }
}

customElements.define('app-footer', CustomFooter);
