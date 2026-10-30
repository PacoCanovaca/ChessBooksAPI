# ChessBooksAPI

## 📖 ¿Qué es este proyecto?

**ChessBooksAPI** es una API REST para gestionar un catálogo de literatura ajedrecística. Permite consultar libros y autores, buscar publicaciones mediante distintos criterios y administrar los datos del catálogo. También incorpora registro e inicio de sesión de usuarios, gestión de perfiles y una lista de libros favoritos.

El proyecto centraliza la información de los libros —como título, año de publicación, idioma, editorial, autores e imagen— y permite relacionar cada publicación con uno o varios autores.

## 🛠️ Stack Tecnológico

- **Lenguaje:** JavaScript (Node.js).
- **Entorno de ejecución:** Node.js.
- **Backend:** Express 5.
- **Base de datos:** MongoDB.
- **ODM:** Mongoose.
- **Autenticación:** JSON Web Tokens (JWT).
- **Cifrado de contraseñas:** bcrypt.
- **Gestión de imágenes:** Cloudinary, Multer y Multer Storage Cloudinary.
- **Variables de entorno:** dotenv.
- **Desarrollo:** Nodemon.

## 🚀 Instalación y Puesta en Marcha

### Requisitos previos

- Node.js y npm.
- Una base de datos MongoDB local o un clúster de MongoDB Atlas.
- Una cuenta de Cloudinary para utilizar la subida y gestión de imágenes.

### 1. Clonar el repositorio

```bash
git clone https://github.com/PacoCanovaca/ChessBooksAPI.git
cd ChessBooksAPI
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las variables indicadas en el apartado [Configuración del Entorno](#️-configuración-del-entorno).

### 4. Arrancar la API

En modo desarrollo, con reinicio automático al detectar cambios:

```bash
npm run dev
```

Para ejecutar la aplicación en modo normal:

```bash
npm start
```

La API está configurada para escuchar en:

```text
http://localhost:3000
```

> **Notas sobre el estado actual del repositorio:**
>
> - Antes de poder arrancar la aplicación, hay que corregir `src/api/routes/authors.routes.js`: utiliza `isAuth` en las rutas de administración, pero no importa ese middleware. Como el router se carga desde `index.js`, esta referencia impide iniciar el servidor.
> - Conviene revisar el middleware `pre("save")` de `src/api/models/user.model.js`: contiene la referencia `next` pero no invoca la función, por lo que el registro puede quedar bloqueado.
> - `GET /api/users/:id` todavía necesita correcciones: el controlador no pasa el ID a `findById()` ni devuelve el usuario encontrado.

## ⚙️ Configuración del Entorno

La aplicación carga las variables de entorno mediante `dotenv` desde el archivo `.env` situado en la raíz del repositorio.

| Variable | Descripción |
|---|---|
| `DB_URL` | Cadena de conexión a MongoDB. |
| `JWT_SECRET` | Clave privada utilizada para firmar y verificar los tokens JWT. |
| `CLOUDINARY_CLOUD_NAME` | Nombre del espacio de Cloudinary. |
| `CLOUDINARY_API_KEY` | Clave de API de Cloudinary. |
| `CLOUDINARY_API_SECRET` | Secreto de API de Cloudinary. |

Ejemplo de archivo `.env`:

```env
DB_URL=mongodb+srv://<usuario>:<password>@<cluster>/<database>
JWT_SECRET=sustituye_este_valor_por_una_clave_segura

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Sustituye los valores de ejemplo por tus propias credenciales. **No incluyas el archivo `.env`, contraseñas, claves privadas ni secretos reales en el repositorio.** Comprueba que `.env` esté incluido en `.gitignore` antes de subir cambios.

El puerto está definido directamente como `3000` en `index.js`; actualmente no se configura mediante una variable `PORT`.

## 📂 Estructura del Proyecto

```text
ChessBooksAPI/
├── src/
│   ├── api/
│   │   ├── controllers/       # Lógica de negocio y tratamiento de peticiones
│   │   ├── models/            # Esquemas y modelos de Mongoose
│   │   └── routes/            # Definición de endpoints
│   ├── config/
│   │   ├── cloudinary.js      # Configuración de Cloudinary
│   │   └── db.js              # Conexión con MongoDB
│   ├── data/                  # Datos de ejemplo para la semilla
│   ├── middlewares/           # Autorización y subida de archivos
│   └── utils/
│       ├── seeds/             # Scripts para inicializar datos
│       ├── cloudinary.js      # Operaciones auxiliares con imágenes
│       └── token.js           # Generación y verificación de JWT
├── index.js                   # Configuración y arranque del servidor
├── package.json
├── package-lock.json
└── .gitignore
```

## 📡 Referencia de la API

La API utiliza el prefijo `/api` y organiza sus recursos en tres grupos: libros, autores y usuarios. Las respuestas se devuelven en formato JSON, salvo las operaciones que reciben imágenes, que utilizan `multipart/form-data`.

