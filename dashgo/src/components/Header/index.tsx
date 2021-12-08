import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";

import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      maxW={1400}
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="wef"
          onClick={() => {}}
          fontSize={"24"}
          icon={<Icon as={RiMenuLine} />}
        />
      )}
      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
