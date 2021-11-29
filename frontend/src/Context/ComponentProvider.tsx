/* eslint-disable react/react-in-jsx-scope */
import CreateComponentContext from './index';
import useHookProvider from '../hooks/useHooksProvider';

type Props = {
  children: any
}

export default function ComponentProvider(props: Props): any {
  const useHookeProviderProps = useHookProvider();
  return (
    <CreateComponentContext.Provider value={useHookeProviderProps}>
      {props.children}
    </CreateComponentContext.Provider>
  );
}
