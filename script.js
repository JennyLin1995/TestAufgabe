
var data;
function init() {
  loadJSON(function(response) {
    data = JSON.parse(response);
    writeToHTML(data);
  });

}

function loadJSON(callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'source.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function writeToHTML(data){
  var textTab ="";
  var textContent ="";
  var sizeData = data.length;
  for(var i = 0; i < sizeData; i++){
      var color;
      switch(data[i].level) {
        case "0":
        color = "#99ff66";
        break;
        case "1":
        color = "#ffcc66";
        break;
        case "2":
        color = "#ff5c33";
        break;
        default:
        color = "#fff";
      }
    textTab+= '<button class="tablinks" onclick="openTab(event,'+i+')" style="background-color:'+color+' ">'+data[i].title+'<p id="short">'+data[i].body.slice(0,100)+'...</p><p id="level">Level: '+data[i].level+'</p>'+'</button>';
    textContent+= '<div id="'+i+'" class="tabcontent"><h1>'+data[i].title+'</h1><h2 style="color:'+color+'">Level: '+data[i].level+'</h2><p>'+data[i].body+'</p><p>Weiterführende Links:</p>';
    for(var j = 0; j < data[i].url_action.length; j++){
      textContent+= '<p id="link"><a href="'+ data[i].url_action[j].url+'">'+data[i].url_action[j].title+'</a></p>';
    }
    textContent+= '<p>Siehe auch:</p>';
    for(var j = 0; j < data[i].url_explanation.length; j++){
      textContent+= '<p id="see"><a href="'+ data[i].url_explanation[j].url+'">'+data[i].url_explanation[j].title+'</a></p>';
    }
    textContent+='</div>';
  }
  document.getElementById("tab").innerHTML = textTab;
  document.getElementById("content").innerHTML = textContent;

}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
function sortData(comparison){
  data.sort(comparison);
  writeToHTML(data);
}
function sortDateNewest(a,b){
  if (a.published_date > b.published_date)
    return -1;
  if (a.published_date < b.published_date)
    return 1;
  return 0;
}
function sortDateOldest(a,b){
  if (a.published_date < b.published_date)
    return -1;
  if (a.published_date > b.published_date)
    return 1;
  return 0;
}
function sortLevel(a,b){
  if (a.level < b.level)
    return -1;
  if (a.level > b.level)
    return 1;
  return 0;
}
