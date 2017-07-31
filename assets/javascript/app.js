// globals

var keyword = ["Tiger", "Lion","Leopard", "Snow Leopard", "Caracal", "Jaguar", "Cheetah", "Cougar", "Ragdoll Cat"];
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

// pop-up of full-size gif
function popout() {
	var fullsize = $("<div class='fullsize'>").css("display", "none");
	var close = $("<span id='close'>").html("<img id='cross' src='assets/images/close.png' width='50px'>");
	var fsimg = $("<img class='fsimg'>");
	var rating1 = $("<div class='fsrating'>");
	fullsize.append(close, fsimg, rating1);
	$("body").append(fullsize);
}

function display() {
	$("#displayer").empty();
	name = $(this).html();
	var animal = $("<h4>Now displaying: " + name + "</h4>");
	$("#displayer").append(animal);
	queryurl = "https://api.giphy.com/v1/gifs/search?q=" + name + "&" + apikey + "&limit=" + limit;
	$.ajax({
		url: queryurl,
		method: "GET"
	}).done(function(res) {
		var data = shuffle(res.data);
		for (i = 0; i < 10; i++) {
			var newdiv = $("<div class='gifdiv'>");
			var rating = $("<div class='rating'>").css("text-align", "center").html("Rating: " + data[i].rating);
			var newimg = $("<img class='gif' state='still'>");
			var still = data[i].images.downsized_still.url;
			var animate = data[i].images.downsized.url;
			var original = data[i].images.original.url;
			rating.attr("original", original).attr("rating", data[i].rating);
			newimg.attr("src", still).attr("alt", name).attr("height", "150px");
			newdiv.append(newimg, rating);
			$("#displayer").append(newdiv);
		}
		var placeholder = $("<div>").css("height", "200px").css("clear", "both");
		$("#displayer").append(placeholder);
	})
}

function clickgif() {
	// $(".fsimg").attr("src", "assets/images/loading.gif").css("border", "0");
	$(".fullsize").css("display", "block");
	$(".fsrating").html("Rating: " + $(this).attr("rating"));
	var original = $(this).attr("original");
	$(".fsimg").attr("src", original).css("border", "7px solid #fff").css("width", "auto");

	// I tried another way to animate gifs (as above), comments below is the first version.

	// var still = $(this).attr("still");
	// var animate = $(this).attr("animate");
	// if (state ==="still") {
	// 	$(this).attr("src", animate);
	// 	$(this).attr("state", "animate");
	// }
	// else {
	// 	$(this).attr("src", still);
	// 	$(this).attr("state", "still");
	// }
}

function closegif() {
	$(".fullsize").css("display", "none");
}

// main
popout();
$("#submit").on("click", addbutton);
$("#keyword").keypress(function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		addbutton();
	}
})
$(document).on("click", ".added", display);
$(document).on("click", ".rating", clickgif);
$(document).on("click", "#cross", closegif);