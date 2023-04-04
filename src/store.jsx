import { legacy_createStore as createStore} from 'redux'
import root__reducer from "./redux/reducers/main";

const store = createStore(
    root__reducer
);

export default store;