/* eslint-disable react/prop-types */
import React from 'react';
// import { Modal } from 'antd';
import { usePageProvider } from '../../pages/providers';
import ModalButton from './ModalButton';

export const ModalButtonContext = React.createContext();

const ModalPage = ({
  type,
  action,
  payload,
  // onDeleteOk,
  index,
}) => {
  // const [deleteWarning, setDeleteWarning] = useState(false);

  const {
    onSetVisible,
  } = usePageProvider();

  // const handleOk = () => {
  //   onDeleteOk();
  //   setDeleteWarning(false);
  // };

  // const openOnDeleteModal = () => (
  //   <Modal
  //     visible={deleteWarning}
  //       // onCreate={onCreate}
  //     payload={payload}
  //       // disabled={action === "detail"}
  //     onCancel={() => {
  //       setDeleteWarning(false);
  //     }}
  //     onOk={handleOk}
  //   >
  //     <p>
  //       Confirmar eliminación de
  //       {type}
  //       /s?
  //     </p>
  //   </Modal>
  // );

  return (
    <div>
      <ModalButton
        action={action}
        setVisible={() => onSetVisible(type, payload, action, index)}
        type={type}
      />
    </div>
  );
};

export default ModalPage;
