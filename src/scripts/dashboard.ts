import "../sass/main.scss";

import { formValue, fieldValue, FieldTypes } from "./form-value";
import { Helper } from "./helper";

export class Dashboard{
    private LayoutRadio:string = "formLayout";
    private dNone:string = "d-none";
    private fieldsSelected:{id:any,title:any,type:any}[];

    constructor(){
        this.bindEvents();
        this.bindFieldTypesList();
    }

    private bindFieldTypesList(){
        let options="";
        for(let i in FieldTypes){
            if (!Number(i)) {
                options = options + `<option value='${FieldTypes[i]}'>${FieldTypes[i]}</option>`;
            }
        }
        Helper.getFieldType().append(options);
    }

    private bindEvents(){
        Helper.getSubmitButton().on("click",()=>this.submitForm());
        Helper.getaddMoreFieldBtn().on("click",()=>this.addMoreField());
    }

    private addMoreField(){
        let fieldId = Math.floor((Math.random() * 100) + 1);
        let fieldTitle = Helper.getFieldTitle().val();
        let fieldType =  Helper.getFieldType().val();
        let listItem = `<li class='list-group-item' data-id='${fieldId}'>Title: <i>${fieldTitle}</i>, Type: <i>${fieldType}</i></li>`;
        Helper.getAddedaddedFieldsList().append(listItem);
        Helper.getselectedFieldsArea().removeClass(this.dNone);
        let  obj = {
            id:fieldId,
            title:fieldTitle,
            type:fieldType
        };
        this.fieldsSelected.push(obj);
        this.clearFields();
    }

    private clearFields(){
        Helper.getFieldTitle().val("");
    }
    
    private submitForm(){
        let formtitle =  Helper.getFormTitle().val();
        let formlayout = $("input[name="+this.LayoutRadio+"]:checked").val();

    }
}
new Dashboard();