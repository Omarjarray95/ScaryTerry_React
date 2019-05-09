import axios from 'axios';
import {getFilters} from './filters.actions';
import {getFolders} from './folders.actions';
import {getLabels} from './labels.actions';

export const GET_TODOS = '[TODO APP] GET TODOS';
export const UPDATE_TODOS = '[TODO APP] UPDATE TODOS';
export const TOGGLE_STARRED = '[TODO APP] TOGGLE STARRED';
export const TOGGLE_COMPLETED = '[TODO APP] TOGGLE COMPLETED';
export const TOGGLE_IMPORTANT = '[TODO APP] TOGGLE IMPORTANT';
export const UPDATE_TODO = '[TODO APP] UPDATE TODO';
export const ANSWER_TODO = '[TODO APP] ANSWER TODO';
export const ADD_TODO = '[TODO APP] ADD TODO';
export const REMOVE_TODO = '[TODO APP] REMOVE TODO';
export const SET_SEARCH_TEXT = '[TODO APP] SET SEARCH TEXT';
export const OPEN_NEW_TODO_DIALOG = '[TODO APP] OPEN NEW TODO DIALOG';
export const CLOSE_NEW_TODO_DIALOG = '[TODO APP] CLOSE NEW TODO DIALOG';
export const OPEN_EDIT_TODO_DIALOG = '[TODO APP] OPEN EDIT TODO DIALOG';
export const CLOSE_EDIT_TODO_DIALOG = '[TODO APP] CLOSE EDIT TODO DIALOG';
export const TOGGLE_ORDER_DESCENDING = '[TODO APP] TOGGLE ORDER DESCENDING';
export const CHANGE_ORDER = '[TODO APP] CHANGE ORDER';

export function getData(match)
{
    return (dispatch) => {
        Promise.all([
            dispatch(getFilters()),
            dispatch(getFolders()),
            dispatch(getLabels())
        ]).then(
            () => dispatch(getTodos(match)));
    }
}

export function getTodos(match)
{   match.params['user']=localStorage.getItem('id');

    const request = axios.get('http://localhost:3001/impediments/react', {
        params: match.params
    });
    
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_TODOS,
                routeParams: match.params,
                payload    : response.data
            })
        );
}

export function updateTodos()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().todoApp.todos;
        routeParams['user']=localStorage.getItem('id');
        const request = axios.get('http://localhost:3001/impediments/react', {
            params: routeParams
        });

        return request.then((response) =>
            dispatch({
                type   : UPDATE_TODOS,
                payload: response.data
            })
        );
    }
}

export function toggleCompleted(todo)
{
    const newTodo = {
        ...todo,
        completed: !todo.completed
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_COMPLETED})
        ]).then(() => dispatch(updateTodo(newTodo)))
    )
}

export function toggleStarred(todo)
{
    const newTodo = {
        ...todo,
        starred: !todo.starred
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateTodo(newTodo)))
    )
}

export function toggleImportant(todo)
{
    const newTodo = {
        ...todo,
        important: !todo.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateTodo(newTodo)))
    )
}

export function updateTodo(todo)
{   todo['user']=localStorage.getItem('id');
    const request = axios.post('http://localhost:3001/impediments/restupdate', todo);

    return (dispatch) =>
        request.then((response) => {
                Promise.all([
                    dispatch({
                        type   : UPDATE_TODO,
                        payload: response.data
                    })
                ]).then(() => dispatch(updateTodos()))
            }
        );
}
export function answerTodo(todo)
{   todo['user']=localStorage.getItem('id');
    const request = axios.post('http://localhost:3001/impediments/restanswer', todo);

    return (dispatch) =>
        request.then((response) => {
                Promise.all([
                    dispatch({
                        type   : ANSWER_TODO
                    })
                ]).then(() => dispatch(updateTodos()))
            }
        );
}




export function openNewTodoDialog()
{
    return {
        type: OPEN_NEW_TODO_DIALOG
    }
}

export function closeNewTodoDialog()
{
    return {
        type: CLOSE_NEW_TODO_DIALOG
    }
}

export function openEditTodoDialog(data)
{
    return {
        type: OPEN_EDIT_TODO_DIALOG,
        data
    }
}

export function closeEditTodoDialog()
{
    return {
        type: CLOSE_EDIT_TODO_DIALOG
    }
}

export function addTodo(todo)
{   todo['user']=localStorage.getItem('id');
    const request = axios.post('http://localhost:3001/impediments/restadd', todo);
    
    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: ADD_TODO
                    })
                ]).then(() => dispatch(updateTodos()))
            )
        );
}

export function removeTodo(todoId)
{
    const request = axios.post('/api/todo-app/remove-todo', todoId);

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_TODO
                    })
                ]).then(() => dispatch(updateTodos()))
            )
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function toggleOrderDescending()
{
    return {
        type: TOGGLE_ORDER_DESCENDING
    }
}

export function changeOrder(orderBy)
{
    return {
        type: CHANGE_ORDER,
        orderBy
    }
}
