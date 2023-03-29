import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, View, Center, Heading, ScrollView } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import LogoSvg from "../assets/logo.svg"
import BackgroundImg from "../assets/background.png"

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  email: yup.string().required("informe o e-mail.").email("E-mail inválido."),
  password: yup.string().required("Informe a senha."),
})

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleNewAccount() {
    navigation.navigate("signUp")
  }

  function handleSignIn({ email, name }: FormDataProps) {
    console.log({ name, email })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16} >
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas Treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine suamente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading fontFamily="heading" color={"gray.100"} fontSize="xl" mb={6} >
            Acesse sua conta
          </Heading>
        </Center>

        <Center>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar"
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}

