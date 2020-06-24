import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DISABLE_MODAL } from "../../../actions/types";

const ModalAlert = () => {
  const dispatch = useDispatch();
  const { show, type, message } = useSelector((state: any) => state.modal);
  const SuccessModal = () => (
    <div id="toastsContainerTopRight" className="toasts-top-right fixed">
      <div
        className={`toast fade show bg-${type}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="mr-auto">Success</strong>
          <button
            onClick={() => dispatch({ type: DISABLE_MODAL })}
            type="button"
            className="ml-2 mb-1 close"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
  return <>{show ? SuccessModal() : null}</>;
};

export default ModalAlert;
