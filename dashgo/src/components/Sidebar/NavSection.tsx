import React from "react";

import { Box, Stack, Text } from "@chakra-ui/react";

interface INavSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NavSection({ title, children }: INavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>

      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
