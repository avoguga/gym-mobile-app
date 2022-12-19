import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import ImgView from "../screens/ImgView";

const Stack = createNativeStackNavigator<any>();

export const NavegacaoPrincipal = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="ImgView" component={ImgView} />
    </Stack.Navigator>
  </NavigationContainer>
);
