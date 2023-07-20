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
					Extnumber  : "ModificationExcel",
					Object     : "ZFLE",
					Subobject  : "ZFLE001",
					TimeStmp   : "\/Date("+TimeStmp+")\/",
					HeaderToItem:[]
				}
	var EdmType = exportLibrary.EdmType;
	return BaseController.extend("aymax.pfe.inventaire.controller.ModificationExcel", {
		formatter: formatter,
        onInit: function() {
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
			
		},onUpload: function (e) {
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
					Txt50: row["Désignation"],
					Txa50: row["Désignation (2)"],
					Anlhtxt: row["Txte n° princ.immo."],
					Menge: row["Quantité"],
					Meins: row["UQ base"],
					Lifnr: row["Fournisseur"],
					Aktiv: row["Date mise serv."],
					Urwrt: row["Valeur d'orig."],
					Kostl: row["Centre de coûts"],
					Werks: row["Division"],
					Gsber: row["Dom.activité"],
					Invnr: row["N° d'inventaire"],
					Invzu: row["Comment.invent."],
					Ivdat: row["Dern.inventaire"],
					Inken: row["Code inventaire"],
					//Inken: true,
				}

				if (context.Aktiv){
				context.Aktiv = formatter.DateFormatExcel(context.Aktiv)+"T00:00:00";
				}
				if (context.Ivdat){
					context.Ivdat = formatter.DateFormatExcel(context.Ivdat)+"T00:00:00";
				}
				if (context.Inken){
					context.Inken = formatter.CodeInventaire(context.Inken);
				}
				
				oModel.update("/ImmobilisationSet(Bukrs=" + "'"+context.Bukrs +"'"+','+"Anln1='"+context.Anln1 +"'"+','+"Anln2='"+context.Anln2 +"'"+ ")", context, {
				success: function(data, response){
					sap.m.MessageToast.show("Success"), {
						 duration: 3000
						 
					 };
					 let entry = that.getView().getModel('responseModel').getData();
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
						console.log("type : ",type.length);
						console.log("msg1 : ",msg1);
						console.log("msg2 : ",msg2);
						console.log("msg3 : ",msg3);
						console.log("msg4 : ",msg4);
						console.log("contextHeaderToItem : ",contextHeaderToItem);
					
						 
						
						
						oModel.create("/MessageHeaderSet", contextHeaderToItem, {
							success: function(data, response){
								sap.m.MessageToast.show("success"), {
									duration: 3000
								};
								}.bind(this),
								error: function(error,response){
									sap.m.MessageToast.show("error"), {
										duration: 3000
									};
							
								}.bind(this)
							});
						
						
						

				}.bind(this),
				error: function(error,response){
						
					let entry = that.getView().getModel('responseModel').getData();
					entry.messages.push(JSON.parse(response.headers['sap-message'])['message'])
					for(var i = 0; i < xModel.oData.messages.length; i+=2){

					   type=xModel.oData.messages[i].substring(0,1);
					   msg1=xModel.oData.messages[i].substring(2,52);
					   msg2=xModel.oData.messages[i].substring(52,102);
					   msg3=xModel.oData.messages[i].substring(102,152);
					   msg4=xModel.oData.messages[i].substring(152,202);
				   }
				   this.HeaderToItem();

					   console.log("type : ",type);
					   console.log("type : ",type.length);
					   console.log("msg1 : ",msg1);
					   console.log("msg2 : ",msg2);
					   console.log("msg3 : ",msg3);
					   console.log("msg4 : ",msg4);
					   console.log("contextHeaderToItem : ",contextHeaderToItem);
				   
					   
					   oModel.create("/MessageHeaderSet", contextHeaderToItem, {
						   success: function(data, response){
							   sap.m.MessageToast.show("success"), {
								   duration: 3000
							   };
							   }.bind(this),
							   error: function(error,response){
								   sap.m.MessageToast.show("error"), {
									   duration: 3000
								   };
						   
							   }.bind(this)
						   });
					   
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
				property: 'Désignation',
				type: EdmType.String
			});

			aCols.push({
				property: 'Désignation (2)',
				type: EdmType.String
			});

			aCols.push({
				property: 'Txte n° princ.immo.',
				type: EdmType.String
			});

			aCols.push({
				property: 'Quantité',
				type: EdmType.Number,
				
			});

			aCols.push({
				property: 'UQ base',
				type: EdmType.String
			});
	
			aCols.push({
				property: 'Fournisseur',
				type: EdmType.String
			});
			
	
			aCols.push({
				property: 'Date mise serv.',
				type: EdmType.Date
			});

			aCols.push({
				property: "Valeur d'orig.",
				type: EdmType.Number,
				
			});

			aCols.push({
				property: 'Centre de coûts',
				type: EdmType.String
			});

			aCols.push({
				property: 'Division',
				type: EdmType.String
			});

			aCols.push({
				property: 'Dom.activité',
				type: EdmType.String
			});
			
			aCols.push({
				property: "N° d'inventaire",
				type: EdmType.String
			});

			aCols.push({
				property: 'Comment.invent.',
				type: EdmType.String
			});
			
			aCols.push({
				property: 'Dern.inventaire',
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
				fileName: 'Modification Excel.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};
	
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
				oRouter.navTo("modificationhome", {}, true);
			}
		},
	});
});