const baseImage = document.querySelector(".image-base img");
const srcImages = [
  "/assets/themes/fashon1.jpg",
  "/assets/themes/fashon2.jpg",
  "/assets/themes/fashon3.jpg",
];

let index = 0;

const changeImage = () => {
  baseImage.src = srcImages[index];
  index = (index + 1) % srcImages.length;
};

setInterval(changeImage, 3000);

console.log(baseImage);
