import { router, useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { Camera, CameraType } from "expo-camera"
import useCamera from "../../../../../lib/useCamera"
import { useRef, useState } from "react"

interface Question {
  response: string
  correct: string
}

export default function () {
  const { avaliacaoId, alunoId } = useLocalSearchParams<{ avaliacaoId: string, alunoId: string }>()

  const { permission, handleRatio, ratioString, fullScreenHeight, fullScreenWidth } = useCamera()

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
    <View className="h-screen flex-1 justify-center items-center">
      <Camera
        type={CameraType.back}
        ref={cameraRef}
        ratio={ratioString}
        onCameraReady={() => {
          handleRatio(cameraRef.current!)
        }}
        style={{
          height: fullScreenHeight,
          width: fullScreenWidth
        }}
      />
      <View className="absolute bottom-5 w-full flex flex-row justify-center items-center">
        <View style={{ width: 60 }} />
        <IconButton
          icon="camera"
          size={60}
          mode="contained-tonal"
          onPress={takePicture}
        />
        <IconButton
          icon="close"
          size={30}
          mode="contained-tonal"
          onPress={router.back}
        />
      </View>
    </View>
  )
}
