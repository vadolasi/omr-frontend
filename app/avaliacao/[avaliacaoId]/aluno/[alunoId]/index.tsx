import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import Header from "../../../../../components/Header"

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
  }, [questions, totalCorrect])

  return (
    <View>
      <Header title={`Aluno #${alunoId}`} back />
      <Button onPress={() => router.push({ pathname: "/avaliacao/[avaliacaoId]/aluno/[alunoId]/scan", params: { avaliacaoId, alunoId } })} className="mt-5">
        {responded ? `Refazer avaliação` : "Iniciar avaliação"}
      </Button>
      <View className="px-10 mt-5">
        {responded && Object.keys(parsedQuestions).map(questionId => (
          <View key={questionId} className="flex flex-row items-center justify-between py-5">
            <Text>
              Questão {questionId}
            </Text>
            {Array.from({ length: parsedTotalOptions }, (_, i) => String.fromCharCode(65 + i)).map(option => (
              <Button
                key={option}
                mode="outlined"
                className="w-10 h-10"
                compact
                {...(parsedQuestions[questionId].correct === option ? {
                  theme: { colors: { primary: "green" } },
                  style: { borderColor: "green" }
                } : {
                  theme: { colors: { primary: "white" } }
                })}
                {...(parsedQuestions[questionId].response === option && parsedQuestions[questionId].response !== parsedQuestions[questionId].correct  ? {
                  theme: { colors: { primary: "red" } },
                  style: { borderColor: "red" }
                } : {})}
                onPress={() => {
                  setParsedQuestions(questions => {
                    const _questions = { ...questions }
                    _questions[questionId].response = option
                    return _questions
                  })
                }}
              >
                {option}
              </Button>
            ))}
          </View>
        ))}
      </View>
      {responded && (
        <Button className="mt-5">
          Salvar Resultado
        </Button>
      )}
    </View>
  )
}
