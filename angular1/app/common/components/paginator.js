(function(){
    angular.module('primeiraApp').component('paginator', {
      bindings: {
        pages: '@',
        currentPage: "=",
        paginationFunction: "&"
      },
      controller: [
        function(){
          this.$onInit = function(){
            const pages = parseInt(this.pages) || 1 ;
            this.pagesArray = Array(pages).fill(0).map( (e, i) => i + 1)


            this.needPagination = this.pages > 1;
            this.hasPrev = this.currentPage > 1;
            this.hasNext = this.currentPage < this.pages;
          }
          this.goTo = function(pageTarget){
            this.currentPage = pageTarget;
            this.$onInit()
            this.paginationFunction();
          }
          this.isCurrent = function(i){
            return this.currentPage == i
          }
        }

      ],
      template: `
      <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margim pull-right">
        <li ng-if="$ctrl.hasPrev">
          <a href ng-click='$ctrl.goTo($ctrl.currentPage-1)' >Anterior</a>
        </li>

        <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
          <a href ng-click='$ctrl.goTo(index)' >{{index}}</a>
        </li>


        <li ng-if="$ctrl.hasNext">
          <a href ng-click='$ctrl.goTo($ctrl.currentPage + 1)' >Próximo</a>
        </li>

      </ul>
      `
    })
})()
