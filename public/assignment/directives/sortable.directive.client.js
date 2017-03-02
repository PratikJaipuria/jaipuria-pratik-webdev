/**
 * Created by Pratik on 2/23/2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                handle: "span.align"
            });
        }
        return {
            link: linkFunc
        };
    }
})();