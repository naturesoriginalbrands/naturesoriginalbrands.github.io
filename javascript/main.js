function kilos(weight_in_pounds) {
    return weight_in_pounds * 0.453592
}

function rer(weight_in_kilos) {
    return (weight_in_kilos ** 0.75) * 70;
}

var music = true

function no_music() {
    song.pause();
    song.currentTime = 0;
    document.getElementById("audioControls").onclick = function() { yes_music(); }
    document.getElementById("nested_icon").style.display = "block"
    music = false
}

function yes_music() {
    song.play();
    document.getElementById("audioControls").onclick = function() { no_music(); }
    document.getElementById("nested_icon").style.display = "none"
    music = true
}

function factor_from_selections(age, weight) {
    switch (age) {
    case "puppy 0-4 months":
	return age;
    case "puppy 4+ months":
	return age;
    case "senior":
	return "inactive/senior";
    case "adult":
	return "adult";
    default:
	return "adult";
    }
}

function cals_from_kilos(kilos, factor) {
    scalar = factortable[factor]
    console.log(scalar)
    return rer(kilos)*scalar
}

const factortable = {
    "adult"	        : 1.6,
    "inactive/senior"	: 1.4,
    "weight loss"	: 1.0,
    "weight gain"	: 1.8,
    "light active"	: 2.0,
    "medium active"	: 3.5,
    "heavy active"	: 5.0,
    "puppy 0-4 months"	: 3.0,
    "puppy 4+ months"	: 2.0
}

