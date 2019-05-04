export const OPEN_TAB = '[TAB] OPEN';

export function changeTab(value)
{
    return {
        type: OPEN_TAB,
        payload: value
    }
}