sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
	function(UIComponent, oJson) {
		return UIComponent.extend("bh.Component", {
			metadata: {
				manifest: "json"
			},
			init: function() {
				// VVVVV important you have to maintain the name as UIComponent no oController and all
				UIComponent.prototype.init.apply(this);
				this.getRouter().initialize();
				var oSelJson = new oJson();
				var oJsonDet = {
					soId: "",
					items: null,
					itmSel: "",
					contact: {
						BusinessPartnerID: "",
						CompanyName: "",
						WebAddress: "",
						EmailAddress: "",
						PhoneNumber: "",
						FaxNumber: ""
					}
				};
				oSelJson.setData(oJsonDet);
				this.setModel(oSelJson, "selData");
			},
			destroy: function() {}
				//createContent:function(){

			////		var oApp = new sap.ui.view("idApp",
			// // {
			// // 	viewName: "bh.view.app",
			// // 	type: sap.ui.core.mvc.ViewType.XML
			// // });
			// // return oApp;
			//}

		});
	});