function assetLibController($scope, assetService) {
    // Init
    $scope.item = {
        expanded: true,
        children: [],
    };
    $scope.assetService = new assetService();
    $scope.assetService.getRootFolders(function (rootFolders) {
        $scope.item.children = rootFolders;
        $scope.$apply();
    });

    // On item click
    $scope.onItemClick = function ($event) {
        $event.stopPropagation();

        if ($scope.isFolder(this.item)) {
            handleFolderClick(this.item);
        }
        else if ($scope.isPackage(this.item)) {
            console.log("package clicked", this.item);
        }
    };

    $scope.isFolder = function (item) {
        return item.type == "folder";
    };

    $scope.isPackage = function (item) {
        return item.type == "package";
    };

    $scope.isOpenFolder = function (item) {
        return $scope.isFolder(item) && item.expanded;
    };

    $scope.isClosedFolder = function (item) {
        return $scope.isFolder(item) && !item.expanded;
    };


    // -- Private / Helper functions --
    function handleFolderClick(folder) {
        // Toggle folder state
        folder.expanded = !folder.expanded;
        if (folder.expanded) {
            // Collapse the expanded folders except the one just being expanded
            collapseAllExcept(folder);

            // Populate current folder
            $scope.assetService.getChildren(folder, function (children) {
                folder.children = children;
                $scope.$apply();
            });
        }
    }

    function collapseAllExcept(givenFolder) {
        var rootFolders = $scope.$root.$$childHead.item.children;
        for (var index in rootFolders) {
            // don't collapse if it is current folder or an ancestor
            var rootFolder = rootFolders[index];
            if (rootFolder == givenFolder || isAncestor(rootFolder, givenFolder)) continue;

            // all other folders may be collapsed at the root level
            rootFolder.expanded = false;
        }
    }

    function isAncestor(ancestor, descendant) {
        if (!ancestor || !ancestor.children || !ancestor.children.length) return false;
        for (var index in ancestor.children) {
            var child = ancestor.children[index];
            if (child == descendant || isAncestor(child, descendant)) return true;
        }

        // no match found
        return false;
    }
}

var continuum = continuum || angular.module("Continuum", []);
assetLibController.$inject = ["$scope", "assetService"];
continuum.controller("AssetLibController", assetLibController);
