import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, VStack, Text } from "native-base";

type Props = {
  data: HistoryDTO
}

export function HistoryCard({ data }: Props) {
  return (
    <HStack w="full" px={5} py={4} mb={3} bg="gray.600" rounded="md" alignItems="center" justifyContent="space-between" >
      <VStack mr={5} flex={1}>
        <Heading fontFamily="heading" color="white" fontSize="md" textTransform="capitalize" numberOfLines={1}>
          {data.group}
        </Heading>

        <Text color="gray.100" fontSize="lg" numberOfLines={1} >
          {data.name}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  )
}