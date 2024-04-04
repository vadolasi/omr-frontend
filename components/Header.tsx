import { useRouter } from "expo-router"
import React from "react";
import { StyleSheet, View, Text } from "react-native"
import { Svg, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { TouchableOpacity } from "react-native-gesture-handler"

const Header: React.FC<{ back?: boolean, title: string, actions?: React.ReactElement }> = ({ back = false, title, actions = null }) => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity onPress={router.back} style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
            <Defs>
              <ClipPath id="clip0">
                <Rect width={22} height={22} fill="white" />
              </ClipPath>
            </Defs>
            <Path
              d="M15.7392 22C15.6185 22.0007 15.4989 21.9776 15.3872 21.932C15.2756 21.8863 15.174 21.8191 15.0883 21.7342L7.59915 14.245C7.17232 13.8192 6.83368 13.3135 6.60262 12.7566C6.37156 12.1998 6.25262 11.6029 6.25262 11C6.25262 10.3971 6.37156 9.80019 6.60262 9.24336C6.83368 8.68653 7.17232 8.18075 7.59915 7.755L15.0883 0.265834C15.1738 0.180365 15.2753 0.112568 15.3869 0.0663128C15.4986 0.0200575 15.6183 -0.00374985 15.7392 -0.00374985C15.86 -0.00374985 15.9797 0.0200574 16.0914 0.0663127C16.203 0.112568 16.3045 0.180365 16.39 0.265834C16.4755 0.351303 16.5433 0.452769 16.5895 0.564439C16.6358 0.676109 16.6596 0.795797 16.6596 0.916667C16.6596 1.03754 16.6358 1.15723 16.5895 1.2689C16.5433 1.38057 16.4755 1.48203 16.39 1.5675L8.90082 9.05667C8.38583 9.57229 8.09657 10.2712 8.09657 11C8.09657 11.7288 8.38583 12.4277 8.90082 12.9433L16.39 20.4325C16.4759 20.5177 16.5441 20.6191 16.5906 20.7308C16.6372 20.8425 16.6611 20.9623 16.6611 21.0833C16.6611 21.2043 16.6372 21.3242 16.5906 21.4359C16.5441 21.5476 16.4759 21.6489 16.39 21.7342C16.3043 21.8191 16.2028 21.8863 16.0911 21.932C15.9794 21.9776 15.8598 22.0007 15.7392 22Z"
              fill="#101010"
              clipPath="url(#clip0)"
            />
          </Svg>
        </TouchableOpacity>
      )}
      <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.title} className="font-bold text-[100px]">{title}</Text>
          <Svg width={40} height={4} viewBox="0 0 40 4" fill="none">
            <Rect width={40} height={4} rx={2} fill="#063CB4" />
          </Svg>
        </View>
        {actions !== null && actions}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    padding: 20,
    paddingBottom: 15
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10
  }
});

export default Header
