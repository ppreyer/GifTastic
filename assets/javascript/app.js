// Global variables
var moodArray = ['happy', 'sad', 'mad', 'elated', 'frustrated', 'bewildered', 'confused', 'brave', 'modest', 'arrogant', 'talkative', 'bloated'];
var renderMoodButtonsSection = $('#buttonSection');
var renderGifImages = $('#gifImages');

// Function to display mood buttons on page
function displayMoodButtons() {
  console.log("ENTER displayMoodButtons");

  // Empty the button section everytime this function is invoked
  $('#buttonSection').empty();
  // Iterate through the global mood array 
  for(var i = 0; i < moodArray.length; i++) {
    // Declare index variable
    var mood = moodArray[i];
    // Create a html button
    var moodButton = $('<button>');
    // Assign attribute, class, and text to the button
    moodButton.attr("data-name", mood);
    moodButton.addClass('mood-button');
    moodButton.text(`${mood}`);
    // css styling
    moodButton.css({
                    'border-radius' : '8px',
                    'padding': '5px',
                    'margin': '0 5px 5px 0',
                    'background-color': '#20B2AA',
                    'color': '#FFFFFF'
                  })
    // renderMoodButtonsSection.append(moodButton);
    
    // Styling when user hovers and presses each button
    $('.mood-button').hover(function(){
        $(this).css('box-shadow', '0 5px #666');
        }, function(){
        $(this).css('box-shadow', 'none');
    })
    
    $('.mood-button').focus(function(){
      $(this).css({
        'outline': 'none'
      })
    })
    // Append each button to the button section
    $('#buttonSection').append(moodButton);
    }
  }

// When a user clicks a mood button... 
$(document).on('click','.mood-button', function(){

  console.log("CLICKED MOOD");
  // Empty gif images section 
  $('#gifImages').empty();
  // Assign mood name to search term to plug into API query
  var moodSearchTerm = $(this).attr('data-name'); 
  // Declare API query URL
  var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + moodSearchTerm + '&api_key=c8UVbAGIEcaESZJ6u8wKS7DLHbBnKc8F&limit=10';

// Run ajax function...
$.ajax({
  // Define object properties url and method
  url: queryUrl,
  method: 'GET'
  // After the api call is done...
}).done(function(response) {
  // Assign api data to variable
  var results = response.data;
  console.log(results.length);
  // Iterate through the data array
  for(var i = 0; i < results.length; i++) {
    console.log(i);
    // Declare a div to hold gif image and rating
    var moodGifDiv = $('<div>');
    // Add a class 
    moodGifDiv.addClass('mood-image-div');
    // Declare mood rating variable
    var rating = results[i].rating
    // Create a paragraph tag and insert rating text inside
    var moodGifImageRating = $('<p>').text(`Rating: ${rating}`);
    // Create an image tag to hold the gif
    var moodGifImage = $("<img id='moodImage'>"); 
    // Assign src, animate, and still states for the gif images
    moodGifImage.attr('src', results[i].images.fixed_height_still.url);
    moodGifImage.attr({'data-animate' : results[i].images.fixed_height.url});
    moodGifImage.attr({'data-state' : 'still'});
    moodGifImage.attr({'data-still' : results[i].images.fixed_height_still.url});
    moodGifDiv.append(moodGifImageRating);
    moodGifDiv.append(moodGifImage);
    console.log(moodGifDiv);
    // Append gifs to the holder div
    $('#gifImages').append(moodGifDiv);
    // css styling
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

// When a gif image is cicked....
$(document).on('click', '#moodImage', function(){
  console.log("IMAGE CLICK");
  // Declare attribute to state variable
  var state = $(this).attr('data-state');
  // Conditional - if image's attribute === still...
  if(state === 'still') {
    // Assign data-animate attribute as the image src
    $(this).attr('src', $(this).attr('data-animate'));
    // Change data-state from still to animate
    $(this).attr('data-state', 'animate');
    console.log('THIS IS THE CURRENT STATE', state);
    // else state === animate....
  } else {
    // Assign data still attribute as source
    $(this).attr('src', $(this).attr('data-still'));
    // Change data-state from animate to still
    $(this).attr('data-state', 'still');
    console.log('THIS IS THE CURRENT STATE', state)
    }
})

// When the search bar button is clicked...
$(document).on('click', '#add-mood', function(){
  console.log('BUTTON CLICK');
  // Prevent the page from refreshing
  event.preventDefault();
  // Assign the search value to a variable
  var moodSearchValue = $('#mood-input').val().trim();
  console.log(moodSearchValue);
  // Conditional - if the search is blank OR the search term has already been search...
  if(moodSearchValue === '' || moodArray.indexOf(moodSearchValue.toLowerCase()) > -1) {
    // Exit function...
    return;
    // Else....
  } else {
    // Push search term into the global mood array 
      moodArray.push(moodSearchValue);
      console.log(moodArray)
      // Display the correct mood button
      displayMoodButtons();

      // $('input:text').focus(function(){
      // $(this).val('');
      // })
    }
});

$(document).ready(function() {
  console.log("DOCUMENT READY");

  displayMoodButtons();
});
