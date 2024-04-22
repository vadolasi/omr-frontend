import { useState, SetStateAction, Dispatch } from "react"
import { View, Text } from "react-native"
import { Button } from "react-native-paper"

interface Props {
  questionId: string
  parsedQuestions: Record<string, { response: string, correct: string }>
  setTotalCorrect: Dispatch<SetStateAction<number>>
  parsedTotalOptions: number
}

const Item: React.FC<Props> = ({ questionId, parsedQuestions, parsedTotalOptions, setTotalCorrect }) => {
  const [selected, setSelected] = useState<string[]>(Array(parsedQuestions[questionId]!.response))
  const question = parsedQuestions[questionId]

  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 5 }}>
      <Text style={{ fontSize: 20, width: 30 }}>
        {questionId}
      </Text>
      {Array.from({ length: parsedTotalOptions }, (_, i) => String.fromCharCode(65 + i)).map(option => (
        <Button
          key={option}
          mode="outlined"
          compact
          buttonColor={selected.includes(option) ? question.correct.includes(option) ? "green" : "red" : "white"}
          style={{
            width: 35,
            height: 35,
            borderWidth: 2,
            borderColor: selected.includes(option) ? "black" : question.correct.includes(option) ? "green" : "black",
            marginBottom: 5
          }}
          onPress={() => {
            if (selected.includes(question.correct)) {
              setTotalCorrect(prev => prev - 1)
            } else if (question.correct.includes(option)) {
              setTotalCorrect(prev => prev + 1)
            }

            setSelected([option])
          }}
        >
          {" "}
        </Button>
      ))}
    </View>
  )
}

export default Item
