var continuum = continuum || angular.module("Continuum", []);
continuum.AssetService = (function ($module) {
    var waitTime = 2000;
    function assetService() {
    };

    assetService.prototype.getRootFolders = function (callback) {
        this.getChildren(null, callback);
    };

    assetService.prototype.getChildren = function (folder, callback) {
        var children = [{ name: "Cras justo odio", type: "folder" },
            { name: "Dapibus ac facilisis in", type: "folder" },
            { name: "Morbi leo risus", type: "folder" },
            { name: "Porta ac consectetur ac", type: "folder" }];
        if (folder != null) {
            children.push({ name: "Vestibulum at eros", type: "package" });
        }
        delay(callback, children);
    };

    var delay = function (callback, params) {
        window.setTimeout(function () {
            callback.call(this, params);
        }, waitTime);
    };

    return assetService;
}(continuum));