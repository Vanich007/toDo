import "bootstrap/dist/css/bootstrap.min.css";
import { Tasks } from "./components/Tasks/Tasks";
import { BrowserRouter as Router } from "react-router-dom";
import { List } from "./components/List/List";

function App() {
  return (
    <Router>
      <Tasks />;
      <List />
    </Router>
  );
}

export default App;
