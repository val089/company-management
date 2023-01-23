import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../App';
import { HomeScreen } from '../screens/HomeScreen';
import { EmployeesListScreen } from '../screens/EmployeesListScreen';
import { HomeIcon } from '../assets/icons/Menu/HomeIcon';
import { GlobalStyles } from '../constants/styles';
import { ListIcon } from '../assets/icons/Menu/ListIcon';
import { Typography } from '../components/Typography';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: GlobalStyles.colors.primary100,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => focused && <Typography type="tabMenu">HOME</Typography>,
          tabBarIcon: ({ focused }) => (
            <View>
              <HomeIcon fill={focused ? GlobalStyles.colors.blue100 : GlobalStyles.colors.white} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="EmployeesList"
        component={EmployeesListScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused && <Typography type="tabMenu">EMPLOYEES LIST</Typography>,
          tabBarIcon: ({ focused }) => (
            <View>
              <ListIcon fill={focused ? GlobalStyles.colors.blue100 : GlobalStyles.colors.white} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
