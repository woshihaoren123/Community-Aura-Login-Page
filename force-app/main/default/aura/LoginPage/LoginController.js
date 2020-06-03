({
    initialize: function(component, event, helper) {
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap}).fire();    
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap2}).fire();
        
        component.set("v.communityForgotPasswordUrl", helper.getCommunityForgotPasswordUrl(component, event, helper));
        component.set("v.communitySelfRegisterUrl", helper.getCommunitySelfRegisterUrl(component, event, helper));
        component.set("v.language", helper.GetQueryString('language'));
        helper.getOrgId(component, event, helper);
        helper.getSiteURL(component, event, helper);
    },
    
	doLogin : function(component, event, helper) {    
        helper.doLogin(component, event, helper);
    },
    
    setStartUrl: function (component, event, helper) {
        var startUrl = event.getParam('startURL');
        startUrl = decodeURIComponent(startUrl);
        if(startUrl) {
            component.set("v.startUrl", startUrl);
        }
    },
    
    setExpId: function (component, event, helper) {
        var expId = event.getParam('expid');
        if (expId) {
            component.set("v.expid", expId);
        }
        helper.setBrandingCookie(component, event, helper);
    },
    
    onKeyUp: function(component, event, helper){
        //checks for "enter" key
        if (event.which===13) {
            helper.doLogin(component, event, helper);
        }
    },
    
    setBrandingCookie: function (component, event, helper) {
        var expId = component.get("v.expid");
        if (expId) {
            var action = component.get("c.setExperienceId");
            action.setParams({expId:expId});
            action.setCallback(this, function(a){ });
            $A.enqueueAction(action);
        }
    },
    
    goto: function (component, event, helper) {
    	
        var selectedItem = event.currentTarget;
        var url = selectedItem.dataset.record;
        window.open(url, "_self");
	},
    
    gotoRegister: function (component, event, helper) {
        var url = component.get('v.registrationyUrl');
        url = url.replace('{language}', component.get('v.language'));
        window.open(url, "_self");
	},
    
    gotoForget: function (component, event, helper) {
    	
        var url = component.get('v.forgetPasswdUrl');
        url = url.replace('{language}', component.get('v.language'));
        window.open(url, "_self");
	},
    
    trimName: function (component, event, helper) {
		helper.trimInput(component, 'v.username');
	},
    
    trimPassword: function (component, event, helper) {
    	helper.trimInput(component, 'v.passwd');
	},
    
})
