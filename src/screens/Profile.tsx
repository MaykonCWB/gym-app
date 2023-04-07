import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { HStack, Center, Text, VStack, ScrollView, Skeleton, Heading, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"


import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { useAuth } from "@hooks/useAuth";
import { string } from "yup";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState("https://github.com/maykonctba.png")

  const toast = useToast()
  const { user } = useAuth()
  const { control, handleSubmit } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,

      })

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        // TODO VALIDAÇÃO TAMANHO //
        setUserPhoto(photoSelected.assets[0].uri)
      }

    } catch (error) {
      throw error
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {

    console.log("AQUIII =>", data)
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }} >
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do Perfil"
                size={PHOTO_SIZE}
              />

          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8} >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) =>
            (<Input
              bg="gray.600"
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
            />)}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) =>
            (<Input
              bg="gray.600"
              placeholder="E-mail"
              isDisabled
              onChangeText={onChange}
              value={value}
            />)}
          />


          <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) =>
            (<Input
              bg="gray.600"
              placeholder="Senha antiga"
              secureTextEntry
              onChangeText={onChange}
            />)}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) =>
            (<Input
              bg="gray.600"
              placeholder="Nova senha"
              secureTextEntry
              onChangeText={onChange}
            />)}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) =>
            (<Input
              bg="gray.600"
              placeholder="Confirme a nova senha"
              secureTextEntry
              onChangeText={onChange}

            />)}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />

        </Center>
      </ScrollView>
    </VStack>
  )
}