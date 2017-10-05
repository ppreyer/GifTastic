var moodArray = ['happy', 'sad', 'mad', 'elated', 'frustrated', 'bewildered', 'confused', 'brave', 'modest', 'arrogant', 'talkative', 'bloated'];
var renderMoodButtonsSection = $('#buttonSection');
var renderGifImages = $('#gifImages');

function displayMoodButtons() {
  console.log("ENTER displayMoodButtons");

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
    // renderMoodButtonsSection.append(moodButton);
    
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

    $('#buttonSection').append(moodButton);
//     }, function() {
//       $(this).css({
//         'box-shadow': 'none',
//         'transform': 'none'
//       })
//     });
//   }
// }
    }
  }

$(document).on('click','.mood-button', function(){
  console.log("CLICKED MOOD");

  $('#gifImages').empty();
  var moodSearchTerm = $(this).attr('data-name'); 
  var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + moodSearchTerm + '&api_key=c8UVbAGIEcaESZJ6u8wKS7DLHbBnKc8F&limit=10';

$.ajax({
  url: queryUrl,
  method: 'GET'
}).done(function(response) {
  var results = response.data;
  console.log(results.length);

  for(var i = 0; i < results.length; i++) {
    console.log(i);

    var moodGifDiv = $('<div>');
    moodGifDiv.addClass('mood-image-div');
    var rating = results[i].rating
    var moodGifImageRating = $('<p>').text(`Rating: ${rating}`);
    var moodGifImage = $("<img id='moodImage'>"); 
    moodGifImage.attr('src', results[i].images.fixed_height_still.url);
    moodGifImage.attr({'data-animate' : results[i].images.fixed_height.url});
    moodGifImage.attr({'data-state' : 'still'});
    moodGifImage.attr({'data-still' : results[i].images.fixed_height_still.url});
    moodGifDiv.append(moodGifImageRating);
    moodGifDiv.append(moodGifImage);
    console.log(moodGifDiv);
    //renderGifImages.append(moodGifDiv);
    $('#gifImages').append(moodGifDiv);
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

});

$(document).on('click', '#moodImage', function(){
  console.log("IMAGE CLICK");
  var state = $(this).attr('data-state');
  if(state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
    console.log('THIS IS THE CURRENT STATE', state);
  } else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
    console.log('THIS IS THE CURRENT STATE', state)
  }
});

$('#add-mood').on('click', function() {
  event.preventDefault();
  var moodSearchValue = $('#mood-input').val().trim();
  if(moodSearchValue === '' || moodArray.indexOf(moodSearchValue.toLowerCase()) > -1) {
    return;
  } else {
      moodArray.push(moodSearchValue);
      displayMoodButtons();

      $('input:text').focus(function(){
      $(this).val('');
      });
    }
});

$(document).ready(function() {
  console.log("DOCUMENT READY");

  displayMoodButtons();
});
