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
      `<div class='carousel-item'>
        <div class='row mx-auto align-items-center'>
          <div class='col-12 col-sm-2 col-lg-2 offset-lg-1 text-center'>
            <img
              src='${picURL}'
              class='d-block align-self-center'
              alt='Carousel Pic 1'
            />
          </div>
          <div class='col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0'>
            <div class='quote-text'>
              <p class='text-white'>
                « ${quoteText}
              </p>
              <h4 class='text-white font-weight-bold'>${name}</h4>
              <span class='text-white'>${title}</span>
            </div>
          </div>
        </div>
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
  // Hide loading spinner until Ajax call
  $(".loader-popular").hide();
  $(document).on("ajaxStart", function() {
    $(".loader-popular").show();
  });
  $(document).on("ajaxStop", function() {
    $(".loader-popular").hide();
  });

  // Function to build Carousel Cards for Popular Videos
  function buildPopularVideoCard(title, subTitle, thumbURL, authorPicURL, author, stars, duration) {
    const newVideoCard = $(
      `<div class="d-flex justify-content-center">
        <div class="card">
          <img
            src="${thumbURL}"
            class="card-img-top"
            alt="Video thumbnail"
          />
          <div class="card-img-overlay text-center">
            <img
              src="images/play.png"
              alt="Play"
              width="64px"
              class="align-self-center play-overlay mx-auto"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold">
              ${title}
            </h5>
            <p class="card-text text-muted">
              ${subTitle}
            </p>
            <div class="creator d-flex align-items-center">
              <img
                src="${authorPicURL}"
                alt="Creator of
                Video"
                width="30px"
                class="rounded-circle"
              />
              <h6 class="pl-3 m-0 main-color">${author}</h6>
            </div>
            <div class="info pt-3 d-flex justify-content-between">
              <div class="rating d-flex align-items-center">
              </div>
              <span class="main-color">${duration}</span>
            </div>
          </div>
        </div>
      </div>`);

    // Add number of 'on' stars equal to star property
    for (let i = 0; i < stars; i++) {
      let newStar = $(
        `<img
          src="images/star_on.png"
          alt="star on"
          width="15px"
        />`);
      newVideoCard.find(".rating").append(newStar);
    }

    // Add number of 'off' stars equal to 5 minus star property
    const numOffStars = 5 - stars;
    for (let i = 0; i < numOffStars; i++) {
      let newOffStar = $(
        `<img
          src="images/star_off.png"
          alt="star off"
          width="15px"
        />`);
      newVideoCard.find(".rating").append(newOffStar);
    }

    $(".popular-videos-carousel").append(newVideoCard);
  }

  // Call Ajax for Video Card Data
  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    method: "GET",
    dataType: "json"
  }).done(function(data) {
    data.forEach((videoCardObject) => buildPopularVideoCard(videoCardObject.title, videoCardObject["sub-title"], videoCardObject.thumb_url,
      videoCardObject.author_pic_url, videoCardObject.author, videoCardObject.star, videoCardObject.duration));

    // Create Carousel with Slick
    $(".responsive-slick").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: ".arrow-left-popular",
      nextArrow: ".arrow-right-popular",
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
  }).fail(function() {
    console.log("Ajax Call Failed")
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
