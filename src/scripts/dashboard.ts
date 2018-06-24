import "../sass/main.scss";

import { FormValue, FieldValue, FieldTypes, CheckFields, CheckFieldsOptionsList } from "./form-value";
import { Helper } from "./helper";

export class Dashboard{
    private LayoutRadio:string = "formLayout";
    private dNone:string = "d-none";
    private _fieldValue:FieldValue;
    private _formValue:FormValue;
    private _checkFields:CheckFields;
    private _checkFieldsOptionsList:CheckFieldsOptionsList;
    
    constructor(){
        this._formValue = new FormValue();
        this._fieldValue = new FieldValue();
        this._checkFields = new CheckFields();
        this._checkFieldsOptionsList = new CheckFieldsOptionsList();
        
        this._formValue.FieldsList=[];
        this._checkFields.OptionsList=[];
        
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
        $(document).on("click",".js-remove-field",(e)=>this.removeField($(e.target)));
        Helper.getFieldTypeDropdown().on("change",(e)=>this.showCheckFieldsArea($(e.target)));
        $("body").on("blur","#optionCount",()=>this.showInnerChekcFieldsArea());
        Helper.getAddOptionBtn().on("click",()=>this.addCheckFields());
    }

    private showInnerChekcFieldsArea():void{
        Helper.getInnerCheckFields().removeClass(this.dNone);
    }
    private showCheckFieldsArea(dropdown:JQuery<HTMLElement>):void{
        let selectedOption = dropdown.val();
        if(selectedOption == FieldTypes.radio){
            Helper.getCheckFieldsArea().removeClass(this.dNone);
        }
    }

    private addCheckFields():void{
        this._checkFields.count = parseInt(Helper.getOptionCount().val().toString().trim());
        this._checkFieldsOptionsList.title = Helper.getOptionText().val().toString().trim();
        this._checkFieldsOptionsList.value = Helper.getOptionValue().val().toString().trim();

        let optionItem = `<li class='list-group-item d-flex justify-content-between'>
        <div>
            Option text: <i>${this._checkFieldsOptionsList.title}</i>,
            Option value: <i>${this._checkFieldsOptionsList.value}</i>
        </div>
        <div><span class='fa fa-times'></span></div>
        </li>`;

        Helper.getAddOptionList().append(optionItem);
        Helper.getSelectedOptions().removeClass(this.dNone);

        Helper.getInnerCheckFields().find("input[type=text]").val("");

        let optionsObj ={
            title: this._checkFieldsOptionsList.title,
            value: this._checkFieldsOptionsList.value 
        };

        this._checkFields.OptionsList.push(optionsObj);

        let obj = {
            count:this._checkFields.count,
            opts:this._checkFields.OptionsList
        };
        console.log(obj);

    }

    private addMoreField(){
        Helper.getCheckFieldsArea().addClass(this.dNone);
        if(Helper.getFieldTitle().val()!=""){
            this._fieldValue.id = Math.floor((Math.random() * 100) + 1);
            this._fieldValue.title = Helper.getFieldTitle().val().toString().trim();
            this._fieldValue.type =  Helper.getFieldType().val().toString().trim();
            
            let listItem = `<li class='list-group-item d-flex justify-content-between' data-id='${this._fieldValue.id}'>
                            <div>Title: <i>${this._fieldValue.title}</i>, Type: <i>${this._fieldValue.type}</i></div>
                            <div><span class='fa fa-times js-remove-field'></span></div>
                            </li>`;

            Helper.getAddedaddedFieldsList().append(listItem);
            Helper.getselectedFieldsArea().removeClass(this.dNone);
            let  obj = {
                id:this._fieldValue.id,
                title:this._fieldValue.title,
                type:this._fieldValue.type
            };
            this._formValue.FieldsList.push(obj);
            this.clearFields();
        }
        else{
            $("#error-"+Helper.getFieldTitle()[0].id).show();
            return false;
        }
    }

    private clearFields(){
        Helper.getFieldTitle().val("");
    }
    //@ts-ignore
    private removeField(element): void{
        let currentId = element.closest(".list-group-item").attr("data-id");
        $.each(this._formValue.FieldsList,(i,item) => {
            if(item.id == currentId){
                this._formValue.FieldsList.splice(i,1);
            }
        });
        console.log(this._formValue.FieldsList);
        element.closest(".list-group-item").remove();
    }
    
    private submitForm(){
        if(Helper.getFormTitle().val()==""){
            $("#error-"+Helper.getFormTitle()[0].id).show();
            return false;
        }
        else if(!$("input[name="+this.LayoutRadio+"]").is(":checked")){
            //@ts-ignore
            let _a = $("input[name="+this.LayoutRadio+"]")[0].name;
            $("#error-"+_a).show();
            return false;
        }
        else if(this._formValue.FieldsList.length==0){
            alert("Please select atleast one form field!!!");
            return false;
        }
        // else if(Helper.getFormTitle().val()=="" && !$("input[name="+this.LayoutRadio+"]").prop("checked") && this._formValue.FieldsList.length==0){
        //     alert("Please fill the form accordingly!!!");
        //     return false;
        // }
        else{
            this._formValue.title = Helper.getFormTitle().val().toString().trim();
            this._formValue.layout = parseInt($("input[name="+this.LayoutRadio+"]:checked").val().toString());
            let formData = {
                title:this._formValue.title,
                layout:this._formValue.layout,
                formFieldsList:this._formValue.FieldsList
            }
            let SendformData = JSON.stringify(formData);
            window.sessionStorage.setItem("SendformData", SendformData);
            location.href = "layout.html";
        }
    }
}
new Dashboard();