import { useForm, SubmitHandler } from "react-hook-form";

import { Flex, Button, Stack, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleSigIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(values);
  };

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
        onSubmit={handleSubmit(handleSigIn)}
      >
        <Stack spacing="4">
          <FormControl>
            <Input
              autoFocus
              required
              name="email"
              type="email"
              label="E-mail"
              {...register("email")}
            />
          </FormControl>

          <FormControl>
            <Input
              required
              name="password"
              type="password"
              label="Senha"
              {...register("password")}
            />
          </FormControl>
        </Stack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
