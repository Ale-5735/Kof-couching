<?php
require_once __DIR__ . '/db.php';

$pdo = get_db_connection();
$action = isset($_GET['action']) ? $_GET['action'] : '';

$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT * FROM `class_bookings` ORDER BY `requested_at` DESC");
        $rawBookings = $stmt->fetchAll();

        $formatted = array_map(function($b) {
            return [
                'id' => $b['id'],
                'userId' => $b['user_id'],
                'userGamertag' => $b['user_gamertag'],
                'userEmail' => $b['user_email'],
                'userRank' => $b['user_rank'],
                'userMainChar' => $b['user_main_char'],
                'name' => $b['name'],
                'discord' => $b['discord'],
                'platform' => $b['platform'],
                'level' => $b['level'],
                'plan' => [
                    'id' => $b['plan_id'],
                    'name' => $b['plan_name'],
                    'price' => $b['plan_price'],
                    'duration' => $b['plan_duration'],
                    'tag' => $b['plan_tag'],
                    'badgeColor' => $b['plan_badge_color'] ?: '#ff2e43',
                ],
                'team' => $b['team'],
                'goals' => $b['goals'],
                'status' => $b['status'],
                'requestedAt' => $b['requested_at'],
            ];
        }, $rawBookings);

        send_json(['success' => true, 'bookings' => $formatted]);
        break;

    case 'create':
        $id = !empty($body['id']) ? $body['id'] : ('booking_' . time() . '_' . substr(bin2hex(random_bytes(3)), 0, 5));
        $userId = isset($body['userId']) ? $body['userId'] : 'guest';
        $userGamertag = isset($body['userGamertag']) ? $body['userGamertag'] : (isset($body['name']) ? $body['name'] : 'Anónimo');
        $userEmail = isset($body['userEmail']) ? $body['userEmail'] : '';
        $userRank = isset($body['userRank']) ? $body['userRank'] : 'Rank B';
        $userMainChar = isset($body['userMainChar']) ? $body['userMainChar'] : 'iori';
        $name = isset($body['name']) ? $body['name'] : '';
        $discord = isset($body['discord']) ? $body['discord'] : '';
        $platform = isset($body['platform']) ? $body['platform'] : 'Fightcade 2';
        $level = isset($body['level']) ? $body['level'] : 'Intermedio (Rank C/B)';

        $plan = isset($body['plan']) ? $body['plan'] : [];
        $planId = isset($plan['id']) ? $plan['id'] : 'mastery';
        $planName = isset($plan['name']) ? $plan['name'] : 'Matchup Mastery & Sparring Lab';
        $planPrice = isset($plan['price']) ? $plan['price'] : '$85 USD';
        $planDuration = isset($plan['duration']) ? $plan['duration'] : '4 Sesiones (1 mes)';
        $planTag = isset($plan['tag']) ? $plan['tag'] : 'PROGRAMA SELECCIONADO';
        $planBadgeColor = isset($plan['badgeColor']) ? $plan['badgeColor'] : '#ff2e43';

        $team = isset($body['team']) ? $body['team'] : 'Iori • Chris • Daimon';
        $goals = isset($body['goals']) ? $body['goals'] : '';
        $status = 'pending';
        $requestedAt = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare("
            INSERT INTO `class_bookings` (
                `id`, `user_id`, `user_gamertag`, `user_email`, `user_rank`, `user_main_char`,
                `name`, `discord`, `platform`, `level`, `plan_id`, `plan_name`, `plan_price`,
                `plan_duration`, `plan_tag`, `plan_badge_color`, `team`, `goals`, `status`, `requested_at`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $id, $userId, $userGamertag, $userEmail, $userRank, $userMainChar,
            $name, $discord, $platform, $level, $planId, $planName, $planPrice,
            $planDuration, $planTag, $planBadgeColor, $team, $goals, $status, $requestedAt
        ]);

        send_json([
            'success' => true,
            'booking' => [
                'id' => $id,
                'userId' => $userId,
                'userGamertag' => $userGamertag,
                'userEmail' => $userEmail,
                'userRank' => $userRank,
                'userMainChar' => $userMainChar,
                'name' => $name,
                'discord' => $discord,
                'platform' => $platform,
                'level' => $level,
                'plan' => [
                    'id' => $planId,
                    'name' => $planName,
                    'price' => $planPrice,
                    'duration' => $planDuration,
                    'tag' => $planTag,
                    'badgeColor' => $planBadgeColor,
                ],
                'team' => $team,
                'goals' => $goals,
                'status' => $status,
                'requestedAt' => $requestedAt,
            ]
        ], 201);
        break;

    case 'update_status':
        $id = trim(isset($body['id']) ? $body['id'] : '');
        $status = trim(isset($body['status']) ? $body['status'] : '');

        if (empty($id) || empty($status)) {
            send_json(['success' => false, 'error' => 'Datos incompletos.'], 400);
        }

        $stmt = $pdo->prepare("UPDATE `class_bookings` SET `status` = ? WHERE `id` = ?");
        $stmt->execute([$status, $id]);

        send_json(['success' => true]);
        break;

    case 'delete':
        $id = trim(isset($body['id']) ? $body['id'] : '');
        if (empty($id)) {
            send_json(['success' => false, 'error' => 'ID no proporcionado.'], 400);
        }

        $stmt = $pdo->prepare("DELETE FROM `class_bookings` WHERE `id` = ?");
        $stmt->execute([$id]);

        send_json(['success' => true]);
        break;

    case 'restore_default_bookings':
        ensure_schema($pdo);
        send_json(['success' => true]);
        break;

    default:
        send_json(['success' => false, 'error' => "Acción '{$action}' no reconocida."], 400);
}

