<?php
$query = "SELECT * FROM vacationrequests WHERE status = ?";
$parameters = array('pending');
$result1 = $db->query($query, $parameters);


$query2 = "SELECT username FROM users WHERE id = ?";
$result2 = array();
foreach ($result1 as $row) {
    $parameters2 = array($row['user_id']);
    $usernameResult = $db->query($query2, $parameters2);
    if (!empty($usernameResult)) {
        $username = $usernameResult[0]['username'];
        $row['username'] = $username;
    }
    $result2[] = $row;
}

header('Content-Type: application/json');

echo json_encode($result2);