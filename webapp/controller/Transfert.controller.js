sap.ui.define([
	'./BaseController',
	"sap/ui/model/json/JSONModel",
	'aymax/pfe/inventaire/model/formatter',
	"sap/ui/core/routing/History",
	'sap/ui/export/Spreadsheet',
	'sap/ui/export/library',
], function(
	BaseController,
	JSONModel,
	formatter,
	History,
	Spreadsheet,
	exportLibrary
) {
	"use strict";
	var type;
	var msg1;
	var msg2;
	var msg3;
	var msg4;
	let TimeStmp = new Date().getTime();
	var contextHeaderToItem=
				{
					Extnumber  : "Transfert",
					Object     : "ZFLE",
					Subobject  : "ZFLE001",
					TimeStmp   : "\/Date("+TimeStmp+")\/",
					HeaderToItem:[]
				}
	var EdmType = exportLibrary.EdmType;
	return BaseController.extend("aymax.pfe.inventaire.controller.Transfert", {
		formatter: formatter,
        onInit: function() {
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
		},
		onUpload: function (e) {
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},_import: function (file) {
			var that = this;
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function (sheetName) {
						// Here is your object for every sheet in workbook
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	
					});
					// Setting the data to the local model 
					that.localModel.setData({
						items: excelData
					});
					that.localModel.refresh(true);
					that.byId("loaded_assets_num").setText("Immobilisations("+that.getModel('localModel').getData().items.length+")");
					console.log(that.getModel("localModel").getData().items)
				};
				reader.onerror = function (ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},

		HeaderToItem: function(oEvent) {

			contextHeaderToItem.HeaderToItem.push(
				{
				Msgty      : type, 
				Msgv1      : msg1,
				Msgv2      : msg2,
				Msgv3      : msg3,
				Msgv4      : msg4,
				Object     : "ZFLE",
				Subobject  : "ZFLE001",
				TimeStmp   : "\/Date("+TimeStmp+")\/"
				}
			
				)
		},
	
		uploadExcel: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var data = this.getModel("localModel").getData().items;
			var that = this;
			var context;
			var xModel = new JSONModel({
				messages: []
			})
			
			this.getView().setModel(xModel, 'responseModel');
			data.forEach(row => {
				context ={
					Bukrs : row["Société"],
					Anln1: row["Immobilisation"],
					Anln2: row["Nº subsidiaire"],		
					AfabePost: row["Tableau d'éval."],
					Bldat: row["Date document"],
					Budat: row["Date comptable"],
					Bzdat: row["Date de référ."],
					Sgtxt: row["Texte"],
					Anlu1: row["Immobilisation cible"],
                    Anlu2: row["Nº subsidiaire cible"],
					
				}
				if (context.Bldat){
					context.Bldat = formatter.DateFormatExcel(context.Bldat)+"T00:00:00";
				}
				if (context.Budat){
					context.Budat = formatter.DateFormatExcel(context.Budat)+"T00:00:00";
				}
				if (context.Bzdat){
					context.Bzdat = formatter.DateFormatExcel(context.Bzdat)+"T00:00:00";
				}
				
				
				oModel.create("/TransfertSet", context, {
				success: function(data, response){
					
					 /*let entry = that.getView().getModel('responseModel').getData();
					 entry.messages.push(JSON.parse(response.headers['sap-message'])['message'])
					 entry.messages.push(JSON.parse(response.headers['sap-message'])['severity'])
					 var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("log");

					for(var i = 0; i < xModel.oData.messages.length; i+=2){

						type=xModel.oData.messages[i].substring(0,1);
						msg1=xModel.oData.messages[i].substring(2,52);
						msg2=xModel.oData.messages[i].substring(52,102);
						msg3=xModel.oData.messages[i].substring(102,152);
						msg4=xModel.oData.messages[i].substring(152,202);
					}

					this.HeaderToItem();


						console.log("type : ",type);
						console.log("msg1 : ",msg1);
						console.log("msg2 : ",msg2);
						console.log("msg3 : ",msg3);
						console.log("msg4 : ",msg4);
						console.log("contextHeaderToItem : ",contextHeaderToItem);
					
						
						oModel.create("/MessageHeaderSet", contextHeaderToItem, {
							success: function(data, response){
								
								}.bind(this),
								error: function(error,response){
								
							
								}.bind(this)
							});
						
						*/
							sap.m.MessageToast.show("success"), {
								duration: 3000
							};

				}.bind(this),
				error: function(error,response){
						
					/* let entry = that.getView().getModel('responseModel').getData();
					 //entry.messages.push(JSON.parse(response.headers['sap-message'])['message'])
					 for(var i = 0; i < xModel.oData.messages.length; i+=2){

						type=xModel.oData.messages[i].substring(0,1);
						msg1=xModel.oData.messages[i].substring(2,52);
						msg2=xModel.oData.messages[i].substring(52,102);
						msg3=xModel.oData.messages[i].substring(102,152);
						msg4=xModel.oData.messages[i].substring(152,202);
					}
					this.HeaderToItem();

						console.log("type : ",type);
						console.log("msg1 : ",msg1);
						console.log("msg2 : ",msg2);
						console.log("msg3 : ",msg3);
						console.log("msg4 : ",msg4);
						console.log("contextHeaderToItem : ",contextHeaderToItem);
					
						
						oModel.create("/MessageHeaderSet", contextHeaderToItem, {
							success: function(data, response){
								
								}.bind(this),
								error: function(error,response){
									
							
								}.bind(this)
							});

							*/
							
							sap.m.MessageToast.show("error"), {
								duration: 3000
							};
				}.bind(this)
				
			});
			});
			
		},
				
	
		createColumnConfig: function() {
			var aCols = [];
	
			
	
			aCols.push({
				property: 'Société',
				type: EdmType.String
			});
	
			aCols.push({
				property: 'Immobilisation',
				type: EdmType.String
			});
	
			aCols.push({
				property: 'Nº subsidiaire',
				type: EdmType.String,
				
			});
	
			aCols.push({
				property: "Tableau d'éval.",
				type: EdmType.Number
			});
	
	
			aCols.push({
				property: 'Date comptable',
				type: EdmType.Date
			});

			aCols.push({
				property: 'Date document',
				type: EdmType.Date
			});
	
			aCols.push({
				property: 'Date de référ.',
				type: EdmType.Date
			});
			
			aCols.push({
				property: 'Texte',
				type: EdmType.String
			});

			aCols.push({
				property: 'Immobilisation cible',
				type: EdmType.String
			});
			
			aCols.push({
				property: 'Nº subsidiaire cible',
				type: EdmType.String
			});
			
	
			return aCols;
		},
		
		onDownTempPressed: function (oEvent) {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
	
			if (!this._oTable) {
				this._oTable = this.byId('Excel_data_table');
			}
	
			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();
	
			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: [],
				fileName: 'Transfert.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};
			console.log(oSettings)
	
			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
			
		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("home", {}, true);
			}
		},
	});
});