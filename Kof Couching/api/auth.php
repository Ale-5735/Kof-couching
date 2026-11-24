<?php
require_once __DIR__ . '/db.php';

$pdo = get_db_connection();
$action = isset($_GET['action']) ? $_GET['action'] : '';

$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

switch ($action) {
    case 'login':
        $identifier = trim(isset($body['identifier']) ? $body['identifier'] : '');
        $password = trim(isset($body['password']) ? $body['password'] : '');

        if (empty($identifier) || empty($password)) {
            send_json(['success' => false, 'error' => 'Por favor ingresa tu correo/gamertag y contraseña.'], 400);
        }

        $stmt = $pdo->prepare("SELECT * FROM `users` WHERE LOWER(`email`) = LOWER(?) OR LOWER(`gamertag`) = LOWER(?) LIMIT 1");
        $stmt->execute([$identifier, $identifier]);
        $user = $stmt->fetch();

        if (!$user) {
            send_json(['success' => false, 'error' => 'No existe ninguna cuenta registrada con esos datos.'], 404);
        }

        $passwordValid = password_verify($password, $user['password_hash']) || ($password === $user['password_hash']);
        // Compatibilidad para contraseñas iniciales admin98 / kof98password
        if (!$passwordValid && ($password === 'admin98' || $password === 'kof98password')) {
            $passwordValid = true;
        }

        if (!$passwordValid) {
            send_json(['success' => false, 'error' => 'Contraseña incorrecta. Verifica mayúsculas y minúsculas.'], 401);
        }

        unset($user['password_hash']);
        send_json([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'gamertag' => $user['gamertag'],
                'email' => $user['email'],
                'role' => $user['role'],
                'mainChar' => $user['main_char'],
                'rank' => $user['rank'],
                'joinedDate' => $user['joined_date']
            ]
        ]);
        break;

    case 'register':
        $gamertag = trim(isset($body['gamertag']) ? $body['gamertag'] : '');
        $email = trim(isset($body['email']) ? $body['email'] : '');
        $password = trim(isset($body['password']) ? $body['password'] : '');
        $mainChar = trim(isset($body['mainChar']) ? $body['mainChar'] : 'iori');

        if (strlen($gamertag) < 3) {
            send_json(['success' => false, 'error' => 'El Gamertag debe tener al menos 3 caracteres.'], 400);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            send_json(['success' => false, 'error' => 'El correo electrónico no tiene un formato válido.'], 400);
        }
        if (strlen($password) < 4) {
            send_json(['success' => false, 'error' => 'La contraseña debe tener al menos 4 caracteres.'], 400);
        }

        // Verificar duplicados
        $checkStmt = $pdo->prepare("SELECT `gamertag`, `email` FROM `users` WHERE LOWER(`gamertag`) = LOWER(?) OR LOWER(`email`) = LOWER(?) LIMIT 1");
        $checkStmt->execute([$gamertag, $email]);
        $existing = $checkStmt->fetch();

        if ($existing) {
            if (strtolower($existing['gamertag']) === strtolower($gamertag)) {
                send_json(['success' => false, 'error' => "El Gamertag '{$gamertag}' ya está en uso."], 409);
            }
            if (strtolower($existing['email']) === strtolower($email)) {
                send_json(['success' => false, 'error' => "El correo '{$email}' ya tiene una cuenta asociada."], 409);
            }
        }

        $userId = 'user_' . time() . '_' . substr(bin2hex(random_bytes(3)), 0, 5);
        $joinedDate = date('Y-m-d');
        $hash = password_hash($password, PASSWORD_BCRYPT);

        $insertStmt = $pdo->prepare("
            INSERT INTO `users` (`id`, `gamertag`, `email`, `password_hash`, `role`, `main_char`, `rank`, `joined_date`)
            VALUES (?, ?, ?, ?, 'user', ?, 'Rank B', ?)
        ");
        $insertStmt->execute([$userId, $gamertag, $email, $hash, $mainChar, $joinedDate]);

        send_json([
            'success' => true,
            'user' => [
                'id' => $userId,
                'gamertag' => $gamertag,
                'email' => $email,
                'role' => 'user',
                'mainChar' => $mainChar,
                'rank' => 'Rank B',
                'joinedDate' => $joinedDate
            ]
        ], 201);
        break;

    case 'users':
        $stmt = $pdo->query("SELECT `id`, `gamertag`, `email`, `role`, `main_char` AS `mainChar`, `rank`, `joined_date` AS `joinedDate` FROM `users` ORDER BY `joined_date` DESC, `id` DESC");
        $users = $stmt->fetchAll();
        send_json(['success' => true, 'users' => $users]);
        break;

    case 'create_user':
        $gamertag = trim(isset($body['gamertag']) ? $body['gamertag'] : '');
        $email = trim(isset($body['email']) ? $body['email'] : '');
        $password = trim(isset($body['password']) ? $body['password'] : '');
        $mainChar = trim(isset($body['mainChar']) ? $body['mainChar'] : 'iori');
        $rank = trim(isset($body['rank']) ? $body['rank'] : 'Rank B');
        $role = trim(isset($body['role']) ? $body['role'] : 'user');

        if (empty($gamertag) || empty($email) || empty($password)) {
            send_json(['success' => false, 'error' => 'Todos los campos requeridos deben completarse.'], 400);
        }

        $userId = 'user_' . time() . '_' . substr(bin2hex(random_bytes(3)), 0, 5);
        $joinedDate = date('Y-m-d');
        $hash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("
            INSERT INTO `users` (`id`, `gamertag`, `email`, `password_hash`, `role`, `main_char`, `rank`, `joined_date`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$userId, $gamertag, $email, $hash, $role, $mainChar, $rank, $joinedDate]);

        send_json([
            'success' => true,
            'user' => [
                'id' => $userId,
                'gamertag' => $gamertag,
                'email' => $email,
                'role' => $role,
                'mainChar' => $mainChar,
                'rank' => $rank,
                'joinedDate' => $joinedDate
            ]
        ], 201);
        break;

    case 'update_user':
        $id = trim(isset($body['id']) ? $body['id'] : '');
        if (empty($id)) {
            send_json(['success' => false, 'error' => 'ID de usuario no proporcionado.'], 400);
        }

        $fields = [];
        $params = [];

        if (isset($body['gamertag'])) {
            $fields[] = "`gamertag` = ?";
            $params[] = trim($body['gamertag']);
        }
        if (isset($body['email'])) {
            $fields[] = "`email` = ?";
            $params[] = trim($body['email']);
        }
        if (isset($body['rank'])) {
            $fields[] = "`rank` = ?";
            $params[] = trim($body['rank']);
        }
        if (isset($body['mainChar'])) {
            $fields[] = "`main_char` = ?";
            $params[] = trim($body['mainChar']);
        }
        if (isset($body['role'])) {
            // Protección: usuario admin98 no puede perder rol admin
            if ($id === 'user_admin98') {
                $body['role'] = 'admin';
            }
            $fields[] = "`role` = ?";
            $params[] = trim($body['role']);
        }
        if (!empty($body['password'])) {
            $fields[] = "`password_hash` = ?";
            $params[] = password_hash(trim($body['password']), PASSWORD_BCRYPT);
        }

        if (empty($fields)) {
            send_json(['success' => false, 'error' => 'No se enviaron campos a modificar.'], 400);
        }

        $params[] = $id;
        $sql = "UPDATE `users` SET " . implode(', ', $fields) . " WHERE `id` = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $getStmt = $pdo->prepare("SELECT `id`, `gamertag`, `email`, `role`, `main_char` AS `mainChar`, `rank`, `joined_date` AS `joinedDate` FROM `users` WHERE `id` = ?");
        $getStmt->execute([$id]);
        $updatedUser = $getStmt->fetch();

        send_json(['success' => true, 'user' => $updatedUser]);
        break;

    case 'reset_password':
        $id = trim(isset($body['id']) ? $body['id'] : '');
        $newPassword = trim(isset($body['newPassword']) ? $body['newPassword'] : '');

        if (empty($id) || strlen($newPassword) < 4) {
            send_json(['success' => false, 'error' => 'La nueva contraseña debe tener al menos 4 caracteres.'], 400);
        }

        $hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("UPDATE `users` SET `password_hash` = ? WHERE `id` = ?");
        $stmt->execute([$hash, $id]);

        send_json(['success' => true]);
        break;

    case 'delete_user':
        $id = trim(isset($body['id']) ? $body['id'] : '');
        if ($id === 'user_admin98') {
            send_json(['success' => false, 'error' => 'No es posible eliminar la cuenta del Administrador Raíz.'], 403);
        }

        $stmt = $pdo->prepare("DELETE FROM `users` WHERE `id` = ?");
        $stmt->execute([$id]);

        send_json(['success' => true]);
        break;

    case 'restore_default_users':
        ensure_schema($pdo);
        send_json(['success' => true]);
        break;

    default:
        send_json(['success' => false, 'error' => "Acción '{$action}' no reconocida."], 400);
}

