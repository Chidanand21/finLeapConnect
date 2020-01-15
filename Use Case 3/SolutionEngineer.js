({
    handleOnLoad : function(component, event, helper) {
          
    },
      
    handleOnSubmit : function(component, event, helper) {
         alert(event);
    },
      
    handleOnSuccess : function(component, event, helper) {
        alert('success');
        // component.set("v.reloadForm", false);
       // component.set("v.reloadForm", true);
    },
      
    handleOnError : function(component, event, helper) {
          
    },
      
})
