angular.module('todoService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Todos', ['$http', 'TodosStub', function($http, TodosStub) {

        return {
            get: function() {
                return $http.get('/api/todos');
                //return TodosStub.get();

            },
            create: function(todoData) {
                return $http.post('/api/todos', todoData);
                //return TodosStub.create(todoData);
            },
            delete: function(id) {
                return $http.delete('/api/todos/' + id);
                //return TodosStub.delete(id);
            },
            getDatabaseInfo: function() {
                return $http.get('/api/databaseinfo');
            }
        }
    }]);

angular.module('stubService', [])
    .factory('TodosStub', ['$q', function($q) {
        var todos = {
            data: [
                { text: "I want a pony", _id: 0 },
                { text: "Ride a unicorn", _id: 1 }
            ]
        };

        var NETWORK_LATENCY = 500;

        return {
            get: function() {
                var deferred = $q.defer();

                setTimeout(function() {
                    deferred.resolve(todos);
                }, NETWORK_LATENCY);

                return deferred.promise;
            },
            create: function(todoData) {
                var newID = todos.data.length;
                todos.data.push({ text: todoData.text, _id: newID });
                return this.get();
            },
            delete: function(id) {
                _.remove(todos.data, function(o) {return o._id == id});
                return this.get();
            }
        }
    }]);  
