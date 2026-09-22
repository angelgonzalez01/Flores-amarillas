const garden = document.getElementById("garden");
const button = document.getElementById("bloomBtn");
const heart = document.querySelector(".heart");

function createFlower(index, total) {
  const flower = document.createElement("div");
  flower.className = "flower";

  const positions = [
    [4, 0.0], [15, 0.15], [27, 0.35], [39, 0.1],
    [51, 0.28], [63, 0.05], [75, 0.22], [87, 0.0],
    [11, 0.55], [33, 0.7], [57, 0.62], [81, 0.48]
  ];

  const [left, delay] = positions[index % positions.length];
  const scale = 0.65 + ((index * 17) % 45) / 100;
  const height = 150 + ((index * 31) % 90);

  flower.style.left = `${left}%`;
  flower.style.height = `${height}px`;
  flower.style.animationDelay = `${delay}s`;
  flower.style.transform = `scale(${scale})`;

  flower.innerHTML = `
    <div class="stem" style="height:${height * .72}px"></div>
    <div class="leaf left"></div>
    <div class="leaf right"></div>
    <div class="head">
      ${Array.from({length: 8}, () => '<div class="petal"></div>').join("")}
      <div class="center"></div>
    </div>
  `;

  garden.appendChild(flower);
}

function bloom() {
  document.querySelectorAll(".flower").forEach(f => f.remove());
  for (let i = 0; i < 12; i++) createFlower(i, 12);

  heart.classList.remove("show");
  void heart.offsetWidth;
  heart.classList.add("show");

  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.className = "petal-fall";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${3 + Math.random() * 4}s`;
      p.style.animationDelay = `${Math.random() * .8}s`;
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 8000);
    }, i * 100);
  }
}

button.addEventListener("click", bloom);
window.addEventListener("load", () => setTimeout(bloom, 500));
