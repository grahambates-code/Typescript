import React from 'react';
import { Modal } from 'antd';

const ConfirmationModal = (props) => {
    const { visible, onConfirm, onCancel, message } = props;

    const onOK = () => {
        onConfirm();
        onCancel();
    }

    return (
        <Modal
            className="continue-modal"
            maskClosable={false}
            closable={false}
            footer={null}
            title={null}
            open={visible}
        >
            <p className="content">{message}</p>
            <div className="buttons-container">
                <button className="main-orange-button" onClick={() => onOK()}>
                    OK
                </button>
                <button className="main-danger-button" onClick={() => onCancel()}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
};

export default ConfirmationModal;