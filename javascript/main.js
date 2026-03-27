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


  startTypeWriter($(".hero__title"), devTitle, 175);
  startTypeWriter($(".hero__excerpt--small"), devDescription, 175);
});


function startTypeWriter(el, str, interval) {  
  let tempDevTitle = '';
  let timerId;
  let increment = 0;
  let add;
  let remove;

  // add = setInterval(() => {
  //   el.addClass("tw-bar");
  // }, 175);

  timerId = setInterval(() => {
    tempDevTitle += str[increment]
    el.text(tempDevTitle);
    increment++;
    if (tempDevTitle.length === str.length) {
      clearInterval(timerId)
      // clearInterval(add)
      // clearInterval(remove)
      // el.removeClass("tw-bar");
      // remove = setInterval(() => {
      //   el.removeClass("tw-bar");
      // }, 600);
    };
  }, interval);
};
