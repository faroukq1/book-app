import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import HomeScreen from "./pages/HomeScreen";
import BookScreen from "./pages/BookScreen";
import { GlobalProvider } from "./contextapi/useGlobalContext";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Books") {
                iconName = focused ? "book" : "book-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Books" component={BookScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