### Libros — `/api/books`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/books` | Obtener el catálogo de libros. | Público |
| `GET` | `/api/books/:id` | Obtener un libro por su ID. | Público |
| `GET` | `/api/books/filterTitle?title={title}` | Buscar por título o fragmento del título. | Público |
| `GET` | `/api/books/filterLanguage?language={language}` | Filtrar por idioma. | Público |
| `GET` | `/api/books/filterAuthor?author={name}` | Filtrar por nombre de autor. | Público |
| `GET` | `/api/books/yearRange?minYear={year}&maxYear={year}` | Filtrar por intervalo de publicación. | Público |
| `POST` | `/api/books` | Crear un libro. Admite una imagen en el campo `img`. | Admin |
| `PUT` | `/api/books/:id` | Actualizar un libro. Admite una imagen en el campo `img`. | Admin |
| `DELETE` | `/api/books/:id` | Eliminar un libro. | Admin |
| `PATCH` | `/api/books/addAuthor/:id` | Añadir un autor a un libro. | Admin |

### Autores — `/api/authors`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/authors` | Obtener todos los autores. | Público |
| `GET` | `/api/authors/:id` | Obtener un autor por su ID. | Público |
| `GET` | `/api/authors/name?name={name}` | Buscar autores por nombre. | Público |
| `POST` | `/api/authors` | Crear un autor. | Admin |
| `PUT` | `/api/authors/:id` | Actualizar un autor. | Admin |
| `DELETE` | `/api/authors/:id` | Eliminar un autor. | Admin |

### Usuarios — `/api/users`

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/api/users/register` | Registrar un usuario. | Público |
| `POST` | `/api/users/login` | Iniciar sesión y obtener un JWT. | Público |
| `PUT` | `/api/users/update/:id` | Actualizar datos del perfil. Admite una imagen en el campo `img`. | Público |
| `DELETE` | `/api/users/delete/:id` | Eliminar un usuario. | Admin |
| `GET` | `/api/users` | Obtener el listado de usuarios y sus favoritos. | Admin |
| `GET` | `/api/users/:id` | Consultar un usuario por ID. | Admin |

Para las rutas protegidas, el token debe enviarse en la cabecera HTTP:

```http
Authorization: Bearer <token>
```

## 🗄️ Modelo de Datos

La base de datos se organiza alrededor de tres entidades principales:

- **Book:** representa un libro de ajedrez e incluye sus datos bibliográficos, enlaces de compra e información de su imagen.
- **Author:** almacena la información de los autores, como nombre, nacionalidad, fechas y título ajedrecístico.
- **User:** representa a los usuarios de la plataforma, con sus credenciales, rol, imagen de perfil y libros favoritos.

Las relaciones se implementan mediante referencias de MongoDB gestionadas por Mongoose. Un libro puede estar asociado a varios autores y un autor puede aparecer en distintos libros. Del mismo modo, un usuario puede guardar varios libros como favoritos y un mismo libro puede estar en las listas de favoritos de distintos usuarios.

## 🔐 Autenticación y Roles

La autenticación se basa en **JSON Web Tokens (JWT)**:

1. El usuario se registra mediante `POST /api/users/register`.
2. Para iniciar sesión, envía sus credenciales a `POST /api/users/login`.
3. La API comprueba la contraseña almacenada mediante `bcrypt` y, si es válida, genera un token JWT.
4. El token incluye el identificador y el correo del usuario y tiene una duración de **24 horas**.
5. Para acceder a los endpoints protegidos, el cliente envía el token como `Bearer` en la cabecera `Authorization`.

El modelo contempla dos roles:

- **`user`:** usuario estándar.
- **`admin`:** puede acceder a las operaciones administrativas protegidas por el middleware de autorización.

**Consideración de seguridad:** el endpoint de registro utiliza los datos recibidos para crear el usuario y el modelo exige un rol. La asignación de roles privilegiados debe realizarse y validarse en el servidor, nunca confiarse al valor enviado por el cliente. Además, `PUT /api/users/update/:id` no aplica actualmente el middleware de autenticación, por lo que conviene protegerlo antes de utilizar la API en un entorno público.

## 🧪 Scripts y Testing

El proyecto incluye los siguientes scripts npm:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor con Nodemon. |
| `npm start` | Inicia el servidor con Node.js. |
| `npm run bookSeed` | Reinicializa los datos de autores y libros con los registros de ejemplo. |

Para ejecutar la semilla:

```bash
npm run bookSeed
```

> **Advertencia:** el script de semilla elimina las colecciones de libros y autores cuando contienen datos y después inserta los registros de ejemplo. No lo ejecutes contra una base de datos con información que quieras conservar.

No hay un script de pruebas automatizadas definido actualmente en `package.json`.

## 👨‍💻 Autor y Licencia

**Paco Canovaca**

- **GitHub:** [PacoCanovaca](https://github.com/PacoCanovaca)
- **LinkedIn:** [Perfil profesional](https://www.linkedin.com/in/francisco-jos%C3%A9-canovaca-c%C3%A1rdenas-65a51a1aa/)
- **Email:** [pacocanovaca97@gmail.com](mailto:pacocanovaca97@gmail.com)

**Licencia:** [ISC](https://opensource.org/licenses/ISC)
