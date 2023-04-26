sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	'aymax/pfe/inventaire/model/formatter'
], function (BaseController, JSONModel, Device, formatter) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.Settings", {
		formatter: formatter,

		onInit: function () {
			console.log("testttt");
		},

		
	});
});