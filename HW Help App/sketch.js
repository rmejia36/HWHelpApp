'use strict'

var wrap = document.getElementById('wrapper');
var dropButt = document.getElementById('dropdownButt');

var dropDiv = document.getElementById('dropdown');
dropDiv.style.backgroundColor = "#3d3d29";

var buttonDiv = document.createElement('div');
var mainText = document.getElementById('maintext');

window.addEventListener('load', handleSizing);
window.addEventListener('resize', handleSizing);
const FRAME_RATE=60;
var dash;

function handleSizing(){
  if(wrap.clientWidth <= 250){
    mainText.style.fontSize = "25px";
  }else if(wrap.clientWidth <= 450){
    mainText.style.fontSize = "40px";
  }else if(wrap.clientWidth <= 950){
    mainText.style.fontSize = "6vw";
  }else{
    mainText.style.fontSize = "60px";
  }
}
function removeKids(elem){
  var element = elem;
  if(element.hasChildNodes()){
    element.removeChild(element.lastChild);
    removeKids(element);
  }
}
//++++++++++++++++dropdownCode++++++++++++++++++++++++++++++++++++++++++++++++++
dropButt.addEventListener('click', function(){

  if(dropDiv.clientHeight <= 100){
    dropDiv.style.height = '200px';
    dropDiv.style.backgroundColor = "rgba(61, 61, 41, 0.8)";

    dropDiv.appendChild(buttonDiv);
    buttonDiv.style.width = "99%";
    buttonDiv.style.height = "auto";

    for(let i = 0; i < 4; i++){
      var butt = document.createElement('button');
      butt.setAttribute('id', "butt"+i);
      butt.setAttribute('class', 'button');
      butt.style.width = "100%";
      butt.style.display = "block";
      buttonDiv.appendChild(butt);
      switch(butt.id){
        case 'butt0':
        butt.innerHTML = "Math";
        butt.style.backgroundColor = "green";
        butt.addEventListener('click', function(){
          dash = new Dashboard("Math");
        });
        break;
        case 'butt1':
        butt.innerHTML = "English";
        butt.style.backgroundColor = "red";
        butt.addEventListener('click', function(){
          dash = new Dashboard("English");
        });
        break;
        case 'butt2':
        butt.innerHTML = "Science";
        butt.style.backgroundColor = "blue";
        butt.addEventListener('click', function(){
          dash = new Dashboard("Science");
        });
        break;
        case 'butt3':
        butt.innerHTML = "History";
        butt.style.backgroundColor = "purple";
        butt.addEventListener('click', function(){
          dash = new Dashboard("History");
        });
        break;
      }
    }
  }else{
    dropDiv.style.height = 'auto';
    dropDiv.style.backgroundColor = "#3d3d29";
    removeKids(buttonDiv);
    dropDiv.removeChild(buttonDiv);
  }
});
//++++++++++++++++++dashboardClass++++++++++++++++++++++++++++++++++++++++++++++
var notes = [];
var mouse = {x:0, y:0};
class Dashboard{
  constructor(type){
    this.header = document.createElement('header');
    this.header.style.width = '90%';
    this.header.style.right = "5%";
    this.header.style.height = "10%";
    this.header.style.backgroundColor = 'white';
    this.header.style.position = 'fixed';
    this.header.style.top = '0px';
    this.header.style.borderRadius = "5px";
    this.header.style.fontSize = "50px";
    removeKids(wrap);
    document.body.removeChild(document.getElementById('footer'));
    document.body.appendChild(this.header);

    this.init(type);
  }
  init(type){
    switch(type){
      case 'Math':
      this.header.innerHTML = "Math Dashboard";
      break;
      case 'English':
      this.header.innerHTML = "English Dashboard";
      break;
      case 'Science':
      this.header.innerHTML = "Science Dashboard";
      break;
      case 'History':
      this.header.innerHTML = "History Dashboard";
      break;
    }

    var navBar = document.createElement('div');
    navBar.style.width = "100%";
    navBar.style.height = "40px";
    navBar.style.backgroundColor = "rgba(20, 20, 20, 0.8)";
    document.body.appendChild(navBar);

    //++++++++++++++buttons++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var addNote = document.createElement('button');
    addNote.setAttribute("class", "button");
    addNote.style.width = 'auto';
    addNote.innerHTML = "Create Note";
    addNote.addEventListener("click", function(){
      dash.note = notes.push(new Note(notes.length));
    });
    navBar.appendChild(addNote);

    var home = document.createElement('button');
    home.setAttribute("class", "button");
    home.style.width = 'auto';
    home.innerHTML = "Home";
    navBar.appendChild(home);
    home.addEventListener("click", function(){
      location.reload();
    });
    window.setTimeout(this.run, 100);
  }
  run(){
    if(notes !=undefined){
      for(let i = 0; i < notes.length; i++){
        notes[i].run();
      }
    }
     window.setInterval(dash.run, 1000/FRAME_RATE);
  }
  getMousePos(evt){
    return new Vector(evt.clientX , evt.clientY );
  }
}
//+++++++++++++++++++noteClass++++++++++++++++++++++++++++++++++++++++++++++++++
class Note{
  constructor(index){
    this.loc = new Vector(0, 0);
    this.width = 160;
    this.placed = false;
    this.div = document.createElement('div');
    wrap.appendChild(this.div);
      wrap.addEventListener('mousemove', function(e){
      if(!this.placed){
        mouse = dash.getMousePos(e);
      }
    });
    this.div.addEventListener('click', function(){
      notes[index].placed = true;
    });
  }
  run(){
    if(!this.placed){
      this.render();
      this.update();
    }
  }
  update(){
    this.loc = mouse;
    this.div.style.left = this.loc.x;
    this.div.style.top = this.loc.y;
  }
  render(){
    this.div.style.width = this.width;
    this.div.style.height = this.width;
    this.div.style.position = "relative";
    this.div.style.backgroundColor = "yellow";
  }
}
//++++++++++++++++++++++vectorClass+++++++++++++++++++++++++++++++++++++++++++++
class Vector{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  dist(vec){
    let dx = this.x - vec.x;
    let dy = this.y - vec.y;
    return Math.sqrt(dx*dx+dy*dy);
  }
}
