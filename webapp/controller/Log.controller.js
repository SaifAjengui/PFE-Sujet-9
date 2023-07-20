sap.ui.define([
	'./BaseController',
	'sap/ui/core/Core',
	'sap/ui/core/message/Message',
	'sap/ui/core/library'
], function(
	BaseController,
	Core,
	Message,
	coreLibrary
) {
		"use strict";
		// shortcut for sap.ui.core.MessageType
		var MessageType = coreLibrary.MessageType;

		return BaseController.extend("aymax.pfe.inventaire.controller.Log", {
			onInit: function () {
				this.oView = this.getView();

				// connect Message Manager
				this._MessageManager = Core.getMessageManager();
				this._MessageManager.registerObject(this.oView.byId("messageHandlingPage"), true);
				this.oView.setModel(this._MessageManager.getMessageModel(), "message");

				this._addMockMessages();

                this.displayModel = this.getOwnerComponent().getModel("displayModel");
                console.log(this.displayModel);
			},

			_addMockMessages: function () {

				if (this._MessageManager && !this._MessageManager.getMessageModel().oData.length) {
					var that = this;
					this._MessageManager.addMessages(
						[
							
							
						]
					);
				}
			}
		});
	});
