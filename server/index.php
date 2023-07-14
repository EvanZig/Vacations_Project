<?php
// allowing access because of cors issues
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


require "config/Database.php";
require "routes/routes.php";