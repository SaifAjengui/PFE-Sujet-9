sap.ui.define([
	'./BaseController',
	'sap/ui/core/Core',
	'sap/ui/core/message/Message',
	'sap/ui/core/library',
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'../model/logMessageType',
	'aymax/pfe/inventaire/model/formatter',
], function(
	BaseController,
	Core,
	Message,
	coreLibrary,
	Filter,
	FilterOperator,
	logMessageType,
	formatter
) {
		"use strict";
		// shortcut for sap.ui.core.MessageType
		var MessageType = coreLibrary.MessageType;

		return BaseController.extend("aymax.pfe.inventaire.controller.Log", {

			logMessageType: logMessageType,
			formatter: formatter,
			onInit: function () {
			
				// connect Message Manager
				this._MessageManager = Core.getMessageManager();
				this._MessageManager.registerObject(this.oView.byId("messageHandlingPage"), true);
				this.oView.setModel(this._MessageManager.getMessageModel(), "logModel");

				this._addMockMessages();

				this.logModel = this.getOwnerComponent().getModel("logModel");
				
                this._messageLog();

				this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("log").attachPatternMatched(this._messageLog, this);

			},

			_addMockMessages: function () {

				if (this._MessageManager && !this._MessageManager.getMessageModel().oData.length) {
					var that = this;
					this._MessageManager.addMessages(
						
							
						
					);
				}
			},

			_messageLog: function (oEvent) {
				
				this.getView().setBusy(true);
				var oModel = this.getOwnerComponent().getModel();
			 /* var mParam = {
			   
			success: function (oData) {
			this.getView().setBusy(false);
			 this.logModel.setData(oData.results);
			  }.bind(this)
			};*/
			oModel.read("/MessageItemsSet",{
				
				success: function (oData) {
				
					this.getView().setBusy(false);
					this.getView().getModel("logModel").setData(oData.results);
					
//this.getView().getModel("logModel").getData()
					console.log('logModel',this.getView().getModel("logModel").getData());

					 }.bind(this)
					 
			});
			
			
			

			},
			onFilter : function (oEvent) {
				// build filter array
				var aFilter = [], sQuery = this.byId("leaveSince").getProperty("value"),
				                  sQuery2 = this.byId("leaveSince2").getProperty("value"),
				// retrieve list control
				oList = this.getView().byId("_IDGenMessageView1"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");
				sQuery=formatter.DateFormatLog(sQuery);
				sQuery2=formatter.DateFormatLog(sQuery2);
				if (sQuery) {
				aFilter.push(new Filter("Object", FilterOperator.BT, ":"+sQuery,":"+sQuery2));
				}
				
				// apply filter. an empty filter array simply removes the filter
				// which will make all entries visible again
				oBinding.filter(aFilter);
				
				},
		});
	});
