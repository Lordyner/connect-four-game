import { useContext } from 'react';
import DataContext from '../Context/DataProvider';
const useData = () => {
    return useContext(DataContext);
};

export default useData;