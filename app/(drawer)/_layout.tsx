import { Link, useNavigation } from "expo-router"
import { Drawer } from "expo-router/drawer"
import { View } from "../../components/Themed"
export default function DrawerLayout() {
    const navigation = useNavigation()
  return (
    <Drawer
    initialRouteName="(tabs)/home"
      // defaultStatus='open'
      screenOptions={{ headerShown: false }}
      drawerContent={(drawerContentComponentProps)=>{
        return <View>
            <Link href={'/(auth)/login'} >LOGIN</Link>
            <Link href={'/(auth)/login'} >LOGIN</Link>
            <Link href={'/(auth)/login'} >LOGIN</Link>
            <Link href={'/(auth)/login'} >LOGIN</Link>
            <Link href={'/(auth)/login'} >LOGIN</Link>
            <Link href={'/(auth)/register'} >REGISTER</Link>
        </View>
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "overview",
        }}
      />
      
    </Drawer>
  )
}
