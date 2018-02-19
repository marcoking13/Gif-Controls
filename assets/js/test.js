
var api_key = "cac5b5f9a86a4977be453f3f2c50d4d6";
var url = "https://api.giphy.com/v1/gifs/?api_key=cac5b5f9a86a4977be453f3f2c50d4d6";
var buttons = ["success","warning","danger","info","primary"];
var randomizer = Math.floor(Math.random()*buttons.length);
var boot = buttons[randomizer];
function gifConstruct(items){

  $(".controls").empty();
$.get({
url: 'https://api.giphy.com/v1/gifs/search?api_key=cac5b5f9a86a4977be453f3f2c50d4d6&q='+items+'&limit=20&offset=0&rating=PG&lang=en',
method: "GET"
}).then(function(response){
  var randomizer = Math.floor(Math.random()*buttons.length);
  var boot = buttons[randomizer];
for (var i=0;i<20;i++){

  var gif = response.data[i].images.fixed_width_still.url;
  var gifRating = "PG";
  var container = $("<div>").addClass("col-xs-3 room"+i).appendTo(".controls");
  var giver = $("<img>").attr("src",gif).addClass("pic gif gif"+i).appendTo(".room"+i);
  giver.attr("data-still", response.data[i].images.fixed_height_still.url);

giver.attr("data-animate", response.data[i].images.fixed_height.url);


  giver.attr("data-state", "still");

  var rating=$("<h2>").attr("text-align","center").text("PG").appendTo(".room"+i).addClass("rating");

}
var topic = $("<button>").addClass("btn top btn-"+boot).appendTo(".topics").text(items).attr("topic",items);
});
}

function react () {



  var state = $(this).attr("data-state");



  if (state === "still") {

    $(this).attr("src", $(this).attr("data-animate"));



    $(this).attr("data-state", "animate");

  }


  else {

    $(this).attr("src", $(this).attr("data-still"));

    $(this).attr("data-state", "still");

  }

};


$(".submit").on("click",function(){
  $(".searchBox").removeClass("muka");
    $(".searchBox").addClass("nomuka");
  var item = $("input").val();
  gifConstruct(item);
});







 $(document).on("click", ".gif", react);
