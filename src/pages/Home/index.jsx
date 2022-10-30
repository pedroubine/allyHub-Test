import React from 'react';
import {useCities} from '../../services/citiesData'
import {useData} from '../../services/countryData'
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './styles.css';
import logo from '../../images/ally.png';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string('Coloque um nome válido').required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  cellphone: yup
    .number("Favor utilizar somente números")
    .required('O celular é obrigatório')
    .typeError("Favor utilizar somente números"),

  cpf: yup
    .string()
    .required('O cpf é obrigatório')
    .length(11, 'É necessario 11 caracteres'),
});

const Home = () => {
  const { data } = useData();
  const { cities } = useCities();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  function sendData(FormData) {
    if(FormData.Cities.length === 0 || FormData.Cities === undefined 
        || FormData.Country.length === 0 || FormData.Country === undefined) {
            alert("Favor escolher ao menos um país e cidade.")
        }
    else {    
        alert(JSON.stringify(FormData));
    }
  }
  console.log(errors);
  return (
    <div className="container">
      <form onSubmit={handleSubmit(sendData)} className="form-container">
      <img alt="Logo Ally hub" src={logo} className="image_ally"/>
      <h1 className="title-page">Ally Forms</h1>
       <span className='description'>Por favor, preencha os campos abaixo para enviarmos a pesquisa! </span>
        <label className='label-form'>
          Nome:
          </label>
          <input
            className='input-form'
            placeholder="João Henrique de Oliveira"
            type="text"
            id="name"
            name="name"
            {...register('name', { required: true })}
          />
          <span className='error'> {errors.name?.message}</span>

        <label className='label-form'>
          Email:
          </label>
          <input
            className='input-form'
            placeholder="joao@email.com.br"
            type="text"
            id="email"
            name="email"
            {...register('email', { required: true })}
          />
          <span className='error'> {errors.email?.message}</span>
        <label className='label-form'>
          Celular:
          </label>
          <input
            className='input-form'
            placeholder="9999999-9999"
            type="tel"
            id="cellphone"
            name="cellphone"
            inputMode="numeric"
            autoComplete="tel"
            {...register('cellphone', { required: true })}
          />
         <span className='error'> {errors.cellphone?.message}</span>
        <label className='label-form'>
          CPF:
          </label>
          <input
          className='input-form'
            placeholder="123 432 239 08"
            type="text"
            id="cpf"
            name="cpf"
            {...register('cpf', { required: true })}
          />
          <span className='error'> {errors.cpf?.message}</span>
        {/* Dropdown com países com cidades */}
        <Controller
          control={control}
          name="Country"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              classNamePrefix="mySelect"
              placeholder="Escolhas os países"
              inputRef={ref}
              options={data}
              value={data.find((c) => c.value === value)}
              onChange={(val) => onChange(val.map((c) => c.value))}
              isMulti
            />
          )}
        />
        <Controller
          control={control}
          name="Cities"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              placeholder="Escolhas as cidades"
              inputRef={ref}
              options={cities}
              value={cities.find((c) => c.value === value)}
              onChange={(val) => onChange(val.map((c) => c.value))}
              isMulti
            />
          )}
        />
        <button type="submit" className='button-form'>Enviar</button>
      </form>
    </div>
  );
}

export default Home;
