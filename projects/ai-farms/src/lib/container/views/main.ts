// // Obtén los elementos necesarios del DOM
// const container = document.getElementById("container");
// const elementList = document.getElementById("element-list");

// // Variable para realizar el seguimiento del último índice de elemento cargado
// let lastIndex = 0;

// // Función para cargar más elementos
// function loadMoreElements() {
//     // Simula una solicitud asíncrona de datos (puedes reemplazarla con tu lógica real)
//     setTimeout(() => {
//         const newElements = [];

//         // Genera algunos elementos de ejemplo
//         for (let i = lastIndex; i < lastIndex + 10; i++) {
//             const listItem = document.createElement("li");
//             listItem.textContent = `Elemento ${i + 1}`;
//             newElements.push(listItem);
//         }

//         // Agrega los nuevos elementos al DOM
//         newElements.forEach((element) => {
//             elementList?.appendChild(element);
//         });

//         // Actualiza el último índice de elemento cargado
//         lastIndex += newElements.length;
//     }, 1000);
// }

// // Función para detectar cuándo se ha llegado al final del scroll
// function handleScroll() {
//     const scrollTop = container?.scrollTop;
//     const containerHeight = container?.offsetHeight;
//     const scrollHeight = container?.scrollHeight;

//     // Verifica si el scroll está cerca del final (ajusta el valor "50" según tus necesidades)
//     if (scrollHeight - scrollTop - containerHeight < 50) {
//         loadMoreElements();
//     }
// }

// // Agrega el evento de desplazamiento al contenedor
// container?.addEventListener("scroll", handleScroll);

// // Carga los primeros elementos
// loadMoreElements();
