import "bootstrap/dist/css/bootstrap.min.css";
import { Tasks } from "./components/Tasks/Tasks";
import { BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { getIsFetching } from "./selectors/taskSelectors";

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Tasks />
      </DndProvider>
    </Router>
  );
}

export default App;
