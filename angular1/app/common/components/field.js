(function(){
  angular.module('primeiraApp').component('field', {
    bindings: {
      text: "@",
      placeholder: "@",
      componentId: "@",
      grid: "@",
      type: "@",
      model: "=",
      readonly: '<',
    },
    controller:[
      "gridSystem",
      function(gridSystem){
        const vm = this
        vm.$onInit = () =>  vm.gridClasses = gridSystem.toCssClasses(vm.grid)
      }
    ],
    template:`
        <div class="{{ $ctrl.gridClasses }}">
          <div class="form-group">
            <label for="{{ $ctrl.componentId }}">{{ $ctrl.text }}</label>
            <input ng-model="$ctrl.model" id="{{ $ctrl.componentId }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" type="{{ $ctrl.type }}" ng-readonly="$ctrl.readonly"/>
          </div>
        </div>
    `
  });
})()
