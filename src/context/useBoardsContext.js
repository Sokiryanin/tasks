import React, { createContext, useContext, useState } from 'react';

const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
  const [boardsItems, setBoardsItems] = useState([]);

  return (
    <BoardsContext.Provider value={{ boardsItems, setBoardsItems }}>
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoardsContext = () => {
  return useContext(BoardsContext);
};
