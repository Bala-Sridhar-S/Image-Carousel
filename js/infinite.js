const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const nextBtn = document.querySelector('.carousel__button--right')
const prevBtn = document.querySelector('.carousel__button--left')
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width
let counter = 1

track.style.transform = 'translateX(-' + (slideWidth * counter) + 'px)'

// Functions for various operations
const setSlidePosition = (slide, index) => {
    slide.style.left = (slideWidth * index) + 'px'
}

const updateDots = () => {
    if(counter >= 1 && counter <= slides.length){
        dots.map((dot, index) => {
            if(index === counter - 1){
                dot.classList.add('current-slide')
            } else {
                dot.classList.remove('current-slide')
            }
        })
    }
}

// Arrange the slides next to one another
slides.forEach(setSlidePosition)

// When I click the left, move to the left
prevBtn.addEventListener('click', (e) => {
    if(counter <= 0) return
    track.style.transition = 'transform 250ms ease-in-out'
    counter--
    track.style.transform = 'translateX(-' + (slideWidth * counter) + 'px)'
    updateDots()
})

// When I click the right, move to the right
nextBtn.addEventListener('click', (e) => {
    if(counter >= slides.length - 1) return
    track.style.transition = 'transform 250ms ease-in-out'
    counter++
    track.style.transform = 'translateX(-' + (slideWidth * counter) + 'px)'
    updateDots()
})

// When I click the nav indicator, move to the slide
dotsNav.addEventListener('click', e => {
    // What element was clicked on
    const targetDot = e.target.closest('button')
    
    if(!targetDot) return
    const currentIndex = dots.findIndex(dot => dot === targetDot)

    counter = currentIndex + 1
    track.style.transform = 'translateX(-' + (slideWidth * counter) + 'px)'

    updateDots()
})

// Loopback at the end of the carousel
track.addEventListener('transitionend', () => {
    if(slides[counter].id === 'lastClone'){
        track.style.transition = 'none'
        counter = slides.length - 2
        track.style.transform = 'translateX(-' + (slideWidth * counter) + 'px)'
        updateDots()
    }

    if(slides[counter].id === 'firstClone'){
        track.style.transition = 'none'
        counter = slides.length - counter
        track.style.transform = 'translateX(-' + (slideWidth * counter) + 'px)'
        updateDots()
    }
})