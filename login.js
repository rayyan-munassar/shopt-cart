// ==== Modal functionalty ====
const modal = document.querySelector(".modal");
const loginBtn = document.querySelector(".login-btn");
const closeBtn = document.querySelector(".close-btn");

loginBtn.addEventListener("click", () => {
  modal.showModal();
});
closeBtn.addEventListener("click", () => {
  modal.close();
});
