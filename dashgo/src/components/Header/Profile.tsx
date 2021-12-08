import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Elias alexandre</Text>
        <Text color="gray.300">eliasallex@genesys</Text>
      </Box>

      <Avatar size="md" name="Elias alexandre" />
    </Flex>
  );
}
