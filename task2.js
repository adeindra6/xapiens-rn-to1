const Crawler = require('crawler');
const JSCrawler = require('js-crawler');
const cheerio = require('cheerio');
const customLog = require('./task3');

let jscrawler = new JSCrawler().configure({ignoreRelative: false, depth: 2});

let c = new Crawler({
    maxConnections : 10,

    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            let $ = res.$;
            console.log($("title").text());
        }
        done();
    }
});

let logging = "";

class Movies {
	async getMovies() {
		await jscrawler.crawl({
		  url: "https://www.cgv.id/en/movies/now_playing",
		  success: function(page) {
		  	if(page.url.includes("https://www.cgv.id/en/movies/info")) {
		  		
		  		c.queue([{
				    uri: page.url,
				    jQuery: {
				    	name: 'cheerio',
					    options: {
					        normalizeWhitespace: true,
					        xmlMode: true,
					    }
				    },
				 
				    callback: function (error, res, done) {
				        if(error){
				            console.log(error);
				        }else{
				        	let $ = res.$;

				        	console.log($("div[class='movie-info-title']").text() + "\n");
				            console.log($("div[class='movie-add-info left']").find("ul").text() + "\n");
				            console.log($("div[class='movie-synopsis right']").text() + "\n");
				            console.log("------------------------------------\n");

				            logging += $("div[class='movie-info-title']").text() + "\n" +
				            		   $("div[class='movie-add-info left']").find("ul").text() + "\n" +
				            		   $("div[class='movie-synopsis right']").text() + "\n" +
				            		   "------------------------------------\n";
				        }
				        done();
				        customLog.setLogTask2(logging);
				    }
				}]);
		  	}
		  },
		});
	}
}	

const movies = new Movies();

const result = async () => {
	let getMovies = await movies.getMovies();
};

result();