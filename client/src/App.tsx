import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import thunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import Footer from "./Footer";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route path="/companies"></Route>
                    <Route path="/jobs"></Route>
                    <Route path="/information"></Route>
                    <Route path="/"></Route>
                </Switch>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;