import axios from "axios";
import { useEffect, useState } from "react";

export const Data = () => {
    const [paises, setPais] = useState([]);
    //const [cidades, setCidades] = useState([]);

    useEffect(() => {
        async function fetchApi() {
            await axios.get("https://amazon-api.sellead.com/country").then((res) =>{
                setPais(res.data);
            })
            .catch(err => {
                console.log("erro paises");
                console.log(err);
            })
        }
        fetchApi();
    },[])
    return {paises};
}