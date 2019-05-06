import axios from 'axios';

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';
export const GET_WIDGETS_TEST = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST';
export const GET_WIDGETS_TEST2 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST2';
export const GET_WIDGETS_TEST3 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST3';
export const GET_WIDGETS_TEST5 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST5';
export const GET_WIDGETS_TEST6 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST6';
export const GET_WIDGETS_TEST7 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST7';
export const GET_WIDGETS_TEST8 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST8';
export const GET_WIDGETS_TEST9 = '[ANALYTICS DASHBOARD APP] GET WIDGETS TEST9';

//export function getWidgets() {
export function getWidgetPunc() {
    // const request = axios.get('/api/analytics-dashboard-app/widgets');
    const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');
    const requestPredict = axios.get('http://127.0.0.1:5000/');
    return (dispatch) =>
        request.then((response) => {
            requestPredict.then(doc => {
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
                                    data: response.data.result2019.concat(doc.data.result),
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
                                            max: 100,
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
                });
            });
        }
        );
}
export function getWidgetTest() {
    //const request = axios.get('/api/analytics-dashboard-app/widgets');
    const request = axios.get('http://localhost:3001/performance/getPerformanceStats/2018-10-01/2019-05-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        request.then((response) => {
            const tt = {
                widget2: {
                    conversion: {
                        value: response.data.numberOfAllTasks,
                        ofTarget: -(Number((1 - (response.data.numberOfAllTasksDone / response.data.numberOfAllTasks)) * 100).toFixed(1))
                    },
                    chartType: 'bar',
                    datasets: [
                        {
                            label: 'Task Ratio',
                            data: response.data.ratio
                        }
                    ],
                    labels: ['october', 'november', 'december', 'january', 'february', 'march', 'april'],
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
                                        min: 0,
                                        max: 100
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
        });

    }

}
export function getWidgetTest2() {

    const request = axios.get('http://localhost:3001/performance/getperformancevelocityStats/2018-10-03/2019-05-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        request.then(response => {
            const tt = {
                widget3: {
                    impressions: {
                        value: response.data.allDuration,
                        ofTarget: -(Number((1 - (response.data.allDuration / response.data.allEstimated)) * 100).toFixed(1))
                    },
                    chartType: 'line',
                    datasets: [
                        {
                            label: 'Velocity',
                            data: response.data.avg,
                            fill: false
                        }
                    ],
                    labels: ['october', 'november', 'december', 'january', 'february', 'march', 'april'],
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
        });

    }
}
export function getWidgetTest3() {

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
export function getWidgetTest5() {
    const request = axios.get('http://localhost:3001/performance/gettechCommperformanceStats/2018-10-01/2019-05-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        request.then(response => {
            const tt = {
                widget5: {
                    chartType: 'line',
                    datasets: {
                        'Priority 1': [
                            {
                                label: 'communication',
                                data: response.data.rcomm[0],
                                fill: 'start'
                            },
                            {
                                label: 'technical',
                                data: response.data.rtech[0],
                                fill: 'start'
                            }
                        ],
                        'Priority 2': [
                            {
                                label: 'communication',
                                data: response.data.rcomm[1],
                                fill: 'start'
                            },
                            {
                                label: 'technical',
                                data: response.data.rtech[1],
                                fill: 'start'
                            }
                        ],
                        'Priority 3': [
                            {
                                label: 'communication',
                                data: response.data.rcomm[2],
                                fill: 'start'
                            },
                            {
                                label: 'technical',
                                data: response.data.rtech[2],
                                fill: 'start'
                            }
                        ],
                        'Priority 4': [
                            {
                                label: 'communication',
                                data: response.data.rcomm[3],
                                fill: 'start'
                            },
                            {
                                label: 'technical',
                                data: response.data.rtech[3],
                                fill: 'start'
                            }
                        ],
                        'Priority 5': [
                            {
                                label: 'communication',
                                data: response.data.rcomm[4],
                                fill: 'start'
                            },
                            {
                                label: 'technical',
                                data: response.data.rtech[4],
                                fill: 'start'
                            }
                        ]
                    },
                    labels: ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR'],
                    options: {
                        spanGaps: false,
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false,
                        tooltips: {
                            position: 'nearest',
                            mode: 'index',
                            intersect: false
                        },
                        layout: {
                            padding: {
                                left: 24,
                                right: 32
                            }
                        },
                        elements: {
                            point: {
                                radius: 4,
                                borderWidth: 2,
                                hoverRadius: 4,
                                hoverBorderWidth: 2
                            }
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        fontColor: 'rgba(0,0,0,0.54)'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    gridLines: {
                                        tickMarkLength: 16
                                    },
                                    ticks: {
                                        max: 10,
                                        min: 0
                                        //stepSize: 1000
                                    }
                                }
                            ]
                        },
                        plugins: {
                            filler: {
                                propagate: false
                            }
                        }
                    }
                }
            }

            dispatch({
                type: GET_WIDGETS_TEST5,
                payload: tt
            })
        });

    }
}
export function getWidgetTest6() {

    //const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        const tt = {
            widget100: {
                markers: [
                    {
                        lat: 52,
                        lng: -73,
                        label: '120'
                    },
                    {
                        lat: 37,
                        lng: -104,
                        label: '498'
                    },
                    {
                        lat: 21,
                        lng: -7,
                        label: '443'
                    },
                    {
                        lat: 55,
                        lng: 75,
                        label: '332'
                    },
                    {
                        lat: 51,
                        lng: 7,
                        label: '50'
                    },
                    {
                        lat: 31,
                        lng: 12,
                        label: '221'
                    },
                    {
                        lat: 45,
                        lng: 44,
                        label: '455'
                    },
                    {
                        lat: -26,
                        lng: 134,
                        label: '231'
                    },
                    {
                        lat: -9,
                        lng: -60,
                        label: '67'
                    },
                    {
                        lat: 33,
                        lng: 104,
                        label: '665'
                    }
                ],
                styles: [
                    {
                        'featureType': 'administrative',
                        'elementType': 'labels.text.fill',
                        'stylers': [
                            {
                                'color': '#444444'
                            }
                        ]
                    },
                    {
                        'featureType': 'landscape',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'color': '#f2f2f2'
                            }
                        ]
                    },
                    {
                        'featureType': 'poi',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'visibility': 'off'
                            }
                        ]
                    },
                    {
                        'featureType': 'road',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'lightness': 45
                            }
                        ]
                    },
                    {
                        'featureType': 'road.highway',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'visibility': 'simplified'
                            }
                        ]
                    },
                    {
                        'featureType': 'road.arterial',
                        'elementType': 'labels.icon',
                        'stylers': [
                            {
                                'visibility': 'off'
                            }
                        ]
                    },
                    {
                        'featureType': 'transit',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'visibility': 'off'
                            }
                        ]
                    },
                    {
                        'featureType': 'water',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'color': '#039be5'
                            },
                            {
                                'visibility': 'on'
                            }
                        ]
                    }
                ]
            }
        }

        dispatch({
            type: GET_WIDGETS_TEST6,
            payload: tt
        })
    }
}
export function getWidgetTest7() {

    const request = axios.get('http://localhost:3001/motivation/getmotivationStats/5c926640db149e155096dfa9');

    return (dispatch) => {
        request.then(response => {
            const r1 = Number((response.data.result1 + response.data.result11) * 10 / 2).toFixed(1);
            const r2 = Number((response.data.result2 + response.data.result22) * 10 / 2).toFixed(1);
            const r3 = Number((response.data.result3 + response.data.result33) * 10 / 2).toFixed(1);
            const r4 = Number((response.data.result4 + response.data.result44) * 10 / 2).toFixed(1);
            const tt = {
                widget7: {
                    labels: [
                        'motivation'

                    ],
                    datasets: {

                        'Yesterday': [
                            {
                                data: [r1, Number(100 - r1).toFixed(1)],
                                change: [Number(r1 - r2).toFixed(1)]
                            }
                        ],
                        'Last 7 days': [
                            {
                                data: [r2, Number(100 - r2).toFixed(1)],
                                change: [Number(r2 - r3).toFixed(1)]
                            }
                        ],
                        'Last 28 days': [
                            {
                                data: [r3, Number(100 - r3).toFixed(1)],
                                change: [Number(r3 - r4).toFixed(1)]
                            }
                        ],
                        'Last 90 days': [
                            {
                                data: [r4, Number(100 - r4).toFixed(1)],
                                change: [0]
                            }
                        ]
                    },
                    options: {
                        cutoutPercentage: 75,
                        spanGaps: false,
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false
                    }
                }
            }

            dispatch({
                type: GET_WIDGETS_TEST7,
                payload: tt
            })
        });

    }
}
export function getWidgetTest8() {

    //const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        const tt = {
            widget8: {
                datasets: [
                    [
                        {
                            label: '1Day',
                            data: [72, 65, 70, 78, 85, 82, 88],
                            fill: false,
                            borderColor: '#5c84f1'
                        }
                    ],
                    [
                        {
                            label: '1Week',
                            data: [540, 539, 527, 548, 540, 552, 566],
                            fill: false,
                            borderColor: '#5c84f1'
                        }
                    ],
                    [
                        {
                            label: '1Month',
                            data: [1520, 1529, 1567, 1588, 1590, 1652, 1622],
                            fill: false,
                            borderColor: '#5c84f1'
                        }
                    ]
                ],
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                options: {
                    spanGaps: true,
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: true,
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
                                display: true,
                                ticks: {
                                    // min: 100,
                                    // max: 500
                                }
                            }
                        ]
                    }
                },
                today: '12,540',
                change: {
                    value: 321,
                    percentage: 2.05
                }
            }
        }

        dispatch({
            type: GET_WIDGETS_TEST8,
            payload: tt
        })
    }
}
export function getWidgetTest9() {

    //const request = axios.get('http://localhost:3001/motivation/userPunctualityNoteStats/2017-01-01/2020-01-01/5c926640db149e155096dfa9');

    return (dispatch) => {
        const tt = {
            widget9: {
                rows: [
                    {
                        title: 'Holiday Travel',
                        clicks: 3621,
                        conversion: 90
                    },
                    {
                        title: 'Get Away Deals',
                        clicks: 703,
                        conversion: 7
                    },
                    {
                        title: 'Airfare',
                        clicks: 532,
                        conversion: 0
                    },
                    {
                        title: 'Vacation',
                        clicks: 201,
                        conversion: 8
                    },
                    {
                        title: 'Hotels',
                        clicks: 94,
                        conversion: 4
                    }
                ]
            }
        }

        dispatch({
            type: GET_WIDGETS_TEST9,
            payload: tt
        })
    }
}