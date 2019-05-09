import React, {Component} from 'react';
import {withStyles, Card, CardContent, Typography, TableCell, TableRow, TableBody, TableHead, Table} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {IconButton, Icon} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';


const styles = theme => ({
    root   : {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)'
    },
    divider: {
        backgroundColor: theme.palette.divider
    }
});

class DetailsOffer extends Component {

    state = {
        invoice: null,
        open: false,

    };

    componentDidMount()
    {
        axios.get('http://localhost:3001/offers/' +this.props.id).then(res => {
            this.setState({invoice: res.data});
        });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
    this.setState({ open: false });
    };
    render()
    {
        const {classes} = this.props;
        const {invoice} = this.state;
        const formatter = new Intl.NumberFormat('en-US',
            {
                style                : 'currency',
                currency             : 'USD',
                minimumFractionDigits: 2
            });

        return (
             <React.Fragment>
                 <IconButton onClick={ ev => {
                      ev.preventDefault();
                      ev.stopPropagation();
                     this.handleClickOpen()
                    }}>
                    {/* {todo.starred ? (
                        <Icon style={{color: amber[500]}}>star</Icon>
                    ) : ( */}
                        <Icon>details</Icon>
                    {/* ) } */}
                   
                </IconButton>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby=""
                fullWidth maxWidth="none"
                >
            {/* <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0 sm:p-64 print:p-0")}> */}
                <div className="flex-grow flex-no-shrink p-0 sm:p-32 print:p-0">
               
                 {/* <Button className="w-full" variant="outlined" onClick=>
                    <span className="hidden sm:flex">Add New Product</span>
                    <span className="flex sm:hidden">New</span>
                </Button> */}
               
                <DialogContent>
                {invoice && (

                    <FuseAnimate animation={{translateY: [0, '100%']}} duration={600}>

                        <Card className="mx-auto w-xl print:w-full print:shadow-none">

                            <CardContent className="p-88 print:p-0">

                                <div className="flex flex-row justify-between items-start">

                                    <div className="flex flex-col">

                                        <div className="flex items-center mb-80 print:mb-0">

                                            <img className="w-160 print:w-60" src="assets/images/logos/fuse.svg" alt="logo"/>

                                            <div className={classNames(classes.divider, "mx-48 w-px h-128 print:mx-16")}/>

                                            <div className="max-w-160">

                                                <Typography color="textSecondary">{invoice._job.title}</Typography>

                                                {invoice.date_posted && (
                                                    <Typography color="textSecondary">
                                                        {invoice.date_posted}
                                                    </Typography>
                                                )}
                                                {invoice._applications && (
                                                    <Typography color="textSecondary">
                                                        <span>Number Of Applications :</span>
                                                        {invoice._applications.length}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="flex justify-end items-center w-160 print:w-60">
                                                <Typography variant="h5" className="font-light print:text-16" color="textSecondary">CLIENT</Typography>
                                            </div>

                                            <div className={classNames(classes.divider, "mx-48 w-px h-128 print:mx-16")}/>

                                            <div className="max-w-160">

                                            <Typography color="textSecondary">{invoice._job.title}</Typography>

                                                {invoice.date_posted && (
                                                    <Typography color="textSecondary">
                                                        {invoice.date_posted}
                                                    </Typography>
                                                )}
                                                {invoice._applications && (
                                                    <Typography color="textSecondary">
                                                        <span>Number Of Applications :</span>
                                                        {invoice._applications.length}
                                                    </Typography>
                                                )}
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <table>
                                        <tbody>
                                            <tr>
                                                <td className="pr-16 pb-32">
                                                    <Typography className="font-light" variant="h4" color="textSecondary">
                                                        INVOICE
                                                    </Typography>
                                                </td>
                                                <td className="pb-32">
                                                    <Typography className="font-light" variant="h4">
                                                        {invoice.number}
                                                    </Typography>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="text-right pr-16">
                                                    <Typography color="textSecondary">
                                                        INVOICE DATE
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography>
                                                        {invoice.date}
                                                    </Typography>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="text-right pr-16">
                                                    <Typography color="textSecondary">
                                                        DUE DATE
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography>
                                                        {invoice.dueDate}
                                                    </Typography>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="text-right pr-16">
                                                    <Typography color="textSecondary">
                                                        TOTAL DUE
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography>
                                                        {formatter.format(invoice.total)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                                </div>

                                {/* <div className="mt-96 print:mt-0">

                                    <Table className="simple">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    SERVICE
                                                </TableCell>
                                                <TableCell>
                                                    UNIT
                                                </TableCell>
                                                <TableCell align="right">
                                                    UNIT PRICE
                                                </TableCell>
                                                <TableCell align="right">
                                                    QUANTITY
                                                </TableCell>
                                                <TableCell align="right">
                                                    TOTAL
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {invoice.services.map((service) => (
                                                <TableRow key={service.id}>
                                                    <TableCell>
                                                        <Typography className="mb-8" variant="subtitle1">{service.title}</Typography>
                                                        <Typography variant="caption" color="textSecondary">{service.detail}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {service.unit}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {formatter.format(service.unitPrice)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {service.quantity}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {formatter.format(service.total)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    <Table className="simple">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">SUBTOTAL</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                        {formatter.format(invoice.subtotal)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">TAX</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                        {formatter.format(invoice.tax)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">DISCOUNT</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                        {formatter.format(invoice.discount)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography className="font-light" variant="h4" color="textSecondary">TOTAL</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography className="font-light" variant="h4" color="textSecondary">
                                                        {formatter.format(invoice.total)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </div>

                                <div className="mt-96 print:mt-0 print:px-16">

                                    <Typography className="mb-24 print:mb-12" variant="body1">Please pay within 15 days. Thank you for your business.</Typography>

                                    <div className="flex">

                                        <div className="flex-no-shrink mr-24">
                                            <img className="w-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                                        </div>

                                        <Typography className="font-medium mb-64" variant="caption" color="textSecondary">
                                            In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque
                                            scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit
                                            quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia.
                                            Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero
                                            tincidunt lacinia et eget eros.
                                        </Typography>
                                    </div>
                                </div> */}
                            </CardContent>
                        </Card>
                    </FuseAnimate>
                )}
                Hello
                </DialogContent>
            </div>
            </Dialog>
            </React.Fragment>                                       
        );
    }
}

export default withStyles(styles, {withTheme: true})(DetailsOffer);
/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 **/
