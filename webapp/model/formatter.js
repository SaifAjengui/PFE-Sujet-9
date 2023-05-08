sap.ui.define([
	"sap/base/strings/formatMessage",
	"sap/ui/thirdparty/jquery",
	"sap/ui/unified/calendar/Month",
	"sap/ui/unified/calendar/YearPicker"
], function (formatMessage,
	jquery,
	Month,
	YearPicker) {
	"use strict";

	return {
		formatMessage: formatMessage,

		/**
		 * Determines the path of the image depending if its a phone or not the smaller or larger image version is loaded
		 *
		 * @public
		 * @param {boolean} bIsPhone the value to be checked
		 * @param {string} sImagePath The path of the image
		 * @returns {string} path to image
		 */
		srcImageValue : function (bIsPhone, sImagePath) {
			if (bIsPhone) {
				sImagePath += "_small";
			}
			var sRootPath = jQuery.sap.getModulePath("aymax.pfe.inventaire");
			////// var sRootPath = sap.ui.require.toUrl("the.namespace");  // available since 1.58
 			//var sImagePath = sRootPath + "/images/.png";
			return sRootPath + sImagePath + ".png";
		},
		Anln1Format : function (Anln1){
			var value = "0".repeat(12-Anln1.length) + Anln1.toString();
			return value;
		},
		Anln2Format : function (Anln2){
			var value = "0".repeat(4-Anln2.length) + Anln2.toString();
			return value;
		},
		DateFormatExcel : function (Date){
			if(Date){
			var DateAr = Date.split("/");
			var Day = "0".repeat(2-DateAr[1].length) + DateAr[1];
			var Month = "0".repeat(2-DateAr[0].length) + DateAr[0];
			var Year = "20" + DateAr[2];
			return Year+"-"+Month+"-"+Day;
			}
		},
		DateFormat: function(inDate){
			if (inDate){
				var day;
				var month;
				var Year;
				if(typeof inDate === 'string'){
					
					var DateAr = inDate.split("/");
					day = "0".repeat(2-DateAr[0].length) + DateAr[0];
					month = "0".repeat(2-DateAr[1].length) + DateAr[1];
					Year =  DateAr[2];

			}
				else{
					inDate = new Date(inDate);
					month = (inDate.getMonth()+1);
					day = (inDate.getDate());
					Year = inDate.getFullYear();
					month = month.toString();
					month = "0".repeat(2- month.length)+month;
					day = day.toString();
					day = "0".repeat(2- day.length)+day;
					Year = Year.toString();
			}
				return Year+"-"+month+"-"+day+"T00:00:00";
			}
			
		},
	};
});