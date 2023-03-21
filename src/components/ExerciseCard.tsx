import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, VStack, Text, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: 'https://elitedamusculacao.com/wp-content/uploads/2019/11/desenvolvimento-com-halteres-300x225.png' }}
          alt="Treino ombro"
          w={16}
          h={16}
          mr={4}
          rounded="md"

        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Desenvolvimento halteres
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições lore
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}