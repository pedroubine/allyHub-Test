import axios from 'axios';
import { useEffect, useState } from 'react';

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://amazon-api.sellead.com/country')
      .then((res) => {
        let b = res.data.map((el) => ({ value: el.name, label: el.name_ptbr }));
        setData(b);
      })
      .catch((err) => {
        console.log('erro getting data');
        console.log(err);
      });
  }, []);
  return { data };
};
