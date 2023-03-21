import { useState } from "react";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { HomeHeader } from "../components/HomeHeader";
import { Group } from "../components/Group";
import { ExerciseCard } from "../components/ExerciseCard";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

export function Home() {
  const [groups, setGroups] = useState(["costa", "TricepS", "OMbro", "biCepis"])
  const [exercises, setExercises] = useState(["Remada Curvada", "Desenvolvimento Halteres", "Elevação Lateral", "Crucifixo Inverso", "Remada Alta"])
  const [groupSelected, setGroupSelected] = useState("ombro")

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise")
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={String(groupSelected).toUpperCase() === String(item).toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={(item) => (
            <ExerciseCard
              onPress={(handleOpenExerciseDetails)}
            />

          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />

      </VStack>
    </VStack>
  )
}