angular.module('testApp.directives')
.directive('melasTooltip', [function () {
  function controller($scope) {
    this.isChanging = function (isChanging) {
      $scope.change = isChanging;
      $scope.safeApply();
    }

    $scope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }

  function link(scope, element, attrs) {
    console.dir(scope);
  }

  return {
    scope : {
      description: '=',
      options: '='
    },
    restrict: 'A',
    transclude: true,
    link: link,
    controller: controller,
    templateUrl: '../partials/melas-tooltip.html'
  }
}])
.directive('melasButton', ['$window', function ($window) {

  function adjustWidth(elem, screenSize, width, font, ctrl) {
    var realWidth = screenSize * (width) / 100;
    ctrl = ctrl || { isChanging: function () { } };
    elem.finish();
    ctrl.isChanging(true);
    elem.animate({ 'width': realWidth + 'px', fontSize: font +'em' }, {
      complete: function () {
        var offset = 20;
        for (var i = 0; i < 3; i++) {
          elem.animate({ left: "+=" + offset }, 100).animate({ left: "-=" + offset }, 100);
          offset /= (1 << i);
        }

        ctrl.isChanging(false);
      }
    });
      
  }

  function link(scope, element, attrs, tooltipCtrl) {
    var width = attrs.width || 50;
    element.css('position', 'relative');
    if (attrs.notFancy) {
      element.css('width', width + '%');
      return;
    }

    var oldValue = -1;

    function checkScreenChange() {
      var screenWidths = [320, 480, 768, 992, 1200];
      var currentWidth = $window.innerWidth;
      var currentSize = 1200;
      var fontSize = 5;
      for (var w in screenWidths) {
        if (currentWidth < screenWidths[w]) {
          currentSize = screenWidths[w];
          fontSize = parseInt(w) + 1;
          break;
        }
      }

      if (oldValue != currentSize) {
        adjustWidth(element, currentSize, width, fontSize, tooltipCtrl);
        oldValue = currentSize;
      }
    }

    checkScreenChange();

    angular.element($window).on('resize', checkScreenChange);
  }

  return {
    require: '?^melasTooltip',
    restrict: 'A',
    replace: 'true',
    transclude: true,
    templateUrl: '../partials/melas-button.html',
    link: link
  };
}]);;