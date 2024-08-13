let theme = document.querySelector(".web-theme");
let bodyContainer = document.querySelector(".body-container");
let icons = document.querySelector(".theme-icon");

if(icons){
    theme.addEventListener("click", (event) => {
        bodyContainer.classList.toggle("backgroundColor");
        icons.classList.toggle("fa-sun");
        icons.classList.toggle("fa-moon");
    });
}


let likeButtons = document.querySelectorAll(".positive-like");
for(let likebtn of likeButtons){
    likebtn.addEventListener("click", () => {
        
        if(likebtn.querySelector(".fa-regular")){
            let like = likebtn.querySelector(".fa-regular");
            like.classList.remove("fa-regular");
            like.classList.add("fa-solid");
            like.style.color = "red";

            let postId = likebtn.getAttribute("data-id");
            fetch(`/JobHelper/likes/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    document.getElementById(`like-count-${postId}`).innerText = data.newLikes;
                }else{
                    alert("Error liking the post!");
                }
            })
            .catch(error => {
                console.error("Error: ", error);
                alert("An error occurred while liking the post.");
            });
        }
    });
}

let userContent = document.querySelectorAll(".userContent");
let contentBox = document.querySelectorAll(".specific-user");
for(let btn of userContent){
    btn.addEventListener("click", () =>{
        
        if(btn.classList.contains("userContent-btn")){
            return ;
        }
        for(let b of userContent){
            b.classList.remove("userContent-btn");
        }
        contentBox[0].classList.toggle("content-result");
        contentBox[1].classList.toggle("content-result");
        btn.classList.add("userContent-btn");
    });
}


const profile_btn = document.querySelector(".header-login-btn");
const profile_box = document.querySelector(".user-profile-container");
if(profile_btn){
    profile_btn.addEventListener("mouseover", () => handleMouseOver(profile_box));
    profile_btn.addEventListener("mouseout", () => handleMouseOut(profile_box));
    profile_box.addEventListener("mouseover", () => handleMouseOver(profile_box));
    profile_box.addEventListener("mouseout", () => handleMouseOut(profile_box));
}


function handleMouseOver(box){
    box.classList.remove("hidden-box");
    box.classList.add("visible-box");
}
function handleMouseOut(box){
    box.classList.remove("visible-box");
    box.classList.add("hidden-box");
}

const editimage_box = document.querySelector(".post-edit-profile");
const inputURL = document.querySelector(".edit-input-url");
if(inputURL){
    inputURL.addEventListener("input", () => {
        console.log(inputURL.value);
        editimage_box.src = inputURL.value;
    });
}

const commentForm = document.querySelector(".comment-form");
if(commentForm){
    commentForm.addEventListener("submit", function(event){

        event.preventDefault();
        const formData = new FormData(commentForm);
        const actionURL = commentForm.getAttribute("action");
        
        fetch(actionURL, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Comment Has Been Posted");
            // Clear the input field after successful submission
            commentForm.querySelector(`input[name="title"]`).value = "";
        })
        .catch(error => {
            alert("Error Posting Comment");
        })
    });
}