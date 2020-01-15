({  
    doInit:function(component,event,helper){  
        var action = component.get("c.getFiles");  
        action.setParams({  
            "recordId":component.get("v.recordId")  
        });      
        action.setCallback(this,function(response){  
            var state = response.getState();  
            if(state=='SUCCESS'){  
                var result = response.getReturnValue();  
                console.log('result: ' +result);  
                component.set("v.files",result);  
            }  
        });  
        $A.enqueueAction(action);  
    } , 
    
    checkfileType:function(component,event,helper){
        let fileType = event.getSource().get("v.value");
        //alert(fileType);
        if(fileType == 'Other File'){
            component.set("v.other",true);
        }
        else{
            component.set("v.other",false);
        }
        
        helper.verifyFileVersions(component,event,helper,fileType);
       /* 
        var action = component.get("c.verifyExistingFileVersions");
        action.setParams({
            "title":fileType
        });
        action.setCallback(this,function(response){  
            var state = response.getState();  
            if(state=='SUCCESS'){  
                var result = response.getReturnValue(); 
                alert(result);
                if(result.length > 0){
                    component.set("v.currentVersion",result);
                    
                    //Toast Message
                    var toastEvent = $A.get("e.force:showToast");  
                    toastEvent.setParams({  
                        "title": "Warning!",  
                        "message": "A version of this file already exist",
                        "type":"warning"
                    });  
                    toastEvent.fire(); 
                }
                else{
                    component.set("v.currentVersion",null);
                }
            }  
        });  
        $A.enqueueAction(action); */
    },
    
    findOtherfileCurrentVersion:function(component,event,helper){
        let fileType = event.getSource().get("v.value");
        //alert(fileType);
        helper.verifyFileVersions(component,event,helper,fileType);
    },
    //Open File onclick event  
    OpenFile :function(component,event,helper){  
        var rec_id = event.currentTarget.id;  
        $A.get('e.lightning:openFiles').fire({ //Lightning Openfiles event  
            recordIds: [rec_id] //file id  
        });  
    },  
    UploadFinished : function(component, event, helper) {  
        var uploadedFiles = event.getParam("files");  
        var documentId = uploadedFiles[0].documentId;  
        var fileName = uploadedFiles[0].name;  
        helper.UpdateDocument(component,event,documentId);  
        var toastEvent = $A.get("e.force:showToast");  
        toastEvent.setParams({  
            "title": "Success!",   
            "message": "File Uploaded successfully.",
            "type":"success"
        });  
        toastEvent.fire();  
        /* Open File after upload  
     $A.get('e.lightning:openFiles').fire({  
       recordIds: [documentId]  
     });*/  
   },  
})
