// bootstrap scrollspy
document.querySelectorAll('#nav-tab>[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
      const target = el.getAttribute('data-bs-target')
      const scrollElem = document.querySelector(`${target} [data-bs-spy="scroll"]`)
      bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh()
    })
});

// job posts on header section
const carouseElement_box = document.getElementById("carouselExampleIndicators");
const prev_btn = document.querySelector(".carousel-control-prev");
const next_btn = document.querySelector(".carousel-control-next");
const carousel_jobbox = new bootstrap.Carousel(carouseElement_box, {
    interval: 5000,
    pause: false,
});
prev_btn.addEventListener("click", ()=>{
    carousel_jobbox.prev();
});
next_btn.addEventListener("click", ()=>{
    carousel_jobbox.next();
});
