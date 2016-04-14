var myApp = angular.module('mindaroHN', ['ui.router', 'articleController', 'articleService']);

myApp.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise("/new");
   
   $stateProvider
        .state('new', {
           url: "/new",
           templateUrl: "views/article-list.html",
           controller: 'mainController', 
           resolve: {
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
        })
        .state('item', {
            url: "/item/:id",
            templateUrl: "views/article.html",
            controller: function($scope, $state, $stateParams, Articles, article) {
              $scope.article = article.data;
            },
            resolve: {
                article: function($stateParams, Articles) {
                    return Articles.getArticle($stateParams.id);
               }
            }
        });
});
