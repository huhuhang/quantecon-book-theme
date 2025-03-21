// Import CSS variables
// ref: https://css-tricks.com/getting-javascript-to-talk-to-css-and-sass/
import "../styles/index.scss";

document.addEventListener("DOMContentLoaded", function () {
  // Avoid `console` errors in browsers that lack a console.
  (function () {
    var method;
    var noop = function () {};
    var methods = [
      "assert",
      "clear",
      "count",
      "debug",
      "dir",
      "dirxml",
      "error",
      "exception",
      "group",
      "groupCollapsed",
      "groupEnd",
      "info",
      "log",
      "markTimeline",
      "profile",
      "profileEnd",
      "table",
      "time",
      "timeEnd",
      "timeline",
      "timelineEnd",
      "timeStamp",
      "trace",
      "warn",
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  })();

  // Load feather icon set

  feather.replace();

  // Set DOM elements variables

  var $window = $(window),
    $head = $("head"),
    $body = $("body"),
    $sidebar = $(".qe-sidebar"),
    $lighLogo = $(".logo-img"),
    $darkLogo = $(".dark-logo-img"),
    $sidebarToggle = $(".btn__sidebar");

  // Toolbar contrast toggle

  function setContrast() {
    var setContrast = localStorage.setContrast;
    if (setContrast == 1) {
      $body.addClass("dark-theme");
      $(".btn__contrast").addClass("btn-active");
    }
  }

  setContrast();

  $(".btn__contrast").on("click", function (event) {
    // Prevent default.
    event.preventDefault();
    event.stopPropagation();

    if ($(this).hasClass("btn-active")) {
      $(this).removeClass("btn-active");
      localStorage.setContrast = 0;
      $body.removeClass("dark-theme");
    } else {
      $(this).addClass("btn-active");
      localStorage.setContrast = 1;
      $body.addClass("dark-theme");
      if (!$darkLogo.length) {
        $lighLogo.css("display", "block");
      }
    }
  });

  // search button

  $("#search-icon").on("click", function (event) {
    if ($("#search-input").hasClass("search-open")) {
      $("#search-input").closest("form").trigger("submit");
    } else {
      $("#search-input").addClass("search-open").focus();
      $(this).css("pointer-events", "none");
    }
  });

  $("#search-input").on("focusout", function () {
    if (!$(this).val()) {
      $(this).removeClass("search-open");
      $("#search-icon").css("pointer-events", "auto");
    }
  });

  // Sidebar toggles

  function setSidebar() {
    var setSidebar = localStorage.setSidebar;
    if (
      setSidebar == 1 &&
      $sidebar.hasClass("persistent") &&
      $(window).width() > 1340
    ) {
      openSidebar();
    }
  }

  setSidebar();

  function openSidebar() {
    $sidebarToggle.addClass("btn-active");
    $sidebar.removeClass("inactive");
    $(".qe-toolbar svg.feather.feather-menu").replaceWith(
      feather.icons.x.toSvg(),
    );
    localStorage.setSidebar = 1;
  }
  function closeSidebar() {
    $sidebarToggle.removeClass("btn-active");
    $sidebar.addClass("inactive");
    $(".qe-toolbar svg.feather.feather-x").replaceWith(
      feather.icons.menu.toSvg(),
    );
    localStorage.setSidebar = 0;
  }

  $(document).on("click", ".btn__sidebar", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if ($sidebar.hasClass("inactive")) {
      openSidebar();
    } else {
      closeSidebar();
    }
    if (window.innerWidth <= 1340) {
      $(document.body).on("click", function (e) {
        if (!$(event.target).is(".sidebar *")) {
          closeSidebar();
          $body.off("click");
        }
      });
    }
  });

  $(".btn__top").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $(".btn__fullscreen").on("click", function () {
    event.preventDefault();
    event.stopPropagation();
    $(this).toggleClass("btn-active");

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      //in fullscreen, so exit it
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      //not fullscreen, so enter it
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }
  });

  function setFontSize() {
    // Get font size from local storage
    var toolbarFont = localStorage.toolbarFont;
    // 默认值为 0
    if (toolbarFont == null) {
      toolbarFont = 0;
    }
    if (toolbarFont == 1) {
      $("html").addClass("font-plus");
    } else if (toolbarFont == -1) {
      $("html").addClass("font-minus");
    } else {
      $("html").removeClass("font-plus");
      $("html").removeClass("font-minus");
      localStorage.toolbarFont = 0;
    }
  }

  setFontSize();

  $(".btn__plus").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var toolbarFont = parseInt(localStorage.getItem("toolbarFont")) + 1;
    if (toolbarFont > 0) {
      toolbarFont = 1;
    }
    localStorage.toolbarFont = toolbarFont;
    setFontSize();
  });

  $(".btn__minus").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var toolbarFont = parseInt(localStorage.getItem("toolbarFont")) - 1;
    if (toolbarFont < 0) {
      toolbarFont = -1;
    }
    localStorage.toolbarFont = toolbarFont;
    setFontSize();
  });

  /* Collapsed code block */

  const collapseAccToHeight = (el, elH) => {
    if (el.includes("tag_collapse")) {
      index = el.indexOf("-");
      height = el.substring(index + 1);
      if (height && !isNaN(height)) {
        elH.style.height = parseInt(height) + 0.5 + "em"; // 0.5 to account for padding
      }
    }
  };
  const collapsableCodeBlocks = document.querySelectorAll(
    "div[class^='cell tag_collapse']",
  );
  for (var i = 0; i < collapsableCodeBlocks.length; i++) {
    const collapsableCodeBlocksH =
      collapsableCodeBlocks[i].querySelectorAll(".highlight")[0];
    collapsableCodeBlocks[i].classList.forEach((el) => {
      collapseAccToHeight(el, collapsableCodeBlocksH);
    });
    const toggleContainer = document.createElement("div");
    toggleContainer.innerHTML =
      '<a href="#" class="toggle toggle-less" style="display:none;"><span class="icon icon-angle-double-up"></span><em>Show less...</em></a><a href="#" class="toggle toggle-more"><span class="icon icon-angle-double-down"></span><em>Show more...</em></a>';
    collapsableCodeBlocksH.parentNode.insertBefore(
      toggleContainer,
      collapsableCodeBlocksH.nextSibling,
    );
  }

  const collapsableCodeToggles = document.querySelectorAll(
    "div[class^='cell tag_collapse'] .toggle",
  );
  for (var i = 0; i < collapsableCodeToggles.length; i++) {
    collapsableCodeToggles[i].addEventListener("click", function (e) {
      e.preventDefault();
      var codeBlock = this.closest('div[class^="cell tag_collapse"]');
      codeBlockH = codeBlock.querySelector(".highlight");
      if (codeBlock.classList.contains("expanded")) {
        codeBlock.classList.remove("expanded");
        this.style.display = "none";
        this.nextSibling.style.display = "block";
        codeBlock.classList.forEach((el) => {
          collapseAccToHeight(el, codeBlockH);
        });
      } else {
        codeBlock.classList.add("expanded");
        this.style.display = "none";
        this.previousSibling.style.display = "block";
        codeBlockH.style.height = "auto";
      }
    });
  }

  /* Wrap container around all tables allowing hirizontal scroll */

  const contentTables = document.querySelectorAll(".qe-page__content table");
  for (var i = 0; i < contentTables.length; i++) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("table-container");
    contentTables[i].parentNode.insertBefore(wrapper, contentTables[i]);
    wrapper.appendChild(contentTables[i]);
  }

  if (document.getElementById("downloadButton")) {
    const template = document.getElementById("downloadPDFModal");
    template.style.display = "block";
    tippy("#downloadButton", {
      content: template,
      theme: "light-border",
      animation: "shift-away",
      inertia: true,
      duration: [200, 200],
      arrow: true,
      arrowType: "round",
      delay: [200, 200],
      interactive: true,
      trigger: "click",
    });
  }

  /**
   * remove the search hint for now
   */
  (function () {
    let forms = document.querySelectorAll("form.bd-search");
    forms.forEach((f) =>
      f.querySelector(".search-button__kbd-shortcut").remove(),
    );
  })();

  // Tooltips
  tippy("[data-tippy-content]", {
    touch: false,
  });
});
