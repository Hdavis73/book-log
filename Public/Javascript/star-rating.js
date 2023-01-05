console.log("working");

let stars = Array.from(document.querySelectorAll(".star"));

stars.forEach((star) => {
  star.addEventListener("click", () => {
    if (star.classList.contains("active")) {
      for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove("active");
      }
    } else {
      for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove("active");
      }

      let starRating = stars.slice(0, stars.indexOf(star) + 1);

      for (let i = 0; i < starRating.length; i++) {
        starRating[i].classList.add("active");
      }
    }
  });

  star.addEventListener('mouseover', () => {
    console.log('mouse is over')

        star.classList.add('grow')
  })

  star.addEventListener('mouseleave', () => {
    star.classList.remove('grow')
  })
});


