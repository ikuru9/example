import { createContext, useContext, useEffect, useState } from "react";
import {
  DirectionProvider as BaseDirProvider,
  type DirectionProviderProps,
  type TextDirection,
} from "@base-ui/react/direction-provider";
import { getCookie, setCookie, removeCookie } from "@/lib/cookies";

const DEFAULT_DIRECTION = "ltr";
const DIRECTION_COOKIE_NAME = "dir";
const DIRECTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type DirectionContextType = {
  defaultDir: TextDirection;
  dir: TextDirection;
  setDir: (dir: TextDirection) => void;
  resetDir: () => void;
};

const DirectionContext = createContext<DirectionContextType | null>(null);

export function DirectionProvider({ children, direction }: DirectionProviderProps) {
  const [dir, _setDir] = useState<TextDirection>(
    () => (getCookie(DIRECTION_COOKIE_NAME) as TextDirection) || direction,
  );

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("dir", dir);
  }, [dir]);

  const setDir = (dir: TextDirection) => {
    _setDir(dir);
    setCookie(DIRECTION_COOKIE_NAME, dir, DIRECTION_COOKIE_MAX_AGE);
  };

  const resetDir = () => {
    _setDir(DEFAULT_DIRECTION);
    removeCookie(DIRECTION_COOKIE_NAME);
  };

  return (
    <DirectionContext
      value={{
        defaultDir: DEFAULT_DIRECTION,
        dir,
        setDir,
        resetDir,
      }}
    >
      <BaseDirProvider direction={dir}>{children}</BaseDirProvider>
    </DirectionContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDirection() {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
}
