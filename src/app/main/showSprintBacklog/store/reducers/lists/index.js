import {combineReducers} from 'redux';
import pending from './pending.reducer';
import inProgress from './inProgress.reducer';
import toVerify from './toVerify.reducer';
import done from './done.reducer';

const Reducers = combineReducers({
    pending,
    inProgress,
    toVerify,
    done
});

export default Reducers;