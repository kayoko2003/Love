onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = "I LOVE YOU".split("");
    const titleElement = document.getElementById("title");
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};

window.addEventListener("load", function () {
  // Đặt thời gian trễ phù hợp với animation của hoa
  setTimeout(function () {
    document.querySelector(".btn").classList.add("show");
  }, 7000); // 4.5 giây
});

const textElements = document.querySelectorAll(".title span");
textElements.forEach((element) => {
  const randomDelay = Math.random() * 3;
  element.style.animationDelay = `${randomDelay}s`;
});
