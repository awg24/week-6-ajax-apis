    $(document).ready(function() {
        // Initial array of anime
        var jets = ['speed racer', 'gundam wing', 'attack on titan', 'sword art online', 'log horizon', 'fate/ stay night', 'sakura', 'rououni kenshin', 'GTO', 'black lagoon', 'girls und panzer', 'brave 10', 'pokemon', 'one piece'];


        // displaygiphyInfo function now re-renders the HTML to display the appropriate content. 
        function displaygiphyInfo() {
            var jet = $(this).attr('data-name');
            var jetTrimmed = $.trim(jet); // trim extra spaces
            jetTrimmed = jetTrimmed.replace(/ /g, "+"); // change space to +

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + jetTrimmed + "&limit=10&api_key=dc6zaTOxFJmzC ";
            // Creates AJAX call for the specific jet being 
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                console.log(response);

                var state = 'still';
                for (i = 0; i < 10; i++) {
                    // Creates a generic div to hold the giphy
                    var gifDiv = $('<div class="giphy">');
                    var gifDiv = $('<div>').attr('class', 'giphy');
                    // Creates an element to have the rating displayed
                    var rating = $('<p>').text("Rating: " + response.data[i].rating);
                    var data_animate = response.data[i].images.downsized_medium.url;
                    var data_still = response.data[i].images.original_still.url;
                    // rating
                    gifDiv.append(rating);

                    // Creates an element to hold the image 
                    var image = $('<img>').attr("src", data_still); //response.data[i].images.downsized_medium.url);
                    image.attr('data-state', 'still');
                    image.attr('data-still', data_still);
                    image.attr('data-animate', data_animate);
                    image.attr('class', 'animeImage');
                    // Appends the image
                    gifDiv.append(image);

                    // Puts the entire jet above the previous jets.
                    $('#jetsView').prepend(gifDiv);
                }
            });

        }

        // ========================================================

        function renderButtons() {

            // Deletes the jets prior to adding new jets (this is necessary otherwise you will have repeat buttons)
            $('#buttonsView').empty();

            // Loops through the array of jets
            for (var i = 0; i < jets.length; i++) {
                var a = $('<button>')
                a.addClass('giphy'); 
                a.addClass('button'); 
                a.attr('data-name', jets[i]); // Added a data-attribute
                a.text(jets[i]); // Provided the initial button text
                $('#buttonsView').append(a); // Added the button to the HTML
            }
        }


        // Start/ stop animation
        $(document).on('click', '.animeImage', changeState);


        function changeState() {
            var state = $(this).attr('data-state');
            var animateLink = $(this).attr('data-animate');
            var stillLink = $(this).attr('data-still');
            if (state == "still") {
                $(this).attr('data-state', 'animate');
                $(this).attr('src', animateLink);
            } else {
                $(this).attr('data-state', 'still');
                $(this).attr('src', stillLink);
            }
            console.log($('.animeImage').attr('data-state'));
        };


        $('#addAnimeButton').on('click', function() {
            var jet = $('#anime-input').val().trim();

            // check for duplicate entry before push

            if (jets.indexOf(jet) == -1) {
                jets.push(jet);
                $('#anime-input').val("");
                renderButtons();
            } else {
                $('#anime-input').val("");
                alert("Duplicate entry")
            }

            return false; // submit on enter
        })

        $(document).on('click', 'button' , displaygiphyInfo);

        renderButtons();

        /*
.giphy'
        009688
        00BCD4
        3F51B5
        673AB7
        9C27B0

        */

    }); // document ready
