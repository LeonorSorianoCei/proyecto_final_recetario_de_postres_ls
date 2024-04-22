/**
 * Esta función facilita la ejecución de peticiones HTTP utilizando diversos métodos (GET, POST, PUT, etc.) y manejo de errores.
 *
 * @param {Object} opciones - Un objeto que contiene los parámetros de configuración para la petición HTTP.
    * @param {string} opciones.url - La URL del endpoint al que se realiza la petición.
    * @param {string} [opciones.method="GET"] - El método HTTP a utilizar para la petición (GET, POST, PUT, etc.).
    * @param {*} [opciones.body=null] - Los datos que se enviarán en el cuerpo de la petición, normalmente en formato JSON.
    * @param {number} [opciones.timeout=5000] - El tiempo máximo en milisegundos para esperar la respuesta antes de abortar la petición.
    * @param {function} [opciones.callback=null] - Una función de callback que se ejecuta al recibir una respuesta exitosa, recibiendo los datos JSON.
 * @returns {Promise} Una promesa que se resuelve con un mensaje de éxito o error.
 */

export const easyFetch = async ({
    url, method="GET", body = null, timeout=5000, callback=null
}) => {

    const controller = new AbortController()
    const abortTimeout = setTimeout( () => controller.abort(), timeout)

    const fetchOptions= {
        method,
        headers: {
            "Content-type" : "application/json"
        },
        signal: controller.signal
    }
    if(body) {
        fetchOptions.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(url, fetchOptions)

        if(!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()

        if (callback) {
            callback(data)

        } else {
            return data
        }
    }
    catch (error) {
        console.error("Error al realizar el request", error.message)
        alert("¡Error, inténtalo de nuevo!");
    }
}