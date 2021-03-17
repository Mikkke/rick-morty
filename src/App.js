import { BrowserRouter, Route } from "react-router-dom";
import DynamicCharacter from "./components/DynamicCharacter";
import Main from "./components/Main";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Main} />
      <Route path="/character/:id" component={DynamicCharacter} />
    </BrowserRouter>
  );
}

export default App;
