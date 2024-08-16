
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


const header_content = document.querySelector(".header-content");
const header_button = document.querySelector(".header-checkbox-btn");
if(header_content){
    header_button.addEventListener("mouseover", ()=> handleMouseOver(header_content));
    header_button.addEventListener("mouseout", ()=> handleMouseOut(header_content));
    header_content.addEventListener("mouseover", ()=> handleMouseOver(header_content));
    header_content.addEventListener("mouseout", ()=> handleMouseOut(header_content));
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
