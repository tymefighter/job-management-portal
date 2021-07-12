import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <div></div>
        </Provider>
    );
}

export default App;