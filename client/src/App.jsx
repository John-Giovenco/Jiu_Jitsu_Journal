import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home";
import MoveIndex from "./moves/MoveIndex";
import MoveDescription from "./moves/MoveDescription";
import Error404 from "./Error404";
import NewMoveForm from "./moves/NewMoveForm";
import EditMoveForm from "./moves/EditMoveForm";
import SignUpForm from "./users/SignUpForm";
import LoginForm from "./users/LoginForm";
import CurrentUserProvider from "./contexts/CurrentUser";

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={MoveDescription} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/moves" component={MoveIndex} />
          <Route exact path="/moves/new" component={NewMoveForm} />
          <Route exact path="/moves/:moveId" component={MoveDescription} />
          <Route exact path="/moves/:moveId/edit" component={EditMoveForm} />
          <Route path="/" component={Error404} />
        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
