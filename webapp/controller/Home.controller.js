sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	'aymax/pfe/inventaire/model/formatter'
], function (BaseController, JSONModel, Device, formatter) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.Home", {
		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				isPhone : Device.system.phone
			});
			this.setModel(oViewModel, "view");
			Device.media.attachHandler(function (oDevice) {
				this.getModel("view").setProperty("/isPhone", oDevice.name === "Phone");
			}.bind(this));
		},

		consultation: function () {
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("consultation");
		},
		modification: function () {
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("modification");
		},
		settings: function () {
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("settings");
		},
	});
});