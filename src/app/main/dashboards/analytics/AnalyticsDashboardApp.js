import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';

class AnalyticsDashboardApp extends Component {

    componentDidMount() {
        this.props.getWidgetPunc();
        this.props.getWidgetTest();
        this.props.getWidgetTest2();
        this.props.getWidgetTest3();
        this.props.getWidgetTest5();
        this.props.getWidgetTest6();
        this.props.getWidgetTest7();
        this.props.getWidgetTest8();
        this.props.getWidgetTest9();
    }

    render() {
        const { widgetPunc, widgetTest, widgetTest2, widgetTest3, widgetTest5, widgetTest6, widgetTest7, widgetTest8, widgetTest9 } = this.props;
        if (!widgetPunc) {
            return null;
        }
        return (
            <div className="w-full">

                <Widget1 data={widgetPunc.widget1} />

                <FuseAnimate animation="transition.slideUpIn" delay={200}>

                    <div className="flex flex-col md:flex-row sm:p-8 container">

                        <div className="flex flex-1 flex-col min-w-0">

                            <FuseAnimate delay={600}>
                                <Typography className="p-16 pb-8 text-18 font-300">
                                    How are your active users trending over time?
                                </Typography>
                            </FuseAnimate>

                            <div className="flex flex-col sm:flex sm:flex-row pb-32">

                                <div className="widget flex w-full sm:w-1/3 p-16">
                                    <Widget2 data={widgetTest.widget2} />
                                </div>

                                <div className="widget flex w-full sm:w-1/3 p-16">
                                    <Widget3 data={widgetTest2.widget3} />
                                </div>

                                <div className="widget w-full sm:w-1/3 p-16">
                                    <Widget4 data={widgetTest3.widget4} />
                                </div>

                            </div>

                            <FuseAnimate delay={600}>
                                <Typography className="px-16 pb-8 text-18 font-300">
                                    How many pages your users visit?
                                </Typography>
                            </FuseAnimate>

                            <div className="widget w-full p-16 pb-32">
                                <Widget5 data={widgetTest5.widget5} />
                            </div>

                            <FuseAnimate delay={600}>
                                <Typography className="px-16 pb-8 text-18 font-300">
                                    Where are your users?
                                </Typography>
                            </FuseAnimate>

                            <div className="widget w-full p-16 pb-32">
                                <Widget6 data={widgetTest6.widget100} />
                            </div>

                        </div>

                        <div className="flex flex-wrap w-full md:w-320 pt-16">

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300">
                                        What are your top devices?
                                    </Typography>
                                </FuseAnimate>

                                <div className="widget w-full p-16">
                                    <Widget7 data={widgetTest7.widget7} />
                                </div>
                            </div>

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">

                                <FuseAnimate delay={600}>
                                    <div className="px-16 pb-8 text-18 font-300">
                                        How are your sales?
                                    </div>
                                </FuseAnimate>

                                <div className="widget w-full p-16">
                                    <Widget8 data={widgetTest8.widget8} />
                                </div>
                            </div>

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300 lg:pt-0">
                                        What are your top campaigns?
                                    </Typography>
                                </FuseAnimate>
                                <div className="widget w-full p-16">
                                    <Widget9 data={widgetTest9.widget9} />
                                </div>
                            </div>
                        </div>

                    </div>
                </FuseAnimate>
            </div>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWidgetPunc: Actions.getWidgetPunc,
        getWidgetTest: Actions.getWidgetTest,
        getWidgetTest2: Actions.getWidgetTest2,
        getWidgetTest3: Actions.getWidgetTest3,
        getWidgetTest5: Actions.getWidgetTest5,
        getWidgetTest6: Actions.getWidgetTest6,
        getWidgetTest7: Actions.getWidgetTest7,
        getWidgetTest8: Actions.getWidgetTest8,
        getWidgetTest9: Actions.getWidgetTest9
    }, dispatch);
}

function mapStateToProps({ analyticsDashboardApp }) {
    return {
        widgetPunc: analyticsDashboardApp.widgetPunc.data,
        widgetTest: analyticsDashboardApp.widgetPunc.test,
        widgetTest2: analyticsDashboardApp.widgetPunc.test2,
        widgetTest3: analyticsDashboardApp.widgetPunc.test3,
        widgetTest5: analyticsDashboardApp.widgetPunc.test5,
        widgetTest6: analyticsDashboardApp.widgetPunc.test6,
        widgetTest7: analyticsDashboardApp.widgetPunc.test7,
        widgetTest8: analyticsDashboardApp.widgetPunc.test8,
        widgetTest9: analyticsDashboardApp.widgetPunc.test9
    }
}

export default withReducer('analyticsDashboardApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboardApp)));
