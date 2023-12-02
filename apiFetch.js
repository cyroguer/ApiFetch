const urlConDatos = " https://reqres.in/api/users?delay=3"; //utilice variables en español para comprender mejor


const getDatos = (url) => { //funcion get Datos tomando como parametro url
    fetch(url) //fetch realiza solicitud a http
        .then((respuesta) => { //encadena bloque then para manejar respuesta
            if(!respuesta.ok){
                throw new Error(respuesta);
            }
            console.log("Código de estatus: " + respuesta.status);// imprime es estado de la respuesta httpp
            return respuesta.json(); //llega respuesta en formato json y devuelve promesa resultante
        })
        .then((datos) => { //almacena los datos en localStorage
            guardaEnLocalStorage(datos);
            imprimirEnHTML(datos);
        })
        //bloque de catch para manejar cualquier erorr que pueda ocurrir durante la solicitud... que se vaya la luz o el internet y nunca volvio </3
        .catch((error) => {
            console.error("Upsi! hubo un error :c : ");
            console.warn(error);
            alert("Upsi! hubo un error :c");
        });
};

//funcion pa guardar datos en local storage
function guardaEnLocalStorage(datos) { //funcion que guarda datos, fecha y hora
    const fechaHora = new Date();//almacea la datps, fecha y hora en localStorage
    localStorage.setItem("datos", JSON.stringify(datos));
    localStorage.setItem("tiempo", fechaHora.toString());
}

//funcion para imprimir en dom
function imprimirEnHTML(datos) {
    const contenedorDeDatos = document.getElementById("contenedor-de-la-info")

    const myArrayOfData = []; //
    datos.data.forEach((element, index, array) => {
        myArrayOfData.push(`<tr><td>${element.id}</td><td>${element.first_name}</td><td>${element.last_name}</td><td class="d-none d-sm-table-cell">${element.email}</td><td><img  src ="${element.avatar}"  width= "150px;" ></td></tr>`);// elementos que iran en html/dom
    });
    contenedorDeDatos.innerHTML = myArrayOfData.join("");
}

function verificarLocalStorage() {
    // Verificar si ya hay datos almacenados y si han pasado menos de 1 minuto
    const datosAlmacenados = localStorage.getItem("datos");
    const tiempoDatos = localStorage.getItem("tiempo");

    if (datosAlmacenados && tiempoDatos) {//si hay datos almacenados, 
        const horaActual = new Date();
        const horaAlmacenados = new Date(tiempoDatos);
        const diferenciaTiempo = (horaActual - horaAlmacenados) / 60000; // Diferencia en minutos

        if (diferenciaTiempo <= 1) {
            // Si han pasado menos de 1 minuto, mostrar los datos almacenados
            imprimirEnHTML(JSON.parse(datosAlmacenados));
        }else {
            getDatos(urlConDatos);//solicitud get despues de 1 minuto
        } 
    }else {
        getDatos(urlConDatos);// solicitud get si no hay datos en el local storage
    }

}





//  TO DO: Darle estilo a la pagina, comprobar lo de 1 minuto, ajustar imagenes, La segunda vez, se verifica la fecha en que se almacenó y si se encuentra en el plazo de tiempo de 1 minuto, se debe leer de local storage (para ello debe de checar la fecha y hora de la primera solicitud)
//En caso de que pase más de 1 minuto, se debe volver a hacer una solicitud get.Aquí el ejemplo en dibujo de las indicaciones anteriores:
//Mostrar los datos recuperados en la interfaz del usuario, en una tabla o en otro componente para visualizarlo.
// La visualización de los datos debe ser responsiva.
// Las imágenes de los avatares debe mostrarse de manera circular.
// Los datos recuperados deben almacenarse localmente, con un tiempo de vida de un minuto, para que la próxima recuperación de datos no tarde (mientras esté en el tiempo de vida).
// Usa la API DOM para actualizar el resultado.
// Usa estilos con Bootstrap