/** Smile School JavaScript Project **/


/* Task 1 & Task 4 - Dynamic Quote Loading */

function populateQuotes() {
  // Hide loading spinner until Ajax call
  $(".loader-quotes").hide();
  $(document).on("ajaxStart", function() {
    $(".loader-quotes").show();
  });
  $(document).on("ajaxStop", function() {
    $(".loader-quotes").hide();
  });
  
  // Function to build quotes
  function buildQuote(id, picURL, name, title, quoteText) {
    const newQuote = $(
      `<div class='carousel-item'>\
        <div class='row mx-auto align-items-center'>\
          <div class='col-12 col-sm-2 col-lg-2 offset-lg-1 text-center'>\
            <img\
              src='${picURL}'\
              class='d-block align-self-center'\
              alt='Carousel Pic 1'\
            />\
          </div>\
          <div class='col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0'>\
            <div class='quote-text'>\
              <p class='text-white'>\
                « ${quoteText}\
              </p>\
              <h4 class='text-white font-weight-bold'>${name}</h4>\
              <span class='text-white'>${title}</span>\
            </div>\
          </div>\
        </div>\
      </div>`);

    $(".carousel-inner.quote-carousel").append(newQuote);

    if (id === 1) {
      $(".carousel-inner.quote-carousel .carousel-item").addClass("active");
    }
  }
  
  // Call Ajax for Quote Data
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    method: "GET",
    dataType: "json"
  }).done(function(data) {
    data.forEach((quoteObject) => buildQuote(quoteObject.id, quoteObject.pic_url, quoteObject.name, quoteObject.title, quoteObject.text));
  }).fail(function() {
    console.log("Ajax Call Failed")
  });
}

/* Task 2 - Dynamic Tutorial Loading */

function populatePopularTutorials() {
  $(".responsive-slick").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: ".arrow-left",
    nextArrow: ".arrow-right",
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });
}

/* Task 3 - Dynamic Latest Video Loading */

function populateLatestVideos() {
  // Placeholder
}

/* Task 5 - Dynamic Courses Loading */

function populateCourses() {
  // Placeholder
}

/* Call Dynamic Functions on Document Ready */

$( document ).ready(function() {
  const currentFile = window.location.pathname;

  if (currentFile.includes("homepage")) {
    populateQuotes();
    populatePopularTutorials();
    populateLatestVideos();
  } else if (currentFile.includes("pricing")) {
    populateQuotes();
  } else if (currentFile.includes("courses")) {
    populateCourses();
  }
});
