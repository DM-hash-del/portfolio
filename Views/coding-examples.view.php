<?php require base_path('Views/Partials/head.php'); ?>
<?php require base_path('Views/Partials/side-menu.php'); ?>

    <main class="code-grid container">
      <header class="code-example__header">
        <h1 class="code-example__title--main">&lt;Coding Examples /&gt;</h1>
        <p class="code-example__text--header">from completed projects</p>
      </header>

      <article class="code-example">
        <div class="code-example__description">
          <h2 class="code-example__title">Portfolio Project</h2>
          <div class="code-example__tags">
            <span>JavaScript</span><span>jQuery</span>
          </div>
          <p class="code-example__text">An asynchronous function designed to simulate text being typed to the screen.</p>
          <p class="code-example__text">The <em>typeWriter</em> function handles dynamic element selection, input string, and a delay for the DOM element being updated.</p>
          <p class="code-example__text">The <em>writeAnimation</em> function takes an integer for the delay and is custom built for the hero-text, it adds or removes CSS classes as necessary but the idea could be expanded for integration with any element with text content.</p>
          <div class="code-example__project-link">
            <a href="index.html" target="_self" rel="noopener noreferrer">View Project</a>
          </div>
        </div>
        <div class="code-example__code-container">
          <pre class="code-example__code-block"><code class="language-javascript">
writeAnimation(90);

// Animation function, per-string.
function typeWriter(el, str, delay) {
  el.addClass("tw-bar");
  // Once the recursion is done return promise => chain
  return new Promise((res) => {
    let increment = 0;
    function nextChar() {
      if (increment >= str.length) {
        return res();
      } else {
        el.text(str.slice(0, increment + 1));
        increment++;
        setTimeout(() => { nextChar(); }, delay);
      }
    };
    nextChar();
  });
};

// Hero-image Title and Description Animation
async function writeAnimation(delay) {
  const devTitle = "My name is ";
  const devName = "David Mackie";
  const devDescription = "I am a web developer";
  await typeWriter($(".hero__title"), devTitle, delay);
  await new Promise(res => setTimeout(res, 750) );
  $(".hero__title").removeClass("tw-bar")
  await typeWriter($(".hero__name"), devName, delay);
  await new Promise(res => setTimeout(res, 750) );
  $(".hero__name").removeClass("tw-bar")
  await typeWriter($(".hero__excerpt--small"), devDescription, delay);
};
</code></pre>
        </div>
      </article>

      <article class="code-example">
        <div class="code-example__description">
          <h2 class="code-example__title">Project Title</h2>
          <div class="code-example__tags">
            <span>HTML</span><span>Sass</span><span>JavaScript</span><span>jQuery</span>
          </div>
          <p class="code-example__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque inventore ab, iure omnis illum consequuntur nulla nostrum repudiandae! Corrupti, quaerat?</p>
          <div class="code-example__project-link">
            <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        </div>
        <div class="code-example__code-container">
          <pre class="code-example__code-block"><code>[Code Goes Here]</code></pre>
        </div>
      </article>

    </main>

<?php require base_path('Views/Partials/foot.php'); ?>