const jobposts = document.querySelectorAll(".jobPosts");
const backwardBtn =document.querySelector(".job-scroll-btn1");
const forwardBtn =document.querySelector(".job-scroll-btn2");

let idx = 0;
let len = jobposts.length;
changeJobPosts(idx);

function changeJobPosts(index) {
    for(let post of jobposts){
        post.classList.remove("jobPostsEffects", "jobPostsOut");
    }
    jobposts[index].classList.add("jobPostsEffects");
}
backwardBtn.addEventListener("click", ()=>{
    idx = (idx-1 == -1) ? len-1 : idx-1;
    changeJobPosts(idx); 
});
forwardBtn.addEventListener("click", () => {
    idx = (idx+1)%len;
    changeJobPosts(idx); 
});
if(len > 1){
    setInterval(() => {
        idx = (idx+1)%len;
        changeJobPosts(idx); 
    }, 5000);
}
