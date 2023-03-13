import { Spinner, Center } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="gray.750">
      <Spinner color="green.500" />
    </Center>
  )
}