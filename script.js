//your code here
document.addEventListener("DOMContentLoaded", () => {
  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  
  // Pick one random image to duplicate
  const duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  const allImages = [...imageClasses, duplicateClass];
  
  // Shuffle the 6 images randomly
  allImages.sort(() => Math.random() - 0.5);

  const mainContainer = document.querySelector("main");
  const heading = document.getElementById("h");
  const imageContainer = document.getElementById("image-container");
  const para = document.getElementById("para");

  let clickedImages = [];

  // Render images
  allImages.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.setAttribute("data-ns-test", imgClass);
    
    img.addEventListener("click", () => {
      // Prevent selecting the same image twice or picking more than 2 images
      if (clickedImages.includes(img) || clickedImages.length >= 2) return;
      
      img.classList.add("selected");
      clickedImages.push(img);

      // Show Reset button once at least one image is clicked
      if (clickedImages.length > 0 && !document.getElementById("reset")) {
        const resetBtn = document.createElement("button");
        resetBtn.id = "reset";
        resetBtn.textContent = "Reset";
        resetBtn.addEventListener("click", resetState);
        mainContainer.appendChild(resetBtn);
      }

      // Show Verify button when exactly two images are selected
      if (clickedImages.length === 2 && !document.getElementById("verify")) {
        const verifyBtn = document.createElement("button");
        verifyBtn.id = "verify";
        verifyBtn.textContent = "Verify";
        verifyBtn.addEventListener("click", verifySelection);
        mainContainer.appendChild(verifyBtn);
      }
    });

    imageContainer.appendChild(img);
  });

  function resetState() {
    clickedImages = [];
    
    // Remove selected styles from all images
    const allImgs = imageContainer.querySelectorAll("img");
    allImgs.forEach(img => img.classList.remove("selected"));

    // Remove buttons and clear message
    const resetBtn = document.getElementById("reset");
    const verifyBtn = document.getElementById("verify");
    if (resetBtn) resetBtn.remove();
    if (verifyBtn) verifyBtn.remove();
    
    para.textContent = "";
    heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  }

  function verifySelection() {
    const verifyBtn = document.getElementById("verify");
    if (verifyBtn) verifyBtn.remove();

    const class1 = clickedImages[0].getAttribute("data-ns-test");
    const class2 = clickedImages[1].getAttribute("data-ns-test");

    if (class1 === class2) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
});
