var Article = require('./models/article');

function getArticles(res) {
    Article.find(function(err, articles) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(articles); // return all articles in JSON format
    });
}
;

module.exports = function(app) {

    var articles = [
        { _id: 0, url: "http://playground.tensorflow.org/", title: "Tinker with a Neural Network in Your Browser", votes:0 },
        { _id: 1, url: "http://paulgraham.com/pgh.html", title: "How to Make Pittsburgh a Startup Hub", votes:0 },
        { _id: 2, url: "http://www.nytimes.com/2016/04/13/science/alpha-centauri-breakthrough-starshot-yuri-milner-stephen-hawking.html?mabReward=A6&moduleDetail=recommendations-2&action=click&contentCollection=Americas&region=Footer&module=WhatsNext&version=WhatsNext&contentID=WhatsNext&src=recg&pgtype=article", title: "A Visionary Project Aims for Alpha Centauri", votes:0 },
        { _id: 3, url: "https://code.facebook.com/posts/1755691291326688/introducing-facebook-surround-360-an-open-high-quality-3d-360-video-capture-system", title: "Continuous Deployment at Instagram", votes:0 },
    ];

    // api ---------------------------------------------------------------------
    app.get('/api/articles', function(req, res) {
        res.send(articles);
    });

    app.post('/api/upvote', function(req, res) {
        var articleID = req.body.articleID;
        articles[articleID].votes++;
        console.log("upvoted article: id=" + articleID + ", votes = " + articles[articleID].votes);
        res.send(articles);
    });
    
    app.post('/api/submit', function(req, res) {
        console.log("received submit request: %j", req.body);
        
        //TODO: validate new article
        
        var articleToAdd = {
            title: req.body.title,
            url: req.body.url,
            votes: 0,
            _id: articles.length+1
        };
        
        console.log("created new article: %j", articleToAdd);
        
        articles.push(articleToAdd);
        
        console.log("updated articles: %j", articles);
        res.send(articles); 
    });

    // create article and send back all articles after creation
    app.post('/api/articles', function(req, res) {

        // create a article, information comes from AJAX request from Angular
        Article.create({
            text: req.body.text,
            done: false
        }, function(err, article) {
            if (err)
                res.send(err);

            // get and return all the articles after you create another
            getArticles(res);
        });

    });

    // delete an article
    app.delete('/api/articles/:article_id', function(req, res) {
        Article.remove({
            _id: req.params.article_id
        }, function(err, article) {
            if (err)
                res.send(err);

            getArticles(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};