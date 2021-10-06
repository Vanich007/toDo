import "bootstrap/dist/css/bootstrap.min.css";
import { Tasks } from "./components/Tasks/Tasks";
import { BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { getIsFetching } from "./selectors/taskSelectors";
import { Loader } from "./components/Loader/Loader";

function App() {
  const isFetching = useSelector(getIsFetching);
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className="container">{isFetching ? <Loader /> : <Tasks />}</div>
      </DndProvider>
    </Router>
  );
}

export default App;
