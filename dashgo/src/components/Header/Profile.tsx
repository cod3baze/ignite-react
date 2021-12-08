import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface IProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: IProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Elias alexandre</Text>
          <Text color="gray.300">eliasallex@genesys</Text>
        </Box>
      )}

      <Avatar size="md" name="Elias alexandre" />
    </Flex>
  );
}
