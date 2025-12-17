sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("ehsm.controller.Login", {
        onInit: function () {
            // Initialization if needed
        },

        onLoginPress: function () {
            var sUser = this.getView().byId("userId").getValue();
            var sPass = this.getView().byId("password").getValue();

            if (!sUser || !sPass) {
                MessageToast.show("Please enter User ID and Password");
                return;
            }

            var oModel = this.getOwnerComponent().getModel();
            var that = this;

            // Busy Indicator
            sap.ui.core.BusyIndicator.show();

            oModel.read("/Z777_LOGIN", {
                success: function (oData, response) {
                    sap.ui.core.BusyIndicator.hide();
                    
                    // Logic to validate user - as requested by user, we match input against response
                    // Assuming response returns a list of users or a specific structure
                    // Since it is a GET entity set, it likely returns results array.
                    
                    var aResults = oData.results ? oData.results : [oData]; 
                    var bLoginSuccess = false;

                    // Simple check if the entered user exists in the returned list and password matches
                    // Note: This is client-side validation as requested by the prompt ("validate the response by matching the entered user_id and password from the service response")
                    for (var i = 0; i < aResults.length; i++) {
                        if (aResults[i].user_id === sUser && aResults[i].password === sPass) { 
                             bLoginSuccess = true;
                             break;
                        }
                    }

                    if (bLoginSuccess) {
                        MessageToast.show("Login Successful");
                        
                        // Store session
                        var oSessionModel = new JSONModel({
                            user_id: sUser,
                            isLoggedIn: true
                        });
                        that.getOwnerComponent().setModel(oSessionModel, "session");

                        // Navigate
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                        oRouter.navTo("RouteDashboard");
                    } else {
                        MessageBox.error("Invalid Credentials");
                    }
                },
                error: function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error("Service Error or Network Issue");
                }
            });
        }
    });
});
