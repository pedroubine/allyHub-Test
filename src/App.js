import {Data} from "./Destinys/destiny";
import Form from "./Forms/form";
import './index.css';
function App() {
    const {paises} = Data();
    console.log(paises);
  return (
    <div>
        <Form />
    </div>
  );
}

export default App;
