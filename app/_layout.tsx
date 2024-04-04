import { Stack } from "expo-router"
import Header from "../components/Header"
import { StatusBar } from "react-native"

export const unstable_settings = {
  initialRouteName: "index"
}

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
        <Stack.Screen name="index" options={{ title: "Suas avaliações", header: ({ options: { title }, back }) => <Header title={title ?? ""} back={back !== undefined} /> }} />
        <Stack.Screen name="avaliacao/[avaliacaoId]/index" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal", header: ({ options: { title }, back }) => <Header title={title ?? ""} back={back !== undefined} /> }} />
        <Stack.Screen name="avaliacao/[avaliacaoId]/scan" options={{ headerShown: false }} />
        <Stack.Screen name="avaliacao/[avaliacaoId]/aluno/[alunoId]/index" options={{ headerShown: false }} />
        <Stack.Screen name="avaliacao/[avaliacaoId]/aluno/[alunoId]/scan" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle="dark-content" />
    </>
  )
}
