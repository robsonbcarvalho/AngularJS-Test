/*
 * jQuery File Upload Plugin Angular JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global window, angular */

;(function () {
    'use strict';

    var url = 'https://upload.wistia.com?access_token=61c0c36d7ca64b644a1c0084713004a2bc5be312f6345a7e4b976e9fee69f8e4';

    angular.module('test', [
        'blueimp.fileupload'
    ])
        .config([
            '$httpProvider', 'fileUploadProvider',
            function ($httpProvider, fileUploadProvider) {
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                );
            }
        ])

        .controller('TestFileUploadController', [
            '$scope', '$http', '$filter', '$window',
            function ($scope, $http) {
                $scope.options = {
                    url: url,
                    autoUpload: true
                };

                $('#fileupload').bind('fileuploaddone', function (e, data) {
                    console.log(data.result.hashed_id);
                    $('#showVideo').html('<div id="video" style="display:inline-block; height:267px; width:150px" class="wistia_embed wistia_async_' + data.result.hashed_id + ' popover=true popoverAnimateThumbnail=true"></div>');
                })
            }
        ])
}());
