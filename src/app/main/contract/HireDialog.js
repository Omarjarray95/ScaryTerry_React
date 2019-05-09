import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import _ from 'lodash';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
class HireDialog extends React.Component {
  state = {
    open: false,
    canSubmit: false,

    };

  componentDidMount()
    {
    }
    // componentDidUpdate(prevProps, prevState)
    // {
    //     if ( !_.isEqual(this.props.skills, prevProps.skills) || !_.isEqual(this.props.jobs, prevProps.jobs))
    //     {
    //         console.log(this.props.jobs);
    //         console.log(this.state.data);
    //         this.setState({jobs:this.props.jobs});
    //         this.setState({data:this.props.skills});
    //     }
    // }
    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        // const wrong = [model.wrong1,model.wrong2,model.wrong3];
        // model.wrong = wrong;
        this.props.save(model,this.props.id);
        this.handleClose();
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const { canSubmit } = this.state;
    return (
      <React.Fragment>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open responsive dialog
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
          <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >

                   
                    <TextFieldFormsy
                        className="my-16"
                        type="date"
                        name="description"
                        label="Describe this job Offer"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        required
                        variant="outlined"
                    />
                      <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="end_contract"
                        label="End Contract"
                        required
                        variant="outlined"
                    />
                     <TextFieldFormsy
                        className="my-16"
                        type="number"
                        name="salary"
                        label="Describe this job Offer"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        required
                        variant="outlined"
                    />
                    {/* select job */}
                    {/* seniority select */}
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="mx-auto my-16"
                            aria-label="LOG IN"
                            disabled={!canSubmit}
                            
                        >
                            Can submit
                        </Button>
                       
                        <Button variant="contained"
                            className="mx-auto my-16"
                             onClick={this.handleClose} color="primary" autoFocus>
                        Agree
                        </Button>
                    </DialogActions>
                 
                </Formsy>
          </DialogContent>
          
        </Dialog>
      </React.Fragment>
    );
  }
}

HireDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(HireDialog);
