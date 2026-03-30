// ? Sometimes no-scroll works, sometimes it doesn't?!
// let currentScrollPosition = 0;
$(window).ready(function() {


  // call plugin on element => specify which element to control
  $("#mobile-menu").sidr({
    name: "side-menu", // useful if trigger ins't <a> => <button> | <div>
    side: "left",
    displace: false,
    onOpen: function() {
      // currentScrollPosition = $(window).scrollTop();
      $("body").addClass("no-scroll");
      $("html").addClass("no-scroll");
      $(".burger-container").fadeOut(200);
    },
    onClose: function() {
      // $(window).scrollTop(currentScrollPosition);
      $("body").removeClass("no-scroll");
      $("html").removeClass("no-scroll");
      $(".burger-container").fadeIn(300);
    },
  });
  

  // Side-menu close button
  $(".close-sidr").on('click', () => {
    $.sidr("close", "side-menu");
  });
  

  // Link specific behavior for side-menu links
  $("#side-menu").on("click", "a[href^='#']", function() {
    $.sidr("close", "side-menu");
  });


  // Basic click check for outside side-menu to close side-menu
  $(window).on("click", function(event) {
    let clickedBurger = $(event.target).closest(".burger-container").length > 0;
    let clickedSidemenu = $(event.target).closest(".side-bar").length > 0;
    let isMenuOpen = $("body").hasClass("sidr-open");

    if (!clickedBurger && !clickedSidemenu && isMenuOpen) {
      $.sidr("close", "side-menu");
    }
  });

  // [refactored] Async .then chaining for hero-image title and description animation
  // setTimeout(() => {
  //   startTypeWriter($(".hero__title"), devTitle, 90)
  //     .then(() => { 
  //       setTimeout(() => {
  //         $(".hero__title").removeClass("tw-bar");
  //         startTypeWriter($(".hero__excerpt--small"), devDescription, 90)
  //       }, 1000);
  //     });
  // }, 1500);
  writeAnimation(90);


  function validateInput($input) {
    // These are not the original regex patterns, they adpated for JS
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /((?:\+|00)[17](?: |-)?|(?:\+|00)[1-9]\d{0,2}(?: |-)?|(?:\+|00)1-\d{3}(?: |-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |-)[0-9]{3}(?: |-)[0-9]{4})|([0-9]{7}))/;

    let isvalid = true;
    const value = $input.val().trim();
    const isRequired = $input.prop("required");
    const type = $input.attr("type");
    console.log("VALUE: ", value, "\n", "ISREQURED: ", isRequired, "\n", "TYPE: ", type);

    // check all input values against types
    if (isRequired && value === "") {
      isvalid = false;
    } else if (value !== "") {
      if (type === "email" && !emailRegex.test(value)) {
        isvalid = false;
      } else if (type === "tel" && !phoneRegex.test(value)) {
        isvalid = false;
      }
    }

    if (isvalid && value !== "") {
      $input.removeClass("contact__input--invalid").addClass("contact__input--valid");
    } else if (!isvalid) {
      $input.addClass("contact__input--invalid").removeClass("contact__input--valid");
    } else {
      $input.removeClass("contact__input--valid").removeClass("contact__input--invalid");
    }

    console.log("ISVALID RETURN VALUE: ", isvalid);
    return isvalid;
  };


  $(".contact__input").on("blur", function() {
    console.log("$(THIS) VALUE ON BLUR: ", $(this));
    validateInput($(this))
  });


  $(".contact__form").on("submit", function(e) {
    let formIsValid = true;
    // loop through each input element and check validity
    $(this).find(".contact-form__input").each(function() {
      if(!validateInput($(this))) {
        formIsValid = false;
        $(".contact-form__input--invalid").first().focus();
      }
    })
    e.preventDefault();
  })
});


// Animation function, per-string.
function typeWriter(el, str, delay) {
  el.addClass("tw-bar");
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

