import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import TelaMostraDadosAlunos from "./screens/TelaMostraDadosAlunos";
function App() {
  return (

    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
