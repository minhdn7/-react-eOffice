import { connect } from 'react-redux';
import { DocManagement } from '../components/QLVanBan/DocManagement';
import * as docAction from '../actions/document-action';

const mapStateToProps = (state) => {
    return {
        listDoc: state.docReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetListDocumentAction: (type) => {
            dispatch(docAction.getListDocumentAction(type));
        },
    }
};

const DocManagementContainer = connect(mapStateToProps, mapDispatchToProps)(DocManagement);
export default DocManagementContainer;