<?php require base_path('Views/Partials/head.php'); ?>
<?php require base_path('Views/Partials/side-menu.php'); ?>

<main class="page">

  <!-- HERO IMAGE -->
  <section id="hero-image" class="hero">
    <div class="hero__wrapper">
      <div class="hero__content">
        <p class="hero__title"></p>
        <h1 class="hero__name"></h1>
        <h3 class="hero__excerpt">
          <small class="hero__excerpt--small"></small>
        </h3>
      </div>
      <a class="hero__scroll" href="#projects">Scroll Down<span class="hero__scroll--icon"></span></a>
    </div>
  </section>

  <!-- PROJECT CARDS -->
  <section id="projects" class="project-cards">
    <div class="container">
      <div class="project-cards__container">
        <a class="project-cards__link" href="#">
          <div class="project-cards__card project-cards__card--1"></div>
          <h4 class="project-cards__title">Netmatters Mirror site</h4>
          <div class="project-cards__button">View Project</div>
        </a>
        <a class="project-cards__link" href="#">
          <div class="project-cards__card project-cards__card--2"></div>
          <h4 class="project-cards__title">Title of Project</h4>
          <div class="project-cards__button">View Project</div>
        </a>
        <a class="project-cards__link" href="#">
          <div class="project-cards__card project-cards__card--3"></div>
          <h4 class="project-cards__title">Title of Project</h4>
          <div class="project-cards__button">View Project</div>
        </a>
        <a class="project-cards__link" href="#">
          <div class="project-cards__card project-cards__card--4"></div>
          <h4 class="project-cards__title">Title of Project</h4>
          <div class="project-cards__button">View Project</div>
        </a>
        <a class="project-cards__link" href="#">
          <div class="project-cards__card project-cards__card--5"></div>
          <h4 class="project-cards__title">Title of Project</h4>
          <div class="project-cards__button">View Project</div>
        </a>
        <a class="project-cards__link" href="#">
          <div class="project-cards__card project-cards__card--6"></div>
          <h4 class="project-cards__title">Title of Project</h4>
          <div class="project-cards__button">View Project</div>
        </a>
        <!-- <a class="project-cards__view-btn-container" href="#" rel="noreferrer noopener">
          <p>View All Projects</p>
        </a> -->
      </div>
    </div>
  </section>

  <hr />

  <!-- CONTACT FORM -->
  <section id="form" class="contact">
    <div class="container">
      <div class="contact__container">
        <h2 class="contact__title">Get In Touch</h2>

        <div class="contact__notification">
          <p></p>
        </div>
        <form class="contact__form" action="" method="POST">
          <div class="contact__field contact__field--half">
            <label class="contact__label u-visually-hidden" for="first_name">First Name</label>
            <input class="contact__input" type="text" name="first_name" id="first_name" placeholder="First Name*">
          </div>
          
          <div class="contact__field contact__field--half">
            <label class="contact__label u-visually-hidden" for="last_name">Last Name</label>
            <input class="contact__input" type="text" name="last_name" id="last_name" placeholder="Last Name*">
          </div>
          
          <div class="contact__field contact__field--half">
            <label class="contact__label u-visually-hidden" for="email">Email</label>
            <input class="contact__input" type="email" name="email" id="email" placeholder="Email Address*">
          </div>

          <div class="contact__field contact__field--half">
            <label class="contact__label u-visually-hidden" for="phone">Contact Phone</label>
            <input class="contact__input" type="tel" name="phone" id="phone" placeholder="e.g., +1 555-123-4567 or 020 1234 5678" titled="Enter a valid international or local phone number">
          </div>
          
          <div class="contact__field">
            <label class="contact__label u-visually-hidden" for="subject">Subject</label>
            <input class="contact__input" type="text" name="subject" id="subject" placeholder="Subject">
          </div>
          
          <div class="contact__field">
            <label class="contact__label u-visually-hidden" for="message">Message</label>
            <textarea class="contact__input contact__input--textarea" name="message" id="message" cols="30" rows="10" placeholder="Your Message...*"></textarea>
          </div>

          <button class="contact__submit-btn" type="submit">Submit</button>
        </form>
        
        <a class="contact__scroll" href="#hero-image">Scroll Up<span class="contact__scroll--icon"></span></a>
      </div>
    </div>
  </section>

</main>

<?php require base_path('Views/Partials/foot.php'); ?>