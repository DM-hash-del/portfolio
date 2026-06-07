<?php
return [
  'database' => [
    'host' => $_ENV['DB_HOST'],
    'port' => $_ENV['DB_PORT'],
    'dbname' => $_ENV['DB_NAME'],
    'dbUser' => $_ENV['DB_USER'],
    'dbPassword' => $_ENV['DB_PASSWORD'],
    'charset' => $_ENV['CHARSET']
  ]
];
// The keys here represent the keys in the PDO instance when the DSN is created if key here !== expected key value in DSN -> connection can't find DB