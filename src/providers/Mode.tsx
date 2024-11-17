import { useEventCallback } from '@mui/material';
import { createContext, useContext, useMemo } from 'react';

type ModeContextValue = {
  mode: 'view' | null;
  shouldDisable: (path: string) => boolean;
};

const ModeContext = createContext<ModeContextValue | null>(null);

type ModeContextProviderProps = {
  children: React.ReactNode;
  shouldDisable?: (path: string) => boolean;
} & Omit<ModeContextValue, 'shouldDisable'>;

export const ModeContextProvider = (props: ModeContextProviderProps) => {
  const { children, mode, shouldDisable: _shouldDisable } = props;
  const defaultShouldDisable = () => mode === 'view';
  const shouldDisable = useEventCallback(_shouldDisable ?? defaultShouldDisable);
  const value = useMemo(
    () => ({
      mode,
      shouldDisable,
    }),
    [mode, shouldDisable],
  );
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export const useModeContext = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error('ModeContextProvider is missing');
  return context;
};
