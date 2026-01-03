window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 300);
  }
});
