var App = angular.module('app', []);

App.run(function($rootScope) {
    $rootScope.socket = io.connect(window.location.protocol + "//" + window.location.hostname + ":3210");
    state = 'not playing'

    $rootScope.socket.on('update:time', function(new_time) {
        player = document.getElementById('player');
        console.log(player.currentTime);
        if (player.currentTime > new_time) {
            player.pause()
        } else {
            if (player.paused) {
                player.play();
            }
        }
    });
});

App.directive('checkTime', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            window.setInterval(function() {
                scope.socket.emit('check:time', element[0].currentTime);
            }, 1000);
        }
    };
});


App.controller('mainCtrl', function($scope) {

    $scope.socket.on('update:time', function(time) {

    });

});
