<?php

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

$routes = [
    '/' => 'main.php',
    '/login' => 'login.php',
    '/allEmployees' => 'allEmployees.php',
    '/update' => 'update.php',
    '/create' => 'create.php',
    '/delete' => 'delete.php'
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