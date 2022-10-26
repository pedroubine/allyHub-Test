//import useForm from "react-hook-form"; *Poderia utlizar useForm para facilitar o trabalho de checagem de dados e erros e mandar informações..

const Form = (props) => {
    return (
        <div className="FormInput">
            <label>{props.title}</label>
            <input 
                type={props.type}
                id={props.id}
                name={props.name}
            />
        </div>
    );
}

const Forms = () => {
    return (
        <li className="FormsList">
            <Form title="Nome" type="text" id="name" name="name"/>
            <Form title="Email" type="email" id="email" name="email"/>
            <Form title="Celular" type="cel" id="cellphone" name="cellphone"/>
            <Form title="CPF" type="text" id="cpf" name="cpf"/>
            <Form title="País" type="text" id="country" name="country"/>
            <Form title="Cidade" type="text" id="cpf" name="cpf"/>
        </li>
    );
}

export default Forms;