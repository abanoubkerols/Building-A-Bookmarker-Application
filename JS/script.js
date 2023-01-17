var namesite = document.getElementById("namesite");
var SiteUrl = document.getElementById("SiteUrl");
var submit = document.getElementById("submit");


var sitesList;

var global = 0 ; 

if (localStorage.getItem('Mysites') != null) {
    sitesList = JSON.parse(localStorage.getItem('Mysites'))
}
else {
    sitesList = [];
}





// adding site 
submit.onclick = function () {
    if (validName() && validURL()) {
        if (submit.innerHTML == "Update") {
            submit.innerHTML = "submit"

            var Mysites =
            {
                name: namesite.value,
                Url: SiteUrl.value
            };

            sitesList.splice(global, 1 , Mysites)  

        }
        else {
            var Mysites =
            {
                name: namesite.value,
                Url: SiteUrl.value
            };
            sitesList.push(Mysites);


        }
    }
    else {
        alert("please fill the form in below (name site and site URl) ")
    }
    showsites(sitesList);
    clearData()
    localStorage.setItem('Mysites', JSON.stringify(sitesList));
}




//  validation
function validName() {
    var regex = /^\w{2,20}$/gi;
    if (regex.test(namesite.value)) {
        document.getElementById("validName").classList.add("d-none")

        return true;
    }
    else {
        document.getElementById("validName").classList.remove("d-none")
        return false
    }
}

function validURL() {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    if (expression.test(SiteUrl.value)) {
        document.getElementById("validURL").classList.add("d-none")
        return true;
    }
    else {
        document.getElementById("validURL").classList.remove("d-none")
        return false
    }
}





//read
function showsites(list) {
    var menuSites = '';

    for (var i = 0; i < list.length; i++) {
        menuSites += `<div class="container  bg-light rounded-3 " >
                            <div class="col-lg-6 d-flex justify-content-between align-items-center py-4 my-4">
                                    <span class="fw-bolder fs-3 " > ${list[i].name}</span>
                                    <div>
                                        <a  class="btn-info btn my-3 btn  fw-bold" target="_blank" href="${list[i].Url}">Visit</a>
                                        <button class="btn-info btn my-3 btn  fw-bold ms-4" onclick="updateDate(${i})" >Udate</button>
                                         <button class="btn-danger btn my-3 btn  fw-bold ms-4" onclick="deleteDate(${i})" >Delete</button>
                                        
                                    </div>
                             </div>
                        </div>`
    }
    document.getElementById("showdata").innerHTML = menuSites;



    var btndel = document.getElementById("deleteAll");
    if (sitesList.length > 0) {
        btndel.innerHTML =
            `<button onclick="deleteAll()" class=" mt-5 w-50 btn-danger text-uppercase  btn mb-5 btn-lg fw-bolder "> delete all (${sitesList.length})</button>`

    }
    else {
        btndel.innerHTML = '';
    }
}
showsites(sitesList);



// delete one row
function deleteDate(i) {
    sitesList.splice(i, 1);
    localStorage.Mysites = JSON.stringify(sitesList);
    showsites(sitesList);
}



// delete all rows
function deleteAll() {
    localStorage.clear();
    sitesList.splice(0);
    showsites(sitesList);

}



// clear data in input 
function clearData() {
    namesite.value = "";
    SiteUrl.value = "";
}


function updateDate(index) {
    namesite.value = sitesList[index].name
    SiteUrl.value = sitesList[index].Url

    submit.innerText = "Update"

    global = index
}


function search(name){
    var searchEl = []

    for(var i = 0 ; i<sitesList.length;i++){
        if(sitesList[i].name.toLowerCase().includes(name)){
            searchEl.push(sitesList[i])
        }
    }

    showsites(searchEl)
}