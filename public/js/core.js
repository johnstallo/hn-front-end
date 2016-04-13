var myApp = angular.module('mindaroHN', ['ui.router', 'articleController', 'articleService']);

myApp.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise("/new");
   
   $stateProvider
        .state('new', {
           url: "/new",
           templateUrl: "views/article-list.html",
           controller: 'mainController', 
           resolve: {
               foo: function() {
                   return {value: 'simple!'};
               },
               theArticles: function(Articles) {
                   console.log("loading articles...");
                   return Articles.get();
                }
           } 
        })
        .state('submit', {
            url: "/submit",
            templateUrl: "views/article-submit.html",
            controller: function($scope, $state, Articles) {
                $scope.title = "Submit Article";
                
                $scope.formData = { title: "", url: "" };
                $scope.submitArticle = function() {
                    var newArticle = {title: $scope.formData.title, url: $scope.formData.url};
                    
                    Articles.submit(newArticle)
                        .then(function(data) {
                           $state.go('new', {}, {reload: true}); 
                        });
                };
            }
        });
});
