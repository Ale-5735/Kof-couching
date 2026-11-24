<?php
// Plantilla de configuración de Base de Datos para InfinityFree
if (!defined('ALLOW_CONFIG_ACCESS')) {
    header('HTTP/1.0 403 Forbidden');
    exit('Acceso denegado');
}

define('DB_HOST', 'sql300.infinityfree.com');
define('DB_USER', 'tu_usuario_mysql');
define('DB_PASS', 'tu_password_mysql');
define('DB_PORT', 3306);

// Prefijo asignado por InfinityFree
define('DB_USER_PREFIX', 'if0_43520418_');

// Nombre exacto de la base de datos (o dejar vacío para autodescubrimiento)
define('DB_NAME_OVERRIDE', '');

