function getdata() {
    var lat = 35;
    var long = 139;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var javaobj = JSON.parse(xhttp.response);
            //document.getElementById("lab1").innerHTML = javaobj.weather[0].main;
            return javaobj.weather[0].main;
        }
    }
    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=d9d8a8c6ee0b146654cff75acea36c2b", true);
    //alert(document.getElementById("lab1").textContent);
    xhttp.send();
    
}

function listdata() {
    document.getElementById("lab1").textContent = getdata();
}