import { useState } from "react";
import { Center, FlatList, HStack, Text, VStack } from "native-base";
import { HomeHeader } from "../components/HomeHeader";
import { Group } from "../components/Group";

export function Home() {
  const [groups, setGroups] = useState(["costas", "TricepS", "omBro", "biCepis"])
  const [groupSelected, setGroupSelected] = useState("costa")

  return (
    <VStack>
      <HomeHeader />

      <HStack>

        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={groupSelected === item}
              onPress={() => setGroupSelected(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ px: 8 }}
          my={10}
          maxH={10}

        />

      </HStack>
    </VStack>
  )
}