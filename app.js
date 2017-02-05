$(document).ready(function() {
    $('#submitSearch').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#text').val();
        getRequest(searchTerm);
    });
});

function getRequest(searchTerm) {
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'AIzaSyCMPZP6_oUwbGrCcNLvZi9XpmH86bk6NPk',
        q: searchTerm
    };
    $.getJSON(url, params, function(searchTerm) {
        showResults(searchTerm);
    });
}

var searchResult = function(index, value) {
    this.index = index;
    this.title = value.snippet.title;
    this.address = 'https://www.youtube.com/watch?v=' + value.id.videoId;
    this.thumbnail = value.snippet.thumbnails.default.url;
}

function showResults(results) {
    var html = "";
    var entries = results.items;
    $.each(entries, function(index, value) {
        var video = new searchResult(index, value);
        html += '<p><a href="' + video.address + '">' + video.title + '</a></p>';
        html += '<a href="' + video.address + '"><img src="' + video.thumbnail + '"/></a>';
    });

    $('#results').html(html);
}
