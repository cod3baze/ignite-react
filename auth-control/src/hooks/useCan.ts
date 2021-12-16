import { useAuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};
/**
 * verifica se a lista de permissões passadas batem com as permissões do user.
 */
export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
