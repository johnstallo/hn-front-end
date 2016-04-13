angular.module('articleController', [])

    // inject the Article service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Articles', function($scope, $http, Articles) {
        $scope.formData = {};
        $scope.loading = true;

        
        Articles.get()
            .then(function(data) {
                $scope.articles = data.data;
                $scope.loading = false;
            });
        
        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createArticle = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Articles.create($scope.formData)

                    // if successful creation, call our get function to get all the new articles
                    .then(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.Articles = data.data; // assign our new list of articles
                    });
            }
        };

        // DELETE ==================================================================
        // delete a article after checking it
        $scope.deleteArticle = function(id) {
            $scope.loading = true;

            Articles.delete(id)
                // if successful creation, call our get function to get all the new articles
                .then(function(data) {
                    $scope.loading = false;
                    $scope.articles = data.data; // assign our new list of articles
                });
        };

        $scope.extractDomain = function(url) {
            var domain;
            //find & remove protocol (http, ftp, etc.) and get domain
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            }
            else {
                domain = url.split('/')[0];
            }

            //find & remove port number
            domain = domain.split(':')[0];

            return domain;
        };
        
        $scope.upvoteArticle = function(articleID) {
          Articles.upvote(articleID)
            .then(function(data){
                $scope.loading = false;
                $scope.articles = data.data;
            });
          ;  
        };
        
    }]);