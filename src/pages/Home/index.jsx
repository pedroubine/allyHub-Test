import React from 'react';
import {useCities} from '../../services/citiesData'
import {useData} from '../../services/countryData'
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './styles.css';
import logo from '../../images/ally.png';
import * as yup from 'yup';

const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 250,
    }),
}

const schema = yup.object({
  name: yup.string('Coloque um nome válido').required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  cellphone: yup
    .string()
    .matches(new RegExp('[0-9]{2}[0-9]{4,5}[0-9]{4}'), 'Favor inserir um número de celular válido.')
    .required('O número é obrigatorio'),

  cpf: yup
    .string()
    .required('O cpf é obrigatório')
    .matches(new RegExp('[0-9]{11}'), 'Favor inserir um número de cpf válido.'),
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
    
    if(FormData.Cities === undefined  || FormData.Country.Cities === 0
        || FormData.Country === undefined || FormData.Country === 0) {
            alert("Favor escolher ao menos um país e cidade.")
        }
    else {    
        alert(JSON.stringify(FormData));
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(sendData)} className="form-container">
      <img alt="Logo Ally hub" src={logo} className="image_ally"/>
      <h1 className="title-page">Ally Forms</h1>
        <label className='label-form'>
          Nome
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
          Email
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
          Celular
          </label>
          <input
            className='input-form'
            placeholder="9999999-9999"
            type="text"
            id="cellphone"
            name="cellphone"
            inputMode="numeric"
            autoComplete="tel"
            {...register('cellphone', { required: true })}
          />
         <span className='error'> {errors.cellphone?.message}</span>
        <label className='label-form'>
          CPF
          </label>
          <input
          className='input-form'
            placeholder="12343223908"
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
              styles={customStyles}
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
              styles={customStyles}
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
