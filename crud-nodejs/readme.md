# Crud con Nodejs
1. Creamos las carpetas
Si no nos deja utilizar los comandos habilitamos la consola.
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

```
mkdir config
mkdir controllers
mkdir models
mkdir public
mkdir routes
mkdir views 
mkdir views/partials
mkdir views/products
```

2. Inicializamos el proyecto con Nodejs
```
npm init -y
```

3.Instalamos las librerías a utilizar
```
npm install express ejs mysql2
```

4. En el archivo package.json habilitamos el uso de la sintáxis moderna
```
"type": "module"
```

5. Crear una base de datos Mysql/MariaDB denominado dbsistema.
Vamos a utilizar el programar xampp, que ya tiene instalado mysql y apache.
Creamos la base de datos dbsistema utf8mb4_general_ci y la tabla productos
```
CREATE TABLE IF NOT EXISTS productos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);

INSERT INTO productos(nombre, precio, stock) values 
('Pan francés', 0.30, 200),
('Torta de chocolate', 25.00, 10),
('Empanada', 3.50, 50);
```

6. Ahora creamos el archivo de conexión a la base de datos de config/db.js
```
import mysql from 'mysql2/promise';

export default mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbsistema'
});
```