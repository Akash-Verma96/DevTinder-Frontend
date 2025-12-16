import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./componants/NavBar";
import Body from "./componants/Body";
import Login from "./componants/Login";
import Profile from "./componants/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./componants/Feed";
import Connections from "./componants/Connections";
import Requests from "./componants/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Connections" element={<Connections />} />
              <Route path="/Requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
