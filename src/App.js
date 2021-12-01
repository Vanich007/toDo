import "bootstrap/dist/css/bootstrap.min.css";
import { Tasks } from "./components/Tasks/Tasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Search } from "./components/Search/Search";
import Layoute from "./layout/Layoute";

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Layoute>
          <Routes>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/" element={<Tasks />}></Route>
            <Route path=":slug" element={<Tasks />} />
          </Routes>
        </Layoute>
      </DndProvider>
    </Router>
  );
}

export default App;
