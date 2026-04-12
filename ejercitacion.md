##
crear workspace
Requiere token de autenticacion

POST/api/workspace

header: 
authorization: `Bearer ${token}`
content-type: `application/json`
body:{
    title, (required)
    description (optional)

}

response 200 OK: {
    OK: true,
    message: "espacio de trabajo creado exitosamente",
    status:200
}

##como encarar features:
si tenes tiempo y una idea clara de vas a desarrrollar, recomendaria toda la api primero, o al menos la ruta que maneje el entidad que necesitas trabajar y luego laimplementes en el frontend

1. analisis de endpoints (planteo)
2. desarrollo de la api
3. pruebas en postman en local
4. desplegar funcionalidad

si no tienen tiempo o NO TENES BIEN DEFINIDO QUE TIENE QUE PASAR
1. Planteo del endopoint
2. desarrollo del endpoint
3. prueba de postman local
4. deploy de la funcionalidad y prueba con postman del deploy
5. integracion con frontend
6. prueba de frontejd desplegado

pasas al siguiente endpoint

## frontend

Crear una screen en /workspace/new que tenga un formulario con titulo y descripcion manejado con useForm.
Proteger la screen con el AuthMiddleware
Desarrollar la funcion de fetching para interactuar con /api/workspace
Conectar el formulario al endpoint /api/workspace con la funcion creada
Redireccionar a /home cuando se cree en espacio de trabajo
Desplegar y probar
