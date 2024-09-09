import ReactDOM from "react-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { withMask, useHookFormMask  } from 'use-mask-input';
import ConsumerCEP from "./ConsumerCEP";
import { SetStateAction, useState, useEffect, useRef } from "react";
import { cpf } from 'cpf-cnpj-validator'; 
import ConsumerCNPJ from "./ConsumerCNPJ";
import React from "react";
import {  z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';




const IFormInput = z.object({
  nome: z.string().min(3, 'Nome é obrigatório, nome deve-se ter mais de 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(3, 'telefone inválido'),
  cep: z.string().min(9, 'cep é obrigatório'),
  pf: z.any(),
  pj: z.any(),
  cpf: z.string(),
  cnpj: z.string(),
  razao: z.string(),
  bairro: z.string(),
  logradouro: z.string(),
  complemento: z.string(),
  ddd: z.string(),
  estado: z.string(),
  localidade:z.string(),
  nomeFantasia: z.string()
});

type FormData = z.infer<typeof IFormInput>;



export default function Form() {

    const inputElement = React.useRef();

    const [userForm, setUserFormEvento] = useState({
        valorCEP: "",
        valorCNPJ: "",
        ddd2: ""
    });

    const [userFormFixed, setUserFormFixo] = useState({
      valorBairro: "",
      valorLogradouro: "",
      valorComplemento: "",
      valorDDD: "",
      valorEstado: "",
      valorLocalidade: "",
      cepNovo: "",
      valorNomeFantasia: "",
      valorNomeRazao: ""
  });

  const [userss, setContent] = useState("")
  const [inputValue, setInputValue] = useState("");



  const setNomeRazao = (r: string) =>{
    setUserFormFixo((prev) => ({ ...prev, valorNomeRazao: r }))
  }

    const setNomeFantasia = (r: string) =>{
      setUserFormFixo((prev) => ({ ...prev, valorNomeFantasia: r }))
    }

    const setBairroCPF = (r: string) =>{
        setUserFormFixo((prev) => ({ ...prev, valorBairro: r }))
    }

    const setLogradouroCPF = (r: string) =>{
      setUserFormFixo((prev) => ({ ...prev, valorLogradouro: r }))
    }

    const setComplementoCPF = (r: string) =>{
      setUserFormFixo((prev) => ({ ...prev, valorComplemento: r }))
    }

    const setDDDCPF = (r: string) =>{
      setUserFormFixo((prev) => ({ ...prev, valorDDD: r }))
    }

    const setEstadoCPF = (r: string) =>{
      setUserFormFixo((prev) => ({ ...prev, valorEstado: r }))
    }

    const setLocalidadeCPF = (r: string) =>{
      setUserFormFixo((prev) => ({ ...prev, valorLocalidade: r }))
    }

    const [getValuePFPJ, setValuePFPJ] = useState("pj");

    const onOptionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      //console.log
      setValuePFPJ(e.target.value);
      console.log(e.target.value);
    }

   



  const { register, formState:{errors}, handleSubmit, clearErrors, setError  } = useForm<FormData>({
    mode: "onBlur",
    //reValidateMode: 'onBlur',
    resolver: zodResolver(IFormInput)
  });




  

  //console.log(errors);
  
  //console.log(errors.cep);
  //if(errors.cpf){
   // alert("valide o cpf tambem!")
    //clearErrors();
  //}

  const onSubmit: SubmitHandler<FormData> = (data) => {
   
    //console.log(data);
    console.log("############");
    
    alert(JSON.stringify(data));
    
  }
  const registerWithMask = useHookFormMask(register);


  return (
      <form onSubmit={handleSubmit(onSubmit)}>  
        <div className="form-group">

          {/* INPUT NOME */}
          <label>Nome Completo:</label>
            <input
              className={errors?.nome && "input-error"}
              type="text"
              placeholder="Nome Completo:"
              {...register("nome", {
                    required: true,
                    validate: (value) => value.indexOf(" ") !== -1,
                })
              }
          />
          {errors?.nome?.type === "required"   &&  (
            <p className="error-message">
              Campo Nome Não preenchido corretamente - campor requerido!</p>
          )}
          {errors?.nome?.type === "validate"   &&  (
            <p className="error-message">
              Campo Nome Não preenchido corretamente - requer sobrenome!</p>
          )}
          {errors.nome && <p>{errors.nome.message}</p>}
          
          
        
          {/* INPUT EMAIL */}
          <label>E-mail:</label>
          <input
            className={errors?.email && "input-error"}
            type="email"
            placeholder="Seu e-mail"
            {...register("email", { 
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
              })
            }
          />
          {errors?.email?.type === "pattern" && (
            <p className="error-message">Email é invalido.</p>
          )}
          {errors.email && <p>{errors.email.message}</p>}


          {/* INPUT TELEFONE */}
          <label>Telefone:</label>
          <input 
              className={errors?.telefone && "input-error"}
              type="text" 
              placeholder="Telefone:"
              {
                ...registerWithMask("telefone", ['(99)99999-9999'], {
                    required: true
                })
              }
            /> 
          {errors?.telefone?.type === "minLength" && (
                  <p className="error-message">Telefone Inválido</p>
          )}
          {errors.telefone && <p>{errors.telefone.message}</p>}


        <div className="form-group">
          <label>CEP:</label>
          <input
            className={errors?.cep && "input-error"}
            
            type="text"
            placeholder="cep:"
            value={userForm.valorCEP}
            {...registerWithMask("cep", ['99999-999'], {
                required: true,
                pattern: /^\d{5}-?\d{3}$/i,
                maxLength:9,
                onChange: (event) => {
                  event.target.value
                    setUserFormEvento((prev) => ({ ...prev, valorCEP: event.target.value }))
                }
            }
              )
            }
          />
          {errors?.cep?.type === "pattern"   &&  (
            <p className="error-message">Cep Inválido</p>
          )}
          {errors.cep && <p>{errors.cep.message}</p>}

          {userForm.valorCEP.length>7 &&  (
            <ConsumerCEP getCPF={userForm.valorCEP} 
                            getBairro_CPF={setBairroCPF}
                            getLogradouro_CPF={setLogradouroCPF}
                            getComplemento_CPF={setComplementoCPF}
                            getDDD_CPF={setDDDCPF}
                            getEstado_CPF={setEstadoCPF}
                            getLocalidade_CPF={setLocalidadeCPF}
              />

              
          ) 
        }


      

         {/* INPUT Bairro */}
          <label>Bairro:</label>
              <input
                readOnly 
                className={errors?.bairro && "input-error"}
                type="text"
                value={userFormFixed.valorBairro} 
                placeholder="Bairro:"
                {...register("bairro", {
                  onChange: (event) => { event.target.value}
                  })
                }
            />
            {errors?.bairro?.type === "required"   &&  (
              <p className="error-message">
                Campo Bairro Não preenchido corretamente - campor requerido!</p>
            )}
            

              <br></br>
            {/* INPUT Logradouro */}
          <label>Logradouro:</label>
              <input
                className={errors?.logradouro && "input-error"}
                type="text"
                value={userFormFixed.valorLogradouro}
                placeholder="Logradouro:"
                {...register("logradouro", {
                })
                }
            />
            {errors?.logradouro?.type === "required"   &&  (
              <p className="error-message">
                Campo Logradouro Não preenchido corretamente - campor requerido!</p>
            )}
            
            

            <br></br>
            {/* INPUT valorComplemento */}
          <label>Complemento:</label>
              <input
                className={errors?.complemento && "input-error"}
                type="text"
                value={userFormFixed.valorComplemento}
                placeholder="Complemento:"
                {...register("complemento", {
                })
                }
            />
            {errors?.complemento?.type === "required"   &&  (
              <p className="error-message">
                Campo Complemento Não preenchido corretamente - campor requerido!</p>
            )}
            


            <br></br>
            {/* INPUT ddd */}
          <label>valorDDD:</label>
              <input
              
                className={errors?.ddd && "input-error"}
                type="number"
                id="ddd"
                value={userFormFixed.valorDDD}
                //value={inputValue}
                
                placeholder="DDD:"
                {...register("ddd", {
                  //required:true
                  
                  //onChange: (event) => {
                    
                    //setInputValue( event.target.value )
                  //}


                  })
                } 
                //onChange={e => setInputValue(e.target.value)}
            />
            {errors?.ddd?.type === "required"   &&  ( 
              <p className="error-message">
                Campo ddd Não preenchido corretamente - campor requerido!</p>
            )}
            {errors.ddd && <p>{errors.ddd.message}</p>}


            <br></br>
            {/* INPUT Estado */}
          <label>Estado:</label>
              <input
                className={errors?.estado && "input-error"}
                type="text"
                value={userFormFixed.valorEstado}
                placeholder="Estado:"
                {...register("estado", {
                  })
                }
            />
            {errors?.estado?.type === "required"   &&  (
              <p className="error-message">
                Campo Estado Não preenchido corretamente - campor requerido!</p>
            )}
            

            



            <br></br>
            {/* INPUT Localidade */}
          <label>Localidade:</label>
              <input
                className={errors?.localidade && "input-error"}
                type="text"
                value={userFormFixed.valorLocalidade}
                placeholder="Localidade:"
                {...register("localidade", {
                  })
                }
            />
            {errors?.localidade?.type === "required"   &&  (
              <p className="error-message">
                Campo Localidade Não preenchido corretamente - campor requerido!</p>
            )}

    </div>
    
    <div className="form-group">    
    </div>


        <div className="App">
      <h3>Tipo de Pessoa:</h3>


      <input
        type="radio"
        name="getValuePFPJ"
        value="pf"
        id="medium"
        checked={getValuePFPJ === "pf"}
        onChange={onOptionChange}
        
      
      />
      <label htmlFor="pf">Pessoa Física</label>

      <input
        type="radio"
        name="getValuePFPJ"
        value="pj"
        id="large"
        
        checked={getValuePFPJ === "pj"}
        onChange={onOptionChange}
      />
      <label htmlFor="pj">Pessoa Jurídica</label>

      <p>
        Pessoa Selecionada: <strong>{getValuePFPJ}</strong>
      </p>
    </div>



    {getValuePFPJ === "pf"   &&  (
          <p className=""><br></br>
            <label>CPF:</label><br></br>
                    <input
                    className={errors?.cpf && "input-error"}
                    type="text"
                    placeholder="CPF:"
                    {...registerWithMask("cpf", ['999.999.999-99'], {
                        required: true,
                        pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i,
                        validate: (value) => cpf.isValid(value),
                        onChange: (eventoValor) => {}
                      })}

                    />
                    
                    {errors?.cpf?.type === "pattern" && (
                    <p className="error-message">cpf invalido.</p>
                    )}
                    {errors?.cpf?.type === "required" && (
                    <p className="error-message">valide o cpf!!.</p>
                    )}


          </p>
    )}



    {getValuePFPJ === "pj"   &&  (
              <p className="">
              <label>CNPJ:</label><br></br>
              <input
                className={errors?.cnpj && "input-error"}
                type="text"
                placeholder="CNPJ:"
                value={userForm.valorCNPJ}
                  {...registerWithMask("cnpj", ['99.999.999/9999-99'], {
                      required: true,
                      pattern:  /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/i,
                      onChange: (event) => {
                        event.target.value
                          setUserFormEvento((prev) => ({ ...prev, valorCNPJ: event.target.value }))
                      }
                  }  
                  )}
              />
              {errors?.cnpj?.type === "pattern"   &&  (
                <p className="error-message">Cnpj Inválido</p>
              )}
              

              {userForm.valorCNPJ.length>14 &&  (
                        <ConsumerCNPJ 
                              getCNPJ={userForm.valorCNPJ}
                              getNomeFantasia={setNomeFantasia}
                              getNomeRazao={setNomeRazao}
                                    />
                    )}

                <br></br><br></br>
                
                <label>Razão Social:</label><br></br>
                        <input
                        className={errors?.razao && "input-error"}
                        type="text"
                        placeholder="Razão Social:"
                        value={userFormFixed.valorNomeRazao}
                        { ...register("razao", {required: false})}
                        />
                        {errors?.razao?.type === "required"   &&  (
                        <p className="error-message">Razão Social requerido!!</p>
                        )}
                        {errors?.cpf?.type === "required" && (
                        <p className="error-message">valide o cpf!!.</p>
                        )}


                <br></br><br></br>
                <label>Nome Fantasia:</label><br></br>
                        <input
                        className={errors?.nomeFantasia && "input-error"}
                        type="text"
                        placeholder="Nome Fantasia:"
                        value={userFormFixed.valorNomeFantasia}
                        { ...register("nomeFantasia", {required: false})}
                        />
                        {errors?.nomeFantasia?.type === "required"   &&  (
                        <p className="error-message">Nome Fantasia requerido!!</p>
                        )}        
          </p>
    )}


      <input type="submit" />
      
      </div>
    </form>

  )
  
}




