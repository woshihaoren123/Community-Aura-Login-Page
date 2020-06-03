({
    qsToEventMap: {
        'startURL'  : 'e.c:setStartUrl'
    },
    
    qsToEventMap2: {
        'expid'  : 'e.c:setExpId'
    },
    
    getCommunityForgotPasswordUrl : function (component, event, helpler) {
        var action = component.get("c.getForgotPasswordUrl");
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.communityForgotPasswordUrl',rtnValue);
            }
        });
        $A.enqueueAction(action);
    },
    
    getCommunitySelfRegisterUrl : function (component, event, helpler) {
        var action = component.get("c.getSelfRegistrationUrl");
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.communitySelfRegisterUrl',rtnValue);
            }
        });
        $A.enqueueAction(action);
    },
    
    getOrgId : function (component, event, helpler) {
        var action = component.get("c.getOrgId");
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.orgId',rtnValue);
            }
        });
        $A.enqueueAction(action);
    },
    
    getSiteURL : function (component, event, helpler) {
        var action = component.get("c.getSiteURL");
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.encodedSiteUrl',rtnValue);
                this.getAuthProviders(component, event, helpler);
            }
        });
        $A.enqueueAction(action);
    },
    
    getAuthProviders : function (component, event, helpler) {
        
        var action = component.get("c.getAuthProviders");
        var responseType = component.get("v.responseType");
        var clientId = component.get("v.clientId");
        var redirectUri = component.get("v.redirectUri");
        var state = component.get("v.state");
        var startUrl = component.get("v.startUrl");           
        var baseUrl = component.get("v.encodedSiteUrl") + '/services/auth/sso/';
        redirectUri = redirectUri.replace('{language}', component.get('v.language'));
        
        action.setParams({
            startUrl: startUrl
        });
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                for(var i = 0; i < rtnValue.length; i++) {
                    var item = rtnValue[i];
                    if(item.DeveloperName == 'GoogleProvider'){
                        
                        var url = '/services/oauth2/authorize?response_type=token' + '&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=openid&token_type=Bearer';
                        url = encodeURIComponent(url);           
                        item.startUrl = baseUrl + item.DeveloperName + '?startURL=' + url;
                        
                    } else {
                        var url = '/services/oauth2/authorize?response_type=' + responseType + '&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&state=' + state;
                        url = encodeURIComponent(url);           
                        item.startUrl = baseUrl + item.DeveloperName + '?startURL=' + url;
                    }
                }
                component.set('v.authProviders',rtnValue);                             
            }
        });
        $A.enqueueAction(action);
    },
    
    doLogin : function(component, event, helper) {              
        
        var loginAction = component.get("c.myLogin");
        var startUrl = component.get("v.startUrl");    
        loginAction.setParams({
            username: component.get("v.username"),
            password: component.get("v.passwd"),
            startUrl: startUrl,
        });
        loginAction.setCallback(this, function(response) {
            var state = response.getState();     
            if (state == 'SUCCESS') {  
                var res = response.getReturnValue();
                component.set("v.errorStatus", res.code); 
            }
            
        });
        $A.enqueueAction(loginAction);
    },
    
    trimInput : function(component, input) {     	
        var text = component.get(input).trim();
        component.set(input, text);
    },    
    
    GetQueryString : function(name){
        var query = window.location.search.substring(1);   
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == name){
                return pair[1];
            }
        }
        return '';
        
    }
})
