import axios from 'axios';

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';
export const GET_WIDGETS_TEST = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST';
export const GET_WIDGETS_TEST2 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST2';
export const GET_WIDGETS_TEST3 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST3';

//export function getWidgets() {
export function getWidgetPunc() {
    // const request = axios.get('/api/analytics-dashboard-app/widgets');
    const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) =>
        request.then((response) => {

            const dd = {
                widget1: {
                    chartType: 'line',
                    datasets: {
                        '2017': [
                            {
                                label: 'punctuality',
                                data: response.data.result2017,
                                fill: 'start'
                            }
                        ],
                        '2018': [
                            {
                                label: 'punctuality',
                                data: response.data.result2018,
                                fill: 'start'
                            }
                        ],
                        '2019': [
                            {
                                label: 'punctuality',
                                data: response.data.result2019,
                                fill: 'start'
                            }
                        ]
                    },
                    labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAI', 'JUNUARY', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
                    options: {
                        spanGaps: false,
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                top: 32,
                                left: 32,
                                right: 32
                            }
                        },
                        elements: {
                            point: {
                                radius: 4,
                                borderWidth: 2,
                                hoverRadius: 4,
                                hoverBorderWidth: 2
                            },
                            line: {
                                tension: 0
                            }
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                        tickMarkLength: 18
                                    },
                                    ticks: {
                                        fontColor: '#ffffff'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    display: false,
                                    ticks: {
                                        min: 0,
                                        max: 10,
                                        stepSize: 0.5
                                    }
                                }
                            ]
                        },
                        plugins: {
                            filler: {
                                propagate: false
                            },
                            xLabelsOnTop: {
                                active: true
                            }
                        }
                    }

                }
            }
            console.log(dd)
            dispatch({
                type: GET_WIDGETS,
                payload: dd
            })
        }
        );
}
export function getWidgetTest() {
    const request = axios.get('/api/analytics-dashboard-app/widgets');
    //const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        const tt = {
            widget2: {
                conversion: {
                    value: 492,
                    ofTarget: 13
                },
                chartType: 'bar',
                datasets: [
                    {
                        label: 'Conversion',
                        data: [221, 428, 492, 471, 413, 344, 294]
                    }
                ],
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                options: {
                    spanGaps: false,
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            top: 24,
                            left: 16,
                            right: 16,
                            bottom: 16
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {
                                    min: 100,
                                    max: 500
                                }
                            }
                        ]
                    }
                }
            }
        }

        dispatch({
            type: GET_WIDGETS_TEST,
            payload: tt
        })
    }
}
export function getWidgetTest2() {
    const request = axios.get('/api/analytics-dashboard-app/widgets');
    //const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        const tt = {
            widget3: {
                impressions: {
                    value: '87k',
                    ofTarget: 12
                },
                chartType: 'line',
                datasets: [
                    {
                        label: 'Impression',
                        data: [67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000, 110000, 149000, 98000],
                        fill: false
                    }
                ],
                labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
                options: {
                    spanGaps: false,
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            radius: 2,
                            borderWidth: 1,
                            hoverRadius: 2,
                            hoverBorderWidth: 1
                        },
                        line: {
                            tension: 0
                        }
                    },
                    layout: {
                        padding: {
                            top: 24,
                            left: 16,
                            right: 16,
                            bottom: 16
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {
                                    // min: 100,
                                    // max: 500
                                }
                            }
                        ]
                    }
                }
            }
        }

        dispatch({
            type: GET_WIDGETS_TEST2,
            payload: tt
        })
    }
}
export function getWidgetTest3() {
    const request = axios.get('/api/analytics-dashboard-app/widgets');
    //const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        const tt = {
            widget4: {
                visits: {
                    value: 882,
                    ofTarget: -9
                },
                chartType: 'bar',
                datasets: [
                    {
                        label: 'Visits',
                        data: [432, 428, 327, 363, 456, 267, 231]
                    }
                ],
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                options: {
                    spanGaps: false,
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            top: 24,
                            left: 16,
                            right: 16,
                            bottom: 16
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {
                                    min: 150,
                                    max: 500
                                }
                            }
                        ]
                    }
                }
            }
        }

        dispatch({
            type: GET_WIDGETS_TEST3,
            payload: tt
        })
    }
}
