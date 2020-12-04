var modul = (function() {
    var imdbApiKey = '495166f7damsh0a8444d9f2441d0p14983fjsnb9793067840c';
    var imdhApiHost = 'imdb8.p.rapidapi.com';
    var imdbUseQueryString = true;

    var loadUrl = function(url, data, type, successCallback, errorCallback) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200 && successCallback) {
                successCallback(JSON.parse(this.response));
            }
            else if(errorCallback) {
                errorCallback();
            }
        };
    
        xhttp.open(type, url, true);
        
        xhttp.setRequestHeader('x-rapidapi-key', imdbApiKey);
        xhttp.setRequestHeader('x-rapidapi-host', imdhApiHost);
        xhttp.setRequestHeader('useQueryString', imdbUseQueryString)

        data ? xhttp.send(data) : xhttp.send();
    }

    var searchSuccess = function(response) {
        if(response && response.d && response.d.length != 0){
            var html = `<div class="result-content">`;

            response.d.forEach(function(element){
                html += `
                <div onclick="modul.openMovie('${element.id}');" class="card result-item mx-1 mb-1">
                    <img class="card-img-top h-50" src="${element.i.imageUrl}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${element.l}</h5>
                        <p class="card-text">${element.s}</p>
                    </div>
                </div>
                `;
            });

            html += `</div>`;

            document.getElementById('results').innerHTML = html;
        }
    }

    var searchTitle = function() {
        var text = document.getElementById('search-text').value;
        document.getElementById('results').innerHTML = '<span>Loading movie list...</span>';
        var url = 'https://imdb8.p.rapidapi.com/title/auto-complete?q=' + text;
        loadUrl(url, null, 'GET', searchSuccess);
    }

    var openMovie = function(id){
        var url = 'https://imdb8.p.rapidapi.com/title/get-details?tconst=' + id;
        document.getElementById('movie').innerHTML = '<span>Loading movie...</span>';
        loadUrl(url, null, 'GET', openMovieSuccess);       
    }  

    var openMovieSuccess = function(response) {
        console.log(response);
        if(response && response.title != ''){
            var html = '';
            html += `
            <div onclick="modul.openMovie('${response.id}'); window.scrollTo(0, 0);" class="card result-item-selected">
                <img class="card-img-top h-50" src="${response.image.url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Title: ${response.title}</h5>
                    <p class="card-text">Year: ${response.year}</p>
                    <p class="card-text">Duration: ${response.runningTimeInMinutes} min.</p>
                </div>
            </div>
            `;

            document.getElementById('movie').innerHTML = html;
        }
    }

    return {
        searchTitle: searchTitle,
        openMovie: openMovie
    }
})();
