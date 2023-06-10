let day_mode = true; // tells which mode is active (true = day(default), false = night)
let api = "http://127.0.0.1:5000";

// colors
let day_pri_color = "#457B9D";
let day_sec_color = "#F1FAEE";
let day_tri_color = "#A8DADC";
let day_font_color = "#000000";

let night_pri_color = "#42124C";
let night_sec_color = "#211E23";
let night_tri_color = "#2C272F";
let night_font_color = "#FFFFFF";



function swapMode() {
    if (day_mode) {
        setupNightModeElements();
        day_mode = false;
    }else {
        setupDayModeElements();
        day_mode = true;
    }
}



function setupNightModeElements(){
    document.getElementById("img-night-day-mode").src = "imgs/misc/sun.png";

    let css = document.querySelector(":root");
    css.style.setProperty("--pri_color", night_pri_color);
    css.style.setProperty("--sec_color", night_sec_color);
    css.style.setProperty("--tri_color", night_tri_color);
    css.style.setProperty("--font_color", night_font_color);
}



function setupDayModeElements(){
    document.getElementById("img-night-day-mode").src = "imgs/misc/moon.png";

    let css = document.querySelector(":root");
    css.style.setProperty("--pri_color", day_pri_color);
    css.style.setProperty("--sec_color", day_sec_color);
    css.style.setProperty("--tri_color", day_tri_color);
    css.style.setProperty("--font_color", day_font_color);
}



function getCurrentYear() {
    return new Date().getFullYear();
}


function setCopyrightYear() {
    document.getElementById("current-year").innerHTML = getCurrentYear();
}


function getData(location) {
    let url = api+location;
    return fetch(url) 
    .then(response => response.json())
    .catch(error => console.log("getData() on "+ api+location +" failed !" + error));
}


function displayIntroduction(data) {
    let container = document.getElementById("div-introduction");
    if (data != undefined) {
        introduction = data[0];
        let div = document.createElement("div");
        let p = document.createElement("p");

        p.innerHTML = introduction.text;
        div.id += "introduction";

        div.appendChild(p);
        container.appendChild(div);
    } else {
        displayError("div-introduction");
    }
}


function displayFormations(data) {
    let container = document.getElementById("div-formations");

    if (data != undefined){
        for (let formation of data) {
            let div = document.createElement("div");
            let h2 = document.createElement("h2");
            let p = document.createElement("p");

            h2.innerHTML = formation.title;
            p.innerHTML = formation.text;
            div.className += "formations";

            div.appendChild(h2);
            div.appendChild(p);
            container.appendChild(div);
        }
    } else {
        displayError("div-formations");
    }
}

function displayExperiences(data) {
    let container = document.getElementById("div-experiences");

    if (data != undefined){
        for (let experience of data) {
            let div = document.createElement("div");
            let h2 = document.createElement("h2");
            let p = document.createElement("p");

            h2.innerHTML = experience.title;
            p.innerHTML = experience.text;
            div.className += "experiences";

            div.appendChild(h2);
            div.appendChild(p);
            container.appendChild(div);
        }
    }else{
        displayError("div-experiences");
    }
}


function displayProjects(data){
    let container = document.getElementById("portfolio-content");
    let i = 1;

    if (data != undefined){
        for (let project of data) {
            console.log(project);
            let div = document.createElement("div");
            let img = document.createElement("img");
            let h2 = document.createElement("h2");
            let p = document.createElement("p");

            h2.innerHTML = project.title

            img.className = "img-projects"
            img.src = project.img

            p.innerHTML = project.text;

            div.className += "projects";
            div.id = "project-" + i;
            console.log(div.id)
            
            i += 1;

            div.appendChild(h2);
            div.appendChild(img);
            div.appendChild(p);
            container.appendChild(div);
        }
    } else {
        displayError("div-portfolio");
    }
}


function displayError(containerId) {
    let container = document.getElementById(containerId);

    let div = document.createElement("div");
    div.style.height = "40px";
    div.style.background = "#ff615d";
    div.style.border = "solid 3px #ff2a26";
    div.style.borderRadius = "5px";
    div.style.paddingLeft = "20px";
    div.style.lineHeight = "40px";
    div.style.fontWeight = "bolder";
    div.innerHTML = "An error occured :(";

    container.appendChild(div);
}


// MAIN SECTION
window.addEventListener('load', function () {

    // setup HTML content
    getData("/getintroduction/").then(introduction => displayIntroduction(introduction));
    getData("/getformations/").then(formations => displayFormations(formations));
    getData("/getexperiences/").then(experiences => displayExperiences(experiences));
    getData("/getprojects/").then(projects => displayProjects(projects));
    
    setCopyrightYear();
});
