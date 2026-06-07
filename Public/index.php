<?php

use Dotenv\Dotenv;

const BASE_PATH = __DIR__ . '/../';

session_start();

require BASE_PATH . '/vendor/autoload.php';
require BASE_PATH . 'Src/functions.php';
require base_path('bootstrap.php');

$dotenv = Dotenv::createImmutable(BASE_PATH);
$dotenv->load();

