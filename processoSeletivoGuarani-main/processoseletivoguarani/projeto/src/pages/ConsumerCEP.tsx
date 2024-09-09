import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import { useForm } from 'react-hook-form';
import Form from "./Form";
import { userAgentFromString } from 'next/server';

interface IFormInput {
    argDef: string,
  }

type valoresCPF = {
    getCPF: string
    getBairro_CPF: any
    getLogradouro_CPF: any
    getComplemento_CPF: any
    getDDD_CPF: any
    getEstado_CPF: any
    getLocalidade_CPF: any
    
}



function ConsumerCEP(props: valoresCPF){
    const rec = props.getCPF;
    //useEffect(()=>{ 
    if(rec.indexOf("_")==-1){
        const url =`https://viacep.com.br/ws/${rec}/json/`;
        axios.get(url).then((response) =>{
            //console.log(response.data);
            props.getBairro_CPF(response.data.bairro);
            props.getLogradouro_CPF(response.data.logradouro);
            props.getComplemento_CPF(response.data.complemento);
            props.getDDD_CPF(response.data.ddd);
            props.getEstado_CPF(response.data.estado);
            props.getLocalidade_CPF(response.data.localidade);
        })
    }
    //}, [] );
    return <p></p>
    
}






export default ConsumerCEP;