// const carousel = document.querySelector('.slider-inner');
// const carouselFirstElementWidth = document.querySelector('.slider-inner li').offsetWidth;
// const carouselWidth = carousel.offsetWidth;
// const carouselButtons = document.querySelectorAll('.slider-control');
// console.log(carouselButtons);

// let mouseIsDown = false, startX, startScrollLeft, sliderElement, scrollSum, interval, slideCount = 0, slideToShow = 4, buttonTimeout = false, mouseToRight = false, mouseToLeft = false;

// function sliderToLeft(sliderElement, value) {
//     if (slideCount == 0) {
//         slideCount = sliderElement.children.length;
//     }
//     slideCount--;
//     sliderElement.style.transition = 'none';
//     sliderElement.style.transform = `translate3d(-${value}px, 0, 0)`;
//     for (i=sliderElement.children.length; i > 0; i--) {
//         sliderElement.children[i-1].style.order = "0";
//         if (slideCount < i && i <= (slideCount + slideToShow) ) {
//             sliderElement.children[i-1].style.order = "-1";
//         } else if (i >= (slideCount + slideToShow)) {
//             sliderElement.children[i-1].style.order = "-1";
//         }
//     }
//     setTimeout(function(){
//         sliderElement.style.transition = "transform 0.3s";
//         sliderElement.style.transform = "translate3d(0, 0, 0)";
//     }, 1)
// }

// function sliderToRight(sliderElement, value) {
//     slideCount++;
//     if (!mouseIsDown) {
//         sliderElement.style.transition = "all .3s";
//         sliderElement.style.transform = `translate3d(-${value}px, 0, 0)`;
//     }
//     if (slideCount >= sliderElement.children.length) {
//         slideCount = 0;
//     }
//     setTimeout(function(){
//         sliderElement.style.transition = "none";
//         for (i=0; i < sliderElement.children.length ; i++) {
//             sliderElement.children[i].style.order = "1";
//             if (i >= slideCount && i < (slideToShow + slideCount)) {
//                 sliderElement.children[i].style.order = "-1";
//             } else if (i >= slideCount + slideToShow) {
//                 sliderElement.children[i].style.order = "0";
//             }
//         }   
//         sliderElement.style.transform = `translate3d(0, 0, 0)`;
//     }, 300)
// }


// // carouselButtons.forEach((button) => {
// //     button.addEventListener("click", () => {
// //         if (buttonTimeout) {
// //             return;
// //         } else {
// //             if (button.id == "slider-left") {
// //                 sliderToLeft(button.previousElementSibling, carouselFirstElementWidth);
// //             } else if (button.id == "slider-right") {
// //                 sliderToRight(button.previousElementSibling.previousElementSibling, carouselFirstElementWidth);
// //             }
// //         }
// //         buttonTimeout = true;
// //         setTimeout(function(){
// //             buttonTimeout = false;
// //         }, 300)
// //     });
// // });

// const startDrag = (e) => {
//     mouseIsDown = true;
//     startX = e.pageX;
//     mx = 0;
// }

// const dragging = (e) => {
//     if (mouseIsDown) {
//         scrollSum = e.pageX - startX;
//         if (Math.abs(scrollSum) >= carouselFirstElementWidth) {
//             scrollSum = 0;
//             startX = e.pageX;
//         }
//         carousel.style.transform = `translate3d(${scrollSum}px, 0, 0)`; 
//         if (e.pageX < mx && mouseToRight == false) {
//             // mouseToRight = true;
//             // mouseToLeft = false;
//             // console.log("sliding to right");
//             if (Math.abs(scrollSum) >= carouselFirstElementWidth) {
//                 sliderToRight(carousel);
//             }
//         } else if (e.pageX > mx && mouseToLeft == false) {
//             // mouseToRight = false;
//             // mouseToLeft = true;
//             console.log("sliding to left")
//         }
//         mx = e.pageX;
//     }
// }

// const stopDrag = () => {
//     mouseIsDown = false;
//     if (!mouseIsDown) {
//     }
// }

// carousel.addEventListener("mousedown", startDrag);

// carousel.addEventListener("mousemove", dragging);

// carousel.addEventListener("mouseup", stopDrag);