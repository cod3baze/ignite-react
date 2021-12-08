import { ElementType, ReactNode } from "react";

import {
  Text,
  Link,
  Icon,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface INavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: ReactNode;
}

export function NavLink({ icon, children, ...rest }: INavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontSize="medium">
        {children}
      </Text>
    </Link>
  );
}
