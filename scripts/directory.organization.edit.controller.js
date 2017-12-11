angular.module('directory.organization')
    .controller('DirectoryOrganizationEditController', [
        '$rootScope',
        '$localStorage',
        '$scope',
        '$state',
        '$uibModal',
        'Organization',
        'DirectoryOrganizationService',
        'ClassificationCode',
        'Section',
        'AddressType',
        'VendorType',
        'ListingType',
        'DirectoryRecordStatus',
        'DirectoryPensionReportInterval',
        'PrimaryMarket',
        'AdvanceBillType',
        'DioceseType',
        'DioProvince',
        'ParishStatus',
        'EthnicityType',
        'SchoolType',
        'ReligiousType',
        'GradeType',
        'Supplement',
        'OrganizationType',
        'DirectoryCityService',
        'DirectoryStateService',
        'DirectoryCountyService',
        'DTOptionsBuilder',
        '$resource',
        function($rootScope, $localStorage, $scope, $state, $uibModal, Organization, DirectoryOrganizationService, ClassificationCode, Section, AddressType, VendorType, ListingType, DirectoryRecordStatus, DirectoryPensionReportInterval, PrimaryMarket, AdvanceBillType, DioceseType, DioProvince, ParishStatus, EthnicityType, SchoolType, ReligiousType, GradeType, Supplement, OrganizationType, DirectoryCityService, DirectoryStateService, DirectoryCountyService, DTOptionsBuilder, $resource) {
            var pname = '';

            $scope.treeToggle = 1;
            $scope.treeStore = function(data) {
                delete data.children;
                $rootScope.parantTreeData = data;
                $state.go("portal.directory.organization.add.general");
            };
            /*tree structor start*/
            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

            var x3 = $resource(API_PATH + "/organization/tree", {}, { 'Data': { method: 'POST', isArray: true } });
            $scope._id = Organization.data._id;
            if (Organization.data.root != undefined)
                $scope.treeId = Organization.data.root;
            else
                $scope.treeId = Organization.data._id;
            $scope.x3unflatten = function(nodes, pid) {
                    nodes = nodes.map(function(d) {
                        d.id = d._id;
                        return d;
                    });
                    var map = {},
                        _node, roots = [];
                    for (var i = 0; i < nodes.length; i += 1) {
                        _node = nodes[i];
                        _node.children = [];
                        map[_node.id] = i;
                        if (_node.parentId !== pid) {
                            _node.children = [];
                            nodes[map[_node.parentId]].children.push(_node);
                        } else { roots.push(_node); }
                    }
                    return roots;
                }
                // "name": { "$ne": null },
            x3.Data({
                    "directoryId": { "_eval": "Id", "value": "57189cd924d8bc65f4123bc3" },
                    "root": { "_eval": "Id", "value": $scope.treeId },
                    "status": { "_eval": "Id", "value": "57283b4214dde6a43b46a7bb" }
                }).$promise
                .then(function(resp) {
                    /*20170523*/
                    $scope.treeData = angular.copy(resp);
                    $scope.td = angular.copy(resp);
                    if (Organization.data.parentId != null)
                        var dfilter = _.filter($scope.td, { _id: Organization.data._id });
                    else
                        var dfilter = _.filter($scope.td, { parentId: null });

                    for (var i = 0; i < dfilter.length; i++) {
                        dfilter = angular.copy(dfilter.concat(_.filter($scope.td, { parentId: dfilter[i]._id })));
                    }
                    if (Organization.data.parentId != null) {
                        dfilter.unshift({
                            name: Organization.data.parentId.name,
                            org_id: Organization.data.parentId.org_id,
                            parentId: Organization.data.parentId.parentId,
                            sequenceNo: Organization.data.parentId.sequenceNo,
                            root: Organization.data.parentId.root,
                            _id: Organization.data.parentId._id
                        })
                        $scope.t = $scope.x3unflatten(angular.copy(dfilter), Organization.data.parentId.parentId);
                        console.log($scope.t)
                    } else
                        $scope.t = $scope.x3unflatten(angular.copy(dfilter), null);
                    // if(Organization.data.parentId!=null)
                    //         var dfilter=_.filter($scope.td,{_id:Organization.data.parentId._id});
                    // else
                    //         var dfilter=_.filter($scope.td,{parentId:null});
                    // for(var i=0;i<dfilter.length;i++)
                    // {
                    //             dfilter=angular.copy(dfilter.concat(_.filter($scope.td,{parentId:dfilter[i]._id})));
                    // }
                    // if(Organization.data.parentId!=null)
                    //    $scope.t= $scope.x3unflatten(angular.copy(dfilter),Organization.data.parentId.parentId);
                    // else
                    //     $scope.t= $scope.x3unflatten(angular.copy(dfilter),null);

                    //$('html, body').animate({scrollTop: $("#"+treeId).offset().top}, 2000);

                });
            /*tree structor end*/

            $scope.statisticstype = [];
            if (localStorage.pageName) {
                delete localStorage.pageName;
                pname = 'directory.organization.advanceSearch';
            } else {
                pname = 'directory.organization.list';
            }
            $scope.organization = Organization.data;
            $scope.sequenceNoFlag = false;
            $scope.$watch('organization.sequenceNo', function(nval, oval) {
                if (nval != oval)
                    $scope.sequenceNoFlag = true;
            }, true);
            var x = $resource(API_PATH + '/directory/statistics-type', {}, { qr: { method: "GET", isArray: true } });
            x.qr().$promise.then(function(resp) {
                if (($scope.organization.classificationCodeName == "US Diocese") || ($scope.organization.classificationCodeName == "World Diocese") || ($scope.organization.classificationCodeName == "Statistics")) {
                    $scope.statisticstype = resp;
                    for (var i = 0; i < resp.length; i++) {
                        if (resp[i].level == "D") {
                            if (_.find($scope.organization.statistic, { 'statisticType': { '_id': resp[i]._id } }) == undefined) {
                                $scope.organization.statistic.push({ statisticCategory: "DIO STATISTICS", statisticType: resp[i], statisticTypeName: resp[i].codeValue });
                                //$scope.organization.statistic.push({ statisticCategory: "DIO STATISTICS", statisticType: resp[i], supplement: resp[i].supplement });
                            }
                        }
                    }
                }
            });
            $scope.comma = function(data) {

                if (data.toString().length > 3) {
                    var str = (data / 1000).toString();
                    return str.replace('.', ',');
                } else {
                    return data;
                }

            }
            $scope.addsupplement = function(data) {
                console.log("STAT FLG :" + data);

            }

            $scope.rowhilight = function(data) {
                console.log(data);
                $scope.selected = data;
            }
            $scope.dshowData = function(data) {

                    var tempPerson = data;
                    if (tempPerson.newFlag) {
                        return true;
                    }
                    for (var j = 0; j < tempPerson.assignment.length; j++) {
                        if ((tempPerson.assignment[j].status != null) && (tempPerson.assignment[j].status != undefined) && (tempPerson.assignment[j].orgId != null)) {
                            if ((tempPerson.assignment[j].status.codeValue === 'Active') && (tempPerson.assignment[j].orgId._id === $scope.organization._id))
                                return true;
                        }
                    }
                }
                // $scope.dshowData = function(data) {
                //     var tempPerson = data;
                //     if (tempPerson.newFlag) {
                //         return true;
                //     }
                //     if (tempPerson.assignment.length == 0)
                //         return true;
                //     for (var j = 0; j < tempPerson.assignment.length; j++) {
                //         if ((tempPerson.assignment[j].status.codeValue == 'Active') && (tempPerson.assignment[j].orgId._id == $scope.organization._id))
                //             return true;
                //     }
                // }
            $scope.editStateDisable = true;
            $scope.classficationCodeEditDisable = true;
            $scope.ethnicityText1Active = true;
            $scope.ethnicityText2Active = true;
            if ($state.current.name == 'portal.directory.organization.edit.general') {
                $scope.editState = false;
            };
            $rootScope.page = {
                name: $localStorage['DMS-DIRECTORY'].description + ': Modify Record',
                actions: {
                    back: {
                        object: pname,
                        allowed: function() {
                            return $rootScope.isActionPermitted(this.object);
                        }
                    },
                    treeview: {
                        object: 'directory.organization.advanceSearch',
                        allowed: function() {
                            return $rootScope.isActionPermitted(this.object);
                        }
                    },
                    submit: {
                        ngClick: function() {
                            if (!$rootScope.validFlagEdit) {
                                var modalInstance = $uibModal.open({
                                    backdrop: 'static',
                                    //size: 'lg',
                                    animation: true,
                                    templateUrl: '/views/directory.organization.dupilcateRecordConfirmation.tpl.html',
                                    //$scope.modify();
                                    controller: [
                                        '$scope',
                                        '$state',
                                        '$uibModalInstance',
                                        function($modalScope, $state, $uibModalInstance) {
                                            $modalScope.modify = function() {
                                                $scope.modify();
                                                $uibModalInstance.close();
                                                console.log(" STAT VAL :" + $scope.statVal);
                                            }
                                            $modalScope.cancel = function() {
                                                $uibModalInstance.dismiss('cancel');
                                            };
                                        }
                                    ]
                                })
                            } else {
                                $scope.modify();
                            }

                        },
                        label: 'Modify',
                        ngDisabled: function() {
                            if ($rootScope.currentDirectory.description == "Official Catholic Directory") {
                                var flag = !($scope.loading);
                                //flag = flag && $scope.organization.name && $scope.organization.name != '';
                                return !flag
                            } else {
                                var flag = !($scope.loading);
                                flag = flag && $scope.organization.name && $scope.organization.name != '';
                                return !flag;
                            }
                        }
                    },
                    send: {
                        object: 'directory.organization.sendForApproval',
                        allowed: function() {
                            return $rootScope.isActionPermitted(this.object);
                        },
                        ngClick: function() {
                            if (!$rootScope.validFlagEdit) {
                                var modalInstance = $uibModal.open({
                                    backdrop: 'static',
                                    //size: 'lg',
                                    animation: true,
                                    templateUrl: '/views/directory.organization.dupilcateRecordConfirmation.tpl.html',
                                    //$scope.modify();
                                    controller: [
                                        '$scope',
                                        '$state',
                                        '$uibModalInstance',
                                        function($modalScope, $state, $uibModalInstance) {
                                            $modalScope.modify = function() {
                                                $scope.modifyAndSendForApproval();
                                                $uibModalInstance.close();
                                            }
                                            $modalScope.cancel = function() {
                                                $uibModalInstance.dismiss('cancel');
                                            };
                                        }
                                    ]
                                })
                            } else {
                                $scope.modifyAndSendForApproval();
                            }

                        },
                        label: 'Modify & Send for Approval',
                        ngDisabled: function() {
                            if ($rootScope.currentDirectory.description == "Official Catholic Directory") {
                                var flag = !($scope.loading);
                                //flag = flag && $scope.organization.name && $scope.organization.name != '';
                                return !flag
                            } else {
                                var flag = !($scope.loading);
                                flag = flag && $scope.organization.name && $scope.organization.name != '';
                                return !flag;
                            }
                        }
                    }
                }
            };

            /*   for(var i=0;i<$scope.statisticstype.length;i++)
            {
                 if($scope.organization.statisticType._id==$scope.statisticstype._id)
                var obj={
                     _id:$scope.statisticstype[i]._id,
                     codeTypeId:$scope.statisticstype[i].codeTypeId,
                     codeValue:$scope.statisticstype[i].codeValue,
                     description:$scope.statisticstype[i].description,
                     level:$scope.statisticstype[i].level,
                     section1:$scope.statisticstype[i].section1,
                     sequenceNo:$scope.statisticstype[i].sequenceNo,
                     statisticsPrefix:$scope.statisticstype[i].statisticsPrefix,
                     section2:$scope.statisticstype[i].section2,
                     generalSummarydescr:$scope.statisticstype[i].generalSummarydescr,
                     generalSummarySequenceNo:$scope.statisticstype[i].generalSummarySequenceNo,
                     active:$scope.statisticstype[i].active,
                     deleted:$scope.statisticstype[i].deleted,
                     created=[]:$scope.statisticstype[i].created
                };
                $scope.organization.statistic.push(obj);
            }
*/

            $scope.organization._oldOrgRecord = getObjectData(Organization.data);

            // For OCD Classification Validation
            $scope.clearOCDDataAsPerClassificationCode = function($item) {
                $scope.organization = clearOCDDataAsPerClassificationCode($scope.organization);
                $scope.organization.classificationCodeName = $item.codeValue;
            };
            OCDClassificationCodeCache.cacheCurrentValues($scope.organization);

            $scope.classificationCodeArray = ClassificationCode;
            $scope.recordStatusArray = DirectoryRecordStatus;
            $scope.pensionReportIntervalArray = DirectoryPensionReportInterval;
            $scope.sectionArray = Section;
            $scope.listingTypeArray = ListingType;
            $scope.primaryMarketArray = PrimaryMarket;
            $scope.advanceBillTypeArray = AdvanceBillType;
            //for OCD
            $scope.dioceseTypeArray = DioceseType;
            $scope.dioProvinceArray = DioProvince;
            $scope.parishStatusArray = ParishStatus;
            $scope.ethnicityTypeArray = EthnicityType;
            $scope.schoolTypeArray = SchoolType;
            $scope.religiousTypeArray = ReligiousType;
            $scope.gradeTypeArray = GradeType;
            $scope.supplimentTypeArray = Supplement;
            $scope.organizationTypeArray = OrganizationType;
            $scope.loading = false;
            $scope.validate = function() {
                showMessages([{
                    type: 'success',
                    message: 'Information validated and saved!',
                    header: 'Add new Record'
                }]);
                $scope.addForm.$setUntouched();
            };
            $scope.modify = function() {
                /*20170523*/
                var changeRoot = $resource(API_PATH + "/ocd_tree/seqUpdate", {}, { 'Data': { method: 'POST' } });

                if ($scope.sequenceNoFlag == true) {
                    $scope.parentRootTree = _.filter($scope.parentRootTree, function(data) {

                        if (data.sequenceNo >= $scope.organization.sequenceNo) {
                            data.sequenceNo = data.sequenceNo + 1;
                            return data;
                        }
                    })
                    changeRoot.Data($scope.parentRootTree).$promise.then(function(resp) {
                        console.log(resp);
                    });
                }


                if (($scope.sequenceNoFlag) && ($scope.subRootTree == undefined)) {
                    if ($scope.organization.parentId != null) {
                        var dfilter = _.filter($scope.treeData, { parentId: $scope.organization.parentId._id });
                    } else {
                        var dfilter = _.filter($scope.treeData, { parentId: $scope.organization._id });
                    }

                    // dfilter = _.sortBy(dfilter, [function(o) { ifo.sequenceNo; }]);
                    dfilter = _.filter(dfilter, function(data) {

                        if (data.sequenceNo >= $scope.organization.sequenceNo) {
                            data.sequenceNo = data.sequenceNo + 1;
                            return data;
                        }
                    })

                    changeRoot.Data(dfilter).$promise.then(function(resp) {
                        console.log(resp);
                    });

                }

                if (($scope.subRootTree != undefined) && ($scope.sequenceNoFlag == false)) {
                    changeRoot.Data($scope.subRootTree).$promise.then(function(resp) {
                        console.log(resp);
                    });
                }
                if ($scope.subRootTree)
                    if (($scope.subRootTree.length > 0) && ($scope.sequenceNoFlag == true)) {
                        // for(var i=0;i<$scope.subRootTree.length;i++)
                        // {
                        //         if(($scope.subRootTree[i].parentId == $scope.organization.parentId._id) && ($scope.subRootTree[i].sequenceNo >= $scope.organization.sequenceNo))
                        //         {
                        //                 $scope.subRootTree[i].sequenceNo+=1;
                        //         }
                        // }
                        changeRoot.Data($scope.subRootTree).$promise.then(function(resp) {
                            console.log(resp);
                        });
                    }
                $scope.loading = true;
                var newOrg = new DirectoryOrganizationService($scope.organization);
                newOrg.isAADOrg = (/AAD/i).test($localStorage['DMS-DIRECTORY'].codeValue);

                if (newOrg.isAADOrg) {
                    if (newOrg.attendance === undefined) {
                        newOrg.orgIdNumber = isNaN(parseInt(newOrg.org_id)) ? null : parseInt(newOrg.org_id);
                        delete newOrg.versions;
                        newOrg.directoryId = $localStorage['DMS-DIRECTORY']._id;
                        newOrg.$update(function(organization) {
                            showMessages([{
                                header: 'Record Modified',
                                message: 'Record modified successfully!',
                                type: 'success'
                            }]);
                            $scope.loading = false;
                            $state.go('portal.directory.organization.list');
                        }, function(err) {
                            showMessages([{
                                header: 'New Record',
                                message: 'Record could not be saved successfully!',
                                type: 'error'
                            }]);
                            $scope.loading = false;
                        });
                    } else {
                        if (newOrg.attendance.count != null)
                            newOrg.attendance.countNumber = parseFloat(newOrg.attendance.count.replace(',', ''));
                        newOrg.orgIdNumber = isNaN(parseInt(newOrg.org_id)) ? null : parseInt(newOrg.org_id);
                        delete newOrg.versions;
                        newOrg.directoryId = $localStorage['DMS-DIRECTORY']._id;
                        newOrg.$update(function(organization) {
                            showMessages([{
                                header: 'Record Modified',
                                message: 'Record modified successfully!',
                                type: 'success'
                            }]);
                            $scope.loading = false;
                            $state.go('portal.directory.organization.list');
                        }, function(err) {
                            showMessages([{
                                header: 'New Record',
                                message: 'Record could not be saved successfully!',
                                type: 'error'
                            }]);
                            $scope.loading = false;
                        });
                    }
                } else {
                    if ($localStorage['DMS-DIRECTORY']._id == "57189cd924d8bc65f4123bc3") {
                        console.log("$localStorage['DMS-DIRECTORY']");


                    }
                    if (newOrg.totalAdvertisingBudget != undefined)
                        newOrg.totalAdvBudgetAmount = parseFloat(newOrg.totalAdvertisingBudget.replace(',', ''));
                    newOrg.orgIdNumber = isNaN(parseInt(newOrg.org_id)) ? null : parseInt(newOrg.org_id);
                    delete newOrg.versions;
                    newOrg.directoryId = $localStorage['DMS-DIRECTORY']._id;
                    newOrg.$update(function(organization) {
                        showMessages([{
                            header: 'Record Modified',
                            message: 'Record modified successfully!',
                            type: 'success'
                        }]);
                        $scope.loading = false;
                        $state.go('portal.directory.organization.list');
                    }, function(err) {
                        showMessages([{
                            header: 'New Record',
                            message: 'Record could not be saved successfully!',
                            type: 'error'
                        }]);
                        $scope.loading = false;
                    });
                }
            };
            $scope.modifyAndSendForApproval = function() {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/directory.organization.save-and-send-for-approval.tpl.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',

                        function($modalScope, $state, $uibModalInstance) {
                            // $scope.organizationRecordStatusArray = OrganizationRecordStatus;
                            $modalScope.organization = $scope.organization;
                            $modalScope.editFlag = $modalScope.organization._id || false;
                            $modalScope.cancel = function() {
                                $scope.organization.currentVersion = {};
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.save = function() {
                                $uibModalInstance.close($modalScope.version);
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(version) {
                    $scope.loading = true;
                    var newOrg = new DirectoryOrganizationService($scope.organization);
                    newOrg.isAADOrg = (/AAD/i).test($localStorage['DMS-DIRECTORY'].codeValue);
                    if (newOrg.isAADOrg) {
                        if (newOrg.attendance === undefined) {
                            newOrg.orgIdNumber = isNaN(parseInt(newOrg.org_id)) ? null : parseInt(newOrg.org_id);
                            newOrg.directoryId = $localStorage['DMS-DIRECTORY']._id;
                            delete newOrg.versions;
                            newOrg.$modifyAndSendForApproval(function(organization) {
                                showMessages([{
                                    header: 'Record Modified',
                                    message: 'Record modified and sent for approval successfully!',
                                    type: 'success'
                                }]);
                                $scope.loading = false;
                                $state.go('portal.directory.organization.list');
                            }, function(err) {
                                showMessages([{
                                    header: 'New Record',
                                    message: 'Record could not be saved and sent for approval successfully!',
                                    type: 'error'
                                }]);
                                $scope.loading = false;
                            });
                        } else {
                            if (newOrg.attendance.count != null)
                                newOrg.attendance.countNumber = parseFloat(newOrg.attendance.count.replace(',', ''));
                            newOrg.orgIdNumber = isNaN(parseInt(newOrg.org_id)) ? null : parseInt(newOrg.org_id);
                            newOrg.directoryId = $localStorage['DMS-DIRECTORY']._id;
                            delete newOrg.versions;
                            newOrg.$modifyAndSendForApproval(function(organization) {
                                showMessages([{
                                    header: 'Record Modified',
                                    message: 'Record modified and sent for approval successfully!',
                                    type: 'success'
                                }]);
                                $scope.loading = false;
                                $state.go('portal.directory.organization.list');
                            }, function(err) {
                                showMessages([{
                                    header: 'New Record',
                                    message: 'Record could not be saved and sent for approval successfully!',
                                    type: 'error'
                                }]);
                                $scope.loading = false;
                            });
                        }
                    } else {
                        if (newOrg.totalAdvertisingBudget != undefined)
                            newOrg.totalAdvBudgetAmount = parseFloat(newOrg.totalAdvertisingBudget.replace(',', ''));
                        newOrg.orgIdNumber = isNaN(parseInt(newOrg.org_id)) ? null : parseInt(newOrg.org_id);
                        newOrg.directoryId = $localStorage['DMS-DIRECTORY']._id;
                        delete newOrg.versions;
                        newOrg.$modifyAndSendForApproval(function(organization) {
                            showMessages([{
                                header: 'Record Modified',
                                message: 'Record modified and sent for approval successfully!',
                                type: 'success'
                            }]);
                            $scope.loading = false;
                            $state.go('portal.directory.organization.list');
                        }, function(err) {
                            showMessages([{
                                header: 'New Record',
                                message: 'Record could not be saved and sent for approval successfully!',
                                type: 'error'
                            }]);
                            $scope.loading = false;
                        });
                    }
                });
            };

            //for OCD ethnicity Validation
            $scope.changeethnicityType1 = function(ethnicityType1) {
                $scope.organization.parishShrine.ethnicityType1Name = ethnicityType1.codeValue;
                if (ethnicityType1.codeValue != "Other") {
                    $scope.organization.parishShrine.ethnicityText1 = "";
                    $scope.ethnicityText1Active = true;
                }
                if (ethnicityType1.codeValue == "Other") {
                    $scope.ethnicityText1Active = false;
                }
            }
            $scope.changeethnicityType2 = function(ethnicityType2) {
                $scope.organization.parishShrine.ethnicityType2Name = ethnicityType2.codeValue;
                if (ethnicityType2.codeValue != "Other") {
                    $scope.organization.parishShrine.ethnicityText2 = "";
                    $scope.ethnicityText2Active = true;
                }
                if (ethnicityType2.codeValue == "Other") {
                    $scope.ethnicityText2Active = false;
                }
            }

            // -------------
            // Former Names
            // -------------
            $scope.addFormerName = function(index, formerName) {

                $scope.organization.formerNames.push(formerName);

            };
            $scope.editFormerName = function(index, formerName) {
                $scope.organization.formerNames[index] = formerName;
            };
            $scope.removeFormerName = function(index) {

                $scope.organization.formerNames[index].deleted = true;

            };
            $scope.openFormerNamesPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.formerNames.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.formerName = $modalScope.editFlag ? getObjectData($scope.organization.formerNames[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.formerName
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.formerName
                                });
                            };
                            $modalScope.formerName.startDate = $modalScope.formerName.startDate ? new Date($modalScope.formerName.startDate) : '';
                            $modalScope.formerName.endDate = $modalScope.formerName.endDate ? new Date($modalScope.formerName.endDate) : '';
                            $modalScope.startDateOptions = {
                                minDate: new Date($modalScope.formerName.startDate),
                                maxDate: new Date($modalScope.formerName.endDate)
                            };
                            $modalScope.endDateOptions = {
                                minDate: new Date($modalScope.formerName.startDate),
                                maxDate: new Date($modalScope.formerName.endDate)
                            };
                            $modalScope.$watch('formerName.endDate', function(newVal) {
                                $modalScope.startDateOptions.maxDate = new Date(newVal || '');
                                $modalScope.endDateOptions.maxDate = new Date(newVal || '');
                            });
                            $modalScope.$watch('formerName.startDate', function(newVal) {
                                $modalScope.startDateOptions.minDate = new Date(newVal || '');
                                $modalScope.endDateOptions.minDate = new Date(newVal || '');
                            });
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.formerNames) $scope.organization.formerNames = [];
                    $scope[op.action + 'FormerName'](index, op.data);
                });
            };

            // -------------
            // Address
            // -------------
            // $scope.addressTypes = [];
            // for (var i = AddressType.length - 1; i >= 0; i--) {
            //     $scope.addressTypes[AddressType[i]._id] = AddressType[i].codeValue + ' (' + AddressType[i].description + ')';
            // }
            $scope.addAddress = function(index, address) {
                //$scope.organization.address.push(address);
                var temp = angular.copy(address);
                if(temp.stateName != null && temp.stateName!= undefined)
                temp.stateName = temp.stateName.split('(')[0].trim();
                $scope.organization.address.push(temp);

            };
            $scope.editAddress = function(index, address) {
                var temp = angular.copy(address);
                if(temp.stateName != null && temp.stateName!= undefined)
                temp.stateName = temp.stateName.split('(')[0].trim();
                $scope.organization.address[index] = temp;
            };
            $scope.removeAddress = function(index) {

                $scope.organization.address.splice(index, 1);
            };
            $scope.openAddressPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.address.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DirectoryCountryService',
                        'DirectoryCountyService',
                        'DirectoryStateService',
                        'DirectoryCityService',
                        function($modalScope, $state, $uibModalInstance, DirectoryCountryService, DirectoryCountyService, DirectoryStateService, DirectoryCityService) {
                            $modalScope.addressTypeArray = AddressType;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.address = $modalScope.editFlag ? getObjectData($scope.organization.address[index]) : {};
                            if ($modalScope.address && $modalScope.address.state && $modalScope.address.state.description)
                                $modalScope.address.stateName += ' (' + $modalScope.address.state.description + ')';
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.address
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.address
                                });
                            };
                            $modalScope.getAddressCities = function(val) {
                                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCityService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCityTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.address.city = $model;
                                $modalScope.address.cityName = $model.codeValue;
                                $modalScope.address.state = $model.parentId;
                                //$modalScope.address.stateName = $model.parentId.codeValue;
                                $modalScope.address.stateName = $model.parentId.codeValue + " (" + $model.parentId.description + ")";
                                $modalScope.address.stateAbbreviation = $model.parentId.description;
                                $modalScope.address.country = $model.parentId.parentId;
                                $modalScope.address.countryName = $model.parentId.parentId.codeValue;
                            };
                            $modalScope.getAddressStates = function(val) {
                                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryStateService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressStateTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.address.state = $model;
                                //$modalScope.address.stateName = $model.codeValue;
                                $modalScope.address.stateName = $model.codeValue + " (" + $model.description + ")";
                                $modalScope.address.stateAbbreviation = $model.description;
                                $modalScope.address.country = $model.parentId;
                                $modalScope.address.countryName = $model.parentId.codeValue;
                            };
                            $modalScope.getAddressCountries = function(val) {
                                $('[ng-show="noResultsCountry"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCountryService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCountry"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCountryTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.address.country = $model;
                                $modalScope.address.countryName = $model.codeValue;
                            };
                            $modalScope.getAddressCountys = function(val) {
                                $('[ng-show="noResultsCounty"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCountyService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCounty"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCountyTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.address.county = $model;
                                $modalScope.address.countyName = $model.codeValue;
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.address) $scope.organization.address = [];
                    $scope[op.action + 'Address'](index, op.data);
                });
            };
            //for OCD Placement City
            $scope.getAddressCities = function(val) {
                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryCityService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
            };
            $scope.formatPlacementTypeAhead = function($model) {
                return $model ? $model : "";
            };
            $scope.selectPlacementTypeAhead = function($item) {
                $scope.organization.placementCity = $item.codeValue;
            };
            //for OCD Header state
            $scope.getheaderStates = function(val) {
                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryStateService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
            };
            $scope.formatStateTypeAhead = function($model) {
                return $model ? $model : "";
            };
            $scope.selectStateTypeAhead = function($item) {
                $scope.organization.header.state = $item.codeValue;
            };

            //for OCD header County
            $scope.getHeaderCountys = function(val) {
                $('[ng-show="noResultsCounty"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryCountyService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsCounty"]').html('Enter minimum 3 characters');
            };
            $scope.formatHeaderTypeAhead = function($model) {
                return $model ? $model : "";
            };
            $scope.selectHeaderCountyTypeAhead = function($item) {
                $scope.organization.header.county = $item.codeValue;
            };


            // -------------
            // Listing Type
            // -------------chapterSpecification
            $scope.addListingType = function(index, listingType) {
                $scope.organization.listingType.push(listingType);
            };
            $scope.editListingType = function(index, listingType) {
                $scope.organization.listingType[index] = listingType;
            };
            $scope.removeListingType = function(index) {
                $scope.organization.listingType.splice(index, 1);
            };
            $scope.openListingTypePopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.listingType.html',
                    resolve: {
                        ListingType: [
                            'DirectoryListingTypeService',
                            '$localStorage',
                            function(DirectoryListingTypeService, $localStorage) {
                                return DirectoryListingTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'ListingType',
                        /*  'DirectorySpecificationTypeService',*/
                        function($modalScope, $state, $uibModalInstance, ListingType) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.listingTypeArray = ListingType;
                            $modalScope.listingType = $modalScope.editFlag ? getObjectData($scope.organization.listingType[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $modalScope.listingType.listingName = $modalScope.listingType.listing.codeValue;
                                /*$modalScope.listingType.listing = $modalScope.listingType.listing._id;*/

                                /*  console.log($modalScope.listingType);*/

                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.listingType
                                });
                            };

                            $modalScope.update = function() {
                                $modalScope.listingType.listingName = $modalScope.listingType.listing.codeValue;
                                /* $modalScope.listingType.listing = $modalScope.listingType.listing._id;*/
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.listingType
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.listingType) $scope.organization.listingType = [];
                    $scope[op.action + 'ListingType'](index, op.data);
                });
            };

            //Listing For DMMP//
            $scope.addListingTypeDMMP = function(index, listingType) {
                $scope.organization.listingType.push(listingType);
            };
            $scope.editListingTypeDMMP = function(index, listingType) {
                $scope.organization.listingType[index] = listingType;
            };
            $scope.removeListingTypeDMMP = function(index) {
                $scope.organization.listingType.splice(index, 1);
            };
            $scope.openListingTypeDMMPPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.listingType.html',
                    resolve: {
                        ListingType: [
                            'DirectoryListingTypeService',
                            '$localStorage',
                            function(DirectoryListingTypeService, $localStorage) {
                                return DirectoryListingTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'ListingType',
                        'DirectoryDMMPSectionCodeService',
                        function($modalScope, $state, $uibModalInstance, ListingType, DirectoryDMMPSectionCodeService) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.listingTypeArray = ListingType;
                            $modalScope.listingType = $modalScope.editFlag ? getObjectData($scope.organization.listingType[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $modalScope.listingType.listingName = $modalScope.listingType.listing.codeValue;
                                if ($modalScope.listingType.listingSectionCode) $modalScope.listingType.listingSectionName = $modalScope.listingType.listingSectionCode.codeValue;
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.listingType
                                });
                            };
                            $modalScope.changeSectionType = function(listing, dontDelete) {
                                $modalScope.sectionCodeArray = [];
                                if (!dontDelete) {
                                    delete $modalScope.listingType.listingSectionCode;
                                    delete $modalScope.listingType.listingSectionName;
                                }
                                if (listing) {
                                    $modalScope.loading = true;
                                    DirectoryDMMPSectionCodeService.get({ parentId: listing._id }, function(sectionCodes) {
                                        $modalScope.sectionCodeArray = sectionCodes;
                                        $modalScope.loading = false;
                                    }, function(err) {
                                        showMessages([{
                                            header: 'Section Codes',
                                            message: 'Could not fetch Section Codes',
                                            type: 'error'
                                        }]);
                                        $modalScope.loading = false;
                                    });
                                }
                            };
                            if ($modalScope.listingType.listing) $modalScope.changeSectionType($modalScope.listingType.listing, true);
                            $modalScope.update = function() {
                                $modalScope.listingType.listingName = $modalScope.listingType.listing.codeValue;
                                if ($modalScope.listingType.listingSectionCode) $modalScope.listingType.listingSectionName = $modalScope.listingType.listingSectionCode.codeValue;
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.listingType
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.listingType) $scope.organization.listingType = [];
                    $scope[op.action + 'ListingType'](index, op.data);
                });
            };

            //for OCD Header state
            $scope.getheaderStates = function(val) {
                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryStateService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
            };
            $scope.formatStateTypeAhead = function($model) {
                return $model ? $model : "";
            };
            $scope.selectStateTypeAhead = function($item) {
                $scope.organization.header.state = $item.codeValue;
            };

            //for OCD header County
            $scope.getHeaderCountys = function(val) {
                $('[ng-show="noResultsCounty"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryCountyService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsCounty"]').html('Enter minimum 3 characters');
            };
            $scope.formatHeaderTypeAhead = function($model) {
                return $model ? $model : "";
            };
            $scope.selectHeaderCountyTypeAhead = function($item) {
                $scope.organization.header.county = $item.codeValue;
            };

            //Please do not uncomment this code
            // Last modified by Swapnil Sonawane
            //Date: 6/06/2016
            // -------------
            // Contact
            // -------------
            /*$scope.addContacts = function(index, contact) {
                $scope.organization.contact.push(contact);
            };
            $scope.editContacts = function(index, contact) {
                $scope.organization.contact[index] = contact;
            };
            $scope.removeContacts = function(index) {
                $scope.organization.contact.splice(index, 1);
            };
            $scope.openContactsPopup = function(index) {
                var modalInstance = $uibModal.open({
backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.contacts.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.contact = $modalScope.editFlag ? getObjectData($scope.organization.contact[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.contact
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.contact
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.contact) $scope.organization.contact = [];
                    $scope[op.action + 'Contacts'](index, op.data);
                });
            };*/

            // -------------
            // Key Personnel
            // -------------
            $scope.addKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel.push(personnel);
            };
            $scope.editKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel[index] = personnel;
            };
            $scope.removeKeyPersonnel = function(index) {
                if (!$scope.organization.removePersonnel) $scope.organization.removePersonnel = [];
                $scope.organization.removePersonnel.push($scope.organization.personnel[index]._id);
                $scope.organization.personnel.splice(index, 1);
            };
            $scope.showPersonnelName = function(personnel) {
                return [(personnel.name.prefix || ""), (personnel.name.first || ""), (personnel.name.middle || ""), (personnel.name.last || ""), (personnel.name.suffix || "")].join(' ');
            };
            $scope.openKeyPersonnelPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    size: 'lg',
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DirectoryKeyPersonnelTitleService',
                        function($modalScope, $state, $uibModalInstance, DirectoryKeyPersonnelTitleService) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.keyPersonnel = $modalScope.editFlag ? getObjectData($scope.organization.personnel[index]) : {};
                            if (!$modalScope.editFlag) $modalScope.keyPersonnel.active = true;
                            $modalScope.getKeyPersonnelTitles = function(val) {
                                $('[ng-show="noResultsTitle"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryKeyPersonnelTitleService.list({
                                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        }

                                    }).$promise;
                                } else $('[ng-show="noResultsTitle"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.formatKeypersonnelTypeAhead = function($model) {
                                return $model ? $model.codeValue : "";
                            };
                            $modalScope.selectKeypersonnelTypeAhead = function($item) {
                                $modalScope.keyPersonnel.titleMaster = $item;
                                $modalScope.keyPersonnel.titleMasterName = $item.codeName;
                            };
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.personnel) $scope.organization.personnel = [];
                    $scope[op.action + 'KeyPersonnel'](index, op.data);
                });
            };



            //KeyPersonnel For OCD
            $scope.addOCDKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                personnel.newFlag = true;
                $scope.organization.personnel.push(personnel);
            };
            $scope.editOCDKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel[index] = personnel;
            };
            $scope.removeOCDKeyPersonnel = function(index) {
                if (!$scope.organization.removePersonnel) $scope.organization.removePersonnel = [];
                $scope.organization.removePersonnel.push($scope.organization.personnel[index]._id);
                $scope.organization.personnel[index].deleted = true;
            };
            $scope.showOCDPersonnelName = function(personnel) {
                return [(personnel.name.prefix || ""), (personnel.name.first || ""), (personnel.name.middle || ""), (personnel.name.last || ""), (personnel.name.suffix || "")].join(' ');
            };
            $scope.openOCDKeyPersonnelPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    size: 'lg',
                    windowClass: 'full-window',
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.html',
                    resolve: {
                        PersonTypes: [
                            'DirectoryPersonTypeService',
                            function(DirectoryPersonTypeService) {

                                return DirectoryPersonTypeService.get().$promise;
                            }
                        ],
                        AddressType: [
                            'DirectoryAddressTypeService',
                            function(DirectoryAddressTypeService) {
                                return DirectoryAddressTypeService.get().$promise;
                            }
                        ],
                        DegreeType: [
                            'DirectoryDegreeTypeService',
                            function(DirectoryDegreeTypeService) {
                                return DirectoryDegreeTypeService.get().$promise;
                            }
                        ],
                        AssignmentType: [
                            'DirectoryAssignmentTypeService',
                            function(DirectoryAssignmentTypeService) {
                                return DirectoryAssignmentTypeService.get().$promise;
                            }
                        ],
                        ContactType: [
                            'DirectoryContactTypeService',
                            function(DirectoryContactTypeService) {
                                return DirectoryContactTypeService.get().$promise;
                            }
                        ],
                        DirectoryRecordStatus: [
                            'DirectoryRecordStatusService',
                            function(DirectoryRecordStatusService) {
                                return DirectoryRecordStatusService.get().$promise;
                            }
                        ],
                        AssignmentStatus: [
                            'DirectoryRecordStatusService',
                            function(DirectoryRecordStatusService) {
                                return DirectoryRecordStatusService.get().$promise;
                            }

                        ]

                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DirectoryKeyPersonnelTitleService',
                        'PersonTypes',
                        'AddressType',
                        'DegreeType',
                        'DirectoryPersonnelService',
                        'DirectoryCountryService',
                        'DirectoryCountyService',
                        'DirectoryStateService',
                        'DirectoryCityService',
                        'AssignmentType',
                        'ContactType',
                        'DirectoryRecordStatus',
                        'AssignmentStatus',
                        'DTOptionsBuilder',
                        'DTColumnBuilder',
                        '$resource',
                        '$compile',
                        function($modalScope, $state, $uibModalInstance, DirectoryKeyPersonnelTitleService, PersonTypes, AddressType, DegreeType, DirectoryPersonnelService, DirectoryCountryService, DirectoryCountyService, DirectoryStateService, DirectoryCityService, AssignmentType, ContactType, DirectoryRecordStatus, AssignmentStatus, DTOptionsBuilder, DTColumnBuilder, $resource, $compile) {

                            /* start */
                            $modalScope.bpersonnelQr = {
                                'PeopleId': { "field": "PeopleId", "type": "num", "regx": false, val: "" },
                                'title': { "field": "title", "type": "str", "regx": true, val: "" },
                                'namefirst': { "field": "name.first", "type": "str", "regx": true, val: "" },
                                'namelast': { "field": "name.last", "type": "str", "regx": true, val: "" },
                                'religiousOrderInitials': { "field": "religiousOrderInitials", "type": "str", "regx": true, val: "" },
                                'homeDiocese': { "field": "homeDiocese", "type": "str", "regx": true, val: "" }
                            };
                            /////////////////
                            $modalScope.oneAtATime = true;
                        $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.storeAssignArr=[];
                            $modalScope.storeAssignId=function(data,orgId){
                                if(((data.orgId._id==orgId) || (data.orgId==orgId) ) && (data.status.codeValue=='Active') && (!data.deleted) && (!data.oldFlag))
                                    {
                                        if($modalScope.storeAssignArr.indexOf(data.assignId) == -1)
                                                $modalScope.storeAssignArr.push(data.assignId);
                                        return true;
                                    }
                                    else return false;
                            }
                            $modalScope.checkAssignment=function(data){
                                    for(var i=0;i<$modalScope.storeAssignArr.length;i++)
                                    {
                                        if(data.assignId==$modalScope.storeAssignArr[i])
                                        {
                                            return true;
                                        }
                                    }
                            }
                            $modalScope.groups = [{ title: 'Dynamic Group Header - 1', content: 'Dynamic Group Body - 1' }, { title: 'Dynamic Group Header - 2', content: 'Dynamic Group Body - 2' }];
                            $modalScope.items = ['Item 1', 'Item 2', 'Item 3'];
                            $modalScope.addItem = function() {
                                var newItemNo = $scope.items.length + 1;
                                $modalScope.items.push('Item ' + newItemNo);
                            };
                            $modalScope.status = { isCustomHeaderOpen: false, isFirstOpen: false, isFirstDisabled: false };
                            /////////////////
                            $modalScope.insinit = {};
                            $modalScope.insinitSave = insinitSave;

                            function insinitSave(data) {
                                $modalScope.insinit = data;
                            }
                            $modalScope.bsearch = bsearch;
                            $modalScope.breset = breset;
                            $modalScope.getPersonnelExec = getPersonnelExec;
                            $modalScope.dtData = [];
                            $modalScope.tempShow = tempShow;
                            $modalScope.createdRow = createdRow;

                            function breset() {
                                $modalScope.bpersonnelQr = { 'PeopleId': { "field": "PeopleId", "type": "num", "regx": false, val: "" }, 'title': { "field": "title", "type": "str", "regx": true, val: "" }, 'namefirst': { "field": "name.first", "type": "str", "regx": true, val: "" }, 'namelast': { "field": "name.last", "type": "str", "regx": true, val: "" }, 'religiousOrderInitials': { "field": "religiousOrderInitials", "type": "str", "regx": true, val: "" }, 'homeDiocese': { "field": "homeDiocese", "type": "str", "regx": true, val: "" } };
                            }
                            $modalScope.personnelList = $resource(API_PATH + '/personnel/list', {}, { 'data': { method: 'POST', isArray: true } });

                            $modalScope.showDis = function(data) {
                                // console.log($modalScope.dtData);
                                // console.log("$modalScope.showDis",data);
                                //console.log("$modalScope.showDis",$modalScope.dtData[data]);

                                $modalScope.personnelList.data({ "directoryId": "57189cd924d8bc65f4123bc3", "active": true, "_id": data }).$promise.then(function(res) {
                                    $modalScope.keyPersonnel = res[0];

                                    if (($modalScope.keyPersonnel.address != undefined) || ($modalScope.keyPersonnel.address)) {
                                        for (var i = 0; i < $modalScope.keyPersonnel.address.length; i++) {
                                            $modalScope.keyPersonnel.address[i].oldFlag = true;
                                        }
                                    }
                                    if (($modalScope.keyPersonnel.degree != undefined) || ($modalScope.keyPersonnel.degree)) {
                                        for (var i = 0; i < $modalScope.keyPersonnel.degree.length; i++) {
                                            $modalScope.keyPersonnel.degree[i].oldFlag = true;
                                        }
                                    }
                                    if (($modalScope.keyPersonnel.ocdContact != undefined) || ($modalScope.keyPersonnel.ocdContact)) {
                                        for (var i = 0; i < $modalScope.keyPersonnel.ocdContact.length; i++) {
                                            $modalScope.keyPersonnel.ocdContact[i].oldFlag = true;
                                        }
                                    }
                                    if (($modalScope.keyPersonnel.notes != undefined) || ($modalScope.keyPersonnel.notes)) {
                                        for (var i = 0; i < $modalScope.keyPersonnel.notes.length; i++) {
                                            $modalScope.keyPersonnel.notes[i].oldFlag = true;
                                        }
                                    }
                                    if (($modalScope.keyPersonnel.assignment != undefined) || ($modalScope.keyPersonnel.assignment)) {
                                        for (var i = 0; i < $modalScope.keyPersonnel.assignment.length; i++) {
                                            $modalScope.keyPersonnel.assignment[i].oldFlag = true;
                                        }
                                    }

                                    // var keyPersonnel = res[0];
                                    // var per = {};

                                    // per.personType = keyPersonnel.personType;

                                    // per.PeopleId = keyPersonnel.PeopleId;

                                    // per.status = keyPersonnel.status;

                                    // per.title = keyPersonnel.title;

                                    // per.religiousOrderInitials = keyPersonnel.religiousOrderInitials;

                                    // per.retired = keyPersonnel.retired;

                                    // per.very = keyPersonnel.very;

                                    // per.homeDiocese = keyPersonnel.homeDiocese;

                                    // per.homeNation = keyPersonnel.homeDiocese;
                                    // if (keyPersonnel.ordination != undefined) {
                                    //     per.ordination = {}
                                    //     per.ordination.ordination_day = keyPersonnel.ordination.ordination_day;
                                    //     per.ordination.ordination_month = keyPersonnel.ordination.ordination_month;
                                    //     per.ordination.ordination_year = keyPersonnel.ordination.ordination_year;
                                    // }
                                    // if (keyPersonnel.died != undefined) {
                                    //     per.died = {};
                                    //     per.died.day = keyPersonnel.died.day;
                                    //     per.died.month = keyPersonnel.died.day;
                                    //     per.died.year = keyPersonnel.died.day;
                                    // }
                                    // if (keyPersonnel.name != undefined) {
                                    //     per.name = {}
                                    //     per.name.prefix = keyPersonnel.name.prefix;
                                    //     per.name.first = keyPersonnel.name.first;
                                    //     per.name.middle = keyPersonnel.name.middle;
                                    //     per.name.last = keyPersonnel.name.last;
                                    //     per.name.suffix = keyPersonnel.name.Suffix;
                                    // }





                                    // $modalScope.keyPersonnel = angular.copy(per);

                                    ///                $modalScope.newAssignment=res[0].assignment[0];
                                });
                                $modalScope.status.isFirstOpen = !$modalScope.status.isFirstOpen;
                                $("#DataTables_Table_0_wrapper").hide();
                                $modalScope.bpersonnelQr = { 'PeopleId': { "field": "PeopleId", "type": "num", "regx": false, val: "" }, 'title': { "field": "title", "type": "str", "regx": true, val: "" }, 'namefirst': { "field": "name.first", "type": "str", "regx": true, val: "" }, 'namelast': { "field": "name.last", "type": "str", "regx": true, val: "" }, 'religiousOrderInitials': { "field": "religiousOrderInitials", "type": "str", "regx": true, val: "" }, 'homeDiocese': { "field": "homeDiocese", "type": "str", "regx": true, val: "" } };
                            };


                            function createdRow(row, data, dataIndex) {
                                $compile(angular.element(row).contents())($modalScope);
                            }

                            function tempShow(data) {

                                console.log($modalScope.dtData);
                                console.log(data);

                            }

                            function getqr() {
                                var qr = {};
                                var arr = Object.keys($modalScope.bpersonnelQr);
                                for (var i = 0; i < arr.length; i++) {
                                    var key = arr[i],
                                        node = $modalScope.bpersonnelQr[key];
                                    if (node.val != undefined && node.val != "") {
                                        if (node.type == "num") {
                                            qr[node.field] = node.val;
                                        }
                                        if (node.type == "str") {
                                            qr[node.field] = { "_eval": "regexNoEsc", "value": '^' + node.val + '$' };
                                        }
                                    }

                                }
                                return qr;
                            }

                            function bsearch() {
                                $modalScope.getPersonnelExec(getqr());
                            }

                            function getPersonnelExec(query) {
                                $modalScope.dtData = {};
                                query.directoryId = { '_eval': 'Id', value: '57189cd924d8bc65f4123bc3' };
                                var getPersonnelRes = $resource(API_PATH + '/ocd_tree/getPersonnel', {}, {
                                    'data': {
                                        method: 'POST',
                                        transformRequest: function(data, headersGetter) {
                                            var qr = { "dt": data, "qr": query };
                                            return JSON.stringify(qr);
                                        }
                                    },
                                });
                                $modalScope.insinit.changeData(getPersonnelRes.data);
                                $modalScope.insinit.rerender();

                            }
                            var x = $resource(API_PATH + '/ocd_tree/getPersonnel', {}, {
                                'data': {
                                    method: 'POST',
                                    transformRequest: function(data, headersGetter) {
                                        var qr = {
                                            "dt": data,
                                            "qr": {
                                                directoryId: { '_eval': 'Id', value: '57189cd924d8bc65f4123bc3' }
                                            }
                                        };
                                        return JSON.stringify(qr);
                                    }
                                },
                            });

                            $modalScope.dtColumns = [
                                DTColumnBuilder
                                .newColumn('_id')
                                .withTitle('_id')
                                .withOption('width', '15%')
                                .renderWith(function(data, type, row) {
                                    return "";
                                }).notVisible(),
                                DTColumnBuilder
                                .newColumn('PeopleIdNumber')
                                .withTitle('People ID')
                                .withOption('width', '15%')
                                .renderWith(function(data, type, row) {
                                    return (row.PeopleId) ? row.PeopleId : "";
                                }),
                                DTColumnBuilder
                                .newColumn('name.first')
                                .withTitle('Name')
                                .withOption('width', '15%')
                                .renderWith(function(data, type, row) {
                                    var str = "";
                                    str = (row.name && row.name.last) ? row.name.last + ', ' : ""
                                    str += (row.name && row.name.first) ? row.name.first : "";

                                    return str;

                                }),
                                DTColumnBuilder
                                .newColumn('name.last')
                                .withTitle('last')
                                .renderWith(function(data, type, row) {
                                    return "last";
                                }).notVisible(),
                                // DTColumnBuilder
                                // .newColumn('address.cityName')
                                // .withTitle('cityName')
                                // .withOption('width', '15%')
                                // .renderWith(function(data, type, row){
                                //   return "cityName";
                                // }),
                                DTColumnBuilder
                                .newColumn('homeDiocese')
                                .withTitle('Home Diocese')
                                .withOption('width', '15%')
                                .renderWith(function(data, type, row) {
                                    return (row.homeDiocese) ? (row.homeDiocese) : "";
                                }),
                                DTColumnBuilder
                                .newColumn('religiousOrderInitials')
                                .withTitle('Religious Order Initials')
                                .withOption('width', '15%')
                                .renderWith(function(data, type, row) {
                                    return (row.religiousOrderInitials) ? (row.religiousOrderInitials) : "";
                                }),
                                DTColumnBuilder
                                .newColumn('orgId.name')
                                .withTitle('Org Name')
                                .withOption('width', '15%')
                                .renderWith(function(data, type, row) {

                                    return ((row.orgId) && (row.orgId.length > 0) && (row.orgId[0].name)) ? row.orgId[0].name : "";

                                }),
                                DTColumnBuilder
                                .newColumn(null)
                                .withTitle('Actions')
                                .withClass('text-center')
                                .withOption('width', '5%')
                                .renderWith(function(data, type, row) {
                                    $modalScope.dtData[row._id] = angular.copy(row);
                                    //return "<span ng-click=tempShow('"+row._id+"')><a href='#' style='text-decoration: underline'>Select</a></span>";
                                    return "<span ng-click=showDis('" + row._id + "')><a href='#' style='text-decoration: underline'>Select</a></span>";

                                }),

                            ];

                            $modalScope.dtOptions = DTOptionsBuilder
                                .fromSource(x.data)

                            .withPaginationType('full_numbers')
                                .withDataProp('data')
                                .withOption('aLengthMenu', [10, 25, 50, 100])
                                .withOption('serverSide', true)
                                .withOption('createdRow', createdRow);

                            /* end */
                            $modalScope.editStateDisable = true;
                            $modalScope.personTypeArray = PersonTypes;
                            $modalScope.addressTypeArray = AddressType;
                            $modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.degreeTypeArray = DegreeType;
                            $modalScope.assignmentTypeArray = AssignmentType;
                            $modalScope.contactTypeArray = ContactType;
                            $modalScope.recordStatusArray = DirectoryRecordStatus;
                            var remoValFromPersonnelStatus = [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22];
                            for (var i = remoValFromPersonnelStatus.length - 1; i >= 0; i--) {
                                $modalScope.recordStatusArray.splice(remoValFromPersonnelStatus[i], 1);
                            }
                            $modalScope.assignmentStatusArray = AssignmentStatus;
                            var removeValFromIndex = [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
                            for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
                                $modalScope.assignmentStatusArray.splice(removeValFromIndex[i], 1);
                            }
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.keyPersonnel = $modalScope.editFlag ? getObjectData($scope.organization.personnel[index]) : {
                                address: [],
                                ocdDegree: [],
                                notes: [],
                                assignment: [],
                                ocdContact: []
                            };
                            //Exit PopUp Validation (waring message)
                            $modalScope.keyPersonnelCount = 0;
                            $modalScope.$watch('keyPersonnel', function(nv, ov) {
                                if (nv != ov) {
                                    $modalScope.keyPersonnelCount += 1;
                                    console.log("changes are", $modalScope.keyPersonnelCount);

                                }
                            }, true)
                            $modalScope.cancelManully = function() {
                                //$uibModalInstance.dismiss('cancel');
                                if ($modalScope.keyPersonnelCount >= 1)
                                    $modalScope.pageExitValidation();
                                else {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            }
                            $modalScope.pageExitValidation = function() {
                                    $uibModal.open({
                                        backdrop: 'static',
                                        animation: true,
                                        templateUrl: '/views/directory.personnel.exitPopupWarining.html',
                                        controller: ['$scope',
                                            '$state',
                                            '$uibModalInstance',
                                            '$uibModalStack',
                                            function($modalScope, $state, $uibModalInstance, $uibModalStack) {
                                                $modalScope.cancel = function() {
                                                    $uibModalInstance.dismiss('cancel');
                                                }
                                                $modalScope.ok = function() {
                                                    $uibModalStack.dismissAll('cancel');

                                                }
                                            }
                                        ]

                                    })
                                }
                                //ends here
                            if (!$modalScope.editFlag) $modalScope.keyPersonnel.active = true;
                            $modalScope.cancel = function() {
                                //$uibModalInstance.dismiss('cancel');
                                if ($modalScope.keyPersonnelCount >= 1)
                                    $modalScope.pageExitValidation();
                                else {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            };
                            $modalScope.add = function() {

                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.personnelIndex = index;
                            $modalScope.openRemovePopup = $scope.openRemovePopup;
                            $modalScope.getOCDPersonnel = function(val, prefix) {
                                $('[ng-show="noResultsPersonnel' + prefix + 'Name"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    var query = {
                                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                                        active: true
                                    };
                                    if ($modalScope.keyPersonnel && $modalScope.keyPersonnel.name) {
                                        query['name.prefix'] = $modalScope.keyPersonnel.name.prefix ? {
                                            _eval: 'regex',
                                            value: $modalScope.keyPersonnel.name.prefix
                                        } : undefined;
                                        query['name.first'] = $modalScope.keyPersonnel.name.first ? {
                                            _eval: 'regex',
                                            value: $modalScope.keyPersonnel.name.first
                                        } : undefined;
                                        query['name.middle'] = $modalScope.keyPersonnel.name.middle ? {
                                            _eval: 'regex',
                                            value: $modalScope.keyPersonnel.name.middle
                                        } : undefined;
                                        query['name.last'] = $modalScope.keyPersonnel.name.last ? {
                                            _eval: 'regex',
                                            value: $modalScope.keyPersonnel.name.last
                                        } : undefined;
                                        query['name.suffix'] = $modalScope.keyPersonnel.name.suffix ? {
                                            _eval: 'regex',
                                            value: $modalScope.keyPersonnel.name.suffix
                                        } : undefined;
                                    }
                                    return DirectoryPersonnelService.list(query).$promise;
                                } else $('[ng-show="noResultsPersonnel' + prefix + 'Name"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectPersonnel = function($item, $model) {
                                $modalScope.keyPersonnel = $model;
                                ['Prefix', 'First', 'Middle', 'Last', 'Suffix'].forEach(function(prefix) {
                                    $('[ng-show="noResultsPersonnel' + prefix + 'Name"]').html('');
                                })
                            };
                            $modalScope.getAddressCities = function(val) {
                                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCityService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCityTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newContact.city = $model;
                                $modalScope.newContact.cityName = $model.codeValue;
                                $modalScope.newContact.state = $model.parentId;
                                $modalScope.newContact.stateName = $model.parentId.codeValue + " (" + $model.parentId.description + ")";
                                $modalScope.newContact.country = $model.parentId.parentId;
                                $modalScope.newContact.countryName = $model.parentId.parentId.codeValue;
                            };
                            $modalScope.getAddressStates = function(val) {
                                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryStateService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressStateTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newContact.state = $model;
                                $modalScope.newContact.stateName = $model.codeValue + " (" + $model.description + ")";
                                $modalScope.newContact.country = $model.parentId;
                                $modalScope.newContact.countryName = $model.parentId.codeValue;
                            };
                            $modalScope.getAddressCountries = function(val) {
                                $('[ng-show="noResultsCountry"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCountryService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCountry"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCountryTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newContact.country = $model;
                                $modalScope.newContact.countryName = $model.codeValue;
                            };
                            $modalScope.getAddressCountys = function(val) {
                                $('[ng-show="noResultsCounty"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCountyService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCounty"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCountyTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newContact.county = $model;
                                $modalScope.newContact.countyName = $model.codeValue;
                            };

                            //for display assign type on grid
                            $modalScope.getAssignType = function(id) {
                                    if (id == undefined)
                                        return "";
                                    //return (_.find($modalScope.keyPersonnel.assignment, { "assignId": id }).assignType) ? (_.find($modalScope.keyPersonnel.assignment, { "assignId": id }).assignType) : "";
                                    var assignIdObj = _.find($modalScope.keyPersonnel.assignment, { "assignId": id })
                                    if ((assignIdObj != undefined) && (assignIdObj.assignType != undefined)) {
                                        return assignIdObj.assignType;
                                    } else {
                                        return "";
                                    }

                                }
                                //ocdContact Details
                                //get getValidAssignments
                            $modalScope.getValidAssignmentsData = [];
                            $modalScope.getValidAssignments = function() {
                                var newAssignmentArray = [];
                                $modalScope.keyPersonnel.assignment.forEach(function(assgn) {
                                    if(assgn.orgId!= undefined){
                                    if (assgn.orgId._id == $scope.organization._id && assgn.deleted == false) {
                                        newAssignmentArray.push(assgn);
                                    } else if (assgn.orgId == $scope.organization._id) {
                                        newAssignmentArray.push(assgn);
                                    }    
                                    }
                                    else{
                                        newAssignmentArray.push(assgn);
                                    }
                                    

                                })
                                $modalScope.getValidAssignmentsData = newAssignmentArray;
                                return newAssignmentArray;
                            }
                            $modalScope.$watch('getValidAssignmentsData', function(nv, ov) {
                                if (nv.length == 1) {
                                    $modalScope.newOCDContact.assignId = nv[0].assignId;
                                    $modalScope.newContact.assignId = nv[0].assignId;
                                    $modalScope.newNote.assignId = nv[0].assignId;
                                } else {
                                    $modalScope.newOCDContact = {};
                                    $modalScope.newContact = {};
                                    $modalScope.newNote = {};

                                }
                            }, true);

                            $modalScope.newOCDContact = {};
                            $modalScope.newOCDContactIndex = null;
                            $modalScope.editNewOCDContact = function(index) {
                                $modalScope.newOCDContactIndex = index;
                                $modalScope.newOCDContact = getObjectData($modalScope.keyPersonnel.ocdContact[index]);
                            };
                            $modalScope.removeNewOCDContact = function(index) {
                                if ($modalScope.keyPersonnel.ocdContact[index]._id) {
                                    $modalScope.keyPersonnel.ocdContact[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.ocdContact.splice(index, 1);
                                }
                                $modalScope.resetNewOCDContact();
                            };
                            $modalScope.resetNewOCDContact = function() {
                                $modalScope.newOCDContact = {};
                                $modalScope.newOCDContactIndex = null;
                            };
                            $modalScope.saveNewOCDContact = function() {
                                $modalScope.newOCDContact.orgId = $scope.organization._id;
                                $modalScope.newOCDContactIndex = $modalScope.newOCDContactIndex != null ? $modalScope.newOCDContactIndex : $modalScope.keyPersonnel.ocdContact.length;
                                $modalScope.keyPersonnel.ocdContact[$modalScope.newOCDContactIndex] = $modalScope.newOCDContact;
                                $modalScope.resetNewOCDContact();
                            };

                            // Contact Details
                            $modalScope.newContact = {};
                            $modalScope.newContactIndex = null;
                            $modalScope.editNewContact = function(index) {
                                $modalScope.newContactIndex = index;
                                $modalScope.newContact = getObjectData($modalScope.keyPersonnel.address[index]);
                            };
                            $modalScope.removeNewContact = function(index) {
                                if ($modalScope.keyPersonnel.address[index]._id) {
                                    $modalScope.keyPersonnel.address[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.address.splice(index, 1);
                                }
                                $modalScope.resetNewContact();
                            };
                            $modalScope.resetNewContact = function() {
                                $modalScope.newContact = {};
                                $modalScope.newContactIndex = null;
                            };
                            $modalScope.saveNewContact = function() {
                                $modalScope.newContact.orgId = $scope.organization._id;
                                $modalScope.newContactIndex = $modalScope.newContactIndex != null ? $modalScope.newContactIndex : $modalScope.keyPersonnel.address.length;
                                $modalScope.keyPersonnel.address[$modalScope.newContactIndex] = $modalScope.newContact;
                                $modalScope.resetNewContact();
                            };
                            // Degree Details
                            $modalScope.newDegree = {};
                            $modalScope.newDegreeIndex = null;
                            $modalScope.editNewDegree = function(index) {
                                $modalScope.newDegreeIndex = index;
                                $modalScope.newDegree = getObjectData($modalScope.keyPersonnel.ocdDegree[index]);
                            };
                            $modalScope.removeNewDegree = function(index) {
                                if ($modalScope.keyPersonnel.ocdDegree[index]._id) {
                                    $modalScope.keyPersonnel.ocdDegree[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.ocdDegree.splice(index, 1);
                                }
                                $modalScope.resetNewDegree();
                            };
                            $modalScope.resetNewDegree = function() {
                                $modalScope.newDegree = {};
                                $modalScope.newDegreeIndex = null;
                            };
                            $modalScope.saveNewDegree = function() {
                                $modalScope.newDegreeIndex = $modalScope.newDegreeIndex != null ? $modalScope.newDegreeIndex : $modalScope.keyPersonnel.ocdDegree.length;
                                $modalScope.keyPersonnel.ocdDegree[$modalScope.newDegreeIndex] = $modalScope.newDegree;
                                $modalScope.resetNewDegree();
                            };
                            // Note Details
                            $modalScope.newNote = {};
                            $modalScope.newNoteIndex = null;
                            $modalScope.editNewNote = function(index) {
                                $modalScope.newNoteIndex = index;
                                $modalScope.newNote = getObjectData($modalScope.keyPersonnel.notes[index]);
                            };
                            $modalScope.removeNewNote = function(index) {
                                if ($modalScope.keyPersonnel.notes[index]._id) {
                                    $modalScope.keyPersonnel.notes[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.notes.splice(index, 1);
                                }
                                $modalScope.resetNewNote();
                            };
                            $modalScope.resetNewNote = function() {
                                $modalScope.newNote = {};
                                $modalScope.newNoteIndex = null;
                            };
                            $modalScope.saveNewNote = function() {
                                $modalScope.newNote.orgId = $scope.organization._id;
                                $modalScope.newNoteIndex = $modalScope.newNoteIndex != null ? $modalScope.newNoteIndex : $modalScope.keyPersonnel.notes.length;
                                $modalScope.keyPersonnel.notes[$modalScope.newNoteIndex] = $modalScope.newNote;
                                $modalScope.resetNewNote();
                            };
                            // Assignment Details
                            $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.orgName = $scope.organization.name;
                            $modalScope.orgID = $scope.organization.org_id;
                            $modalScope.orgDio = $scope.organization.abbrevationName;
                            if ($scope.organization.parentId != null)
                                $modalScope.orgParentName = $scope.organization.parentId.name;
                            $modalScope.resetNewAssignment = function() {
                                $modalScope.newAssignment = {
                                    orgId: $scope.organization._id,
                                    orgName: $scope.organization.name
                                };
                                $modalScope.newAssignmentIndex = null;
                            };
                            $modalScope.newAssignmentIndex = null;
                            $modalScope.editNewAssignment = function(index) {
                                $modalScope.editFlagAssignment = true;
                                $modalScope.newAssignmentIndex = index;
                                $modalScope.newAssignment = getObjectData($modalScope.keyPersonnel.assignment[index]);
                            };
                            $modalScope.removeNewAssignment = function(index) {
                                if (index._id) {
                                    index.deleted = true;
                                    for (i = 0; i < $modalScope.keyPersonnel.ocdContact.length; i++) {
                                        if (index.assignId == $modalScope.keyPersonnel.ocdContact[i].assignId) {
                                            $modalScope.keyPersonnel.ocdContact[i].deleted = true;
                                        }
                                    }
                                    for (i = 0; i < $modalScope.keyPersonnel.address.length; i++) {
                                        if (index.assignId == $modalScope.keyPersonnel.address[i].assignId) {
                                            $modalScope.keyPersonnel.address[i].deleted = true;
                                        }
                                    }
                                    for (i = 0; i < $modalScope.keyPersonnel.notes.length; i++) {
                                        if (index.assignId == $modalScope.keyPersonnel.notes[i].assignId) {
                                            $modalScope.keyPersonnel.notes[i].deleted = true;
                                        }
                                    }
                                    // $modalScope.keyPersonnel.ocdContact.forEach(function(con) {
                                    //         if (index.assignId == con.assignId) {
                                    //             $modalScope.keyPersonnel.ocdContact.deleted = true;

                                    //         }
                                    //     })
                                    // if ($modalScope.keyPersonnel.ocdContact[index])
                                    //     $modalScope.keyPersonnel.ocdContact[index].deleted = true;
                                    // if ($modalScope.keyPersonnel.address[index])
                                    //     $modalScope.keyPersonnel.address[index].deleted = true;
                                    // if ($modalScope.keyPersonnel.notes[index])
                                    //     $modalScope.keyPersonnel.notes[index].deleted = true;
                                } else {

                                    _.remove($modalScope.keyPersonnel.assignment, index);
                                    _.remove($modalScope.keyPersonnel.ocdContact, $modalScope.keyPersonnel.ocdContact[_.findIndex($modalScope.keyPersonnel.ocdContact, { 'assignId': index.assignId })]);
                                    _.remove($modalScope.keyPersonnel.address, $modalScope.keyPersonnel.address[_.findIndex($modalScope.keyPersonnel.address, { 'assignId': index.assignId })]);
                                    _.remove($modalScope.keyPersonnel.notes, $modalScope.keyPersonnel.notes[_.findIndex($modalScope.keyPersonnel.notes, { 'assignId': index.assignId })]);
                                    // if (_.findIndex($modalScope.keyPersonnel.ocdContact, { 'assignId': index.assignId }) != -1)
                                    //     $modalScope.keyPersonnel.ocdContact.splice(_.findIndex($modalScope.keyPersonnel.ocdContact, { 'assignId': index.assignId }));
                                    // if (_.findIndex($modalScope.keyPersonnel.address, { 'assignId': index.assignId }) != -1)
                                    //     $modalScope.keyPersonnel.address.splice(_.findIndex($modalScope.keyPersonnel.address, { 'assignId': index.assignId }));
                                    // if (_.findIndex($modalScope.keyPersonnel.notes, { 'assignId': index.assignId }) != -1)
                                    //     $modalScope.keyPersonnel.notes.splice(_.findIndex($modalScope.keyPersonnel.notes, { 'assignId': index.assignId }));
                                }
                                $modalScope.resetNewAssignment();
                            };
                            $modalScope.saveNewAssignment = function() {
                                if ($modalScope.editFlagAssignment == false || $modalScope.editFlagAssignment == undefined) {
                                    DirectoryPersonnelService.getMaxAssignId({}).$promise.then(function(res) {
                                        $modalScope.newAssignment.assignId = res.value;
                                        $modalScope.newAssignmentIndex = $modalScope.newAssignmentIndex != null ? $modalScope.newAssignmentIndex : $modalScope.keyPersonnel.assignment.length;
                                        $modalScope.keyPersonnel.assignment[$modalScope.newAssignmentIndex] = $modalScope.newAssignment;
                                        $modalScope.resetNewAssignment();

                                    });

                                } else if (!$modalScope.newAssignment.assignId) {

                                    DirectoryPersonnelService.getMaxAssignId({}).$promise.then(function(res) {
                                        $modalScope.newAssignment.assignId = res.value;
                                        $modalScope.newAssignmentIndex = $modalScope.newAssignmentIndex != null ? $modalScope.newAssignmentIndex : $modalScope.keyPersonnel.assignment.length;
                                        $modalScope.keyPersonnel.assignment[$modalScope.newAssignmentIndex] = $modalScope.newAssignment;
                                        $modalScope.resetNewAssignment();
                                    });
                                } else {
                                    $modalScope.newAssignmentIndex = $modalScope.newAssignmentIndex != null ? $modalScope.newAssignmentIndex : $modalScope.keyPersonnel.assignment.length;
                                    $modalScope.keyPersonnel.assignment[$modalScope.newAssignmentIndex] = $modalScope.newAssignment;
                                    $modalScope.resetNewAssignment();
                                }



                            };
                            //assgnNAme
                            $modalScope.AssignName = function() {
                                    $modalScope.keyPersonnel.name = ($modalScope.keyPersonnel.name || {});
                                    if ($modalScope.keyPersonnel.personType.codeValue == "Vacant See") {
                                        var per = {
                                            personType: $modalScope.keyPersonnel.personType,
                                            assignment: $modalScope.keyPersonnel.assignment,
                                            name: {}
                                        };
                                        $modalScope.keyPersonnel = per;
                                        $modalScope.keyPersonnel.name.first = "Vacant";
                                    }

                                    // } else {
                                    //     $modalScope.keyPersonnel.name.first = "";

                                    // }

                                }
                                //end here assgn NAme
                                //for create auto generated id
                            $modalScope.getOCDPersonnel1 = function() {
                                if ($modalScope.editFlag == false) {
                                    var query = {
                                        "_where": { "directoryId": "57189cd924d8bc65f4123bc3" },
                                        "_limit": 1,
                                        "_sort": { PeopleIdNumber: -1 }
                                    };
                                    DirectoryPersonnelService.list(query).$promise.then(function(res) {
                                        //query['PeopleId'] = new Date().valueOf((res[0].PeopleId) + 1);
                                        query['PeopleId'] = Number(res[0].PeopleIdNumber) + 1;
                                        $modalScope.keyPersonnel.PeopleId = Number(res[0].PeopleIdNumber) + 1;
                                        $modalScope.keyPersonnel.PeopleIdNumber = Number(res[0].PeopleIdNumber) + 1;
                                    })
                                }


                            };

                            //for create auto generated id
                            //ORg Type For Assignment
                            $modalScope.getOrganizationForAssignment = function(val) {
                                $('[ng-show="noResultsOrganization"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryOrganizationService.list({
                                        active: true,
                                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                                        parentId: null,
                                        name: {
                                            _eval: 'regex',
                                            value: val
                                        }
                                    }).$promise;
                                } else $('[ng-show="noResultsOrganization"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.formatOrgTypeAhead = function($model) {
                                return $model ? $model.name : "";
                            };
                            $modalScope.selectOrgTypeAhead = function($item) {
                                $modalScope.newAssignment.orgId = $item._id;
                                $modalScope.newAssignment.orgName = $item.name;
                            };
                            $modalScope.resetNewAssignment();

                            //$modalScope.getOrganizationForTypeAhead = $scope.getOrganizationForTypeAhead;

                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.personnel) $scope.organization.personnel = [];
                    $scope[op.action + 'OCDKeyPersonnel'](index, op.data);
                });
            };

            //Key Personnel For CFS 23/08/2016

            $scope.addCFSKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel.push(personnel);
            };
            $scope.editCFSKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel[index] = personnel;
            };
            $scope.removeCFSKeyPersonnel = function(index) {
                $scope.organization.personnel.splice(index, 1);
            };
            $scope.openCFSKeyPersonnelPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    size: 'lg',
                    windowClass: 'full-window',
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.html',
                    resolve: {
                        ListingType: [
                            'DirectoryListingTypeService',
                            '$localStorage',
                            function(DirectoryListingTypeService, $localStorage) {
                                return DirectoryListingTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ],
                        OfficerType: [
                            'DirectoryOfficerTypeService',
                            function(DirectoryOfficerTypeService) {
                                return DirectoryOfficerTypeService.get().$promise;
                            }
                        ],
                        AddressType: [
                            'DirectoryAddressTypeService',
                            function(DirectoryAddressTypeService) {
                                return DirectoryAddressTypeService.get().$promise;
                            }
                        ],
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DirectoryKeyPersonnelTitleService',
                        'OfficerType',
                        'AddressType',
                        function($modalScope, $state, $uibModalInstance, DirectoryKeyPersonnelTitleService, OfficerType, AddressType) {
                            $modalScope.getKeyPersonnelTitles = function(val) {
                                $('[ng-show="noResultsTitle"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryKeyPersonnelTitleService.list({
                                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        }
                                    }).$promise;
                                } else $('[ng-show="noResultsTitle"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.formatKeypersonnelTypeAhead = function($model) {
                                return $model ? $model.codeValue : "";
                            };
                            $modalScope.selectKeypersonnelTypeAhead = function($item) {
                                $modalScope.keyPersonnel.titleMaster = $item;
                                $modalScope.keyPersonnel.titleMasterName = $item.codeName;
                            };
                            $modalScope.listingTypeArray = ListingType;
                            $modalScope.officerTypeArray = OfficerType;
                            $modalScope.addressTypeArray = AddressType;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.keyPersonnel = $modalScope.editFlag ? getObjectData($scope.organization.personnel[index]) : {
                                officers: [],
                                address: [],
                            };
                            if (!$modalScope.editFlag) $modalScope.keyPersonnel.active = true;
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                //add//
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.personnelIndex = index;
                            $modalScope.openRemovePopup = $scope.openRemovePopup;
                            // Officer Details
                            $modalScope.newOfficer = {};
                            $modalScope.newOfficerIndex = null;
                            $modalScope.editNewCFSOfficer = function(index) {
                                $modalScope.newOfficerIndex = index;
                                $modalScope.newOfficer = getObjectData($modalScope.keyPersonnel.officers[index]);
                            };
                            $modalScope.removeNewCFSOfficer = function(index) {
                                if ($modalScope.keyPersonnel.officers[index]._id) {
                                    $modalScope.keyPersonnel.officers[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.officers.splice(index, 1);
                                }
                                $modalScope.resetNewCFSOfficer();
                            };
                            $modalScope.resetNewCFSOfficer = function() {
                                $modalScope.newOfficer = {};
                                $modalScope.newOfficerIndex = null;
                            };
                            $modalScope.saveNewCFSOfficer = function() {
                                $modalScope.newOfficerIndex = $modalScope.newOfficerIndex != null ? $modalScope.newOfficerIndex : $modalScope.keyPersonnel.officers.length;
                                $modalScope.keyPersonnel.officers[$modalScope.newOfficerIndex] = $modalScope.newOfficer;
                                $modalScope.resetNewCFSOfficer();
                            };
                            //Address Information for cfs key personnel
                            $modalScope.newAddress = {};
                            $modalScope.getAddressCities = function(val) {
                                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCityService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCityTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newAddress.city = $model;
                                $modalScope.newAddress.cityName = $model.codeValue;
                                $modalScope.newAddress.state = $model.parentId;
                                $modalScope.newAddress.stateName = $model.parentId.codeValue + " (" + $model.parentId.description + ")";
                                $modalScope.newAddress.country = $model.parentId.parentId;
                                $modalScope.newAddress.countryName = $model.parentId.parentId.codeValue;
                            };
                            $modalScope.getAddressStates = function(val) {
                                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryStateService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressStateTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newAddress.state = $model;
                                $modalScope.newAddress.stateName = $model.codeValue + " (" + $model.description + ")";
                                $modalScope.newAddress.country = $model.parentId;
                                $modalScope.newAddress.countryName = $model.parentId.codeValue;
                            };
                            $modalScope.getAddressCountries = function(val) {
                                $('[ng-show="noResultsCountry"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCountryService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCountry"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCountryTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.newAddress.country = $model;
                                $modalScope.newAddress.countryName = $model.codeValue;
                            };


                            $modalScope.newAddressIndex = null;
                            $modalScope.editNewAddress = function(index) {
                                $modalScope.newAddressIndex = index;
                                $modalScope.newAddress = getObjectData($modalScope.keyPersonnel.address[index]);
                            };
                            $modalScope.removeNewAddress = function(index) {
                                if ($modalScope.keyPersonnel.address[index]._id) {
                                    $modalScope.keyPersonnel.address[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.address.splice(index, 1);
                                }
                                $modalScope.resetNewAddress();
                            };
                            $modalScope.resetNewAddress = function() {
                                $modalScope.newAddress = {};
                                $modalScope.newAddressIndex = null;
                            };
                            $modalScope.saveNewAddress = function() {
                                $modalScope.newAddressIndex = $modalScope.newAddressIndex != null ? $modalScope.newAddressIndex : $modalScope.keyPersonnel.address.length;
                                $modalScope.keyPersonnel.address[$modalScope.newAddressIndex] = $modalScope.newAddress;
                                $modalScope.resetNewAddress();
                            };
                            //Address Info Ends here
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.personnel) $scope.organization.personnel = [];
                    $scope[op.action + 'CFSKeyPersonnel'](index, op.data);
                });
            };

            //Ker Personnel DMMP 24/08/2016

            $scope.addDMMPKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel.push(personnel);
            };
            $scope.editDMMPKeyPersonnel = function(index, personnel) {
                personnel.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.personnel[index] = personnel;
            };
            $scope.removeDMMPKeyPersonnel = function(index) {
                $scope.organization.personnel.splice(index, 1);
            };
            $scope.openDMMPKeyPersonnelPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    size: 'lg',
                    windowClass: 'full-window',
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.html',
                    resolve: {
                        ResponsibilityType: [
                            'DirectoryResponsibilityTypeService',
                            function(DirectoryResponsibilityTypeService) {
                                return DirectoryResponsibilityTypeService.get().$promise;
                            }
                        ],
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DirectoryKeyPersonnelTitleService',
                        'ResponsibilityType',
                        function($modalScope, $state, $uibModalInstance, DirectoryKeyPersonnelTitleService, ResponsibilityType) {
                            $modalScope.getKeyPersonnelTitles = function(val) {
                                $('[ng-show="noResultsTitle"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryKeyPersonnelTitleService.list({
                                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        }
                                    }).$promise;
                                } else $('[ng-show="noResultsTitle"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.formatKeypersonnelTypeAhead = function($model) {
                                return $model ? $model.codeValue : "";
                            };
                            $modalScope.selectKeypersonnelTypeAhead = function($item) {
                                $modalScope.keyPersonnel.titleMaster = $item;
                                $modalScope.keyPersonnel.titleMasterName = $item.codeName;
                            };
                            $modalScope.responsibilityTypeArray = ResponsibilityType;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.keyPersonnel = $modalScope.editFlag ? getObjectData($scope.organization.personnel[index]) : {
                                responsibilityCodes: [],
                            };
                            if (!$modalScope.editFlag) $modalScope.keyPersonnel.active = true;
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.keyPersonnel
                                });
                            };
                            $modalScope.personnelIndex = index;
                            $modalScope.openRemovePopup = $scope.openRemovePopup;

                            // Responsibility Details
                            $modalScope.newResponsibility = {};
                            $modalScope.newResponsibilityIndex = null;
                            $modalScope.editNewDMMPResponsibility = function(index) {
                                $modalScope.newResponsibilityIndex = index;
                                $modalScope.newResponsibility = getObjectData($modalScope.keyPersonnel.responsibilityCodes[index]);
                            };
                            $modalScope.removeNewDMMPResponsibility = function(index) {
                                if ($modalScope.keyPersonnel.responsibilityCodes[index]._id) {
                                    $modalScope.keyPersonnel.responsibilityCodes[index].deleted = true;
                                } else {
                                    $modalScope.keyPersonnel.responsibilityCodes.splice(index, 1);
                                }
                                $modalScope.resetNewDMMPResponsibility();
                            };
                            $modalScope.resetNewDMMPResponsibility = function() {
                                $modalScope.newResponsibility = {};
                                $modalScope.newResponsibilityIndex = null;
                            };
                            $modalScope.saveNewDMMPResponsibility = function() {
                                $modalScope.newResponsibilityIndex = $modalScope.newResponsibilityIndex != null ? $modalScope.newResponsibilityIndex : $modalScope.keyPersonnel.responsibilityCodes.length;
                                $modalScope.keyPersonnel.responsibilityCodes[$modalScope.newResponsibilityIndex] = $modalScope.newResponsibility;
                                $modalScope.resetNewDMMPResponsibility();
                            };

                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.personnel) $scope.organization.personnel = [];
                    $scope[op.action + 'DMMPKeyPersonnel'](index, op.data);
                });
            };

            //----------
            //OCD General Details View
            //----------
            $scope.openOCDKeyPersonnelGeneralDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.ocdGeneral.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.orgName = $scope.organization.name;
                            $modalScope.orgID = $scope.organization.org_id;
                            $modalScope.orgDio = $scope.organization.abbrevationName;
                            if ($scope.organization.parentId != null)
                                $modalScope.orgParentName = $scope.organization.parentId.name;
                        }

                    ]
                });
            };
            //-----------
            //OCD Contact Details View
            //-------------
            $scope.openOCDKeyPersonnelOCDContactDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.ocdContact.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };


            // -------------
            // OCD Address Details View
            // -------------
            $scope.openOCDKeyPersonnelContactDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.contact.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };
            // -------------
            // OCD Degree Details View
            // -------------
            $scope.openOCDKeyPersonnelDegreeDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.degree.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };
            // -------------
            // OCD Notes Details View
            // -------------
            $scope.openOCDKeyPersonnelNotesPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.notes.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };
            // -------------
            // OCD Assignment Details View
            // -------------
            $scope.openOCDKeyPersonnelAssignmentsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    // height: 800 px;
                    // width: 800 px;
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.assignment.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.assngOrgId = $scope.organization._id;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            // $modalScope.getAssignType = function(id) {
                            //     return _.find($modalScope.keyPersonnel.assignment, { "assignId": id }).assignType;
                            // }
                  /*          $modalScope.getAssignType = function(id) {
                                if (id == undefined)
                                    return "";
                                return (_.find($modalScope.keyPersonnel.assignment, { "assignId": id }).assignType) ? (_.find($modalScope.keyPersonnel.assignment, { "assignId": id }).assignType) : "";

                            }*/
                            

                            $modalScope.getAssignType = function(id) {
                                    if (id == undefined)
                                        return "";
                                    var assignIdObj=_.find($modalScope.keyPersonnel.assignment, { "assignId": id })
                                    if((assignIdObj != undefined)&& (assignIdObj.assignType != undefined))
                                    {
                                        return assignIdObj.assignType;
                                    }
                                    else{
                                        return "";
                                    }
                                }

                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };


            // -------------
            // Features
            // -------------
            $scope.addFeatures = function(index, feature) {
                $scope.organization.features.push(feature);
            };
            $scope.editFeatures = function(index, feature) {
                $scope.organization.features[index] = feature;
            };
            $scope.removeFeatures = function(index) {
                $scope.organization.features.splice(index, 1);
            };
            $scope.openFeaturePopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.features.html',
                    resolve: {
                        FeatureTypes: [
                            'DirectoryFeatureTypeService',
                            '$localStorage',
                            function(DirectoryFeatureTypeService, $localStorage) {
                                return DirectoryFeatureTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DirectoryFeatureCodeService',
                        'FeatureTypes',
                        function($modalScope, $state, $uibModalInstance, DirectoryFeatureCodeService, FeatureTypes) {
                            $modalScope.featureTypeArray = FeatureTypes;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.feature = $modalScope.editFlag ? getObjectData($scope.organization.features[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.feature
                                });
                            };
                            $modalScope.changeFeatureType = function(featureType, dontDelete) {
                                $modalScope.featureCodeArray = [];
                                if (!dontDelete) {
                                    delete $modalScope.feature.code;
                                } else {
                                    featureType = { codeType: featureType };
                                }
                                if (featureType && featureType.codeType) {
                                    $modalScope.loading = true;
                                    DirectoryFeatureCodeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id, codeType: featureType.codeType }, function(featureCodes) {
                                        $modalScope.featureCodeArray = featureCodes;
                                        $modalScope.loading = false;
                                    }, function(err) {
                                        showMessages([{
                                            header: 'Feature Codes',
                                            message: 'Could not fetch Feature Codes',
                                            type: 'error'
                                        }]);
                                        $modalScope.loading = false;
                                    });
                                }
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.feature
                                });
                            };

                            if ($modalScope.feature.featureType) $modalScope.changeFeatureType($modalScope.feature.featureType, true);
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.features) $scope.organization.features = [];
                    $scope[op.action + 'Features'](index, op.data);
                });
            };
            // -------------
            // Chapter Specifiaction chapterSpecification
            // -------------chapterSpecification
            $scope.addChapterSpecification = function(index, chapterSpecification) {
                chapterSpecification.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.chapterSpecification.push(chapterSpecification);
            };
            $scope.editChapterSpecification = function(index, chapterSpecification) {
                chapterSpecification.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.chapterSpecification[index] = chapterSpecification;
            };
            $scope.removeChapterSpecification = function(index) {
                if (!$scope.organization.removeChapterSpecification) $scope.organization.removeChapterSpecification = [];
                $scope.organization.removeChapterSpecification.push($scope.organization.chapterSpecification[index]._id);
                $scope.organization.chapterSpecification.splice(index, 1);
            };
            $scope.openChapterSpecificationPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.chapterSpecifications.html',
                    resolve: {
                        ListingType: [
                            'DirectoryListingTypeService',
                            '$localStorage',
                            function(DirectoryListingTypeService, $localStorage) {
                                return DirectoryListingTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ],
                        SpecificationType: [
                            'DirectorySpecificationTypeService',
                            function(DirectorySpecificationTypeService) {
                                return DirectorySpecificationTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'ListingType',
                        'SpecificationType',
                        'DirectorySpecificationCodeService',
                        /*  'DirectorySpecificationTypeService',*/
                        function($modalScope, $state, $uibModalInstance, ListingType, SpecificationType, DirectorySpecificationCodeService) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.listingTypeArray = ListingType;
                            $modalScope.specificationTypeArray = SpecificationType;
                            $modalScope.chapterSpecification = $modalScope.editFlag ? getObjectData($scope.organization.chapterSpecification[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.chapterSpecification
                                });
                            };
                            $modalScope.changeSpecificationType = function(specificationType, dontDelete) {
                                $modalScope.specificationCodeArray = [];
                                if (!dontDelete) {
                                    delete $modalScope.chapterSpecification.code;
                                } else if (!specificationType.codeType) specificationType = { codeType: specificationType };
                                if (specificationType) {
                                    $modalScope.loading = true;
                                    DirectorySpecificationCodeService.get({
                                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                                        codeType: specificationType.codeType
                                    }, function(specificationCodes) {
                                        $modalScope.specificationCodeArray = specificationCodes;
                                        $modalScope.loading = false;
                                    }, function(err) {
                                        showMessages([{
                                            header: 'Specification  Codes',
                                            message: 'Could not fetch ChapterSpecification Codes',
                                            type: 'error'
                                        }]);
                                        $modalScope.loading = false;
                                    });
                                }
                            };
                            if ($modalScope.chapterSpecification.specificationType) $modalScope.changeSpecificationType($modalScope.chapterSpecification.specificationType, true);
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.chapterSpecification
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.chapterSpecification) $scope.organization.chapterSpecification = [];
                    $scope[op.action + 'ChapterSpecification'](index, op.data);
                });
            };


            // -------------
            // Publications
            // -------------
            $scope.addPublications = function(index, publication) {
                $scope.organization.publication.push(publication);
            };
            $scope.editPublications = function(index, publication) {
                $scope.organization.publication[index] = publication;
            };
            $scope.removePublications = function(index) {
                $scope.organization.publication.splice(index, 1);
            };
            $scope.openPublicationsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.publications.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.publication = $modalScope.editFlag ? getObjectData($scope.organization.publication[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.publication
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.publication
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.publication) $scope.organization.publication = [];
                    $scope[op.action + 'Publications'](index, op.data);
                });
            };

            // -------------
            // Research
            // -------------
            $scope.addResearch = function(index, research) {
                $scope.organization.research.push(research);
            };
            $scope.editResearch = function(index, research) {
                $scope.organization.research[index] = research;
            };
            $scope.removeResearch = function(index) {
                $scope.organization.research.splice(index, 1);
            };
            $scope.openResearchPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.research.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.research = $modalScope.editFlag ? getObjectData($scope.organization.research[index]) : "";
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.research
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.research
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.research) $scope.organization.research = [];
                    $scope[op.action + 'Research'](index, op.data);
                });
            };

            // -------------
            // Exhibitions
            // -------------
            $scope.addExhibition = function(index, exhibition) {
                exhibition.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.exhibition.push(exhibition);
            };
            $scope.editExhibition = function(index, exhibition) {
                exhibition.directoryId = $localStorage['DMS-DIRECTORY']._id;
                $scope.organization.exhibition[index] = exhibition;
            };
            $scope.removeExhibition = function(index) {
                if (!$scope.organization.removeExhibition) $scope.organization.removeExhibition = [];
                $scope.organization.removeExhibition.push($scope.organization.exhibition[index]._id);
                $scope.organization.exhibition.splice(index, 1);
            };
            $scope.openExhibitionPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.exhibition.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.exhibition = $modalScope.editFlag ? getObjectData($scope.organization.exhibition[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.exhibition
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.exhibition
                                });
                            };

                            // if ($modalScope.exhibition.startDateText && new Date($modalScope.exhibition.startDateText) == "Invalid Date") {
                            //     // START DATE
                            //     var startDateText = $modalScope.exhibition.startDateText;
                            //     var startDateYear = startDateText.slice(-4),
                            //         startDateMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            //         ].indexOf(startDateText.substr(4, 3)) + 1,
                            //         startDateDay = startDateText.substr(8, 2);

                            //     var startDate = startDateYear + '-' + (startDateMonth < 10 ? '0' : '') + startDateMonth + '-' + startDateDay;
                            //     $modalScope.exhibition.startDate = startDate;
                            // }

                            // if ($modalScope.exhibition.endDateText && new Date($modalScope.exhibition.endDateText) == "Invalid Date") {
                            //     // END DATE 
                            //     var endDateText = $modalScope.exhibition.endDateText;
                            //     var endDateYear = endDateText.slice(-4),
                            //         endDateMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            //         ].indexOf(endDateText.substr(4, 3)) + 1,
                            //         endDateDay = endDateText.substr(8, 2);

                            //     var endDate = endDateYear + '-' + (endDateMonth < 10 ? '0' : '') + endDateMonth + '-' + endDateDay;
                            //     $modalScope.exhibition.endDate = endDate;
                            // }

                            $modalScope.exhibition.startDate = new Date($modalScope.exhibition.startDate || "") == "Invalid Date" ? "" : new Date($modalScope.exhibition.startDate);
                            $modalScope.exhibition.endDate = new Date($modalScope.exhibition.endDate || "") == "Invalid Date" ? "" : new Date($modalScope.exhibition.endDate);

                            $modalScope.startDateOptions = {
                                minDate: new Date($modalScope.exhibition.startDate),
                                maxDate: new Date($modalScope.exhibition.endDate)
                            };
                            $modalScope.endDateOptions = {
                                minDate: new Date($modalScope.exhibition.startDate),
                                maxDate: new Date($modalScope.exhibition.endDate)
                            };
                            $modalScope.$watch('exhibition.endDate', function(newVal) {
                                $modalScope.startDateOptions.maxDate = new Date(newVal || '');
                                $modalScope.endDateOptions.maxDate = new Date(newVal || '');
                                $modalScope.exhibition.endDateText = newVal != '' ? (newVal instanceof Date ? $rootScope.to_date_format(newVal, 'jS M, Y') : newVal) : $modalScope.exhibition.endDateText;
                            });
                            $modalScope.$watch('exhibition.startDate', function(newVal) {
                                $modalScope.startDateOptions.minDate = new Date(newVal || '');
                                $modalScope.endDateOptions.minDate = new Date(newVal || '');
                                $modalScope.exhibition.startDateText = newVal != '' ? (newVal instanceof Date ? $rootScope.to_date_format(newVal, 'jS M, Y') : newVal) : $modalScope.exhibition.startDateText;
                            });
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.exhibition) $scope.organization.exhibition = [];
                    $scope[op.action + 'Exhibition'](index, op.data);
                });
            };

            // -------------
            // Activities
            // -------------
            $scope.addActivities = function(index, activity) {
                $scope.organization.activities.push(activity);
            };
            $scope.editActivities = function(index, activity) {
                $scope.organization.activities[index] = activity;
            };
            $scope.removeActivities = function(index) {
                $scope.organization.activities.splice(index, 1);
            };
            $scope.openActivitiesPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.activities.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.activity = $modalScope.editFlag ? getObjectData($scope.organization.activities[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.activity
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.activity
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.activity) $scope.organization.activity = [];
                    $scope[op.action + 'Activities'](index, op.data);
                });
            };

            // -------------
            // Notes
            // -------------
            /*$scope.addNotes = function(index, note) {
                $scope.organization.notes.push(note);
            };
            $scope.editNotes = function(index, note) {
                $scope.organization.notes[index] = note;
            };
            $scope.removeNotes = function(index) {
                $scope.organization.notes.splice(index, 1);
            };
            $scope.openNotesPopup = function(index) {
                var modalInstance = $uibModal.open({
backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.notes.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.note = $modalScope.editFlag ? getObjectData($scope.organization.notes[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.note
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.note
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.notes) $scope.organization.notes = [];
                    $scope[op.action + 'Notes'](index, op.data);
                });
            };*/

            $scope.addNotes = function(index, note) {
                $scope.organization.notes.push(note);
            };
            $scope.editNotes = function(index, note) {
                $scope.organization.notes[index] = note;
            };
            $scope.removeNotes = function(index) {
                $scope.organization.notes.splice(index, 1);
            };
            $scope.openNotesPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.notes.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.notes = $modalScope.editFlag ? getObjectData($scope.organization.notes[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.notes
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.notes
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.notes) $scope.organization.notes = [];
                    $scope[op.action + 'Notes'](index, op.data);
                });
            };

            //---------Vendors--------------//
            $scope.vendorTypes = [];
            for (var i = VendorType.length - 1; i >= 0; i--) {
                $scope.vendorTypes[VendorType[i]._id] = VendorType[i].codeValue;
            }

            $scope.addVendors = function(index, vendor) {
                $scope.organization.vendors.push(vendor);
            };
            $scope.editVendors = function(index, vendor) {
                $scope.organization.vendors[index] = vendor;
            };
            $scope.removeVendors = function(index) {
                $scope.organization.vendors.splice(index, 1);
            };
            $scope.openVendorsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.vendors.html',
                    resolve: {
                        VendorType: [
                            'DirectoryVendorTypeService',
                            function(DirectoryVendorTypeService) {
                                return DirectoryVendorTypeService.get().$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'VendorType',
                        'DirectoryStateService',
                        'DirectoryCityService',
                        function($modalScope, $state, $uibModalInstance, VendorType, DirectoryStateService, DirectoryCityService) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.vendorTypeArray = VendorType;
                            $modalScope.vendors = $modalScope.editFlag ? getObjectData($scope.organization.vendors[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {

                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.vendors
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.vendors
                                });
                            };
                            $modalScope.getAddressCitiesVendors = function(val) {
                                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCityService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressCityTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.vendors.city = $model;
                                $modalScope.vendors.cityName = $model.codeValue;
                                $modalScope.vendors.state = $model.parentId;
                                $modalScope.vendors.stateName = $model.parentId.codeValue + " (" + $model.parentId.description + ")";

                            };
                            $modalScope.getAddressStatesVendors = function(val) {
                                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryStateService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectAddressStateTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.vendors.state = $model;
                                $modalScope.vendors.stateName = $model.codeValue + " (" + $model.description + ")";
                                $modalScope.address.country = $model.parentId;
                                $modalScope.address.countryName = $model.parentId.codeValue;
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {

                    if (!$scope.organization.vendors) $scope.organization.vendors = [];
                    $scope[op.action + 'Vendors'](index, op.data);
                });
            };
            $scope.getOrganizationForTypeAhead = function(val) {
                $('[ng-show="noResultsOrganization"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryOrganizationService.list({
                        active: true,
                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                        name: {
                            _eval: 'regex',
                            value: val
                        }
                    }).$promise;
                } else $('[ng-show="noResultsOrganization"]').html('Enter minimum 3 characters');
            };
            /*20170530*/
            $scope.searchParentOrg = function(parentId) {
                $scope.parentNotFound = false;
                $scope.organization.parentId = { org_id: parentId };
                if (parentId && parentId.trim() !== "") {
                    $scope.loading = true;
                    DirectoryOrganizationService.list({
                        active: true,
                        directoryId: $localStorage['DMS-DIRECTORY']._id,
                        org_id: parentId,
                        _id: { $ne: $scope.organization._id }
                    }, function(parentOrgs) {
                        /*20170523 start*/
                        // parentOrgs[0].root
                        //var mainId=(parentOrgs[0].parentId)?parentOrgs[0].parentId._id:parentOrgs[0]._id;
                        var mainId = parentOrgs[0]._id;
                        x3.Data({ "parentId": mainId }).$promise.then(function(resp) {
                            $scope.parentRootTree = resp;
                        });
                        var dfilter = _.filter($scope.treeData, { parentId: $scope.organization._id });
                        for (var i = 0; i < dfilter.length; i++) {
                            dfilter = angular.copy(dfilter.concat(_.filter($scope.treeData, { parentId: dfilter[i]._id })));
                        }
                        /*
                        if (Organization.data.parentId != null)
                            var dfilter = _.filter($scope.td, { _id: Organization.data._id });
                        else
                            var dfilter = _.filter($scope.td, { parentId: null });
                        for (var i = 0; i < dfilter.length; i++) {
                            dfilter = angular.copy(dfilter.concat(_.filter($scope.td, { parentId: dfilter[i]._id })));
                        }
                        */
                        var rootId = parentOrgs[0].root ? parentOrgs[0].root : parentOrgs[0]._id;
                        dfilter = dfilter.map(function(data) {
                            data._id = { "_eval": "Id", "value": data._id };
                            if (data.root)
                                data.root = { "_eval": "Id", "value": data.root };
                            return data;
                        });
                        $scope.subRootTree = dfilter;
                        console.log("$scope.treeData", $scope.subRootTree);
                        /*20170523 end*/
                        var parent = {};
                        if (parentOrgs && parentOrgs.length > 0) parent = parentOrgs[0];
                        else $scope.parentNotFound = true;
                        $scope.organization.parentId = parent;
                        $scope.organization.root = parent.root ? parent.root : parent._id;
                        $scope.organization.abbrevationName = parent.abbrevationName;
                        $scope.loading = false;
                    }, function(err) {
                        showMessages([{
                            header: 'Parent Organization',
                            message: 'Could not fetch Parent Organization',
                            type: 'error'
                        }]);
                        $scope.loading = false;
                    });
                } else {
                    $scope.organization.parentId = null;
                    $scope.organization.root = null;
                    $scope.organization.parentName = null;
                    $scope.organization.abbrevationName = null;
                }
            };
            $scope.formatOrgTypeAhead = function($model) {
                return $model ? $model.name : "";
            };
            $scope.selectOrgTypeAhead = function($item) {
                $scope.organization.parentId = $item;
                $scope.organization.abbrevationName = $item.abbrevationName;
            };
            $scope.openRemovePopup = function($index, popupName, callback, stat) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/directory.organization.remove.tpl.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.popupName = popupName;
                            $modalScope.index1 = $index;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.removes = {};
                            $modalScope.removeRecord = function() {
                                if (popupName == "FormerName(s)") {
                                    $scope.organization.formerNames[$index].deleted = true;
                                    //$scope.organization.formerNames.splice($index, 1);
                                    //$scope.removeFormerName($index);
                                } else if (popupName == "Book Edition(s)") {
                                    $scope.organization.bookEdition[$index].deleted = true;
                                    // $scope.organization.bookEdition.splice($index, 1);
                                } else if (popupName == "Address") {
                                    $scope.organization.address[$index].deleted = true;
                                    // $scope.organization.address.splice($index, 1);
                                } else if (popupName == "Key Personnel") {
                                    $scope.removeKeyPersonnel($index);
                                } else if (popupName == "Key Personnel") {
                                    $scope.removeOCDKeyPersonnel($index);
                                } else if (popupName == "Features") {
                                    // $scope.organization.features.splice($index, 1);
                                    $scope.organization.features[$index].deleted = true;
                                } else if (popupName == "Exhibition") {
                                    $scope.removeExhibition($index);
                                } else if (popupName == "Research") {
                                    // $scope.research = $scope.organization.research.splice($index, 1);
                                    $scope.organization.research[$index].deleted = true;
                                    //console.log($scope.research);
                                } else if (popupName == "Publications") {
                                    // $scope.organization.publication.splice($index, 1);
                                    $scope.organization.publication[$index].deleted = true;
                                } else if (popupName == "Contacts") {
                                    $scope.organization.ocdContact[$index].deleted = true;
                                    //$scope.organization.contact.splice($index, 1);
                                } else if (popupName == "Chapter Specification") {
                                    $scope.removeChapterSpecification($index);
                                } else if (popupName == "Notes") {
                                    // $scope.organization.notes.splice($index, 1);
                                    $scope.organization.notes[$index].deleted = true;
                                } else if (popupName == "Vendors") {
                                    // $scope.organization.vendors.splice($index, 1);
                                    $scope.organization.vendors[$index].deleted = true;
                                } else if (popupName == "Listing Types") {
                                    // $scope.organization.listingType.splice($index, 1);
                                    $scope.organization.listingType[$index].deleted = true;
                                } else if (popupName == "Members") {
                                    // $scope.organization.listingType.splice($index, 1);
                                    $scope.organization.members[$index].deleted = true;
                                } else if (popupName == "DMMP Listing Types") {
                                    // $scope.organization.listingType.splice($index, 1);
                                    $scope.organization.listingType[$index].deleted = true;
                                } else if (popupName == "Legal Titles") {
                                    $scope.organization.legalTitles[$index].deleted = true;
                                    //$scope.organization.legalTitles.splice($index, 1);
                                } else if (popupName == "Stathist") {
                                    $scope.organization.stathist.splice($index, 1);
                                } else if (popupName == "Direct Marketing Budget Disbursal") {
                                    $scope.organization.directMarketingBudgetDisbursal.splice($index, 1);
                                } else if (popupName == "Statistics") {
                                    stat.deleted = true;
                                    // $scope.organization.statistic[statistic].deleted = true;
                                    //$scope.organization.statistic.splice($index, 1);
                                } else if (popupName == "Cross Reference") {
                                    $scope.organization.crossReference.splice($index, 1);
                                } else if (popupName == "Key Personnel: Contact") {
                                    callback($index);
                                } else if (popupName == "Key Personnel: Address") {
                                    callback($index);
                                } else if (popupName == "Key Personnel: Degree") {
                                    callback($index);
                                } else if (popupName == "Key Personnel: Notes") {
                                    callback($index);
                                } else if (popupName == "Key Personnel: Assignments") {
                                    callback($index);
                                } else if (popupName == "Key Personnel: Officer") {
                                    callback($index);
                                } else if (popupName == "Key Personnel: Responsibility") {
                                    callback($index);
                                }
                                $uibModalInstance.close({
                                    action: 'removeRecord',
                                    data: $modalScope.removes
                                });
                            };
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };

            // For OCD (30/06/2016)


            //Legal Titles PopUp
            $scope.addlegalTitle = function(index, legalTitles) {
                $scope.organization.legalTitles.push(legalTitles);
            };
            $scope.editlegalTitle = function(index, legalTitles) {
                $scope.organization.legalTitles[index] = legalTitles;
            };
            $scope.removelegalTitle = function(index) {
                $scope.organization.legalTitles.splice(index, 1);
            };
            $scope.openlegalTitlesPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.legalTitles.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.legalTitles = $modalScope.editFlag ? getObjectData($scope.organization.legalTitles[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.legalTitles
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.legalTitles
                                });
                            };
                            $modalScope.getLegalCities = function(val) {
                                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryCityService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectLegalCityTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.legalTitles.cityName = $model.codeValue;
                                $modalScope.legalTitles.state = $model.parentId;
                                $modalScope.legalTitles.stateName = $model.parentId.codeValue + " (" + $model.parentId.description + ")";

                            };
                            $modalScope.getLegalStates = function(val) {
                                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                                if (val.length > 2) {
                                    return DirectoryStateService.list({
                                        codeValue: {
                                            _eval: 'regex',
                                            value: val
                                        },
                                        active: true
                                    }).$promise;
                                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
                            };
                            $modalScope.selectLegalStateTypeAhead = function($item, $model, $label, $event) {
                                $modalScope.legalTitles.stateName = $model.codeValue + " (" + $model.description + ")";
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.legalTitles) $scope.organization.legalTitles = [];
                    $scope[op.action + 'legalTitle'](index, op.data);
                });
            };
            //Statistics PopUp
            $scope.addStatistic = function(index, statistic) {
                $scope.organization.statistic.push(statistic);
            };
            $scope.editStatistic = function(index, statistic) {


                $scope.organization.statistic[index] = statistic;
            };
            $scope.removestatistic = function(index) {
                $scope.organization.statistic.splice(index, 1);
            };
            $scope.openStatisticsPopup = function(index, statistic) {
                if ((index != undefined) && (index.value != undefined)) {
                    index.value = Number(index.value);
                }
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.statistic.html',
                    resolve: {
                        StatisticsType: [
                            'DirectoryStatisticsTypeService',
                            function(DirectoryStatisticsTypeService) {
                                return DirectoryStatisticsTypeService.get().$promise;
                            }
                        ],
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'StatisticsType',
                        function($modalScope, $state, $uibModalInstance, StatisticsType) {
                            $modalScope.statisticArray = StatisticsType.filter(function(data) {
                                if (data.level == "O") return data;
                            });
                            //  $modalScope.statisticArray = StatisticsType;
                            $modalScope.editFlag = (typeof index != 'undefined');

                            // $modalScope.statistic = $modalScope.editFlag ? getObjectData($scope.organization.statistic[index]) : {};
                            $modalScope.statistic = $modalScope.editFlag ? getObjectData($scope.organization.statistic[index]) : {};
                            //$modalScope.statistic = $modalScope.editFlag ? index : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.statistic
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.statistic
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.statistic) $scope.organization.statistic = [];
                    console.log("HII")
                    $scope[op.action + 'Statistic'](index, op.data);
                });
            };
            //Cross Reference
            $scope.addCrossReference = function(index, crossReference) {
                $scope.organization.crossReference.push(crossReference);
            };
            $scope.editCrossReference = function(index, crossReference) {
                $scope.organization.crossReference[index] = crossReference;
            };
            $scope.removecrossReference = function(index) {
                $scope.organization.crossReference.splice(index, 1);
            };
            $scope.opencrossReferencesPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.crossReference.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.crossReference = $modalScope.editFlag ? getObjectData($scope.organization.crossReference[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.crossReference
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.crossReference
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.crossReference) $scope.organization.crossReference = [];
                    $scope[op.action + 'CrossReference'](index, op.data);
                });
            };


            // For OCD Contact
            //OCD Conatct PopUp
            $scope.addContact = function(index, ocdContact) {
                $scope.organization.ocdContact.push(ocdContact);
            };
            $scope.editContact = function(index, ocdContact) {
                $scope.organization.ocdContact[index] = ocdContact;
            };
            $scope.removeContact = function(index) {
                $scope.organization.ocdContact.splice(index, 1);
            };
            $scope.openContactPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.contact.html',
                    resolve: {
                        ContactType: [
                            'DirectoryContactTypeService',
                            function(DirectoryContactTypeService) {
                                return DirectoryContactTypeService.get().$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'ContactType',
                        'DirectoryContactTypeService',
                        function($modalScope, $state, $uibModalInstance, ContactType, DirectoryContactTypeService) {
                            $modalScope.contactTypeArray = ContactType;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.ocdContact = $modalScope.editFlag ? getObjectData($scope.organization.ocdContact[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.ocdContact
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.ocdContact
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.ocdContact) $scope.organization.ocdContact = [];
                    $scope[op.action + 'Contact'](index, op.data);
                });
            };

            //Stathist For OMD
            $scope.stathistDtOptions = DTOptionsBuilder.newOptions()
                .withOption("aoColumnDefs", [{ "targets": [2], "orderable": false }]);
            $scope.omdStathist = {};
            $scope.editValue = 0;
            $scope.addStathist = function() {
                $scope.newStathistIndex;
                // $scope.organization.stathist.push($scope.omdStathist);
                if ($scope.editValue == 1) {
                    $scope.organization.stathist[$scope.newStathistIndex] = $scope.omdStathist;
                    $scope.editValue = 0;
                } else {
                    $scope.organization.stathist.push($scope.omdStathist);
                }

                $scope.resetStathist();
            };
            $scope.resetStathist = function() {
                $scope.omdStathist = {};
                $scope.organization.stathist.omdStathist = null;
            };
            // $scope.omdStathist = {};
            // $scope.newStathistIndex = null;
            $scope.editStathist = function(index) {
                $scope.editValue = 1;
                $scope.newStathistIndex = index;
                $scope.omdStathist = getObjectData($scope.organization.stathist[index]);

            };

            //Direct Marketing Budget Disbrusal 22/08/1989
            $scope.addDisbursal = function(index, directMarketingBudgetDisbursal) {
                $scope.organization.directMarketingBudgetDisbursal.push(directMarketingBudgetDisbursal);
            };
            $scope.editDisbursal = function(index, directMarketingBudgetDisbursal) {
                $scope.organization.directMarketingBudgetDisbursal[index] = directMarketingBudgetDisbursal;
            };
            $scope.removeDisbursal = function(index) {
                $scope.organization.directMarketingBudgetDisbursal.splice(index, 1);
            };
            $scope.openDirectMarketingBudgetDisbrusalPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.budgetDisbursal.html',
                    resolve: {
                        DisbursalType: [
                            'DirectoryDisbursalTypeService',
                            function(DirectoryDisbursalTypeService) {
                                return DirectoryDisbursalTypeService.get().$promise;
                            }
                        ],
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'DisbursalType',
                        function($modalScope, $state, $uibModalInstance, DisbursalType) {
                            $modalScope.disbursalcArray = DisbursalType;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.directMarketingBudgetDisbursal = $modalScope.editFlag ? getObjectData($scope.organization.directMarketingBudgetDisbursal[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.directMarketingBudgetDisbursal
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.directMarketingBudgetDisbursal
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.directMarketingBudgetDisbursal) $scope.organization.directMarketingBudgetDisbursal = [];
                    $scope[op.action + 'Disbursal'](index, op.data);
                });
            };

            //City and state for Mailing List
            $scope.getMailingCities = function(val) {
                $('[ng-show="noResultsCity"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryCityService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsCity"]').html('Enter minimum 3 characters');
            };
            $scope.selectMailingCityTypeAhead = function($item, $model, $label, $event) {
                $scope.organization.mailingList.cityName = $model.codeValue;
                $scope.organization.mailingList.state = $model.parentId;
                $scope.organization.mailingList.stateName = $model.parentId.codeValue;

            };
            $scope.getMailingStates = function(val) {
                $('[ng-show="noResultsState"]').html(val.length > 0 ? '<i class="glyphicon glyphicon-remove"></i> No Results Found' : '');
                if (val.length > 2) {
                    return DirectoryStateService.list({
                        codeValue: {
                            _eval: 'regex',
                            value: val
                        },
                        active: true
                    }).$promise;
                } else $('[ng-show="noResultsState"]').html('Enter minimum 3 characters');
            };
            $scope.selectMailingStateTypeAhead = function($item, $scope, $label, $event) {
                $scope.organization.mailingList.stateName = $scope.codeValue + " (" + $scope.description + ")";
            };

            //CFS keyPersonnel General View
            $scope.openCFSKeyPersonnelGeneralDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.general.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            //$modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };

            //CFS  keyPersonnel Officer View 
            $scope.openCFSKeyPersonnelOfficersDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.officer.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            //$modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };
            //CFS KeyPersonnel Address View
            $scope.openCFSKeyPersonnelAddressPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.address.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            //$modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };

            //DMMP Key Personnel General Details 
            $scope.openDMMPKeyPersonnelGeneralDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.general.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            //$modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };
            //DMMP Key Personnel Responsibility Details
            $scope.openDMMPKeyPersonnelResponsibilityDetailsPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.keyPersonnel.responsibility.view.html',
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        function($modalScope, $state, $uibModalInstance) {
                            //$modalScope.addressTypes = $scope.addressTypes;
                            $modalScope.keyPersonnel = $scope.organization.personnel[index];
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            };
            //AAD Book Edition PopUp 25/08/2016
            $scope.addBookEditions = function(index, bookEditions) {
                $scope.organization.bookEdition.push(bookEditions);
            };
            $scope.editBookEditions = function(index, bookEditions) {
                $scope.organization.bookEdition[index] = bookEditions;
            };
            $scope.removeBookEditions = function(index) {
                $scope.organization.bookEdition.splice(index, 1);
            };
            $scope.openBookEditionPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.bookEdition.html',
                    resolve: {
                        StatusType: [
                            'DirectoryRecordStatusService',
                            function(DirectoryRecordStatusService) {
                                return DirectoryRecordStatusService.get().$promise;
                            }
                        ],

                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'StatusType',
                        function($modalScope, $state, $uibModalInstance, StatusType) {
                            $modalScope.statusTypeArray = StatusType;
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.bookEditions = $modalScope.editFlag ? getObjectData($scope.organization.bookEdition[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.bookEditions
                                });
                            };
                            $modalScope.update = function() {
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.bookEditions
                                });
                            };

                        }
                    ]
                });
                modalInstance.result.then(function(op) {

                    if (!$scope.organization.bookEdition) $scope.organization.bookEdition = [];
                    $scope[op.action + 'BookEditions'](index, op.data);
                });

            };
            // -------------
            // Memebers
            // -------------
            $scope.addMembers = function(index, members) {
                $scope.organization.members.push(members);
            };
            $scope.editMembers = function(index, members) {
                $scope.organization.members[index] = members;
            };
            $scope.removeMembers = function(index) {
                $scope.organization.members.splice(index, 1);
            };
            $scope.openMemeberPopup = function(index) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    animation: true,
                    templateUrl: '/views/' + $localStorage['DMS-DIRECTORY'].codeValue + '.directory.organization.popup.members.html',
                    resolve: {
                        ListingType: [
                            'DirectoryListingTypeService',
                            '$localStorage',
                            function(DirectoryListingTypeService, $localStorage) {
                                return DirectoryListingTypeService.get({ directoryId: $localStorage['DMS-DIRECTORY']._id }).$promise;
                            }
                        ]
                    },
                    controller: [
                        '$scope',
                        '$state',
                        '$uibModalInstance',
                        'ListingType',
                        function($modalScope, $state, $uibModalInstance, ListingType) {
                            $modalScope.editFlag = (typeof index != 'undefined');
                            $modalScope.listingTypeArray = ListingType;
                            $modalScope.members = $modalScope.editFlag ? getObjectData($scope.organization.members[index]) : {};
                            $modalScope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $modalScope.add = function() {
                                $modalScope.members.listingName = $modalScope.members.listingType.codeValue;
                                $uibModalInstance.close({
                                    action: 'add',
                                    data: $modalScope.members
                                });
                            };
                            $modalScope.update = function() {
                                $modalScope.members.listingName = $modalScope.members.listingType.codeValue;
                                $uibModalInstance.close({
                                    action: 'edit',
                                    data: $modalScope.members
                                });
                            };
                        }
                    ]
                });
                modalInstance.result.then(function(op) {
                    if (!$scope.organization.members) $scope.organization.members = [];
                    $scope[op.action + 'Members'](index, op.data);
                });
            };

        }
    ]);
/*
subChildFilterData=_.filter(data,{"parentId":"578db77fc19cc73dbcbd1b4d"})
_.sortBy(subChildFilterData, [function(o) { return o.sequenceNo; }]);
*/
