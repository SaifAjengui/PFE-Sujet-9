sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",

], function (BaseController, JSONModel, Device, Filter, FilterOperator,) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.Consultation", {
		

		onInit: function () {
		
		
		
		},

		onPress: function () {
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detailconsultation");
		},
			
	});
});