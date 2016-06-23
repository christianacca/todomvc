(function(){
    'use strict';
    
    angular.module('todomvc')
        .factory('sessionIdTelemetryInitializer', sessionIdTelemetryInitializer);
    
    sessionIdTelemetryInitializer.$inject = [];
    
    function sessionIdTelemetryInitializer() {
        var sessionId = Microsoft.ApplicationInsights.Util.newId();
        return function setSessionId(envelope) {
            envelope.tags['ai.session.id'] = sessionId;
        }
    }
})();