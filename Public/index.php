<?php

use App\Router;
use Dotenv\Dotenv;

const BASE_PATH = __DIR__ . '/../';

session_start();

require BASE_PATH . '/vendor/autoload.php';
require BASE_PATH . 'Src/functions.php';
require base_path('bootstrap.php');

$dotenv = Dotenv::createImmutable(BASE_PATH);
$dotenv->load();



$router = new Router();
$routes = require base_path('routes.php');
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$method = $_SERVER['REQUEST_METHOD'];

$router->route($uri, $method);




