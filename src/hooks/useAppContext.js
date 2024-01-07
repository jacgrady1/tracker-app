import { useContext } from 'react';
import {
  appContext
} from '../store/AppContext';

/**
 * A wrapper around `useContext` for the prompt state, which throws if the
 * context has not actually been provided in the current component scope.
 */
const useAppContext = () => {
  const context = useContext(appContext);
  if (context === null) {
    throw new Error('context was not provided in the current scope');
  }

  return context;
};

export default useAppContext;
