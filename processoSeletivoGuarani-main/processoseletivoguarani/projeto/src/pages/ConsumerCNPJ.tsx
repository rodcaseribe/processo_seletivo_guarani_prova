import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import { useForm } from 'react-hook-form';
import Form from "./Form";
import { userAgentFromString } from 'next/server';


interface IFormInput {
    argDef: string,
  }

type valoresCNPJ = {
    getCNPJ: string
    getNomeFantasia: any
    getNomeRazao: any
}


function ConsumerCNPJ(props: valoresCNPJ){

    const replaceOne = props.getCNPJ;
    const replaceTwo = replaceOne.replaceAll(".","");
    const replaceThree = replaceTwo.replaceAll("-","");
    const replaceFour = replaceThree.replaceAll("/","");
 
    if(replaceFour.length==14 && replaceFour.indexOf("_")==-1){
        console.log(replaceFour);
        console.log()
        const url =`http://localhost:3000/api/cnpj?cnpj=${replaceFour}`;
        useEffect(()=>{ // somente 1 request
            axios.get(url).then((response) =>{
                props.getNomeFantasia(response.data.fantasia);
                props.getNomeRazao(response.data.nome);
                if(response.data.status=="ERROR"){
                    alert(response.data.message);
                }
            }).catch(function (error) {
                if (error.response) {
                    alert("Erro recebido da receita - aguardar 1 minuto para nova consulta!");
                    } 
                    else if (error.request) {
                        console.log(error.request);
                    } 
                    else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
            }, [] );
    }

    return <p></p>
    
}




export default ConsumerCNPJ;