import { createContext, useState } from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [board, setBoard] = useState([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]);


    return (
        <DataContext.Provider value={{
            board, setBoard
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;