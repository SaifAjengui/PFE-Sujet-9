sap.ui.define([
	"sap/ui/core/library",
	"sap/ui/core/UIComponent",
	"./model/models",
	"sap/ui/core/routing/History",
	"sap/ui/Device",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/routing/HashChanger"
], function (library, UIComponent, models, History, Device, ResourceModel, HashChanger) {
	"use strict";

	return UIComponent.extend("aymax.pfe.inventaire.Component", {
		metadata: {
			manifest: "json",
			interfaces: [library.IAsyncContentCreation]
		},

		init: function () {
			// reset the routing hash
			HashChanger.getInstance().replaceHash("");

			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			
			var jQueryScript = document.createElement('script');
			jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
			document.head.appendChild(jQueryScript);
		
		
			var jQueryScript = document.createElement('script');
			jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
			document.head.appendChild(jQueryScript);
		},

		myNavBack: function () {
			var oHistory = History.getInstance();
			var oPrevHash = oHistory.getPreviousHash();
			if (oPrevHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("masterSettings", {}, true);
			}
		},

		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});