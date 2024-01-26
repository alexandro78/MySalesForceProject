public with sharing class firstApexClass {
    @AuraEnabled(cacheable=true)
    
    public static List<FirstCustomObject__c> getCustomObjectData() {
        return [SELECT Id, Notes__c FROM FirstCustomObject__c];
    }

    @AuraEnabled
    public static void saveCustomObjectRecord(String name, String notes) {
        FirstCustomObject__c newRecord = new FirstCustomObject__c(Name = name, Notes__c = notes);
        insert newRecord;
    }
}