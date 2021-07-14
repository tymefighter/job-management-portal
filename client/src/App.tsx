import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import thunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "./common/Nav";
import Footer from "./common/Footer";
import Home from "./home/Home";
import Companies from "./companies/Companies";
import Jobs from "./jobs/Jobs";
import Information from "./information/Information";

import "./styles/App.scss";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="app">
                    <Nav />
                    <Switch>
                        <Route path="/companies">
                            <Companies />
                        </Route>
                        <Route path="/jobs">
                            <Jobs />
                        </Route>
                        <Route path="/information">
                            <Information />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;