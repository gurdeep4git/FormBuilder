import "../sass/main.scss";
import { FormLayoutType } from './form-value';
//import * as OneColumnLayout from "./handlebars/oneColumn.hbs";

export class Layout{
    private sessionData:any = null;
    constructor(){
        this.getSessionData();
        this.bindEvents();
    }

    private getSessionData(){
        this.sessionData =  JSON.parse(sessionStorage.getItem("SendformData"));
        console.log(this.sessionData);
    }
    private bindEvents():void{
        $(window).on("load",()=>this.createForm(this.sessionData)); 
    }

    private createForm(data:any){
        if(data.layout == FormLayoutType.oneCol){
            this.generateOneCol(data);
        }
        else{
            this.generateTwoCol(data);
        }
    }

    private generateOneCol(data:any){
        let formHTML = `
        <form>
            <h3>${data.title}</h3>
            <div class="row">
                <div class="col-12">${this.getFieldsHTMLForOneCol(data.formFieldsList)}</div>
            </div>
        </form>
        `;
        $("#formContainer").append(formHTML);
    }

    private getFieldsHTMLForOneCol(fieldsList:any){
        let fieldHTML = '';
        for(let fields of fieldsList){
            console.log(fields);
            fieldHTML+= `
                <div class="form-group">
                    <label for="field-${fields.title}">${fields.title}</label>
                    <input type="${fields.type}" class="form-control" id="field-${fields.title}">
                </div>
            `;
        }
        return fieldHTML;   
        
    }

    private generateTwoCol(data:any){
        let formHTML = `
        <form>
            <h3>${data.title}</h3>
            <div class="row">
                ${this.getFieldsHTMLForTwoCol(data.formFieldsList)}
            </div>
        </form>
        `;
        $("#formContainer").append(formHTML);
    }

    private getFieldsHTMLForTwoCol(fieldsList:any){
        let fieldHTML = '';
        for(let fields of fieldsList){
            fieldHTML+= `
                <div class="col-6">
                    <div class="form-group">
                        <label for="field-${fields.title}">${fields.title}</label>
                        <input type="${fields.type}" class="form-control" id="field-${fields.title}">
                    </div>
                </div>
            `;
        }
        return fieldHTML;   
    }
}
new Layout();