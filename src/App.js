import "bootstrap/dist/css/bootstrap.min.css";
import { Tasks } from "./components/Tasks/Tasks";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Tasks />;
    </Router>
  );
}

export default App;
