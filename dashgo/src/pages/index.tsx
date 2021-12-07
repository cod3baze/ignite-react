import { useRouter } from "next/router";

import { Flex, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  const router = useRouter();

  function gotToDashboardPage(event: React.FormEvent) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={gotToDashboardPage}
      >
        <Stack spacing="4">
          <FormControl>
            <Input name="email" type="email" label="E-mail" />
          </FormControl>

          <FormControl>
            <Input name="password" type="password" label="Senha" />
          </FormControl>
        </Stack>

        <Button type="submit" mt="6" size="lg" colorScheme="pink">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
