$(document).ready(function() {

var moodArray = ['happy', 'sad', 'mad', 'elated', 'frustrated', 'bewildered', 'confused', 'brave', 'modest', 'arrogant', 'talkative', 'bloated'];
var renderMoodButtonsSection = $('#buttonSection');
var renderGifImages = $('#gifImages');

function displayMoodButtons() {
  renderMoodButtonsSection.empty();
  for(var i = 0; i < moodArray.length; i++) {
    var mood = moodArray[i];
    var moodButton = $('<button>');
    moodButton.attr("data-name", mood);
    moodButton.addClass('mood-button');
    moodButton.text(`${mood}`);
    moodButton.css({
                    'border-radius' : '8px',
                    'padding': '5px',
                    'margin': '0 5px 5px 0',
                    'background-color': '#20B2AA',
                    'color': '#FFFFFF'
                  })
    renderMoodButtonsSection.append(moodButton);
    $('.mood-button').hover(function(){
        $(this).css('background-color', '#3e8e41');
        }, function(){
        $(this).css('background-color', '#20B2AA');
    });
  }

  $('.mood-button').on('click', function(){
  $(renderGifImages).empty();
  var moodSearchTerm = $(this).attr('data-name'); 
  var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + moodSearchTerm + '&api_key=c8UVbAGIEcaESZJ6u8wKS7DLHbBnKc8F&limit=10';

$.ajax({
  url: queryUrl,
  method: 'GET'
}).done(function(response) {
  var results = response.data;
  for(var i = 0; i < results.length; i++) {
    var moodGifDiv = $('<div>');
    moodGifDiv.addClass('mood-image-div');
    var rating = results[i].rating
    var moodGifImageRating = $('<p>').text(`Rating: ${rating}`);
    var moodGifImage = $('<img>'); 
    moodGifImage.attr('src', results[i].images.fixed_height.url);
    moodGifDiv.append(moodGifImageRating);
    moodGifDiv.append(moodGifImage);
    renderGifImages.append(moodGifDiv);
    $('.mood-image-div').css({
      'float': 'left',
      'padding': 10
    });

    $('p').css({
      'text-align': 'center',
      'font-weight': 'bold'
    });
  }
})

})

}

$('#add-mood').on('click', function() {
  event.preventDefault();
  var moodSearchValue = $('#mood-input').val().trim();
  moodArray.push(moodSearchValue);
  displayMoodButtons();
});

displayMoodButtons();

});