import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import StartScreen from '../screen/startScreen/StartScreen'
import Login from '../screen/login/Login'
import Home from '../screen/home/Home'
import Reports from '../screen/reports/Reports'
import Register from '../screen/login/Register';
import ForgotPassword from '../screen/login/ForgotPassword';
import Maps from '../screen/maps/Maps'
import ViewReports from '../screen/ViewReports/ViewReports'
import ReportView from '../screen/ReportView/ReportView';
import User from '../screen/user/User';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MyStack() {
    return (
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Report" component={Reports}  options={{headerShown: false, presentation: 'modal'}}/>
          <Stack.Screen name="Mapa" component={Maps} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: true}} />
          <Stack.Screen name="ViewReports" component={ViewReports} options={{ headerShown: false }} />

          <Stack.Screen name="User" component={User} options={{ presentation: 'modal', animationTypeForReplace: 'pop',gestureEnabled: true, }}
        />
             <Stack.Screen name="ReportView" component={ReportView} options={{ headerShown: false }} />
          <Stack.Screen name="Home" options={{ headerShown: false }}>
                {props => <MyTabs {...props} />}



      </Stack.Screen>
    </Stack.Navigator>
  );
}

function StackLogin() {
  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}



function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="View" component={ViewReports} options={{ tabBarIcon: 'document-text-outline' }} />
      <Tab.Screen name="Inicio" component={Home} options={{ tabBarIcon: 'home-outline' }} />
      <Tab.Screen name="Reporte" component={Reports} options={{ tabBarIcon: 'list-outline' }} />
      <Tab.Screen name="Mapa" component={Maps} options={{ tabBarIcon: 'map-outline' }} />
    </Tab.Navigator>
  );
}



const TabButton = ({ label, iconName, onPress, isSelected, iconColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <View style={isSelected ? styles.selectedButton : styles.button}>
        <View style={isSelected ? styles.selectedIconContainer : styles.iconContainer}>
          <Ionicons name={iconName} size={isSelected ? 27 : 24} color={iconColor} />
        </View>
        <Text style={isSelected ? styles.selectedLabel : styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};


const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const iconName = options.tabBarIcon !== undefined ? options.tabBarIcon : 'home-outline';
        const isSelected = state.index === index;
        const iconColor = isSelected ? 'red' : '#fff';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={index}
            label={label}
            iconName={iconName}
            onPress={onPress}
            isSelected={isSelected}
            iconColor={iconColor}
          />
        );
      })}
    </View>
  );
};




const Navigation = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default Navigation




const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'red',
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
    borderRadius: 29,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 90,
    position: 'relative',
    bottom: 16, // Aumenta la elevación
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'red'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 12,
    color: '#fff',
  },
  selectedLabel: {
    fontSize: 12,
    color: '#366273',
    display: 'none'
  },
  tabBarStyle: {
    position: 'absolute',
    height: 60,
    bottom: 24,
    right: 16,
    left: 16,
    borderRadius: 16,
    backgroundColor: '#366273',
    borderTopWidth: 1,
  },
});