import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCities = () => {
  const [cities, setCity] = useState([]);

  useEffect(() => {
    axios
      .get('https://amazon-api.sellead.com/city')
      .then((res) => {
        let b = res.data.map((el) => ({ value: el.name, label: el.name_ptbr }));
        setCity(b);
      })
      .catch((err) => {
        console.log('erro getting data');
        console.log(err);
      });
  }, []);
  return { cities };
};
