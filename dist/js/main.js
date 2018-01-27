var tache;
var task = document.getElementById('task');
var list = document.getElementById('list');
var addButton = document.getElementById('add');
var endButton = document.getElementById('end-btn')
var tacheEnCours = document.getElementById('enCours');
var todo = document.getElementById('todo');
var timer = document.getElementById('timer');
var completed = document.getElementById('tacheEnd');


/*******************************************************/

task.addEventListener("keypress", keyPressed);  // event quand on press enter , valide l'ajout d'une tache 
endButton.addEventListener("click", moveEnd); // event qui bouge la tache en cours dans les taches terminées


/*******************************************************/

function keyPressed(k) {
  if (k.code == 'Enter')      // only if the key is "Enter"...
    addItem();        // ...add a new task (using same handler as the button)
  return false;               // no propagation or default
}

/* Ajouter une tache */

// function incrementation pour que les id des checbox soit différentes et indépendantes
var n = 0;

function increment(){

	n++;
	return n;
}

// function ajout d'une tache dans la liste de gauche 
function addItem() {

	increment(); 
	var entree = task.value;
	task.value=""; // permet de remettre à zero mon entrée 
	var li = document.createElement("li"); 
	var label = document.createElement("label");
	var icon = document.createElement("i");
	var datebox = document.createElement("p");
	var spanmin = document.createElement("span");
	var spansec = document.createElement("span");
	var dots = document.createElement("span");


    li.setAttribute("id", n);
    li.setAttribute('class','card')
    datebox.setAttribute('class','datebox1 blue-text')
    label.setAttribute("for",'test'+n);
    label.setAttribute('class','indigo-text')
    icon.setAttribute("class","material-icons blue-text text-darken-2")
    icon.setAttribute("id", 'i'+n);
    spanmin.setAttribute("id","spanmin")
    spansec.setAttribute("id","spansec")
    dots.innerHTML = " : ";
    label.innerHTML = entree; // pour que le appendChild fonctionne
    spanmin.innerHTML= '25';
    spansec.innerHTML= '00';
    datebox.innerHTML = ' Time :   ';
    icon.innerHTML = 'delete';

    datebox.appendChild(spanmin);
    datebox.appendChild(dots)
    datebox.appendChild(spansec);
    li.appendChild(label);
    li.appendChild(icon);
    li.appendChild(datebox);
    document.getElementById('todo').appendChild(li);

    icon.addEventListener('click',supprimer)
    label.addEventListener('click',enCours);

    Materialize.toast('Votre tâche a bien été ajoutée', 4000, 'blue-text text-darken-2 white')
}

/* Suppression task */
function supprimer() {
	var asuppr = this.parentNode
  $('#modal1').modal('open');
  document.getElementById('deltask').addEventListener('click', function(){
  	asuppr.remove();
  })
	// if (window.confirm('Supprimer cette tache ?')){
	// 	this.parentNode.remove();
	// }
};


/* afficher la tache en cours */

function enCours(){
	// console.log(this);
	

	
	if (this.parentNode.parentNode == todo){

		if (tacheEnCours.childElementCount === 0){   
			tacheEnCours.appendChild(this.parentNode)	

			Materialize.toast('La tache "'+this.innerHTML+'" est selectionnée' , 4000, 'blue-text text-darken-2 white')
		}
		else {
			todo.appendChild(tacheEnCours.childNodes[0]);
			tacheEnCours.appendChild(this.parentNode)
			reset();
		}
	}
	else{
		todo.appendChild(tacheEnCours.childNodes[0]);
		reset();
	}
}

function test(){
	console.log("le test marche !!!");
}

function moveEnd(end){
	reset();
	var encours = document.getElementById('enCours').firstChild;
	var tacheEnd = document.getElementById('tacheEnd');
	tacheEnd.appendChild(encours)
	Materialize.toast('Tache effectuée', 4000, 'green-text white')


}

function taskEnd(){
	Materialize.toast('Cette tâche est terminée', 4000, 'red-text white')
}



// TIMER 

var play = document.getElementById('play')
var pause = document.getElementById('pause')
var resume = document.getElementById('resume')
var exit = document.getElementById('exit')
play.addEventListener("click",start);
pause.addEventListener("click",stop);
exit.addEventListener("click",reset);
resume.addEventListener("click",truc)

var clock = document.getElementById('clockdiv');
var minutesSpan = document.getElementById('min');
var secondsSpan = document.getElementById('sec');

var myvar;


