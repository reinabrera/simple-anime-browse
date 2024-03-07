function initiateCarousel(element) {
  const carousel = element.querySelector(".c-carousel-inner");
  const carouselLength = carousel.children.length;
  const carouselItemWidth =
    carousel.querySelector(".c-carousel-item").offsetWidth;
  const carouselButtons = element.querySelectorAll(".c-carousel-control");
  const carouselActiveItemCount = Math.floor(
    Math.round(element.offsetWidth / carouselItemWidth)
  );
  let startX,
    scrollSum = 0,
    mouseIsDown,
    count = 0,
    mx,
    lastDirection,
    prevScroll;

  carouselButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const btnDir = button.dataset.direction;
      if (btnDir == "right") {
        if (prevScroll) {
          mouseToLeft();
        }
        prevScroll = true;
        moveToLeftSnap();
      } else if (btnDir == "left") {
        if (!prevScroll) {
          mouseToRight();
        }
        prevScroll = false;
        moveToRightSnap();
      }
    });
  });

  function mouseToLeft() {
    if (count >= carouselLength) {
      count = 0;
    }
    count++;
    for (i = 0; i < carouselLength; i++) {
      carousel.children[i].style.removeProperty("order");
      carousel.children[i].classList.remove("active");
      if (i < count) {
        carousel.children[i].style.order = "1";
      }
    }
  }

  function mouseToRight() {
    if (count <= 0) {
      count = carouselLength;
    }
    count--;
    for (i = carouselLength - 1; i >= 0; i--) {
      carousel.children[i].style.removeProperty("order");
      if (i >= count) {
        carousel.children[i].style.order = "-1";
      }
    }
  }

  function moveToRightSnap(value = carouselItemWidth) {
    carousel.style.removeProperty("transition");
    carousel.style.transform = `translate3d(-${value}px, 0, 0)`;
    setTimeout(() => {
      carousel.style.transition = `transform 0.342s ease`;
      carousel.style.transform = `translate3d(0, 0, 0)`;
    }, 1);
  }

  function moveToLeftSnap(value = 0) {
    carousel.style.removeProperty("transition");
    carousel.style.transform = `translate3d(${value}, 0, 0)`;
    setTimeout(() => {
      carousel.style.transition = `transform 0.342s ease`;
      carousel.style.transform = `translate3d(-${carouselItemWidth}px, 0, 0)`;
    }, 1);
  }

  const startDrag = (e) => {
    mouseIsDown = true;
    startX = e.pageX;
    mx = e.pageX;
    carousel.style.removeProperty("transition");
  };

  const dragging = (e) => {
    if (mouseIsDown) {
      carousel.classList.add("dragging");
      scrollSum = e.pageX - startX;
      if (mx < e.pageX) {
        lastDirection = "right";
      } else if (mx > e.pageX) {
        lastDirection = "left";
      }
      if (scrollSum > 0) {
        startX = e.pageX + carouselItemWidth;
        scrollSum = scrollSum - carouselItemWidth;
        if (!prevScroll) {
          mouseToRight();
        }
      } else if (prevScroll || scrollSum <= -carouselItemWidth) {
        scrollSum = 0;
        startX = e.pageX;
        mouseToLeft();
        prevScroll = false;
      }
      carousel.style.transform = `translate3d(${scrollSum}px,0,0)`;
      mx = e.pageX;
    }
  };

  const startTouch = (e) => {
    mouseIsDown = true;
    startX = e.touches[0].clientX;
    mx = e.touches[0].clientX;
    carousel.style.removeProperty("transition");
  };

  const moveTouch = (e) => {
    if (mouseIsDown) {
      carousel.classList.add("dragging");
      scrollSum = e.touches[0].clientX - startX;
      if (mx < e.touches[0].clientX) {
        lastDirection = "right";
      } else if (mx > e.touches[0].clientX) {
        lastDirection = "left";
      }
      if (scrollSum > 0) {
        startX = e.touches[0].clientX + carouselItemWidth;
        scrollSum = scrollSum - carouselItemWidth;
        if (!prevScroll) {
          mouseToRight();
        }
      } else if (prevScroll || scrollSum <= -carouselItemWidth) {
        scrollSum = 0;
        startX = e.touches[0].clientX;
        mouseToLeft();
        prevScroll = false;
      }
      carousel.style.transform = `translate3d(${scrollSum}px,0,0)`;
      mx = e.touches[0].clientX;
    }
  };

  const stopDrag = (e) => {
    mouseIsDown = false;
    if (lastDirection == "right") {
      moveToRightSnap(scrollSum);
    } else if (lastDirection == "left") {
      moveToLeftSnap(scrollSum);
      prevScroll = true;
    }
    lastDirection = "";
    carousel.classList.remove("dragging");
  };

  const reset = () => {
    startX = 0;
    mx = 0;
  };

  carousel.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", stopDrag);
  carousel.addEventListener("touchstart", startTouch);
  document.addEventListener("touchmove", moveTouch);
  document.addEventListener("touchend", stopDrag);
  document.addEventListener("resize", reset);
}

const carousels = document.querySelectorAll(".c-carousel");
carousels.forEach(initiateCarousel);
