import "bootstrap/dist/css/bootstrap.min.css";
import { Tasks } from "./components/Tasks/Tasks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Search } from "./components/Search/Search";

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Switch>
          <Route path="/search" component={Search}></Route>
          <Route path="/" component={Tasks}></Route>
        </Switch>
      </DndProvider>
    </Router>
  );
}

export default App;
