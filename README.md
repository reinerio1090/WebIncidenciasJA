#  Web para el manejo de incidentes. 

###  Sus funcionalidades son:

-  Listar todos los incidentes.
-  Listar por un rango de fecha de creación los incidentes.
-  Listar los incidentes pendientes.
-  Modificar un incidente, en donde  para agregarle una observación y un usuario de soporte que ha atendido el incidente( por cuestiones de tiempo e agrega un id fijo).

## Web construida en react conjuntamente con tailwind para el manejo de estilos

Para el despliegue de esta web se necesita.

Tener instalado nodeJS v.18

- Descargar el proyecto.
  
- Instala las dependencias:

      npm install
  
- Para iniciar el servidor de desarrollo:

      npm run dev
  
- En caso de ser necesario modificar la ruta de consumo de las API Rest en:

  src/Controller/Controller.jsx

      const BASE_URL

-  Para mejorar la legibilidad del código se puede instalar en vsCode el comlemento:

      https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold

