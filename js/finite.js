const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const nextBtn = document.querySelector('.carousel__button--right')
const prevBtn = document.querySelector('.carousel__button--left')
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

track.style.transition = 'transform 250ms ease-in-out'

// Functions for various operations
const setSlidePosition = (slide, index) => {
    slide.style.left = (slideWidth * index) + 'px'
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}

const hideShowArrows = (slides, prevBtn, nextBtn, currentIndex)=> {
    if(currentIndex === 0){
        prevBtn.classList.add('is-hidden')
        nextBtn.classList.remove('is-hidden')
    } else if(currentIndex === slides.length - 1){
        prevBtn.classList.remove('is-hidden')
        nextBtn.classList.add('is-hidden')
    } else {
        prevBtn.classList.remove('is-hidden')
        nextBtn.classList.remove('is-hidden')
    }
}


// Arrange the slides next to one another
slides.forEach(setSlidePosition)

// When I click the left, move to the left
prevBtn.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot)
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex)
})


// When I click the right, move to the right
nextBtn.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling
    const nextIndex = slides.findIndex(slide => slide === nextSlide)
    
    moveToSlide(track, currentSlide, nextSlide)    
    updateDots(currentDot, nextDot)
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex)
})

// When I click the nav indicator, move to the slide
dotsNav.addEventListener('click', e => {
    // What element was clicked on
    const targetDot = e.target.closest('button')
    
    if(!targetDot) return

    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotsNav.querySelector('.current-slide')
    const currentIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[currentIndex]
    
    moveToSlide(track, currentSlide, targetSlide)   
    updateDots(currentDot, targetDot)
    hideShowArrows(slides, prevBtn, nextBtn, currentIndex)
})