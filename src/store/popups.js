import { createContext, useContext, useState } from 'react';
import { getScanLink } from '../utils';

const context = createContext();
export function PopupsProvider({ children }) {
  const [state, setState] = useState([]);
  function AddPopup(summery, trx) {
    const id = new Date().getTime();
    setState([
      ...state,
      { id, summery, link: getScanLink(trx, 'transaction') },
    ]);
  }
  function RemovePopup(id) {
    setState(state.filter((popup) => popup.id !== id));
  }
  const data = { popups: state, AddPopup, RemovePopup };
  return <context.Provider value={data}>{children}</context.Provider>;
}

export function usePopups() {
  return useContext(context);
}
