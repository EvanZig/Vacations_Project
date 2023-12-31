<?php

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

$routes = [
    '/' => 'main.php',
    '/login' => 'login.php',
    '/allEmployees' => 'manager/allEmployees.php',
    '/update' => 'manager/update.php',
    '/create' => 'manager/create.php',
    '/delete' => 'manager/delete.php',
    '/handleRequest' => 'manager/handleRequest.php',
    '/allRequests' => 'manager/allRequests.php',
    '/allVacations' => 'employee/allVacations.php',
    '/request' => 'employee/requestVacation.php'
];

function missingPage()
{
    echo "PAGE NOT FOUND";
    http_response_code(404);
    die();
}

if (array_key_exists($uri, $routes)) {
    require $routes[$uri];
} else {
    missingPage();
}