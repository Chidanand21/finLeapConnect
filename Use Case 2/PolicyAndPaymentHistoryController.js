({
    doInit : function(component, event, helper) {
        
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        //alert('today'+today);
        component.set('v.today', today);
        
        var action = component.get("c.findReferenceId");
        action.setParams({ caseId : component.get("v.recordId") });
        
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                //alert("From server: " + response.getReturnValue());
                // String externalRecordId = response.getReturnValue();
                helper.getPolicies(component,event,helper);
                helper.getAllPaymentHistories(component,event,response.getReturnValue());
            }
            
        });
        
        
        $A.enqueueAction(action);
    }
})
