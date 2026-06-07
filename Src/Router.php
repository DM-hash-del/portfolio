<?php
namespace App;

class Router
{
  protected $routes = [];

  public function add($method, $uri, $controller)
  {
    $this->routes[] = [
      'uri' => $uri,
      'controller' => $controller,
      'method' => $method,
    ];

    return $this;
  }

  public function get($uri, $controller)
  {
    return $this->add('GET', $uri, $controller);
  }

  public function post($uri, $controller)
  {
    return $this->add('POST', $uri, $controller);
  }

  public function route($uri, $method)
  {
    foreach ($this->routes as $route) {
      if ($route['uri'] === $uri && $route['method'] === strtoupper($method)) {
        return require base_path('Controllers/' . $route['controller']);
      };
    }
    // ! abort() -> to lod a 404 or other page if route fails
  }
}