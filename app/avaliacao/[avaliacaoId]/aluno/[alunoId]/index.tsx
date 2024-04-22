import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { View, FlatList } from "react-native"
import { Button, Text } from "react-native-paper"
import Header from "../../../../../components/Header"
import Item from "../../../../../components/Item"

export default function () {
  const { avaliacaoId, alunoId, questions, totalOptions } = useLocalSearchParams<{
    avaliacaoId: string,
    alunoId: string,
    questions?: string,
    totalOptions?: string
  }>()

  const [parsedQuestions, setParsedQuestions] = useState<Record<string, { response: string, correct: string }>>({})
  const parsedTotalOptions = totalOptions ? parseInt(totalOptions) : 0

  const [responded, setResponded] = useState(false)
  const [totalCorrect, setTotalCorrect] = useState(0)

  useEffect(() => {
    const _parsedQuestions = questions ? JSON.parse(questions) : {} as Record<string, { response: string, correct: string }>
    if (Object.keys(_parsedQuestions).length > 0 && totalCorrect === 0) {
      let correct = 0
      for (const questionId in _parsedQuestions) {
        if (_parsedQuestions[questionId].response === _parsedQuestions[questionId].correct) {
          correct++
        }
      }
      setTotalCorrect(correct)
      setParsedQuestions(_parsedQuestions)
      setResponded(true)
    }
  }, [])

  return (
    <View>
      <Header title={`Avaliação #${avaliacaoId}`} back />
      <View style={{ paddingBottom: 10, paddingHorizontal: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Aluno #{alunoId}</Text>
          {responded && (
            <>
              <View style={{ display: "flex" }}>
                <Text style={{ fontSize: 20 }}>Acertos</Text>
                <Text style={{ fontSize: 20, textAlign: "right" }}>{totalCorrect}</Text>
              </View>
              <View style={{ display: "flex" }}>
                <Text style={{ fontSize: 20 }}>Percentual</Text>
                <Text style={{ fontSize: 20, textAlign: "right" }}>{totalCorrect / Object.keys(parsedQuestions).length * 100}%</Text>
              </View>
            </>
          )}
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 15 }}>Questões</Text>
      </View>
      <FlatList
        scrollEnabled={responded}
        style={{ height: "100%", marginHorizontal: 30 }}
        data={Object.keys(parsedQuestions)}
        renderItem={({ item: questionId }) => <Item questionId={questionId} parsedQuestions={parsedQuestions} parsedTotalOptions={parsedTotalOptions} setTotalCorrect={setTotalCorrect} />}
        ListFooterComponent={(
          <View style={{ marginBottom: 300, marginTop: 20 }}>
            {responded && (
              <Button buttonColor="#07B523E5" textColor="white" style={{ borderRadius: 10, padding: 5 }} onPress={() => router.push({ pathname: "/avaliacao/[avaliacaoId]/", params: { avaliacaoId } })}>
                Finalizar correção
              </Button>
            )}
            <Button buttonColor="#063CB4E5" textColor="white" style={{ borderRadius: 10, padding: 5, marginTop: 12 }} onPress={() => router.push({ pathname: "/avaliacao/[avaliacaoId]/aluno/[alunoId]/scan", params: { avaliacaoId, alunoId } })}>
              {responded ? `Refazer avaliação` : "Iniciar avaliação"}
            </Button>
          </View>
        )}
      />
    </View>
  )
}
