import { useContext } from 'react';
import CreateComponentContext from '../Context/index';

const useHook: any = () => useContext(CreateComponentContext as any);

export default useHook;
