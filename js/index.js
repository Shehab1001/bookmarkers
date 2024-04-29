var siteName = document.getElementById("name");
var siteURL = document.getElementById("url");
var container = [];
var cartona;
var overlaytag = document.querySelector(".overlay")

if (localStorage.getItem("sites") != null) {
    container = JSON.parse(localStorage.getItem("sites"));
    display();
}

function addSite() {

        var site = {
            siteName: siteName.value,
            siteURL: siteURL.value
        }
        container.push(site);
        console.log(container);
        localStorage.setItem("sites", JSON.stringify(container));
        clear();
        display();
}

document.querySelector(".sbtn").addEventListener("click" , function(){
    if(siteName.classList.contains ("valid") && siteURL.classList.contains("valid"))
    {
        addSite();
        siteName.classList.remove("valid");
        siteURL.classList.remove("valid");
    }
    else
    {
        overlaytag.classList.replace("d-none", "d-flex");
    }    
})

function clear() {
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
}

function display() {
    cartona = "";
    for (var i = 0; i < container.length; i++) {
        cartona += ` <tr>
     <td>${i + 1}</td>
     <td>${container[i].siteName}</td>
     <td>
         <a href="${container[i].siteURL}" target="_blank"><button class="btn btn-visit">
             <i class="fa-solid fa-eye pe-2"></i>
             Visit
         </button></a>
     </td>
     <td>
         <button class="btn btn-delete" onclick="deleteSite(${i})" >
             <i class="fa-solid fa-trash-can pe-2"></i>
             delete
         </button>
     </td>
    </tr>`
    }
    document.getElementById("tablebody").innerHTML = cartona;
}

function deleteSite(index) {
    container.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(container));
    display();
}

siteName.addEventListener("keyup", function () {

    var regex1 = /^[a-z A-Z 0-9 _ ]{3}/;
    if (regex1.test(siteName.value) == true) {
        siteName.classList.replace("invalid", "valid");
    }
    else {
        siteName.classList.add("invalid");
    }
})
siteURL.addEventListener("keyup", function () {

    var regex2 = /^https:\/\/www\.[A-za-z0-9]+\.com$/;
    if (regex2.test(siteURL.value) == true) {
        siteURL.classList.replace("invalid", "valid");
    }
    else {
        siteURL.classList.add("invalid");
    }
})

document.querySelector(".esc").addEventListener("click" ,  hideOverLay)

function  hideOverLay()
{
    overlaytag.classList.replace("d-flex" , "d-none");
}

document.addEventListener("click" , function(einfo){

    if(einfo.target == overlaytag)
    {
        hideOverLay() ;
    }
})

document.addEventListener("keydown", function(einfo){
    if (einfo.key == "Escape")
    {
        hideOverLay() ;
    }
})



