sap.ui.define([
	'./BaseController',
	'sap/ui/Device',

], function (
	BaseController,

	Device,

) {
	"use strict";



	return BaseController.extend("aymax.pfe.inventaire.controller.App", {

		_bExpanded: true,

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			// if the app starts on desktop devices with small or medium screen size, collaps the side navigation
			if (Device.resize.width <= 1024) {
				this.onSideNavButtonPress();
			}

			Device.media.attachHandler(this._handleWindowResize, this);
			this.getRouter().attachRouteMatched(this.onRouteChange.bind(this));
		},

	

		onRouteChange: function (oEvent) {
			this.getModel('side').setProperty('/selectedKey', oEvent.getParameter('name'));

			if (Device.system.phone) {
				this.onSideNavButtonPress();
			}
		},

		
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("app");
			var bSideExpanded = oToolPage.getSideExpanded();
			// this._setToggleButtonTooltip(bSideExpanded);
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		
	
		
		/**
		 * Returns a promise which resolves with the resource bundle value of the given key <code>sI18nKey</code>
		 *
		 * @public
		 * @param {string} sI18nKey The key
		
		 * @returns {Promise<string>} The promise
		 */
		getBundleText: function (sI18nKey) {
			return this.getBundleTextByModel(sI18nKey, this.getModel("i18n"));
		},
		
		_handleWindowResize: function (oDevice) {
			if ((oDevice.name === "Tablet" && this._bExpanded) || oDevice.name === "Desktop") {
				this.onSideNavButtonPress();
				// set the _bExpanded to false on tablet devices
				// extending and collapsing of side navigation should be done when resizing from
				// desktop to tablet screen sizes)
				this._bExpanded = (oDevice.name === "Desktop");
			}
		}
	

	});
});