
$(document).ready(function () {

    // SETUP VARIABLES============================================================================================================

    // Search Parameters
    var queryTerm = "";
    var numResults;
    var startYear;
    var endYear;

    var APIkey = "f625bcecaa414cdab167a57d7ca3a76f"
    var queryURL = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + APIkey;

    // variable to track number of articles 
    var articleCounter = 0;

    // FUNCTIONS===================================================================================================================

    function runQuery (numArt, queryURL) {

        $.ajax({
        url: queryURL, 
        method: "GET"
        })
        .done(function(response) {

            var results = response.results

            for (var i = 0; i < numArt; i++) {

                var wellSection = $("<div class='well'>");

                wellSection.attr("id", "article-well-" + i);

                $("#wellSection").append(wellSection);

                $("#article-well-" + i).append("<h3>" + results[i].title + "</h3>");
                $("#article-well-" + i).append("<h4>" + results[i].byline + "</h4>");
                $("#article-well-" + i).append("<h4>" + results[i].updated_date + "</h4>");
                $("#article-well-" + i).append("<a href = '+ results[i].url'>" + results[i].url + "</a>");
                $("#article-well-" + i).append("<h4>" + results[i].section + "</h4>");
            }

                // Testing / Debugging // 
                console.log(queryURL);
                console.log(numArt);
                console.log(response);
        }); 
    }   

    // MAIN PROCESS==================================================================================================================

    $("#runSearch").on("click", function () {

        // the search term is the value of the text input
        queryTerm = $("#searchTerm").val().trim();

        // will be used to gather NYData pertaning to seach word/words
        var newQuery = queryURL + "&q=" + queryTerm;

        // get the number of results
        var numResults = $("#numRecords").val();

        // get a start year and an end year
        startYear = $("#startYear").val().trim();
        endYear = $("#endYear").val().trim();

        // only if there is a start date/end date input value does search run
        // start year and end year must also include the months and days (1231)
        if(parseInt(startYear)) {
            startYear = startYear + "1231";
            newQuery = newQuery + "&begin_date=" + startYear;
        }

        if(parseInt(endYear)) {
            endYear = endYear + "1231";
           newQuery = newQuery  + "&end_date=" + endYear;
        }

        runQuery(numResults, newQuery);

        console.log(newQuery);

        return false;
    }) 

});
