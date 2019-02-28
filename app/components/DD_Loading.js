import React, { Component } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

export class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Spinner
                visible={this.props.root.get('progress')}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
                cancelable={true}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        root: state.get('root'),
    }

}
export default connect(mapStateToProps)(Loading);