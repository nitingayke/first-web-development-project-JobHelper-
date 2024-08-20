const jobposts = document.querySelectorAll(".jobPosts");
const backwardBtn = document.querySelector(".job-scroll-btn1");
const forwardBtn = document.querySelector(".job-scroll-btn2");

let idx = 0;
let len = jobposts.length;
changeJobPosts(idx);

function changeJobPosts(index) {
    for (let post of jobposts) {
        post.classList.remove("jobPostsEffects", "jobPostsOut");
    }
    jobposts[index].classList.add("jobPostsEffects");
}
backwardBtn.addEventListener("click", () => {
    idx = (idx - 1 == -1) ? len - 1 : idx - 1;
    changeJobPosts(idx);
});
forwardBtn.addEventListener("click", () => {
    idx = (idx + 1) % len;
    changeJobPosts(idx);
});
if (len > 1) {
    setInterval(() => {
        idx = (idx + 1) % len;
        changeJobPosts(idx);
    }, 5000);
}


// bootstrap scrollspy
document.querySelectorAll('#nav-tab>[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
      const target = el.getAttribute('data-bs-target')
      const scrollElem = document.querySelector(`${target} [data-bs-spy="scroll"]`)
      bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh()
    })
  })
