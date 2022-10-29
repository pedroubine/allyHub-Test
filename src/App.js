import  {useData}  from "./Destinys/useData";
import { useCities } from "./Destinys/useCities";
import Select from "react-select";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import * as yup from "yup";
import './index.css';


const schema = yup.object({
    name:  yup.string("Coloque um nome válido")
                    .required("O nome é obrigatório"),
    email: yup.string()
                    .email("Digite um email válido")
                    .required("O email é obrigatório"),
    cellphone: yup.string()
                    .max(12,"Número de celular invalido")
                    .required("O celular é obrigatório"),
                    
    cpf: yup.string()
                    .required("O cpf é obrigatório")
                    .length(11,"É necessario 14 caracteres")
                    
})

const normalizeCellphoneNumber= (value) => {
    value.maxLength = 9;
    return value.replace(/\D/g, "").replace(/^(\d{5})/)
}

function App() {
    const { data } = useData();
    const { cities} = useCities();

    
    const {register, handleSubmit, formState: {errors}, control} = useForm(
        {resolver: yupResolver(schema)}
    );

    function sendData(FormData){
        alert(JSON.stringify(FormData))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(sendData)}>
                <div className="CardFormList">
                    <h1>Informações pessoais</h1>
                    <label>Nome
                        <input
                            placeholder="João Henrique de Oliveira"
                            type="text"
                            id="name"
                            name="name"
                            {...register("name", {required:true})}
                        />
                        <span>{errors.name?.message}</span>
                    </label>
                    <div/>

                    <label>Email
                        <input
                            placeholder="joao@email.com.br"
                            type="text" //Usando text para não conflitar validação.
                            id="email"
                            name="email"
                            {...register("email", {required:true})}
                        />
                        <span>{errors.email?.message}</span>
                    </label>
                    <div/>

                    <label>Celular
                        <input
                            placeholder="9999999-9999"
                            type="tel"
                            id="cellphone"
                            name="cellphone"
                            inputMode="numeric"
                            autoComplete="tel"
                            {...register("cellphone", {required:true})}

                        />
                        <span>{errors.cellphone?.message}</span>
                    </label>
                    <div/>

                    <label>CPF
                        <input
                            placeholder="123 432 239 08"
                            type="text"
                            id="cpf"
                            name="cpf"
                            {...register("cpf", {required:true})}
                        />
                        <span>{errors.cpf?.message}</span>
                    </label>
                </div>
                {/* Dropdown com países com cidades */}
                <div className="CardSelect">
                    <Controller
                        control={control}
                        name="Country"
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                placeholder="Escolhas os países"
                                inputRef={ref}
                                options={data}
                                value={data.find((c) => c.value === value)}
                                onChange={(val) => onChange(val.map((c) =>c.value))}
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
                                onChange={(val) => onChange(val.map((c) =>c.value))}
                                isMulti
                                
                                />
                            )}
                        />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App;
