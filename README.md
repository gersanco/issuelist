# Issuelist

Lista las Issues de un repositorio de GitHub.

#Requsitos

* NodeJS y npm
* Navegador web

# Puesta en marcha

Descargar el proyecto, situarte en el directorio en la consola de comandos y hacer un npm install.
Una vez instalado los paquetes utilizar el comando npm start.

# Estructura

Dentro del directorio app tendremos 3 directorios:

* components: Aqui se encuentran todos los componentes salvo el principal. Dentro encontramos:
  * issue-list: Este es el componente que obtiene las issues y las visualiza.
* models: En este directorio se encuentran los modelos utilizados por los componentes para su intreraccion en la aplicacion. Encontramos:
  * issue-page: Contiene la pagina en la que se encuentra las issues correspondientes
  * repository: El nombre completo del repositorio a obtener las issue
* services: Los servicios que utiliza la aplicacion para obtner las issues.
  * issue: Este es el servicio que obtiene la issue al que llama el componente
  * shared: Este servicio sirve de comunicacion entre el componente principal y el componente issue-list. El componente principal le envia el repositorio y el componente issue-list que esta observando esperando la respuesta para poder obtener las issues del repositorio que haya sido enviado.
* componente principal: Su funcion es obtener del usuario el nombre del usuario y el repositorio a obtener las issues y enviarselo al componente issue-list.
* app.module: Carga los modulos de la aplicacion y carga servicio shared en memoria para que pueda usarse en toda la app
