import { ElementType, ReactNode } from "react";
import Link from "next/link";

import {
  Text,
  Link as ChakraLink,
  Icon,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface INavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: ReactNode;
  href: string;
}

export function NavLink({ href, icon, children, ...rest }: INavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontSize="medium">
          {children}
        </Text>
      </ChakraLink>
    </Link>
  );
}
