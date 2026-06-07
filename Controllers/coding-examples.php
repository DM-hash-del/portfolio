<?php



// ! passing in the cdn and scripts directly??
view('coding-examples.view.php', [
  'extraHeadLink' => '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-dark.min.css">',
  'cdnHighlightJS' => '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>',
  'highlightInvoke' => '<script>hljs.highlightAll();</script>',
  'title' => 'Coding Examples',
]);