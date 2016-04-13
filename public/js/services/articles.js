angular.module('articleService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Articles', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/articles');
            },
            create: function(articleData) {
                return $http.post('/api/articles', articleData);
            },
            delete: function(id) {
            },
            upvote: function(id) {
                var articleData = {
                    articleID: id
                };
                return $http.post('/api/upvote/', articleData);
            }
        }
    }]);
