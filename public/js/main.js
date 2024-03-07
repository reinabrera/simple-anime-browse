const mobileSearchButton = document.getElementById("mobile-search-button");
const formSearch = document.getElementById("form-search");
const closeBtn = document.getElementById("close-btn")

console.log(mobileSearchButton, formSearch);

const handleClick = () => {
  formSearch.classList.toggle("active");
}

mobileSearchButton.addEventListener("click", handleClick);
closeBtn.addEventListener("click", handleClick);