// ? Sometimes no-scroll works, sometimes it doesn't?!
// let currentScrollPosition = 0;
const devTitle = "My name is David Mackie";
const devDescription = "I am a web developer";

// console.log($(".hero__title").text().length)
// console.log(typeof $(".hero__title").text())

$(document).ready(function() {
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
  
  $(".close-sidr").on('click', () => {
    $.sidr("close", "side-menu");
  });
  
  $("#side-menu").on("click", "a[href^='#']", function() {
    $.sidr("close", "side-menu");
  });

  $(window).on("click", function(event) {
    let clickedBurger = $(event.target).closest(".burger-container").length > 0;
    let clickedSidemenu = $(event.target).closest(".side-bar").length > 0;
    let isMenuOpen = $("body").hasClass("sidr-open");

    if (!clickedBurger && !clickedSidemenu && isMenuOpen) {
      $.sidr("close", "side-menu");
    }
  });

  setTimeout(() => {
    startTypeWriter($(".hero__title"), devTitle, 90)
      .then(() => { 
        setTimeout(() => { startTypeWriter($(".hero__excerpt--small"), devDescription, 90)}, 1000);
      });
  }, 1500);
});


function startTypeWriter(el, str, delay) {
  el.addClass("tw-bar");
  return new Promise((res) => {
    let increment = 0;
    function nextChar() {
      if (increment >= str.length) {
        $(".hero__title").removeClass("tw-bar");
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
