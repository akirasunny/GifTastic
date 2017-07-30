// globals

var keyword = ["Tiger", "Lion","Leopard", "Snow Leopard", "Caracal", "Jaguar", "Cheetah", "Cougar", "Ragdoll"];
var apikey = "api_key=46d43f5c668e4342bc6f47e2724e9585";
var limit = 50;

// initialize buttons
for (i = 0; i < keyword.length; i++) {
	var button = $("<button class='added'>");
	button.html(keyword[i]);
	$("#buttonholder").append(button);
}

// placeholders
var queryurl;
var input;
var name;

// functions

function shuffle(a) { // from Stack Overflow
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function capitalize(a) {
	var temp = a.split(" ");
	var temp1 = "";
	for (i = 0; i < temp.length; i++) {
		temp1 += temp[i].substring(0, 1).toUpperCase() + temp[i].substring(1, ) + " ";
	}
	var final = temp1.trim();
	return final;
}

function addbutton(event) {
	input = $("#keyword").val().trim();
	input = capitalize(input); // capitalize 1st letter of input
	if (input !== "" && keyword.indexOf(input) === -1) {
		$("#buttonholder").empty();
		keyword.push(input);
		for (i = 0; i < keyword.length; i++) {
			var button = $("<button class='added'>");
			button.html(keyword[i]);
			$("#buttonholder").append(button);
		}
		$("#keyword").val("");
	}
}

function display(event) {
	$("#displayer").empty();
	name = $(this).html();
	queryurl = "https://api.giphy.com/v1/gifs/search?q=" + name + "&" + apikey + "&limit=" + limit;
	$.ajax({
		url: queryurl,
		method: "GET"
	}).done(function(res) {
		var data = shuffle(res.data);
		console.log(data);
		for (i = 0; i < 10; i++) {
			var newdiv = $("<div class='gifdiv'>");
			var banner = $("<div class='rating'>").css("text-align", "center").html("Rating: " + data[i].rating);
			var newimg = $("<img class='gif' state='still'>");
			var still = data[i].images.downsized_still.url;
			var animate = data[i].images.downsized.url
			newimg.attr("still", still).attr("animate", animate).attr("height", "150px").attr("src", still).attr("alt", name);
			newdiv.append(newimg, banner);
			$("#displayer").append(newdiv);
		}
		var placeholder = $("<div>").css("height", "200px").css("clear", "both");
		$("#displayer").append(placeholder);
	})
}

function clickgif() {
	var state = $(this).attr("state");
	console.log(state);
	still = $(this).attr("still");
	animate = $(this).attr("animate");
	console.log(still);
	console.log(animate);
	if (state ==="still") {
		$(this).attr("src", animate);
		$(this).attr("state", "animate");
	}
	else {
		$(this).attr("src", still);
		$(this).attr("state", "still");
	}
}

// main
$("#submit").on("click", addbutton);
$(document).on("click", ".added", display);
$(document).on("click", ".gif", clickgif);