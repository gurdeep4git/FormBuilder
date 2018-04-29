class FormValue{
    title:string;
    layout:string;
}

export let formValue = new FormValue();

class FieldValue{
    id:number;
    title:string;
    type:string;
}

export let fieldValue = new FieldValue();

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