function flash(selector) {
    node =  document.querySelector(selector)
    node.classList.add("animate__animated", "animate__bounce")
    node.classList.add("animate__bounce")
    function handleAnimationEnd(event) {
	event.stopPropagation();
	node.classList.remove("animate__animated")
	node.classList.remove("animate__bounce")
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
}


function getFormResults() {
    const lb = document.querySelector('#lb').checked;        
    const kg = document.querySelector('#kg').checked;        
    
    if (! (lb || kg)) {
	flash('.thinoutlinebox');
	return ["Please select units and try again", "", ""];
    }
    const inputweight = document.querySelector('#weightinput').value
    if (inputweight === "" || isNaN(inputweight*1) ) {	
	flash('#weightinput');
	return ["Please input valid weights and try again", "", ""];
    }
    if (lb) {
	weight = kilos(inputweight)
    }
    else {
	weight = inputweight
    }

    const ageindex = document.querySelector('#age').selectedIndex;

    if      (ageindex == 1) {age = "puppy 0-4 months"}
    else if (ageindex == 2) {age = "puppy 4+ months"}
    else if (ageindex == 3) {age = "adult"}
    else if (ageindex == 4) {age = "senior"}
    else                    {
	flash("#age")
	return ["Please select an age and try again", "Please Try Again", "Please Try Again"]
    }
    
    kinda_dog = age.slice(0,6);
    console.log(kinda_dog)
    if (kinda_dog == "puppy ") {
	dog_ = " "
    }
    else if (kinda_dog == "senior") {
	dog_ = " dog"
    }
    else {
	dog_ = " dog"
    }
    if (kg) {document.getElementById("summary").innerHTML = Math.round(weight) + " kg " + kinda_dog + dog_ + "<br>"}
    else {document.getElementById("summary").innerHTML = Math.round(inputweight) + " lb " + kinda_dog + dog_ + "<br>"}
	
    factor = factor_from_selections(age, weight)
    if (age == "adult" || age == "senior") {
	return [cals_from_kilos(weight, factor),
	    cals_from_kilos(weight*1.05, "weight gain"),
	    cals_from_kilos(weight*0.95, "weight loss")]
    }
    else {
	if (age == "puppy 0-4 months") {
	    return [cals_from_kilos(weight, factor),
		    "Weight gain/loss data not available for puppies",
		    "Simply Raw not recommended under 4 months"]
	}
	else {
	    return [cals_from_kilos(weight, factor),
		    "Weight gain/loss data not available for puppies",
		    "Weight gain/loss data not available for puppies"]
	}
    }
    
}

j = 1
k = -1
const interval = setInterval(function() {
    for (dog of document.getElementsByClassName("dog_flip")) {
	j= j * -1
	dog.style.transform = "scaleX(" + j + ")"
    }
    for (dog of document.getElementsByClassName("dog_flip_2")) {
	k = k * -1
	dog.style.transform = "scaleX(" + k + ")"
    }

   // method to be executed;
}, 5000);

function puppyColor (metric) {
    switch (metric) {
    case "calories":
	return "#1ddde8";
    case ("cups"):
	return "#1de840"
    case ("bags"):
	return "#e3e81d"
    }
}

items = ["Woof", "Bark", "Bow Wow", "Howl", "Arf Arf", "Growl", "Ruff"]
i = 0

function resetCalculateButton() {
    button = document.getElementById("calculate_button")
    button.innerHTML = "Calculate"
}

function toggle_audio_controls(onoroff) {
  var x = document.getElementById("audioControls");
  if (onoroff) {
    x.style.display = "inline";
  } else {
      console.log("okay")
      x.style.display = "none";
      song.pause()
      song.currentTime = 0;

  }
}


var snd = new Audio("audio/bark.mp3");
var song = new Audio("audio/song.mp3")

function myFunction() {
    i += 1
    button = document.getElementById("calculate_button")
    button.innerHTML = items[i % 5]
    snd.currentTime=0;
    snd.play()
    setTimeout(resetCalculateButton, 500)
    results = getFormResults()
    calories_n      = results[0]
    calories_gain_n = results[1] 
    calories_loss_n = results[2]
    if (isNaN(calories_n)) {
	console.log(calories_n)
	document.getElementById("calories").innerHTML = calories_n;
	document.getElementById("cups").innerHTML = calories_n;
	document.getElementById("bags").innerHTML = calories_n;
	document.getElementById("bags_gain").innerHTML = calories_n;
	document.getElementById("cups_gain").innerHTML = calories_n;
	document.getElementById("calories_gain").innerHTML = calories_n;
	document.getElementById("bags_loss").innerHTML = calories_n;
	document.getElementById("cups_loss").innerHTML = calories_n;
	document.getElementById("calories_loss").innerHTML = calories_n;
	return("")
    }
    else {
	calories = document.getElementById("calories");
	calories.innerHTML =Math.round(calories_n).toLocaleString("en-US") + " calories";
	cups = document.getElementById("cups");
	cups.innerHTML =(Math.round(calories_n/320*10)/10) + " cups";
	bags = document.getElementById("bags");
	bags.innerHTML =Math.round(calories_n/320/17*30*10)/10 + " bags";
	if (calories_gain_n == "Weight gain/loss data not available for puppies") {
	    if (calories_loss_n == "Simply Raw not recommended under 4 months") {
		cups.innerHTML = "We do not recommend feeding SimplyRaw® to puppies under 4 months"
		bags.innerHTML = "Consider using this calculator to plan for a future life stage."
	    }
	    toggle_audio_controls(true)
	    if (music == true){
		song.currentTime=0;
	        song.play()
	    }
	    document.getElementById("row1").style.backgroundColor=puppyColor("calories");
	    document.getElementById("calories").style.backgroundColor=puppyColor("calories");
	    document.getElementById("row2").style.backgroundColor=puppyColor("cups");
	    document.getElementById("cups").style.backgroundColor=puppyColor("cups");
	    document.getElementById("row3").style.backgroundColor=puppyColor("bags");
	    document.getElementById("bags").style.backgroundColor=puppyColor("bags");
	    document.getElementById("left_tab").classList.add("rainbow_wrapper")
	    document.getElementById("middle_tab").classList.add("rainbow_wrapper")
	    document.getElementById("right_tab").classList.add("rainbow_wrapper")
	    document.getElementById("audioControls").classList.add("rainbow_wrapper")
	    for (metric of ["bags", "cups", "calories"]) {
		goal = "gain";
		doc = document.getElementById(metric+"_"+goal);
		doc.style.setProperty("font-size", ".6em", "important");
		doc.innerHTML = ("<div class='dog_flip_2'>" +
				 "┈▏┈┈┈┈┈┈▕╲▕╲┈┈┈" + "<br>" +
				 "▏▏┈┈┈┈┈┈┈▕┈▔┈╲┈┈" + "<br>" +
				 "▏╲┈┈┈┈┈┈╱┈┈┈O╲┈" + "<br>" +
				 "┈▏┈▔▔▔▔▔▔┈┈┈U━━▀" + "<br>" +
				 "┈▏┈┈┈┈┈┈┈┈╱┃┈┈┈" + "<br>" +
				 "┈┃┏┳┳━━━┫┣┳┃┈┈┈" + "<br>" +
				 "┈┃┃┃┃┈┈┈┃┃┃┃┈┈┈" + "<br>" +
				 "┈┗┛┗┛┈┈┈┗┛┗┛┈┈┈" + "</div>").replaceAll("┈", "<span style='opacity:0'>┈</span>");
		goal = "loss";
		doc.style.backgroundColor = puppyColor(metric)
		doc = document.getElementById(metric+"_"+goal);
		doc.style.backgroundColor = puppyColor(metric)
		doc.style.setProperty("font-size", ".6em", "important");
		doc.innerHTML = ('<div class="dog_flip" style="text-align: right; -moz-transform: scaleX(-1); -o-transform: scaleX(-1); -webkit-transform: scaleX(-1); transform: scaleX(-1); filter: FlipH; -ms-filter: "FlipH";">'+
			    "┈▏┈┈┈┈┈┈▕╲▕╲┈┈┈" + "<br>" +
			    "▏▏┈┈┈┈┈┈┈▕┈▔┈╲┈┈" + "<br>" +
			    "▏╲┈┈┈┈┈┈╱┈┈┈O╲┈" + "<br>" +
			    "┈▏┈▔▔▔▔▔▔┈┈┈U━━▀" + "<br>" +
			    "┈▏┈┈┈┈┈┈┈┈╱┃┈┈┈" + "<br>" +
			    "┈┃┏┳┳━━━┫┣┳┃┈┈┈" + "<br>" +
			    "┈┃┃┃┃┈┈┈┃┃┃┃┈┈┈" + "<br>" +
				 "┈┗┛┗┛┈┈┈┗┛┗┛┈┈┈" + "</div>").replaceAll("┈", "<span style='opacity:0'>┈</span>");
		    
			    
	    }
	  
	    left = document.getElementById("left_top")
	    left.innerHTML = "<h2>{(pᴥq)}</h2>"
	    right = document.getElementById("right_top")
	    right.innerHTML = "<h2>{(´ᴥ`)}</h2>"
	    document.getElementById("middle_top").innerHTML = "Healthy Puppy Development"
	    
	    
	}
	else {
	    toggle_audio_controls(false)
	    cups.style.backgroundColor = "#F6834B";
	    calories.style.backgroundColor = "#F6834B";
	    bags.style.backgroundColor = "#F6834B";

	    middle_tab = document.getElementById("middle_tab")
	    left_tab = document.getElementById("left_tab")
	    right_tab = document.getElementById("right_tab")

	    middle_tab.classList.remove("rainbow_wrapper");
	    left_tab.classList.remove("rainbow_wrapper");
	    right_tab.classList.remove("rainbow_wrapper");

	    row1 = document.getElementById("row1")
	    row2 = document.getElementById("row2")
	    row3 = document.getElementById("row3")
	    for (row of [row1, row2, row3]) {
		row.style.backgroundColor = "#F9B593"
	    }

	    
	    left_tab.innerHTML = "<h2 id='left_top'>Gain Weight (5%)</h2>"
	    middle_tab.innerHTML = "<h2 id='middle_top'>Maintain Weight</h2>"
	    right_tab.innerHTML = "<h2 id='right_top'>Lose Weight (5%)</h2>"
	    
	    
	    calories_gain = document.getElementById("calories_gain");
	    cups_gain = document.getElementById("cups_gain");
	    bags_gain = document.getElementById("bags_gain");
	    
	    calories_gain.innerHTML = Math.round(calories_gain_n).toLocaleString("en-US") + " calories";
	    cups_gain.innerHTML = (Math.round(calories_gain_n/320*10)/10).toLocaleString("en-US") + " cups";
	    bags_gain.innerHTML = (Math.round(calories_gain_n/320/17*30*10)/10).toLocaleString("en-US") + " bags";
	    
	    calories_gain.style.fontSize = "1.5em";
	    cups_gain.style.fontSize = "1.5em";
	    bags_gain.style.fontSize = "1.5em";
	    calories_loss.style.fontSize = "1.5em";
	    cups_loss.style.fontSize = "1.5em";
	    bags_loss.style.fontSize = "1.5em";
	    
	    calories_gain.style.backgroundColor = "#FCD4C0";
	    cups_gain.style.backgroundColor = "#FCD4C0";
	    bags_gain.style.backgroundColor = "#FCD4C0";
	    

	    calories_loss = document.getElementById("calories_loss");
	    cups_loss = document.getElementById("cups_loss");
	    bags_loss = document.getElementById("bags_loss")
	    
	    
	    calories_loss.style.backgroundColor = "#FCD4C0";
	    cups_loss.style.backgroundColor = "#FCD4C0";
	    bags_loss.style.backgroundColor = "#FCD4C0";
	    
	    calories_loss.innerHTML = Math.round(calories_loss_n).toLocaleString("en-US") + " calories";
	    cups_loss.innerHTML = Math.round(calories_loss_n/320*10)/10 + " cups";
            bags_loss.innerHTML = Math.round(calories_loss_n/320/17*30*10)/10 + " bags";
	}
    }
}

function popup() {
    overlay=document.querySelector(".overlay")
    overlay.style.display="block"; // show/hide the overlay
}

function popup_out() {
    overlay=document.querySelector(".overlay")
    overlay.style.display="none"; // show/hide the overlay
}
