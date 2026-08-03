/* ==========================================
   ChaloChale Packages Page JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       WISHLIST BUTTON
    ========================================== */

    const wishlistButtons = document.querySelectorAll(".wishlist");

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            const icon = button.querySelector("i");

            if(button.classList.contains("active")){

                icon.classList.remove("far");
                icon.classList.add("fas");

            }else{

                icon.classList.remove("fas");
                icon.classList.add("far");

            }

        });

    });

    /* ==========================================
       SEARCH PACKAGE
    ========================================== */

    const searchInput = document.getElementById("searchPackage");

    if(searchInput){

        searchInput.addEventListener("keyup", filterPackages);

    }

    /* ==========================================
       FILTER DROPDOWNS
    ========================================== */

    const filters = document.querySelectorAll("select");

    filters.forEach(select=>{

        select.addEventListener("change", filterPackages);

    });

    function filterPackages(){

        const searchText =
            searchInput.value.toLowerCase();

        const cards =
            document.querySelectorAll(".package-card");

        cards.forEach(card=>{

            const title =
                card.querySelector("h3").textContent.toLowerCase();

            if(title.includes(searchText)){

                card.parentElement.style.display="block";

            }else{

                card.parentElement.style.display="none";

            }

        });

    }

    /* ==========================================
       RESET FILTERS
    ========================================== */

    const resetButton =
        document.querySelector(".filter-box button");

    if(resetButton){

        resetButton.addEventListener("click",()=>{

            searchInput.value="";

            filters.forEach(select=>{

                select.selectedIndex=0;

            });

            document.querySelectorAll(".package-card")
            .forEach(card=>{

                card.parentElement.style.display="block";

            });

        });

    }

});

/*==========================================
 PAGE LOAD ANIMATION
==========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    document.querySelectorAll(".fade-up").forEach((el,index)=>{

        setTimeout(()=>{

            el.classList.add("show");

        },index*120);

    });

});

/*==========================================
 NAVBAR SHADOW
==========================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.12)";

    }else{

        navbar.style.boxShadow="0 5px 20px rgba(0,0,0,.05)";

    }

});

/*==========================================
 EXPLORE BUTTON
==========================================*/

document.querySelectorAll(".explore-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const packageName=
        btn.closest(".package-card")
        .querySelector("h3").innerText;

        alert("Opening "+packageName);

    });

});

/*==========================================
 NEWSLETTER
==========================================*/

const newsletterForm=document.getElementById("newsletterForm");

if(newsletterForm){

newsletterForm.addEventListener("submit",(e)=>{

e.preventDefault();

const email=newsletterForm.querySelector("input").value.trim();

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email===""){

alert("Please enter your email.");

return;

}

if(!emailRegex.test(email)){

alert("Please enter a valid email.");

return;

}

alert("Thank you for subscribing!");

newsletterForm.reset();

});

}

/*==========================================
 SMOOTH SCROLL
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*==========================================
 IMAGE HOVER EFFECT
==========================================*/

document.querySelectorAll(".package-image").forEach(image=>{

image.addEventListener("mouseenter",()=>{

image.style.transform="scale(1.02)";

});

image.addEventListener("mouseleave",()=>{

image.style.transform="scale(1)";

});

});

/*==========================================
 SCROLL ANIMATION
==========================================*/

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.2
});

document.querySelectorAll(".fade-up").forEach(el=>{

observer.observe(el);

});

/*==========================================
 BACK TO TOP BUTTON
==========================================*/

const topButton=document.createElement("button");

topButton.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topButton.className="top-btn";

document.body.appendChild(topButton);

topButton.style.cssText=`
position:fixed;
bottom:30px;
right:30px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#ff7a00;
color:#fff;
font-size:20px;
cursor:pointer;
display:none;
box-shadow:0 10px 25px rgba(0,0,0,.2);
z-index:999;
`;

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==========================================
 COPYRIGHT YEAR
==========================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}


console.log("Packages Page Loaded Successfully");