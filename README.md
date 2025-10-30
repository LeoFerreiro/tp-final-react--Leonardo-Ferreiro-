# TP Final React - Pokédex
**Autor:** Leonardo Ferreiro

Este proyecto es una **Pokédex** desarrollada con **React**, **Vite**, **React Router DOM** y **Redux Toolkit**.  
Permite:
- Listar los 151 primeros Pokémon.
- Ver detalles de cada Pokémon (nombre, tipo, habilidades, altura, peso, imagen).
- Marcar Pokémon como favoritos y verlos en la Home.
- Guardar favoritos en `localStorage`.
- Diseño moderno, centrado y responsive (móvil, tablet, desktop).

---

## 🚀 Tecnologías utilizadas

- React 18
- Vite
- Redux Toolkit
- React Router DOM
- CSS moderno y responsive
- PokeAPI para datos de Pokémon

---

## 📁 Estructura del proyecto

tp-final-react-[Leonardo-Ferreiro]/
public/vite.svg
src/
    assets/react.svg
    components/
                Navbar.css
                Navbar.jsx
    pages/
            Home.jsx
            PokemonDetail.jsx
            PokemonList.jsx
    store/
            index.js
            pokemonSlice.js
    styles/
            detail.css
            global.css
            home.css
            list.css
            navbar.css
    App.css
    App.jsx
    index.css
    main.jsx
eslint.config.js
index.html
package-lock.json
package.json
README.md
vite.config.js

## ⚡ Instalación

1. Clonar el repositorio:

bash
git clone <url-del-repositorio>

2. Entrar al proyecto:

bash
cd tp-final-react-[Leonardo-Ferreiro]

3. Instalar dependencias:

bash
npm install

🏃‍♂️ Ejecución

bash
npm run dev
Abre el navegador en la URL que indique Vite (por defecto: http://localhost:5173)



✅ Comandos útiles

npm run dev → Ejecutar servidor de desarrollo.

npm run build → Crear build de producción.

npm run preview → Previsualizar build de producción.



🛠 Funcionalidades principales

Home: Muestra Pokémon favoritos y bienvenida.

Listado de Pokémon: Listado de los primeros 151 Pokémon en tarjetas con imagen, nombre y botón de favorito. Responsive.

Detalle de Pokémon: Información detallada de cada Pokémon y opción de agregar/quitar de favoritos.

Gestión de estado global: Redux Toolkit para manejar Pokémon, detalle seleccionado y favoritos.

Favoritos persistentes: Se guardan en localStorage para mantener la lista al refrescar la página.



🎨 Diseño

Grid responsive para la lista de Pokémon.

Tarjetas modernas con sombra y efecto hover.

Colores claros y centrado en desktop.

Adaptación automática a móviles y tablets.



💡 Notas

Si los favoritos antiguos no se muestran correctamente, eliminar el localStorage manualmente:

js
localStorage.removeItem("favorites");
Las imágenes de Pokémon se cargan desde la PokeAPI sprites.

