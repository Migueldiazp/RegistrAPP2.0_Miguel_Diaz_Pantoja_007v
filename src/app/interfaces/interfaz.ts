export interface estado {

    status:string;
    data:datosFeriados[];

}

export interface datosFeriados {
    date:string;
    title:string;
    type:string;
    inalienable:boolean;
    extra:string;


}
