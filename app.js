const imgSlide = document.querySelector(".slider");
const btns = document.querySelectorAll(".container button");
const scrollBar = document.querySelector(".scroll_bar");
const thumb = document.querySelector(".thumb");

const slideMaxScrolLeft = imgSlide.scrollWidth - imgSlide.clientWidth;
// console.log(slideMaxScrolLeft);

thumb.addEventListener("mousedown", (e) => {
  const startX = e.clientX;
  const thumbPosition = thumb.offsetLeft;
  // console.log(startX, thumbPosition);

  const handleMouseMove = (e) => {
    let deltaX = e.clientX - startX;
    // console.log(e.clientX);
    const nexThumbPosition = thumbPosition + deltaX;
    const maxThumbPosition =
      scrollBar.getBoundingClientRect().width - thumb.offsetWidth;
    // console.log(maxThumbPosition);
    // console.log(thumb.offsetWidth);
    // console.log(maxThumbPosition, nexThumbPosition);

    const boundedPosition = Math.max(
      0,
      Math.min(maxThumbPosition, nexThumbPosition)
    );
    const scrollPosition =
      (boundedPosition / maxThumbPosition) * slideMaxScrolLeft;

    thumb.style.left = boundedPosition + "px";
    imgSlide.scrollLeft = scrollPosition;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const direction = btn.id === "previous" ? -1 : 1;
    const sliderScroling = imgSlide.clientWidth * direction;
    // console.log(sliderScroling);
    imgSlide.scrollBy({
      left: sliderScroling,
      behavior: "smooth",
    });
  });
});

const handelBtn = () => {
  btns[0].style.display = imgSlide.scrollLeft <= 0 ? "none" : "block";
  btns[1].style.display =
    imgSlide.scrollLeft >= slideMaxScrolLeft ? "none" : "block";
};

const handelThumb = () => {
  const slideInitialPostion = imgSlide.scrollLeft;
  //    console.log(slideInitialPostion);
  const thumbPosition =
    (slideInitialPostion / slideMaxScrolLeft) *
    (scrollBar.clientWidth - thumb.offsetWidth);
  //    console.log(thumbPosition, scrollBar.clientWidth, thumb.offsetWidth);
  // console.log(thumbPosition);
  thumb.style.left = thumbPosition + "px";
};

imgSlide.addEventListener("scroll", () => {
  handelBtn();
  handelThumb();
});
