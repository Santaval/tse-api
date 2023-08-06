# TSE API

Este repositorio contiene un servidor Node.js que utiliza Puppeteer para obtener información del sitio web del Tribunal Supremo de Elecciones (TSE) de Costa Rica en base al número de identificación proporcionado (cedula). El servidor está construido con Express y proporciona un simple punto de acceso API para obtener información relacionada con las personas.

## Prerrequisitos

Antes de ejecutar el servidor, asegúrate de tener lo siguiente instalado en tu máquina:

1. Node.js: Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde el sitio web oficial: [https://nodejs.org/](https://nodejs.org/).

## Inicio Rápido

Sigue estos pasos para configurar y ejecutar el servidor:

1. Clona el repositorio en tu máquina local:

```code

  git clone https://github.com/Santaval/tse-api

```

2. Instala las dependencias requeridas:

```code

cd <project_directory>
npm install

```


3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno `NODE_ENV` y `PUPPETEER_EXECUTABLE_PATH` si es necesario.

4. Inicia el servidor:

```code


npm start

```
El servidor estará funcionando en `http://localhost:<PORT>`, donde `<PORT>` es el valor definido en la constante `PORT` (por defecto: 4000).

## Puntos de Acceso (Endpoints)

El servidor proporciona los siguientes puntos de acceso:

1. **GET /cedula=:cedula**

Este punto de acceso se utiliza para obtener información del sitio web del TSE en base al número de identificación proporcionado (cedula). El servidor utiliza Puppeteer para obtener los datos y los devuelve en formato JSON.

Ejemplo de Solicitud:
GET http://localhost:<PORT>/cedula=123456789


Ejemplo de Respuesta (JSON):
```json
{
  "cedula": "123456789",
  "nombre": "Juan",
  "primerApellido": "Pérez",
  "segundoApellido": "Gómez",
  "fechaNacimiento": "1990-01-01"
}
```

Nota: Si la persona con el número de identificación proporcionado no se encuentra, el servidor responderá con "Persona no encontrada".


GET /

Este es un punto de acceso básico en la ruta raíz que sirve para verificar que el servidor está en funcionamiento. Devuelve un mensaje que indica el propósito del servidor.

Ejemplo de Solicitud:
GET http://localhost:<PORT>/

Ejemplo de Respuesta:
Servidor para obtener datos del TSE por cedula


# Atribuciones

El código del servidor utiliza las siguientes bibliotecas:

    Express: https://expressjs.com/
    Puppeteer: https://pptr.dev/
    Cors: https://www.npmjs.com/package/cors
    Morgan: https://www.npmjs.com/package/morgan

  # Descargo de Responsabilidad

Ten en cuenta que el web scraping puede estar sujeto a restricciones legales, y es esencial cumplir con los términos de servicio del sitio web y las leyes aplicables en tu región antes de utilizar este servidor. La información proporcionada en este repositorio es solo con fines educativos, y los desarrolladores no se hacen responsables por cualquier mal uso o uso no autorizado del servidor. Úsalo de manera responsable y considerando la privacidad de otros.
