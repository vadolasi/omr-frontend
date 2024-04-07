import { router, useLocalSearchParams } from "expo-router"
import { View , Text } from "react-native"
import { Camera, CameraType } from "expo-camera"
import useCamera from "../../../../../lib/useCamera"
import { useRef, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"

interface Question {
  response: string
  correct: string
}

export default function () {
  const { avaliacaoId, alunoId } = useLocalSearchParams<{ avaliacaoId: string, alunoId: string }>()

  const { permission, handleRatio, ratioString } = useCamera()

  const cameraRef = useRef<Camera>(null)
  const [loading, setLoading] = useState(false)

  if (!permission) {
    return <Text>Requesting for camera permission</Text>
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>
  }

  const takePicture = async () => {
    setLoading(true)
    const photo = await cameraRef.current!.takePictureAsync()
    const filename = photo.uri.split("/").pop()!

    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    // @ts-ignore
    formData.append("file", { uri: photo.uri, name: filename, type })

    const res = await fetch("https://daa6-187-111-237-246.ngrok-free.app/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      },
      body: formData
    })

    const questions: Record<string, Question> = await res.json()

    router.push({ pathname: "/avaliacao/[avaliacaoId]/aluno/[alunoId]/", params: { avaliacaoId, alunoId, questions: JSON.stringify(questions), totalOptions: 5 } })
  }

  return (
    <View style={{ height: "100%", width: "100%", padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ alignItems: "center", marginTop: 75 }}>
        <Text style={{ marginBottom: 20, textAlign: "center", fontSize: 20 }}>Centralize as marcações, tente evitar que o celular esteja muito inclinado em relação a folha</Text>
        <Camera
          type={CameraType.back}
          ref={cameraRef}
          ratio={ratioString}
          onCameraReady={() => {
            handleRatio(cameraRef.current!)
            cameraRef.current!.getSupportedRatiosAsync().then(console.log)
          }}
          style={{
            height: 400,
            width: 300
          }}
        />
      </View>
      <TouchableOpacity onPress={console.log} style={{ padding: 16, backgroundColor: "#063CB4E5", borderRadius: 10, width: "100%", marginTop: 10 }} disabled={loading}>
        <Text style={{ fontWeight: "bold", color: "white", width: "100%" }}>{loading ? "Carregando..." : "Corrigir"}</Text>
      </TouchableOpacity>
    </View>
  )
}
