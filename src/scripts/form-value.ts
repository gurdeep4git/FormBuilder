export class FormValue{
    title:string;
    layout:string;
    FieldsList:any[]
}

new FormValue();

export class FieldValue{
    id:number;
    title:string;
    type:string;
}
new FieldValue();

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

