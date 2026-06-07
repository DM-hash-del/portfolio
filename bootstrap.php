<?php

use App\Container;
use App\Database;
use App\Gateway;

$container = new Container;

$container->bind('App\Database', function() {
  $config = require base_path('config.php');
  return new Database($config['database']);
});

Gateway::setContainer($container);