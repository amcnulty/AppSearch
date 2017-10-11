if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    var data;
    var newJobView = document.getElementById("newJobAppDiv");
    var showJobView = document.getElementById("showJobDiv");
    var dateInput = document.getElementById("dateInput");
    var companyInput = document.getElementById("companyInput");
    var aboutInput = document.getElementById("aboutCompanyText");
    var positionInput = document.getElementById("positionInput");
    var contactInput = document.getElementById("contactInput");
    var siteInput = document.getElementById("siteInput");
    var newAppSubmitButton = document.getElementById("newAppSubmitButton");
    
    var dateDisplay = document.getElementById("dateDisplay");
    var companyDisplay = document.getElementById("companyDisplay");
    var aboutDisplay = document.getElementById("aboutDisplay");
    var positionDisplay = document.getElementById("positionDisplay");
    var contactDisplay = document.getElementById("contactDisplay");
    var siteDisplay = document.getElementById("siteDisplay");
    
    var jobList = document.getElementById("list");

    (function() {
        if (localStorage.getItem("data") === null) {
            data = new Object();
            data.jobsList = [];
            localStorage.setItem("data", JSON.stringify(data));
        }
        else {
            data = JSON.parse(localStorage.getItem("data"));
            console.log(data);
            populateList();
        }
    })();
    
    function saveData() {
        localStorage.setItem("data", JSON.stringify(data));
    }
    
    function populateList() {
        for (var i = 0; i < data.jobsList.length; i++) {
            var myLi = document.createElement("li");
            myLi.className = "jobLink";
            myLi.setAttribute("data-job-id", data.jobsList[i].jobID);
            myLi.innerText = data.jobsList[i].date + "- " + data.jobsList[i].company;
            jobList.appendChild(myLi);
        }
    }

    function createID() {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 0; i < 18; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    function displayJob(id) {
        for (var i = 0; i < data.jobsList.length; i++) {
            if (data.jobsList[i].jobID === id) {
                dateDisplay.innerText = data.jobsList[i].date;
                companyDisplay.innerText = data.jobsList[i].company;
                aboutDisplay.innerText = data.jobsList[i].about;
                positionDisplay.innerText = data.jobsList[i].position;
                contactDisplay.innerText = data.jobsList[i].contact;
                siteDisplay.innerText = data.jobsList[i].site;
            }
        }
        newJobView.style.display = "none";
        showJobView.style.display = "block";
    }
    
    newAppSubmitButton.addEventListener("click", function(e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'data/saveJob', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                alert('You have successfully saved a new job!');
            }
        }
        var newJob = new Object();
        newJob.jobID = createID();
        newJob.date = dateInput.value.trim();
        newJob.company = companyInput.value.trim();
        newJob.about = aboutInput.value.trim();
        newJob.position = positionInput.value.trim();
        newJob.contact = contactInput.value.trim();
        newJob.site = siteInput.value.trim();
        var jsonString = JSON.stringify(newJob);
        xhr.send(jsonString);

        // data.jobsList.push(newJob);
        // saveData();
        // localStorage.clear();
    }, false);

    document.addEventListener("click", function(e) {
        if (e.target.className === "jobLink") {
            console.log(e.target.getAttribute("data-job-id"));
            displayJob(e.target.getAttribute("data-job-id"));
        }
    }, false);
}