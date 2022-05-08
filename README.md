# SPCNABackend
Proceso de instalación:
Sistema: Ubuntu 20.04 LTS
Gestor de Dependencias: NodeJS

1. Instalar NodeJS
Instalar NodeJS según se indica en el siguiente tutorial:
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-es

Hacerlo con la opción de instalación 3: "Instalar Node usando el administrador de versiones de Node"


Escoger la versión v14.5.0

2. Instalar dependencias del proyecto:
`npm install`

3.  Instalar MongoDB
4. Crear una colección llamada spcna
5. Iniciar servidor:
`npm run dev`

6. El servicio Backend se iniciará en
[http://localhost:3000](http://localhost:3000)

7. Verificar que el servicio esté corriendo haciendo una solicitud get a la dirección: [http://localhost:5000/API/users/getAll](http://localhost:5000/API/users/getAll)








