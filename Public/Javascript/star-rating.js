console.log('working')

let stars = Array.from(document.querySelectorAll('.star'))

stars.forEach(star => {

    star.addEventListener('click', () => {

        for(let i = 0; i < stars.length; i++){
            stars[i].classList.remove('active')
        }

        let starRating = stars.slice(0,stars.indexOf(star)+1)
        
        for(let i = 0; i < starRating.length; i++){
            starRating[i].classList.add('active')
        }
    })

    // function activateStars(){
    //     for(let i = 0; i < num.length; i++){
    //         stars[i].classList.add('active')
    //     }
    // }
})

