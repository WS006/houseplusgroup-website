import { createContext, useContext, useState, ReactNode } from 'react';

interface SchemaContextType {
  schemas: any[];
  setSchemas: (schemas: any[]) => void;
}

const SchemaContext = createContext<SchemaContextType>({
  schemas: [],
  setSchemas: () => {},
});

export function SchemaProvider({ children, schemas: initialSchemas = [] }: { 
  children: ReactNode; 
  schemas?: any[];
}) {
  const [schemas, setSchemas] = useState(initialSchemas);
  
  return (
    <SchemaContext.Provider value={{ schemas, setSchemas }}>
      {children}
    </SchemaContext.Provider>
  );
}

export function useSchemas() {
  return useContext(SchemaContext);
}
