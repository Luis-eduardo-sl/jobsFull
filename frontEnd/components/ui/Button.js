import { Pressable, View, Text, StyleSheet } from "react-native"

const Button = ({title, onPress, style, textStyle}) => {
  return (
    <Pressable onPress={onPress}>
        <View style={[styles.customButton, style]}>
            <Text style={[styles.textButton, textStyle]}>{title}</Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    customButton: {
        backgroundColor: "#123DDB",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 28,
      },
      textButton: {
        color: '#FFF',
        textAlign: 'center'
      }
})

export default Button