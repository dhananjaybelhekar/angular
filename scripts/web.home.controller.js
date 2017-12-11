'use strict';
angular.module('web')
    .controller('web.home.controller', ['$scope', '$location', '$dataService', '$sce', '$http', 'FeedService', '$rootScope', '$stateParams', '$state', function($scope, $location, $dataService, $sce, $http, FeedService, $rootScope, $stateParams, $state) {
        console.log("123");
        $scope.direcoryName = $rootScope.currentDirectory.name;
        //$scope.direcoryName=localStorage.currentDirectory;
        if ($scope.direcoryName == 'OCD') {
            $scope.feedSrc = 'https://cnsblog.wordpress.com/feed/';
        } else if ($scope.direcoryName == 'OMD') {
            $scope.feedSrc = 'http://www.museumsassociation.org/rss/news';
        }

        if ($scope.feedSrc) {

            FeedService.parseFeed($scope.feedSrc).then(function(res) {
                var data = res.data.responseData.feed.entries;
                if ($scope.direcoryName == 'OCD') {
                    for (var i = 0; i < data.length; i++) {
                        var publishDate = new Date(data[i].publishedDate);
                        data[i].publishDate = publishDate;
                    }
                }
                $scope.feeds = data;
            });
        }
        // $("html, body").animate({ scrollTop: 0 }, 200);
        //         if ($state.toParams && $state.toParams.navigateTo && $state.toParams.navigateTo != '') setTimeout(function() {
        //             $('html, body').stop().animate({
        //                 scrollTop: (($($state.toParams.navigateTo).offset().top)- 50 )
        //             }, 1500, 'easeInOutExpo');
        //         }, 200);

        $dataService.get('web-data?pageName=Home',
            function(data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].backgroudType == "image") {
                            data[i].backgroudStyle = { 'background-image': 'url(assets/' + $scope.direcoryName + '/' + data[i].background + ')' };
                        } else if (data[i].backgroudType == "color") {
                            data[i].backgroudStyle = { 'background-color': data[i].background };
                        }
                    }
                    $scope.sections = data;
                }
            },
            function(error) {
                //console.log(error)
            })

        $dataService.get('customer-feedback?showHome=true',
            function(data) {
                if (data != null) {
                    $scope.customerFeedbacks = data;
                }
            },
            function(error) {
                //console.log(error)
            })

        $dataService.get('products-services/getProductCategoryHome?showHome=true',
            function(data) {
                if (data != null) {
                    $scope.productCategoryHome = data;
                }
            },
            function(error) {
                //console.log(error)
            })

        $scope.addAdvertiseInquiry = { "directoryId": $rootScope.currentDirectory.directoryId, "direcoryName": $scope.direcoryName, "requestType": "Advertise Inquiry", "details": "", "email": "", "name": { "first": "" }, "subject": "" };
        $scope.ClickAdvertiseInquiry = function() {
            $dataService.post('subscriber/web-request', $scope.addAdvertiseInquiry,
                function(data) {
                    data = data.data;
                    if (data != null) {
                        $scope.addAdvertiseInquiry = { "directoryId": $rootScope.currentDirectory.directoryId, "direcoryName": $scope.direcoryName, "requestType": "Advertise Inquiry", "details": "", "email": "", "name": { "first": "" }, "subject": "" };

                        //$scope.addAdvertiseInquiryMsg = "Advertise Inquiry Sent  Successfully!";
                        showMessages([{
                            type: 'success',
                            message: 'Inquiry Sent Successfully!',
                            header: 'Advertise Inquiry'
                        }]);
                    }
                },
                function(error) {
                    $scope.addAdvertiseInquiry = { "directoryId": $rootScope.currentDirectory.directoryId, "direcoryName": $scope.direcoryName, "requestType": "Advertise Inquiry", "details": "", "email": "", "name": { "first": "" }, "subject": "" };
                    //$scope.addAdvertiseInquiryMsg = "Advertise Inquiry Not Sent  Successfully";
                    console.log('addAdvertiseInquiry', error)
                    showMessages([{
                        type: 'error',
                        message: 'Inquiry Not Sent  Successfully! ',
                        header: 'Advertise Inquiry'
                    }]);
                })
        };

        $scope.addOffers = {
            "directoryId": $rootScope.currentDirectory.directoryId,
            "direcoryName": $scope.direcoryName,
            "requestType": "Special Offers",
            "email": ""
        };
        $scope.ClickOffers = function() {

            $dataService.post('subscriber/web-request', $scope.addOffers,
                function(data) {
                    data = data.data;
                    if (data != null) {
                        $scope.addOffers = {
                            "directoryId": $rootScope.currentDirectory.directoryId,
                            "direcoryName": $scope.direcoryName,
                            "requestType": "Special Offers",
                            "email": ""
                        };
                        // $scope.addOffersMsg = "Email submitted successfully!";
                        showMessages([{
                            type: 'success',
                            message: 'Thank you for signing up. Please check your email for a 10% coupon to use on your next NRP Direct purchase.',
                            header: 'Email Submission'
                            // Email submitted successfully!
                        }]);
                    }
                },
                function(error) {
                    $scope.addOffers = {
                        "directoryId": $rootScope.currentDirectory.directoryId,
                        "direcoryName": $scope.direcoryName,
                        "requestType": "Special Offers",
                        "email": ""
                    };
                    // $scope.addOffersMsg = "Email has not been submitted successfully!";
                    console.log('addOffers', error)
                    showMessages([{
                        type: 'error',
                        message: 'Email not submitted successfully! ',
                        header: 'Email Submission'
                    }]);
                })
        };

    }])
