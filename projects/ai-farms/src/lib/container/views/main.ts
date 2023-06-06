// Obtén los elementos necesarios del DOM
const container = document.querySelector(".card-container") as HTMLElement;
const elementList = document.querySelector(".list") as HTMLElement;

// Variable para realizar el seguimiento del último índice de elemento cargado
let lastIndex = 0;

// Función para cargar más elementos
function loadMoreElements() {
    // Simula una solicitud asíncrona de datos (puedes reemplazarla con tu lógica real)
    setTimeout(() => {
        const newElements = [];

        // Genera algunos elementos de ejemplo
        for (let i = lastIndex; i < lastIndex + 10; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
        <img class="photo" src="ruta_de_la_imagen_${i}.jpg" alt="Imagen">
        <p class="name">Nombre del elemento ${i + 1}</p>
        <div>
          <button class="button_add"></button>
          <p class="text_button">Agregar</p>
        </div>
      `;
            newElements.push(card);
        }

        // Agrega los nuevos elementos al DOM
        newElements.forEach((element) => {
            elementList?.appendChild(element);
        });

        // Actualiza el último índice de elemento cargado
        lastIndex += newElements.length;
    }, 1000);
}

// Función para detectar cuándo se ha llegado al final del scroll
function handleScroll() {
    const scrollTop = container?.scrollTop;
    const containerHeight = container?.offsetHeight;
    const scrollHeight = container?.scrollHeight;

    // Verifica si el scroll está cerca del final (ajusta el valor "50" según tus necesidades)
    if (scrollHeight && scrollTop && containerHeight && scrollHeight - scrollTop - containerHeight < 50) {
        loadMoreElements();
    }
}

// Agrega el evento de desplazamiento al contenedor
container?.addEventListener("scroll", handleScroll);

// Carga los primeros elementos
loadMoreElements();
