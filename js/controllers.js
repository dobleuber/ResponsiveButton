angular.module('testApp.controllers')
.controller('homeCtrl', ['$scope',
  function ($scope) {
    $scope.click1 = function () {
      alert('hey 1');
    }

    $scope.items = [
      {
        'text': 'item 1',
        'description': 'Description for item 1',
        'color':'#f00'
      }
      ,
      {
        'text': 'item 2',
        'description': 'Description for item 2',
        'color': '#ff0'
      },
      {
        'text': 'item 3',
        'description': 'Description for item 3',
        'color': '#f0f'
      },
      {
        'text': 'item 4',
        'description': 'Description for item 4',
        'color': '#0f0'
      },
      {
        'text': 'item 5',
        'description': 'Description for item 5',
        'color': '#0ff'
      },
      {
        'text': 'item 6',
        'description': 'Description for item 6',
        'color': '#777'
      },
      {
        'text': 'item 7',
        'description': 'Description for item 7'
      }
    ];
  }
]);