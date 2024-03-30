import Home from "./routes/home/home.component";
import { Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<h1>Shop Page</h1>} />
        <Route path='contact' element={<h1>Contact page</h1>} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
