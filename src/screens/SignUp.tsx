import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast, Toast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import axios from "axios";
import { api } from "../services/api";

import { AppError } from "../utils/AppError";

import LogoSvg from "../assets/logo.svg"
import BackgroundImg from "../assets/background.png"

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";
import { color } from "native-base/lib/typescript/theme/styled-system";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("informe o e-mail.").email("E-mail inválido."),
  password: yup.string().required("Informe a senha.").min(5, "A senha deve conter pelo menos 5 dígitos."),
  password_confirm: yup.string().required("Confirme a senha.").oneOf([yup.ref("password")], "A confirmação da senha não confere.")
})

export function SignUp() {

  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation()
  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post("/users", { name, email, password })
      console.log(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde"

      /* TODO: refatorar menssage de toast */
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500"
      })

    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 2 }} showsVerticalScrollIndicator={false}>
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
          <Heading fontFamily="heading" color={"gray.100"} fontSize="xl" mb={6}>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

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


          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />

          <Button
            title="Voltar para o login"
            variant="outline"
            mt={16}
            onPress={handleGoBack}

          />
        </Center>


      </VStack>
    </ScrollView>
  )
}