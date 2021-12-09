import { useForm } from "react-hook-form";

import { Flex, Button, Stack, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  const { register, handleSubmit } = useForm();

  function handleSigIn() {}

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
        onSubmit={() => handleSubmit(handleSigIn)}
      >
        <Stack spacing="4">
          <FormControl>
            <Input {...register} name="email" type="email" label="E-mail" />
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
