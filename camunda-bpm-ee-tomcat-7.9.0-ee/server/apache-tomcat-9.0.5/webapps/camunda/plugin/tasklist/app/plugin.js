!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.TasklistPlugins=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d='<a href\n   ng-click="open()">\n  <span class="glyphicon glyphicon-paperclip"></span>\n  {{ \'CREATE_TASK\' | translate }}\n</a>\n',e='<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/standaloneTask/app/navbar/action/modals/cam-tasklist-create-task-modal.html -->\n<div class="modal-header">\n  <h3 class="cam-tasklist-create-task modal-title">{{ \'CREATE_TASK\' | translate }}</h3>\n</div>\n\n<div class="modal-body">\n\n  <div notifications-panel></div>\n\n  <form class="form-horizontal"\n        name="newTaskForm"\n        role="form">\n    <div ng-init="setNewTaskForm(this.newTaskForm)"></div>\n\n    <div class="form-group">\n      <label for="filter-form-color"\n             class="col-xs-2 control-label">{{ \'NEW_TASK_NAME\' | translate }}</label>\n      <div class="col-xs-10">\n        <input class="form-control"\n               name="taskName"\n               ng-model="task.name"\n               required\n               type="text" />\n        <span ng-if="this.newTaskForm.taskName.$invalid && this.newTaskForm.taskName.$dirty"\n              class="has-error">\n          <span ng-show="this.newTaskForm.taskName.$error.required"\n                class="help-block">\n            {{ \'REQUIRED_FIELD\' | translate }}\n          </span>\n        </span>\n      </div>\n    </div>\n\n    <div class="form-group">\n      <label for="filter-form-color"\n             class="col-xs-2 control-label">{{ \'NEW_TASK_ASSIGNEE\' | translate }}</label>\n      <div class="col-xs-10">\n        <input class="form-control"\n               name="taskAssignee"\n               ng-model="task.assignee"\n               type="text" />\n      </div>\n    </div>\n\n    <div class="form-group" ng-if="tenants">\n      <label for="filter-form-color"\n             class="col-xs-2 control-label">{{ \'NEW_TASK_TENANT_ID\' | translate }}</label>\n      <div class="col-xs-10">\n        <select class="form-control"\n                name="taskTenantId"\n                ng-model="task.tenantId">\n          <option ng-repeat="tenant in tenants" value="{{tenant.id}}">{{tenant.id}}</option>\n        </select>\n      </div>\n    </div>\n\n    <div class="form-group">\n      <label for="filter-form-color"\n             class="col-xs-2 control-label">{{ \'NEW_TASK_DESCRIPTION\' | translate }}</label>\n      <div class="col-xs-10">\n        <textarea class="form-control"\n                  name="taskDescription"\n                  ng-model="task.description"\n                  rows="4">\n        </textarea>\n      </div>\n    </div>\n\n  </form>\n\n</div>\n\n<div class="modal-footer">\n  <div class="row row-action">\n\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="$dismiss()">\n        {{ \'CLOSE\' | translate }}\n      </button>\n\n      <button class="btn btn-primary"\n              type="submit"\n              ng-click="save()"\n              ng-disabled="!isValid()">\n        {{ \'SAVE\' | translate }}\n      </button>\n    </div>\n\n  </div>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/standaloneTask/app/navbar/action/modals/cam-tasklist-create-task-modal.html -->\n',f=["$scope","$modal","$timeout",function(a,b,c){a.open=function(){var d=b.open({size:"lg",controller:"camCreateTaskModalCtrl",template:e});d.result.then(function(){a.$root.$broadcast("refresh"),document.querySelector(".create-task-action a").focus()},function(){document.querySelector(".create-task-action a").focus()}),d.opened.then(function(){c(function(){c(function(){document.querySelectorAll("div.modal-content input")[0].focus()})})})}}],g=function(a){a.registerDefaultView("tasklist.navbar.action",{id:"create-task-action",template:d,controller:f,priority:200})};g.$inject=["ViewsProvider"],b.exports=g},{}],2:[function(a,b,c){(function(a){"use strict";var c="undefined"!=typeof window?window.angular:"undefined"!=typeof a?a.angular:null;b.exports=["$scope","$translate","Notifications","camAPI",function(a,b,d,e){function f(){var b={userMember:a.authentication.name,includingGroupsOfUser:!0};i.list(b,function(b,c){c&&c.length>0&&(j.tenantId=c[0].id,c.length>1&&(a.tenants=c))})}var g={name:null,assignee:null,tenantId:null,description:null,priority:50},h=e.resource("task"),i=e.resource("tenant"),j=a.task=c.copy(g),k=null;f(),a.setNewTaskForm=function(a){k=a},a.$on("$locationChangeSuccess",function(){a.$dismiss()});var l=a.isValid=function(){return k&&k.$valid};a.save=function(){l()&&h.create(j,function(c){c?b("TASK_SAVE_ERROR").then(function(b){d.addError({status:b,message:c?c.message:"",exclusive:!0,scope:a})}):a.$close()})}}]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./action/cam-tasklist-navbar-action-create-task-plugin"),f=a("./action/modals/cam-tasklist-create-task-modal"),g=d.module("tasklist.plugin.standaloneTask.navbar.action",[]);g.config(e),g.controller("camCreateTaskModalCtrl",f),b.exports=g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./action/cam-tasklist-navbar-action-create-task-plugin":1,"./action/modals/cam-tasklist-create-task-modal":2}],4:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./navbar/main");b.exports=d.module("tasklist.plugin.standaloneTask",[e.name])}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./navbar/main":3}],5:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./variables/main");b.exports=d.module("tasklist.plugin.tasklistCard",[e.name])}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./variables/main":7}],6:[function(a,b,c){"use strict";var d='<div ng-repeat="(delta, info) in variableDefinitions"\n     ng-if="variablesByName[info.name] || filterProperties.showUndefinedVariable"\n     class="col-xs-12 col-lg-6">\n\n  <div class="row variable-item">\n    <span class="col-xs-4 col-lg-12">\n      <strong class="variable-label"\n              ng-class="{\'undefined\' : !variablesByName[info.name] && filterProperties.showUndefinedVariable}"\n              tooltip-placement="top"\n              tooltip="{{ info.name }}">\n        {{ info.label }}:\n      </strong>\n    </span>\n\n\n    <span class="col-xs-8 col-lg-12"\n          ng-if="!variablesByName[info.name] && filterProperties.showUndefinedVariable">\n      <span class="variable-value undefined"\n            translate="UNDEFINED_VARIABLE">\n        &lt;Undefined&gt;\n      </span>\n    </span>\n\n\n    <span class="col-xs-8 col-lg-12"\n          ng-if="(variablesByName[info.name] && variablesByName[info.name].value !== null) || variablesByName[info.name].type === \'Bytes\'"\n          ng-switch="variablesByName[info.name].type">\n      <span class="variable-value"\n            ng-switch-when="Date"\n            tooltip-placement="top"\n            tooltip="{{ variablesByName[info.name].value | camDate }}">\n        {{ variablesByName[info.name].value | camDate }}\n      </span>\n\n      <span class="variable-value"\n            ng-switch-when="Null">\n        {{ variablesByName[info.name].value }}\n      </span>\n\n      <a class="variable-value variable-type"\n         ng-if="!expanded"\n         ng-switch-when="Object"\n         ng-click="showValue(variablesByName[info.name], $event)">\n        {{ variablesByName[info.name].valueInfo.objectTypeName }}\n      </a>\n\n      <a class="variable-value variable-type"\n         ng-if="expanded"\n         ng-switch-when="Object"\n         ng-click="showValue(variablesByName[info.name], $event)"\n         href>\n        {{ variablesByName[info.name].valueInfo.objectTypeName }}\n      </a>\n\n      <a class="variable-value"\n         ng-if="!expanded"\n         ng-switch-when="Bytes"\n         ng-click="download(variablesByName[info.name], $event)">\n        {{ \'DOWNLOAD\' | translate }}\n        <span class="glyphicon glyphicon-download"></span>\n      </a>\n\n      <a class="variable-value"\n         ng-if="expanded"\n         ng-switch-when="Bytes"\n         ng-click="download(variablesByName[info.name], $event)"\n         href>\n        {{ \'DOWNLOAD\' | translate }}\n        <span class="glyphicon glyphicon-download"></span>\n      </a>\n\n      <span class="variable-value"\n            ng-switch-default\n            tooltip-placement="top"\n            tooltip="{{ variablesByName[info.name].value }}">\n        {{ variablesByName[info.name].value }}\n      </span>\n    </span>\n\n    <span class="col-xs-8 col-lg-12"\n      ng-if="variablesByName[info.name].value === null && variablesByName[info.name].type !== \'Bytes\'">\n      <span class="variable-value variable-empty-value"\n            translate="EMPTY_VALUE">Empty</span>\n    </span>\n  </div>\n\n</div>\n',e='<div class="modal-header">\n  <h3 class="modal-title">\n    <span translate="VARIABLE_VALUE">Value of</span>\n    {{ variable.name }}\n  </h3>\n</div>\n\n<div class="modal-body">\n  <div class="form-group">\n    <label translate="VARIABLE_VALUE_INFO">Value Info</label>\n  </div>\n  <div class="form-group">\n    {{ \'VARIABLE_OBJECT_TYPE_NAME\' | translate }}:\n    <code class="variable-type">{{ type }}</code>\n  </div>\n  <div class="form-group">\n    {{ \'VARIABLE_SERIALIZATION_DATA_FORMAT\' | translate }}:\n    <code class="variable-type">{{ dataFormat }}</code>\n  </div>\n\n  <div class="form-group">\n    <label translate="VARIABLE_VALUE">Value</label>\n  </div>\n\n   <ul class="nav nav-tabs">\n    <li ng-class="{ active: selectedTab === \'serialized\' }">\n      <a href ng-click="selectTab(\'serialized\')">{{ \'SERIALIZED\' | translate }}</a>\n    </li>\n    <li ng-class="{ active: selectedTab === \'deserialized\' }">\n      <a href ng-click="selectTab(\'deserialized\')">{{ \'DESERIALIZED\' | translate }}</a>\n    </li>\n  </ul>\n\n  <div ng-show="selectedTab === \'serialized\'" class="tab-content">\n    <textarea disabled\n              ng-model="value"\n              rows="10"\n              class="form-control input-xxlarge">\n    </textarea>\n  </div>\n  <div ng-show="selectedTab === \'deserialized\'" class="tab-content">\n    <div class="alert alert-warning"\n         role="alert" \n         ng-show="deserializationError">\n      <strong>{{ \'DESERIALIZATION_ERROR\' | translate }}</strong>:\n      {{ deserializationError }}\n    </div>\n    <div ng-show="!deserializationError">\n      <textarea disabled\n                ng-model="valueDeserialized"\n                rows="10"\n                class="form-control input-xxlarge">\n      </textarea>\n    </div>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <div class="row row-action">\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="submit"\n              ng-click="$dismiss()"\n              translate="CLOSE">Close</button>\n    </div>\n  </div>\n</div>\n',f=a("camunda-commons-ui/vendor/angular");b.exports=["$modal","$window","Uri",function(a,b,c){return{template:d,scope:{variables:"=",filterProperties:"="},link:function(d){d.variableDefinitions=[],d.variablesByName={},d.expanded=!1,d.shownVariablesCount=0,d.showValue=function(b,c){c.preventDefault(),c.stopPropagation(),a.open({template:e,windowClass:"variable-modal-detail",resolve:{details:function(){return b}},controller:"camTasklistVariablesDetailsModalCtrl"})},d.download=function(a,d){d.preventDefault(),d.stopPropagation();var e=a._links.self.href+"/data";e=c.appUri("engine://engine/:engine"+e),b.open(e,"download")},d.filterProperties&&(d.variableDefinitions=d.filterProperties.variables||{},f.forEach(d.variables,function(a){d.variablesByName[a.name]=a}),d.shownVariablesCount=Object.keys(d.filterProperties.showUndefinedVariable?d.variableDefinitions:d.variablesByName).length)}}}]},{"camunda-commons-ui/vendor/angular":17}],7:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./directives/cam-tasklist-variables"),f=a("./modals/cam-tasklist-variables-detail-modal"),g=d.module("tasklist.plugin.tasklistCard.variables",["ui.bootstrap","angularMoment"]),h=["ViewsProvider",function(a){a.registerDefaultView("tasklist.card",{id:"tasklist-card-variables",template:'<div cam-tasklist-variables filter-properties="filterProperties" variables="task._embedded.variable" class="row variables"></div>',controller:function(){},priority:200})}];g.config(h),g.directive("camTasklistVariables",e),g.controller("camTasklistVariablesDetailsModalCtrl",f),b.exports=g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./directives/cam-tasklist-variables":6,"./modals/cam-tasklist-variables-detail-modal":8}],8:[function(a,b,c){"use strict";b.exports=["$scope","$http","Uri","details",function(a,b,c,d){switch(a.$on("$locationChangeSuccess",function(){a.$dismiss()}),a.value=null,a.valueDeserialized=null,a.deserializationError=null,a.type=null,a.dataFormat=null,a.variable=d,a.selectedTab="serialized",a.variable.type){case"Object":a.type=a.variable.valueInfo.objectTypeName,a.value=a.variable.value,a.dataFormat=a.variable.valueInfo.serializationDataFormat,b({method:"GET",url:c.appUri("engine://engine/:engine"+a.variable._links.self.href)}).success(function(b){a.valueDeserialized=JSON.stringify(b.value)}).error(function(b){a.deserializationError=b.message});break;default:a.value=a.variable.value}a.selectTab=function(b){a.selectedTab=b}}]},{}],9:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./standaloneTask/app/plugin"),f=a("./tasklistCard/app/plugin"),g=a("./tasklistSorting/app/plugin");b.exports=d.module("tasklist.plugin.tasklistPlugins",[e.name,f.name,g.name])}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./standaloneTask/app/plugin":4,"./tasklistCard/app/plugin":5,"./tasklistSorting/app/plugin":10}],10:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./tasklistHeader/main");b.exports=d.module("tasklist.plugin.tasklistSorting",[e.name])}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./tasklistHeader/main":14}],11:[function(a,b,c){(function(c){"use strict";function d(a){return JSON.stringify(a.map(function(a){var b={sortBy:a.by,sortOrder:a.order};if(a.by.indexOf("Variable")>-1){if(!a.parameters)throw new Error("Variable sorting needs parameters");b.parameters=a.parameters}return b}))}var e='<span class="sorting-label hidden-xs hidden-sm hidden-md"\n      translate="SORT_BY"></span>\n\n<ol class="sorting-choice list-inline"\n    data-total="{{ sortings.length }}">\n  <li ng-repeat="(index, sorting) in sortings"\n      class="sorting-choice dropdown"\n      is-open="openDropdowns[index]"\n      on-toggle="openDropdown(index, open)">\n    <a href\n       class="glyphicon glyphicon-remove-sign"\n       ng-if="sortings.length > 1"\n       tabindex="0"\n       ng-click="removeSorting(index)"\n       tooltip-placement="bottom"\n       tooltip="{{ \'REMOVE_SORTING\' | translate }}"></a>\n\n    <a href\n       tabindex="0"\n       class="dropdown-toggle">\n      <span class="sort-by">{{ byLabel(index) }}</span>\n    </a>\n\n    <a href\n       tabindex="0"\n       tooltip="{{ (sorting.order === \'desc\' ? \'DESC\' : \'ASC\') | translate }}"\n       class="sort-direction glyphicon"\n       ng-class="sorting.order === \'asc\' ? \'glyphicon-menu-up\' : \'glyphicon-menu-down\'"\n       ng-click="changeOrder(index)"></a>\n\n    <ul cam-sorting-dropdown\n        options="availableOptions"\n        click-handler="changeSorting(index, id, type, value)"\n        reset-function="resetFunctions[index]"\n        change="true">\n    </ul>\n  </li>\n\n  <li class="dropdown new-sort"\n      is-open="openDropdownNew"\n      on-toggle="openDropdown(-1, open)">\n    <a href\n       class="dropdown-toggle">\n      <span class="glyphicon glyphicon-plus-sign"\n            tooltip="{{ \'ADD_SORT_BY\' | translate }}"></span>\n      <span class="hidden-xs hidden-sm hidden-md"\n            translate="ADD_SORT_BY"></span>\n    </a>\n\n    <ul cam-sorting-dropdown\n        options="availableOptions"\n        click-handler="addSorting(id, type, value)"\n        reset-function="resetFunctions[-1]">\n    </ul>\n  </li>\n</ol>\n',f=a("camunda-commons-ui/vendor/angular"),g="undefined"!=typeof window?window.jquery:"undefined"!=typeof c?c.jquery:null;b.exports=["search","$translate","$location","$timeout",function(a,b,c,h){return{restrict:"A",scope:{tasklistData:"="},template:e,controller:[function(){}],link:function(e,i){function j(){n&&h.cancel(n),n=h(function(){var a,b=g(i).parents(".columns"),c=g(i).parents("view"),d=b.find(".cell.top"),e=b.find(".cell.content"),f=l.hasClass("list-column-close");if(c.css("height","auto"),f)return a=parseInt(d.css("min-height"),10),d.css("height",a),void e.css("top",a);var h=c.height(),j=c.parent();g(j).height(h);var k=h;d.height(k),e.css("top",k+12),n=null},100)}function k(a){var b=a.parent().position().left,c=a.outerWidth()+b;c>i.outerWidth()&&a.css("left",i.outerWidth()-c+"px")}var l=g("body"),m=i.find(".new-sort .dropdown-menu");e.sortings=[{order:"desc",by:"created"}],e.openDropdowns=[],e.openDropdownNew=!1,e.sortedOn=[];var n;e.$on("layout:change",j),e.uniqueProps={priority:b.instant("PRIORITY"),created:b.instant("CREATION_DATE"),dueDate:b.instant("DUE_DATE"),followUpDate:b.instant("FOLLOW_UP_DATE"),nameCaseInsensitive:b.instant("TASK_NAME"),assignee:b.instant("ASSIGNEE")},e.byLabel=function(a){if(!e.sortings[a])return"";var b=e.sortings[a].by;return e.uniqueProps[b]?e.uniqueProps[b]:e.sortings[a]&&e.sortings[a].parameters?e.sortings[a].parameters.variable:""};var o=e.tasklistData.newChild(e);o.observe("taskListQuery",function(a){if(a){var b=JSON.parse((c.search()||{}).sorting||"[]");e.sortedOn=[],e.openDropdowns=[],e.availableOptions=f.copy(e.uniqueProps),e.sortings=b.map(function(a){e.sortedOn.push(a.sortBy),e.openDropdowns.push(!1),delete e.availableOptions[a.sortBy];var b={order:a.sortOrder,by:a.sortBy};return a.parameters&&(b.parameters=a.parameters),b}),e.sortings.length||(e.sortings.push({order:"desc",by:"created"}),e.updateSortings()),j()}}),e.$watch("sortings.length",function(a,b){a!==b&&e.updateSortings()}),e.$watch("sortings",j,!0),e.$watch("openDropdowns",function(a){var b=a.indexOf(!0),c=i.find("li.sorting-choice .dropdown-menu").css("left","auto");b>-1&&c[b]&&k(f.element(c[b]))},!0),e.$watch("openDropdownNew",function(a){a?k(m):m.css("left","auto")}),e.changeSorting=function(a,b,c,d){e.sortings[a].by=b,delete e.sortings[a].parameters,c&&(e.sortings[a].parameters={variable:d,type:c}),e.updateSortings(),h(function(){var b=document.querySelector("[cam-sorting-choices] li:nth-child(0n+"+(a+1)+") a.dropdown-toggle");b&&b.focus()})},e.resetFunctions=[],e.openDropdown=function(a,b){if(b){var c=e.sortings[a];c?e.resetFunctions[a](c.by,c.parameters&&c.parameters.type,c.parameters&&c.parameters.variable):e.resetFunctions[a]()}},e.updateSortings=function(){e.openDropdowns=[],e.sortedOn=e.sortings.map(function(a){return e.openDropdowns.push(!1),a.by}),a.updateSilently({sorting:d(e.sortings)}),o.changed("taskListQuery"),j()},e.addSorting=function(a,b,c){var d={order:"desc",by:a};b&&(d.parameters={variable:c,type:b}),e.sortings.push(d),e.updateSortings(),h(function(){var a=document.querySelector("[cam-sorting-choices] li:last-child a.dropdown-toggle");a&&a.focus()})},e.removeSorting=function(a){e.sortings.splice(a,1),e.updateSortings(),h(function(){var b;b=e.sortings.length!==a?document.querySelector("[cam-sorting-choices] li.sorting-choice:nth-child(0n+"+(a+1)+") a:first-child"):document.querySelector("[cam-sorting-choices] li.sorting-choice:nth-last-child(0n+2) a:first-child"),b&&b.focus()})},e.changeOrder=function(a){e.sortings[a].order="asc"===e.sortings[a].order?"desc":"asc",e.updateSortings(),h(function(){var b=document.querySelector("[cam-sorting-choices] li:nth-child(0n+"+(a+1)+") a.sort-direction");b&&b.focus()})}}}}]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"camunda-commons-ui/vendor/angular":17}],12:[function(a,b,c){"use strict";var d='<ul class="dropdown-menu">\n  <!-- single time selectable -->\n  <li ng-repeat="(name, label) in options">\n    <a href\n       tabindex="0"\n       translate="{{ label }}"\n       ng-click="handleClick($event, name)">\n    </a>\n  </li>\n\n  <li class="divider"\n      ng-if="hasOptions()"></li>\n\n  <!-- multiple times selectable -->\n  <li ng-repeat="(name, label) in sortableVariables"\n      ng-click="showInputs($event, name)"\n      ng-class="{\'active\': name === focusedOn}">\n    <a href\n       translate="{{ label }}"\n       tabindex="0"></a>\n\n    <div ng-show="name === focusedOn"\n         cam-sorting-inputs\n         change="change"\n         apply-handler="handleClick($event, name)"\n         variable="variable"\n         reset-function="resetInputs[name]"></div>\n  </li>\n\n</ul>\n';b.exports=["$translate",function(a){return{restrict:"A",replace:!0,template:d,scope:{options:"=",clickHandler:"&",change:"&",resetFunction:"="},link:function(b){b.change=b.$eval(b.change),b.variable={varName:"",varType:"Integer"},b.hasOptions=function(){return b.options&&Object.keys(b.options).length>0},b.resetInputs={},b.resetFunction=function(a,c,d){b.sortableVariables[a]?(b.focusedOn=a,b.variable.varType=c,b.variable.varName=d):(b.focusedOn=null,b.variable.varType="Integer",b.variable.varName="")},b.handleClick=function(a,c){b.sortableVariables[c]?b.clickHandler({$event:a,id:c,type:b.variable.varType,value:b.variable.varName}):b.clickHandler({$event:a,id:c})},b.sortableVariables={processVariable:a.instant("PROCESS_VARIABLE"),executionVariable:a.instant("EXECUTION_VARIABLE"),taskVariable:a.instant("TASK_VARIABLE"),caseExecutionVariable:a.instant("CASE_EXECUTION_VARIABLE"),caseInstanceVariable:a.instant("CASE_INSTANCE_VARIABLE")},b.showInputs=function(a,c){a.preventDefault(),a.stopPropagation(),b.focusedOn=c}}}}]},{}],13:[function(a,b,c){"use strict";var d='<div class="variable-inputs">\n  <div class="form-group">\n    <input type="text"\n           placeholder="{{ \'VARIABLE_NAME\' | translate }}"\n           class="form-control input-sm"\n           ng-model="variable.varName"\n           autofocus />\n  </div>\n\n  <div class="form-group">\n    <select class="form-control input-sm"\n            ng-model="variable.varType">\n      <option ng-repeat="(varType, varText) in variableTypes"\n              ng-selected="varType === variable.varType"\n              value="{{ varType }}">{{ varText }}</option>\n    </select>\n  </div>\n\n  <div class="form-group actions">\n    <button ng-click="applySorting($event)"\n            ng-disabled="!variable"\n            class="btn btn-primary btn-sm">\n      {{ (change ? \'CHANGE\' : \'ADD\') | translate }}\n    </button>\n  </div>\n</div>\n';b.exports=["$translate",function(a){return{restrict:"AC",replace:!0,template:d,scope:{change:"=",applyHandler:"&",resetFunction:"=",variable:"="},controller:["$scope",function(b){b.variableTypes={Boolean:a.instant("BOOLEAN"),Double:a.instant("DOUBLE"),Date:a.instant("DATE"),Integer:a.instant("INTEGER"),Long:a.instant("LONG"),Short:a.instant("SHORT"),String:a.instant("STRING")},b.applySorting=function(a){b.applyHandler({$event:a})}}]}}]},{}],14:[function(a,b,c){(function(c){"use strict";var d="undefined"!=typeof window?window.angular:"undefined"!=typeof c?c.angular:null,e=a("./cam-tasklist-sorting-choices"),f=a("./cam-tasklist-sorting-dropdown"),g=a("./cam-tasklist-sorting-inputs"),h=a("./tasklist-sorting"),i=d.module("tasklist.plugin.tasklistSorting.tasklistHeader",[]);i.directive("camSortingChoices",e),i.directive("camSortingDropdown",f),i.directive("camSortingInputs",g),i.config(h),b.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./cam-tasklist-sorting-choices":11,"./cam-tasklist-sorting-dropdown":12,"./cam-tasklist-sorting-inputs":13,"./tasklist-sorting":15}],15:[function(a,b,c){"use strict";var d=function(a){a.registerDefaultView("tasklist.header",{id:"tasklist-sorting",template:'<div cam-sorting-choices tasklist-data="tasklistData"></div>',controller:function(){},priority:200})};d.$inject=["ViewsProvider"],b.exports=d},{}],16:[function(a,b,c){"use strict";b.exports=a("angular")},{angular:"angular"}],17:[function(a,b,c){"use strict";b.exports=a("camunda-bpm-sdk-js/vendor/angular")},{"camunda-bpm-sdk-js/vendor/angular":16}]},{},[9])(9)});