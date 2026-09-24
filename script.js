const navbar = document.getElementById("navbar");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav-menu");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, {passive:true});

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".magnetic").forEach(button => {
  button.addEventListener("mousemove", e => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = button.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .12;
    const y = (e.clientY - r.top - r.height/2) * .12;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });
  button.addEventListener("mouseleave", () => button.style.transform = "");
});

document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*5;
    const y = ((e.clientY-r.top)/r.height-.5)*-5;
    card.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

const core = document.querySelector(".hero-core");
const visual = document.querySelector(".hero-visual");
if (core && visual) {
  visual.addEventListener("mousemove", e => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = visual.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*14;
    const y = ((e.clientY-r.top)/r.height-.5)*-14;
    core.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateZ(12px)`;
  });
  visual.addEventListener("mouseleave", () => core.style.transform = "");
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};
document.querySelectorAll("[data-lightbox]").forEach(tile => {
  tile.addEventListener("click", () => {
    if (tile.dataset.canva) {
      window.open(tile.dataset.canva, "_blank", "noopener");
      return;
    }
    lightboxImage.src = tile.dataset.lightbox;
    lightboxImage.alt = tile.querySelector("img")?.alt || "Design preview";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

/* Optional Three.js enhancement: a lightweight wireframe sphere behind the hero.
   If the CDN fails, the CSS visual remains fully functional. */
(() => {
  if (!window.THREE || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  const canvas = document.createElement("canvas");
  canvas.className = "three-layer";
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position:"absolute", inset:"0", width:"100%", height:"100%", pointerEvents:"none", zIndex:"2", opacity:"0.48"
  });
  visual.prepend(canvas);

  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(visual.clientWidth, visual.clientHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, visual.clientWidth/visual.clientHeight, .1, 100);
  camera.position.z = 5;

  const geometry = new THREE.IcosahedronGeometry(1.22, 2);
  const material = new THREE.MeshBasicMaterial({color:0x38bdf8, wireframe:true, transparent:true, opacity:.24});
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const resize = () => {
    const w = visual.clientWidth, h = visual.clientHeight;
    renderer.setSize(w,h,false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize, {passive:true});

  let mx=0,my=0,tx=0,ty=0;
  visual.addEventListener("mousemove", e => {
    const r=visual.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*.35;
    ty=((e.clientY-r.top)/r.height-.5)*.25;
  });

  const animate = () => {
    mx += (tx-mx)*.035; my += (ty-my)*.035;
    mesh.rotation.y += .0025 + mx*.002;
    mesh.rotation.x += my*.002;
    mesh.rotation.z += .001;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  };
  animate();
})();
