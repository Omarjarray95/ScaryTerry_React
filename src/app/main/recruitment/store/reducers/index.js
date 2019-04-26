import {combineReducers} from 'redux';
import quiz from './quiz.reducer';
import skills from './skills.reducer';
import quizzes from './quizzes.reducer';
import jobs from './jobs.reducer';
import application from './application.reducer';
import offer from './jobOffer.reducer';
import test from './test.reducer';
import applier from './applier.reducer';

const reducer = combineReducers({
    skills,
    quiz,
    quizzes,
    jobs,
    application,
    offer,
    test,
    applier
});

export default reducer;
