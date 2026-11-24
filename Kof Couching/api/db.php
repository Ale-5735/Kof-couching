<?php
// Gestor de Conexión PDO y Auto-Migración para InfinityFree
define('ALLOW_CONFIG_ACCESS', true);
require_once __DIR__ . '/config.php';

// Cabeceras CORS y JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function send_json($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function get_db_connection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dbName = DB_NAME_OVERRIDE;

    try {
        // Si no se configuró nombre fijo, conectamos primero para descubrir la base de datos
        if (empty($dbName)) {
            $tempPdo = new PDO(
                "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );

            $stmt = $tempPdo->query("SHOW DATABASES LIKE '" . DB_USER_PREFIX . "%'");
            $databases = $stmt->fetchAll(PDO::FETCH_COLUMN);

            if (!empty($databases)) {
                $dbName = $databases[0]; // Selecciona la primera base de datos encontrada del usuario
            } else {
                throw new Exception("No se encontró ninguna base de datos creada bajo el prefijo " . DB_USER_PREFIX . ". Por favor crea una base de datos en el panel de control de InfinityFree.");
            }
        }

        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . $dbName . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        // Asegurar que las tablas existan
        ensure_schema($pdo);

        return $pdo;
    } catch (PDOException $e) {
        send_json([
            'success' => false,
            'error' => 'Error de conexión MySQL: ' . $e->getMessage(),
            'code' => 'DB_CONNECTION_ERROR'
        ], 500);
    } catch (Exception $e) {
        send_json([
            'success' => false,
            'error' => $e->getMessage(),
            'code' => 'DB_DISCOVERY_ERROR'
        ], 500);
    }
}

function ensure_schema($pdo) {
    // 1. Tabla de Usuarios
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `users` (
            `id` VARCHAR(64) PRIMARY KEY,
            `gamertag` VARCHAR(64) NOT NULL UNIQUE,
            `email` VARCHAR(128) NOT NULL UNIQUE,
            `password_hash` VARCHAR(255) NOT NULL,
            `role` VARCHAR(20) NOT NULL DEFAULT 'user',
            `main_char` VARCHAR(32) NOT NULL DEFAULT 'iori',
            `rank` VARCHAR(64) NOT NULL DEFAULT 'Rank B',
            `joined_date` DATE NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // 2. Tabla de Solicitudes de Clases
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `class_bookings` (
            `id` VARCHAR(64) PRIMARY KEY,
            `user_id` VARCHAR(64) NULL,
            `user_gamertag` VARCHAR(64) NOT NULL,
            `user_email` VARCHAR(128) NULL,
            `user_rank` VARCHAR(64) NULL,
            `user_main_char` VARCHAR(32) NULL DEFAULT 'iori',
            `name` VARCHAR(64) NOT NULL,
            `discord` VARCHAR(128) NOT NULL,
            `platform` VARCHAR(64) NOT NULL,
            `level` VARCHAR(64) NOT NULL,
            `plan_id` VARCHAR(64) NOT NULL,
            `plan_name` VARCHAR(128) NOT NULL,
            `plan_price` VARCHAR(32) NOT NULL,
            `plan_duration` VARCHAR(64) NOT NULL,
            `plan_tag` VARCHAR(128) NULL,
            `plan_badge_color` VARCHAR(32) NULL,
            `team` VARCHAR(255) NOT NULL,
            `goals` TEXT NULL,
            `status` VARCHAR(32) NOT NULL DEFAULT 'pending',
            `requested_at` DATETIME NOT NULL,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // 3. Sembrar usuarios por defecto si no existen
    $checkUser = $pdo->query("SELECT COUNT(*) FROM `users` WHERE `id` = 'user_admin98'");
    if ($checkUser->fetchColumn() == 0) {
        // Inserción de usuarios predeterminados
        $stmt = $pdo->prepare("
            INSERT INTO `users` (`id`, `gamertag`, `email`, `password_hash`, `role`, `main_char`, `rank`, `joined_date`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");

        // Admin: admin@kof98.com / admin98
        $stmt->execute([
            'user_admin98',
            'KOF_Admin',
            'admin@kof98.com',
            password_hash('admin98', PASSWORD_BCRYPT),
            'admin',
            'rugal',
            'System Operator (Admin)',
            '1998-07-23'
        ]);

        // Demo Student 1: KOF_Master98 / kof98password
        $stmt->execute([
            'user_master98',
            'KOF_Master98',
            'demo@kof98.com',
            password_hash('kof98password', PASSWORD_BCRYPT),
            'user',
            'iori',
            'Rank S (Alumno Élite)',
            '2026-01-15'
        ]);

        // Demo Student 2: DaimonMaster_CL / kof98password
        $stmt->execute([
            'user_daimon_cl',
            'DaimonMaster_CL',
            'daimon@kof98.com',
            password_hash('kof98password', PASSWORD_BCRYPT),
            'user',
            'daimon',
            'Rank A',
            '2026-02-10'
        ]);
    }

    // 4. Sembrar solicitudes demo si está vacía
    $checkBookings = $pdo->query("SELECT COUNT(*) FROM `class_bookings`");
    if ($checkBookings->fetchColumn() == 0) {
        $stmtB = $pdo->prepare("
            INSERT INTO `class_bookings` (
                `id`, `user_id`, `user_gamertag`, `user_email`, `user_rank`, `user_main_char`,
                `name`, `discord`, `platform`, `level`, `plan_id`, `plan_name`, `plan_price`,
                `plan_duration`, `plan_tag`, `plan_badge_color`, `team`, `goals`, `status`, `requested_at`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmtB->execute([
            'booking_demo_1',
            'user_master98',
            'KOF_Master98',
            'demo@kof98.com',
            'Rank S (Alumno Élite)',
            'iori',
            'KOF_Master98',
            'Master98#4582',
            'Fightcade 2',
            'Avanzado (Rank A/S)',
            'mastery',
            'Matchup Mastery & Sparring Lab',
            '$85 USD',
            '4 Sesiones (1 mes)',
            'MÁS POPULAR • 4 SESIONES',
            '#ff2e43',
            'Iori • Orochi Chris • Daimon',
            'Perfeccionar el neutral contra Daimons defensivos y optimizar confirmaciones.',
            'in_progress',
            date('Y-m-d H:i:s', time() - 3600 * 6)
        ]);

        $stmtB->execute([
            'booking_demo_2',
            'user_daimon_cl',
            'DaimonMaster_CL',
            'daimon@kof98.com',
            'Rank A',
            'daimon',
            'DaimonMaster_CL',
            'daimon_cl_oficial',
            'Fightcade 2',
            'Intermedio (Rank C/B)',
            'bootcamp',
            'Pro Tournament Boot Camp',
            '$160 USD',
            '8 Sesiones + Acompañamiento',
            'COMPETITIVO TOTAL',
            '#f59e0b',
            'Daimon • O. Yashiro • Ralf',
            'Aprender la ejecución del Roll Cancel Bug de Daimon y safe jumps.',
            'pending',
            date('Y-m-d H:i:s', time() - 3600 * 22)
        ]);
    }
}

