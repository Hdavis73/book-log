const colorPicker = document.querySelector('.color-picker')
let clickCount = 1

colorPicker.addEventListener('click', changeColor)

function changeColor() {
    const backgroundGradient = document.querySelector(':root').style

    switch(clickCount){
        case 0: 
            backgroundGradient.setProperty('--main-color', '#fbaf87')
            clickCount += 1
            break;
        case 1:
            backgroundGradient.setProperty('--main-color', '#ffb7c5')
            clickCount += 1
            break;
        case 2:
            backgroundGradient.setProperty('--main-color', '#6196dc')
            clickCount += 1
            break;
        case 3:
            backgroundGradient.setProperty('--main-color', '#861e2e')
            clickCount += 1
            break;
        case 4:
            backgroundGradient.setProperty('--main-color', '#7084e7')
            clickCount += 1
            break;
        case 5:
            backgroundGradient.setProperty('--main-color', '#104b51')
            clickCount += 1
            break;
        case 6:
            backgroundGradient.setProperty('--main-color', '#755e4f')
            clickCount += 1
            break;
        case 7:
            backgroundGradient.setProperty('--main-color', '#36454F')
            clickCount += 1
            break;
        default:
            backgroundGradient.setProperty('--main-color', '#99c791')
            clickCount = 0

    }
}