function start(){
	if (tacheEnCours.childElementCount === 0){ 
		Materialize.toast('Pas de tache en cours', 4000, 'red-text white')
	}

	else{
		var launch =  new Date(Date.parse(new Date()) + 25 * 60 * 1000 );
		play.classList.add('hidden');
		pause.classList.remove('hidden')

		console.log(tacheEnCours.firstChild.lastChild);

		setDate();
		function setDate(){
			var now = new Date();
			var s = (launch.getTime()-now.getTime())/1000;

			var m = Math.floor(s/60);
			minutesSpan.innerHTML = m
			s-=m*60;

			s = Math.floor(s)
			secondsSpan.innerHTML = s;
			console.log(s);

			myvar = setTimeout(setDate,1000);

			if (s == 0){
				console.log("FIN DU MONDE");
				clearTimeout(myvar);
			}
		}
	}
}

function stop(){
	clearTimeout(myvar);
	resume.classList.remove('hidden');
	exit.classList.remove('hidden');
	pause.classList.add('hidden');
	console.log(minutesSpan.innerHTML+' '+secondsSpan.innerHTML);

	// tacheEnCours.firstChild.lastChild.innerHTML = "Time : "+minutesSpan.innerHTML+' : '+secondsSpan.innerHTML
	tacheEnCours.firstChild.lastChild.children[0].innerHTML = minutesSpan.innerHTML
	tacheEnCours.firstChild.lastChild.children[2].innerHTML = secondsSpan.innerHTML
}

function reset(){
	clearTimeout(myvar);
	minutesSpan.innerHTML = "25";
	secondsSpan.innerHTML = "00";
	resume.classList.add('hidden');
	exit.classList.add('hidden');
	play.classList.remove('hidden')
	pause.classList.add('hidden')
}

function truc(){
	resume.classList.add('hidden');
	exit.classList.add('hidden');
	pause.classList.remove('hidden')

    setDate2();
		function setDate2(){
			var x = parseInt(minutesSpan.innerHTML)
	        var y = parseInt(secondsSpan.innerHTML)
			// var now = new Date();
			var s = (x*60+y);

			var m = Math.floor(s/60);
			minutesSpan.innerHTML = m
			s-=m*60;

			s--;

			s = Math.floor(s)
			secondsSpan.innerHTML = s;
			console.log(s);

			myvar = setTimeout(setDate2,1000);

			if (s == 0){
				console.log("FIN DU MONDE");
				clearTimeout(myvar);
			}
		}
}

function securite(){
	if (tacheEnCours.childElementCount === 0){
		console.log("secure");
		reset();
	}
}


/****************************************************************************************/

// function getTimeRemaining(endtime) {
// 	 var now = new Date().getTime();
//   var t = deadline - now
//   var seconds = Math.floor((t / 1000) % 60);
//   var minutes = Math.floor((t / 1000 / 60) % 60);

//   return {
//     'total': t,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// }

// function initializeClock(id, endtime) {
//   var clock = document.getElementById(id);
//   var minutesSpan = clock.querySelector('.minutes');
//   var secondsSpan = clock.querySelector('.seconds');

//   function updateClock() {
//     var t = getTimeRemaining(endtime);

//     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//     secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   }

//   updateClock();
//   var timeinterval = setInterval(updateClock, 1000);
// }

// var deadline = Date.parse(new Date() + 25 * 60 * 1000);










// TIMER FLIPCLOCK

// var clock = new FlipClock($('.your-clock'),1500, {
// // ... your options here
// countdown :true,
// clockFace : 'MinuteCounter',
// autoStart: false,
// });

// var play = document.getElementById('play')
// var pause = document.getElementById('pause')
// play.addEventListener("click",start);
// pause.addEventListener("click",stop);

// function start(){
// 	clock.start(function() {
//     // Optional callback will fire when the clock starts
// });
// 	play.classList.add('hidden');
// 	pause.classList.remove('hidden');

// };

// function stop(){
// 	clock.stop(function() {
//     // Optional callback will fire after the clock stops
// });
// 	play.classList.remove('hidden');
// 	pause.classList.add('hidden');
// };


// console.log(clock.getTime().time);

/*** Materialize fonction ***/


$(document).ready(function(){
    $('ul.tabs').tabs();
  });


  $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });


/**** event responsive menu ****/

var one = document.getElementById('one')
var two = document.getElementById('two')
var three = document.getElementById('three')

one.addEventListener('click',test1)
two.addEventListener('click',test2)
three.addEventListener('click',test3)

function test1(){
	todo.classList.remove('hidden')
	timer.classList.add('hidden')
	completed.classList.add('hidden')
}

function test2(){
	todo.classList.add('hidden')
	timer.classList.remove('hidden')
	completed.classList.add('hidden')
}

function test3(){
	todo.classList.add('hidden')
	timer.classList.add('hidden')
	completed.classList.remove('hidden')
}