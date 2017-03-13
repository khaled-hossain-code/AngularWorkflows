'use strict';
describe('Category Controller', function (){
    var categoryResource,
    ctrl,
    $q,
    $timeout;

    beforeEach(angular.mock.module('todo', function($provide){
        $provide.service('categoryResource', function ($q){
            categoryResource = {};

            categoryResource.getCategories = function getCategories(){
                return $q(function (fulfill, reject){
                    fulfill( [1,2,3,4]);
                });
            }
            sinon.spy(categoryResource, 'getCategories');
            return categoryResource;
        });
    }));

    beforeEach(inject(function ($controller, _$timeout_, _$q_){
        $timeout = _$timeout_;
        $q = _$q_;
        ctrl = $controller('categoryCtrl');
    }));

    it('should get categories from a resource', function(){
        categoryResource.getCategories.called.should.equal(true);
        $timeout.flush();
        ctrl.categories.length.should.equal(4)
    });
});