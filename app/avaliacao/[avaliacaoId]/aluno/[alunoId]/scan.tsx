import { router, useLocalSearchParams } from "expo-router"
import { ActivityIndicator, View, Text } from "react-native"
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera"
import useCamera from "../../../../../lib/useCamera"
import { useRef, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import Toast from "react-native-root-toast"

interface Question {
  response: string
  correct: string
}

export default function () {
  const { avaliacaoId, alunoId } = useLocalSearchParams<{ avaliacaoId: string, alunoId: string }>()

  const { permission, ratioString } = useCamera()

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

    cameraRef.current!.takePictureAsync({ quality: 1, onPictureSaved: (photo: CameraCapturedPicture) => {
      const filename = photo.uri.split("/").pop()!

      const match = /\.(\w+)$/.exec(filename)
      const type = match ? `image/${match[1]}` : `image`

      const formData = new FormData()
      // @ts-ignore
      formData.append("file", { uri: photo.uri, name: filename, type })

      fetch("https://omr.94-23-170-94.nip.io/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        },
        body: formData
      })
        .then(res => {
          res.json()
            .then(data => {
              if (!res.ok || data.status === "error") {
                Toast.show("Não foi possível processar a imagem. Tente novamente.")
                setLoading(false)
                return
              }

              const questions: Record<string, Question> = data

              router.push({ pathname: "/avaliacao/[avaliacaoId]/aluno/[alunoId]/", params: { avaliacaoId, alunoId, questions: JSON.stringify(questions), totalOptions: 5 } })
            })
        })
        .catch(e => {
          Toast.show("Ocorreu um erro. O incidente foi reportado. Verifique se a imagem está legível e tente novamente.")
          setLoading(false)
          return
        })
    }})
  }

  return (
    <>
      <View style={{ height: "100%", width: "100%", padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ alignItems: "center", marginTop: 75 }}>
          <Text style={{ marginBottom: 20, textAlign: "center", fontSize: 20 }}>Centralize as marcações, tente evitar que o celular esteja muito inclinado em relação a folha</Text>
          {loading && (
            <View style={{ height: 400, width: 300, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <Camera
            type={CameraType.back}
            ref={cameraRef}
            ratio={ratioString}
            useCamera2Api={true}
            style={{
              height: 400,
              width: 300,
              display: loading ? "none" : "flex"
            }}
          />
        </View>
        <TouchableOpacity onPress={takePicture} style={{ padding: 16, backgroundColor: "#063CB4E5", borderRadius: 10, width: "100%", marginTop: 10, opacity: loading ? 50 : 100 }} disabled={loading}>
          <Text style={{ fontWeight: "bold", color: "white", width: "100%" }}>{loading ? "Carregando..." : "Corrigir"}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
