(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));

$("#someElem").invisible();
// $(`[data-field="first_name"] p`).invisible();
$('.contact__success-msg p').invisible();
$("#someOther").visible();

// ? Sometimes no-scroll works, sometimes it doesn't?!
// let currentScrollPosition = 0;
$(window).ready(function() {

  // call plugin on element => specify which element to control
  // --------------------------------------------------------
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
  // --------------------------------------------------------
  $(".close-sidr").on('click', () => {
    $.sidr("close", "side-menu");
  });
  

  // Link specific behavior for side-menu links
  // --------------------------------------------------------
  $("#side-menu").on("click", "a[href^='#']", function() {
    $.sidr("close", "side-menu");
  });


  // Basic click check for outside side-menu to close side-menu
  // --------------------------------------------------------
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
  // ! Wtf does this number even mean?!?!?!?!
  // ! are you stupid? Make some constants
  writeAnimation(90);

  // Centralized UI Validator Agent
  // --------------------------------------------------------
  function updateFieldUI(fieldName, status, icon, message) {
    const $li = $(`.contact__notification ul li[data-field="${fieldName}"]`);
    const $input = $(`[name="${fieldName}"]`);
    const $iconSpan = $li.find('.material-symbols-rounded');
    const $msgText = $li.find('p');

    // 1. Reset all state classes on this specific field
    $li.removeClass('contact__validation-msg--error contact__validation-msg--warning contact__validation-msg--success');
    $input.removeClass('contact__input--invalid contact__input--valid');

    // 2. Apply classes based on incoming state
    if (status === 'error') {
      $li.addClass('contact__validation-msg--error');
      $input.addClass('contact__input--invalid');
    } else if (status === 'warning') {
      $li.addClass('contact__validation-msg--warning');
      $input.addClass('contact__input--invalid');
    } else if (status === 'success') {
      $li.addClass('contact__validation-msg--success');
      $input.addClass('contact__input--valid');
    }

    // 3. Set the icon string natively into the scoped span element
    $iconSpan.text(icon || '');

    // 4. Safely handle paragraph visibility to suppress pseudo-elements when empty
    if (message && message.trim() !== "") {
      $msgText.text(message).visible();
    } else {
      $msgText.text("").invisible();
    }
  }

  // Handles validation for Contact Form Inputs
  // --------------------------------------------------------
  function validateInput($input) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /((?:\+|00)[17](?: |-)?|(?:\+|00)[1-9]\d{0,2}(?: |-)?|(?:\+|00)1-\d{3}(?: |-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |-)[0-9]{3}(?: |-)[0-9]{4})|([0-9]{7}))/;

    let isvalid = true;
    const value = $input.val().trim();
    const isRequired = $input.prop("required");
    const type = $input.attr("type");
    const fieldName = $input.attr("name");

    // Local validation parsing rules
    if (isRequired && value === "") {
      updateFieldUI(fieldName, 'error', 'error', 'Field is required');
      isvalid = false;
    } else if (value !== "") {
      if (type === "email" && !emailRegex.test(value)) {
        updateFieldUI(fieldName, 'warning', 'fmd_bad', 'Please check your email formatting.');
        isvalid = false;
      } else if (type === "tel" && !phoneRegex.test(value)) {
        updateFieldUI(fieldName, 'warning', 'fmd_bad', 'Invalid phone number format.');
        isvalid = false;
      } else if ((type === 'text' || $input.is('textarea')) && value.length < 3) {
        updateFieldUI(fieldName, 'warning', 'fmd_bad', 'Min 3 characters.');
        isvalid = false;
      }
    }

    // Clear states if an optional field is completely cleared out manually
    if (isvalid && value === "" && !isRequired) {
      updateFieldUI(fieldName, 'clear', '', '');
    } else if (isvalid) {
      updateFieldUI(fieldName, 'success', 'done_outline', '');
    }

    return isvalid;
  }

  // Validates Contact Form Inputs on Blur
  // --------------------------------------------------------
  $(".contact__input").on("blur", function() {
    validateInput($(this));
  });

  // Handle Contact Form submission
  // --------------------------------------------------------
  $(".contact__form").on("submit", function(e) {
    e.preventDefault();
    let formIsValid = true;

    // loop through each input element and check validity
    $(this).find(".contact__input").each(function() {
      if(!validateInput($(this))) {
        formIsValid = false;
        $(".contact__input--invalid").first().focus();
      }
    });

    if (!formIsValid) {
      return;
    }

    const formData = new FormData(this);

    fetch('/process', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if(response.status >= 500) {
        throw new Error(`Server error! status: ${response.status}`);
      }
      // Useful for makformed JSON response from server => could be response.json() assuming no bugs.
      return response.text();
    })
    .then(text => {
      // malformed json try/catch
      try {
        const data = JSON.parse(text)

        if (data.status === 'error') {
          Object.keys(data.fields).forEach(fieldName => {
            const fieldData = data.fields[fieldName];
            // Feed the single UI agent the data directly using clean associative keys
            updateFieldUI(fieldName, fieldData.status, fieldData.icon, fieldData.msg);
          });
          
          $(".contact__input--invalid").first().focus();
        } else if (data.status === 'success') {
          // Form submission fully valid, update all items visually to success ticks
          $(".contact__input").each(function() {
            const name = $(this).attr("name");
            updateFieldUI(name, 'success', 'done_outline', '');
          });
          
          document.querySelector('.contact__form').reset();

          $('.contact__success-msg p').text(data.message);
          $('.contact__success-msg p').visible();
          setTimeout(() => {
            $('.contact__success-msg p').invisible();
            $('.contact__success-msg p').text('');
          }, 5000);
          // ! you still need to reset all the validation UI 
        }
      } catch (err) {
        console.error("Server Returned non-JSON text:", text);
        console.error(err);
      }
    }).catch(err => {
      // catching network/http/promise-chain errors
      console.log("Fetch/Network Error:", err.message);
    })
  })
});


// Animation function, per-string.
// --------------------------------------------------------
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
// --------------------------------------------------------
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

