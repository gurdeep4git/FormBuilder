export class FormValue{
    title:string;
    layout:number;
    FieldsList:any[]
}

new FormValue();

export class FieldValue{
    id:number;
    title:string;
    type:string;
    Options?:CheckFields[]
}
new FieldValue();

export class CheckFields{
    count:number;
    OptionsList:CheckFieldsOptionsList[]
}
new CheckFields();

export class CheckFieldsOptionsList{
    title:string;
    value:any;
}
new CheckFieldsOptionsList();

export enum FormLayoutType{
    oneCol = 1,
    twoCol = 2
}

export enum FieldTypes{
    text = "text",
    number = "number",
    radio = "radio",
    date = "date",
    checkbox="checkbox",
    file = "file",
    button="button",
    color= "color",
    email="email",
    hidden="hidden",
    password="password",
    submit="submit",
    reset="reset",
    url="url",
    week="week"
}

