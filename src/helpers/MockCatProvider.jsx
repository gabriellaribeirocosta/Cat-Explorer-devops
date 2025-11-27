import { CatContext } from "../contexts/CatContext";

export function MockCatProvider({ children, stateOverrides = {}, mockSearch }) {
  const defaultState = {
    breeds: [],
    loading: false,
    error: null,
    lastQuery: ""
  };

  const state = { ...defaultState, ...stateOverrides };

  const search = mockSearch || jest.fn();

  return (
    <CatContext.Provider value={{ state, search }}>
      {children}
    </CatContext.Provider>
  );
}