
var searched_terms = [];


const GetInputValue = (className)=>{
  var value = $("."+className).val();
  return value;
}

const CreateTab = (search) =>{

  var colorValues = `rgb( ${(Math.random() * 200)},  ${(Math.random() * 200)}, ${(Math.random() * 200)})`;
  var container = $(".tabs_row");
  var tab = $("<div>").addClass("col-2 tab").css("border",colorValues+" 2px solid").appendTo(container).attr("value",search);
  var tab_title = $("<p>").text(search).addClass("tab_text").css("color",colorValues).appendTo(tab);

  tab.on("click",(e)=>{
    var value = tab.attr("value");
    GifConstruction(value);
  });

  searched_terms.push(search);

}

const PopulateGifsLoop = (gifs) => {

  for(var i = 0; i < gifs.length - 2; i ++){

    PopulateGifs(gifs[i]);

  }

}

const PopulateGifs = (gif) => {

  var container = $("<div>").addClass("col-4 gif_container").attr("id",gif.id);
  var gifImg = $("<img>").addClass("gif_img width-100").attr("src",gif.images.original_still.url).attr("active",0);

  gifImg.on("click",(e)=>{

    if($(e.target).attr("active") == 1){

      $(e.target).attr("src",gif.images.original_still.url);

      $(e.target).attr("active",0);

    }else{

      $(e.target).attr("src",gif.images.original.url);

      $(e.target).attr("active",1);

    }

  });


  var title = $("<p>").addClass("gif_title width-80 margin-left-5 float-left").text(gif.title);
  var rating = $("<p>").addClass("gif_title width-20 float-right").text(gif.rating);

  gifImg.appendTo(container);
  title.appendTo(container);
  rating.appendTo(container);

  $(".results_row").append(container);

}


$(".gif_button_main").on("click", function(){

  var value = GetInputValue("gif_input_main");

  if(CheckIfAlreadySearched(value)){

    CreateTab(value);
    GifConstruction(value);

  }

});


const GifConstruction = async (value) =>{

  $(".results_row").empty();

  const {data} = await $.get({
    url: 'https://api.giphy.com/v1/gifs/search?api_key=cac5b5f9a86a4977be453f3f2c50d4d6&q='+value+'&limit=20&offset=0&rating=PG&lang=en',
    method: "GET"
  });

  PopulateGifsLoop(data);

}


const CheckIfAlreadySearched = (value) =>{
    for (var i = 0; i < searched_terms.length; i++){

      if(value == searched_terms[i]){

        alert("Already Searched that Term!");
        return false;

      }

    }

    return true;

}
