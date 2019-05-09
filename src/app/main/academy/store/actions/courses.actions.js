import axios from 'axios';
import { from } from 'rxjs';
export const GET_MEETING = '[MEETING APP] GET MEETING'
export const GET_COURSES = '[ACADEMY APP] GET COURSES';
export const GET_CATEGORIES = '[ACADEMY APP] GET CATEGORIES';
export const SET_COURSES_SEARCH_TEXT = '[ACADEMY APP] SET COURSES SEARCH TEXT';
export const SET_COURSES_CATEGORY_FILTER = '[ACADEMY APP] SET COURSES CATEGORY FILTER';
export const SET_ATTENDENCEE='[MEETING APP] SET_ATTENDENCEE'
export const ADD_QUESTION='[MEETING APP] ADD_QUESTION'
export const GET_SPRINTS='[MEETING APP] GET_SPRINTS'
export const START_MEETING='[MEETING APP] START_MEETING'
export const END_MEETING='[MEETING APP] END_MEETING'

export const PLUS_NOTE='[MEETING APP] GET_SPRINTS'
export const MINUS_NOTE='[MEETING APP] START_MEETING'
export function getCourses()
{
    const request = axios.get('http://localhost:3001/meetings/api/getmeetings');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COURSES,
                payload: response.data
            })
        );
}

export function getCategories()
{
    const request = axios.get('http://localhost:3001/meetings/api/getproject');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: response.data
            })
        );
}
export function getMeeting(id)
{
    const request = axios.get('http://localhost:3001/meetings/findapi/'+id, {
        params: {
          user: localStorage.getItem('name')
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MEETING,
                payload: response.data
            })
        );
}
export function startMeeting(id)
{
    const request = axios.get('http://localhost:3001/meetings/start', {
        params: {
          id: id
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : START_MEETING,
                payload: response.data
            })
        );
}
export function endMeeting(id)
{
    const request = axios.get('http://localhost:3001/meetings/end', {
        params: {
          id: id
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : START_MEETING,
                payload: response.data
            })
        );
}
export function plus(event,to,criteria)
{
    const request = axios.get('http://localhost:3001/meetings/plus', {
        params: {
          from:localStorage.getItem('id'),
          criteria:criteria,
          to:to,
          event:event
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : PLUS_NOTE,
                payload: response.data
            })
        );
}
export function minus(event,to,criteria)
{
    const request = axios.get('http://localhost:3001/meetings/minus', {
        params: {
          from:localStorage.getItem('id'),
          criteria:criteria,
          to:to,
          event:event
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : MINUS_NOTE,
                payload: response.data
            })
        );
}
export function getSprints(id)
{
    const request = axios.get('http://localhost:3001/meetings/getsprints', {
        params: {
          id: id
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPRINTS,
                payload: response.data
            })
        );
}
export function presenceMeeting(id,presence,meeting)
{
    const request = axios.get('http://localhost:3001/meetings/ispresent/', {
        params: {
            meeting:meeting,
          user: id,
          presence:presence
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SET_ATTENDENCEE,
                payload: response.data
            })
        );
}
export function questionMeeting(id,question,meeting)
{
    const request = axios.get('http://localhost:3001/meetings/addquestion', {
        params: {
         event:meeting,
          user: id,
          content:question
        }
      });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : ADD_QUESTION,
                payload: response.data
            })
        );
}
export function setCoursesSearchText(event)
{
    return {
        type      : SET_COURSES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setCategoryFilter(event)
{
    return {
        type    : SET_COURSES_CATEGORY_FILTER,
        category: event.target.value
    }
}

