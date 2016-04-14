angular.module('articleService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Articles', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/articles');
            },
            getArticle: function(articleID) {
                return $http.get('/api/articles/' + articleID);
            },
            create: function(articleData) {
                return $http.post('/api/articles', articleData);
            },
            delete: function(id) {
            },
            submit: function(newArticle) {
                return $http.post('/api/submit', newArticle);
            },
            upvote: function(id) {
                var articleData = {
                    articleID: id
                };
                return $http.post('/api/upvote/', articleData);
            }
        }
    }]);
