import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getCustomObjectData from '@salesforce/apex/firstApexClass.getCustomObjectData';
import saveCustomObjectRecord from '@salesforce/apex/firstApexClass.saveCustomObjectRecord';

export default class FirstLWC extends LightningElement {
    customObjectData;
    nameInput = '';
    notesInput = '';

    @wire(getCustomObjectData)
    wiredCustomObjectData({ error, data }) {
        if (data) {
            this.customObjectData = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleNameChange(event) {
        this.nameInput = event.target.value;
    }

    handleNotesChange(event) {
        this.notesInput = event.target.value;
    }

    saveRecord() {
        // Perform validation if needed
        saveCustomObjectRecord({ name: this.nameInput, notes: this.notesInput })
            .then(() => {
                // Clear input fields after saving
                this.nameInput = '';
                this.notesInput = '';

                // Refresh the data after saving
                return refreshApex(this.wiredCustomObjectData);
            })
            .catch(error => {
                console.error('Error saving record:', error);
            });
    }
}
