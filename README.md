# Como usar el repo

## Requisitos
- Node JS v16
- npm o yarn
- Docker (Para la base de datos PostgreSQL de desarrollo)

## Variables de entorno

Actualmente el proyecto utiliza las siguientes variables de entorno:
```bash
ENVIRONMENT=development # Entorno en el que se ejecutara el servidor
DB_HOST="localhost" # Host de la DB
DB_USER="postgres" # Usuario de la DB
DB_NAME="postgres" # Nombre de la DB
DB_PASSWORD="postgres" # Contraseña de la DB
DB_PORT="5432" # Puerto de la de DB
SERVER_PORT="3010" # Por defecto 3010
SECRET="loremipsum" # El secreto para firmar los tokens
PREFIX="/api" # Server prefix
```

## Iniciar el repo para desarrollo

### Ejecutar base de datso

Antes que nada este repo depende del repo `max021311/ctf-crud-microservice` que tiene la configuración para la base de datos local así como las migraciones y seeders.

### Para iniciar el servidor con hot reload
```bash
yarn dev # npm run dev
```

## Compilar y ejecutar código para producción
```bash
yarn build # npm run build
yarn start # npm run start
```


## Usar linter
```bash
yarn lint # npm run lint
```
