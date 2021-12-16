import { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface ICanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

/**
 * verifica se o user pode acessar algum component
 * @returns React.ReactNode & Component
 */
export function Can({ children, permissions, roles }: ICanProps) {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) return null;

  return <>{children}</>;
}
