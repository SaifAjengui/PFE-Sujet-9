sap.ui.define([
	"sap/base/strings/formatMessage",
	"sap/ui/thirdparty/jquery"
], function (formatMessage,jQuery) {
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
		}

		
	};
});