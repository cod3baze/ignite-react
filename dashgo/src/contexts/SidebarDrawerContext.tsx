import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, useContext } from "react";

type SidebarDrawerContextData = UseDisclosureReturn;

interface ISidebarDrawerProviderProps {
  children: React.ReactNode;
}

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: ISidebarDrawerProviderProps) {
  const disclosure = useDisclosure();

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
