import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@app/App';
import { HomeScreen } from '@app/screens/HomeScreen';
import { EmployeesListScreen } from '@app/screens/EmployeesListScreen/EmployeesListScreen';
import { HomeIcon } from '@app/assets/icons/Menu/HomeIcon';
import { GlobalStyles } from '@app/constants/styles';
import { ListIcon } from '@app/assets/icons/Menu/ListIcon';
import { Typography } from '@app/components/Typography';

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
