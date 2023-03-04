import { useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@app/App';
import { HomeScreen } from '@app/screens/HomeScreen/HomeScreen';
import { EmployeesListScreen } from '@app/screens/EmployeesListScreen/EmployeesListScreen';
// import { TestScreen } from '@app/screens/TestScreen';
import { ExpensesScreen } from '@app/screens/ExpensesScreen';

import { HomeIcon } from '@app/assets/icons/Menu/HomeIcon';
import { GlobalStyles } from '@app/constants/styles';
import { ListIcon } from '@app/assets/icons/Menu/ListIcon';
import { Typography } from '@app/components/Typography';
import { CashIcon } from '@app/assets/icons/Menu/CashIcon';
// import { PlusIcon } from '@app/assets/icons/Menu/PlusIcon';

const Tab = createBottomTabNavigator<RootStackParamList>();

const getWidth = () => {
  const width = Dimensions.get('window').width / 3;
  return width;
};

export const TabNavigation = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            // backgroundColor: GlobalStyles.colors.primary100,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: ({ focused }) => focused && <Typography type="tabMenu">HOME</Typography>,
            tabBarIcon: ({ focused }) => (
              <View>
                <HomeIcon
                  fill={focused ? GlobalStyles.colors.blue100 : GlobalStyles.colors.grey700}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          }}
        />
        {/* TODO: consider to use it */}
        {/* <Tab.Screen
          name="Test"
          component={TestScreen}
          options={{
            tabBarLabel: ({ focused }) => focused && <Typography type="tabMenu">TEST</Typography>,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: GlobalStyles.colors.blue100,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 58,
                  }}>
                  <PlusIcon
                    fill={focused ? GlobalStyles.colors.white : GlobalStyles.colors.grey700}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        /> */}
        <Tab.Screen
          name="Expenses"
          component={ExpensesScreen}
          options={{
            tabBarLabel: ({ focused }) =>
              focused && <Typography type="tabMenu">Expenses</Typography>,
            tabBarIcon: ({ focused }) => (
              <View>
                <CashIcon
                  fill={focused ? GlobalStyles.colors.blue100 : GlobalStyles.colors.grey700}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1 - 15,
                useNativeDriver: true,
              }).start();
            },
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
                <ListIcon
                  fill={focused ? GlobalStyles.colors.blue100 : GlobalStyles.colors.grey700}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2 - 30,
                useNativeDriver: true,
              }).start();
            },
          }}
        />
      </Tab.Navigator>

      <Animated.View
        style={[
          styles.animatedVies,
          {
            transform: [{ translateX: tabOffsetValue }],
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  animatedVies: {
    width: getWidth() / 2,
    height: 2,
    backgroundColor: GlobalStyles.colors.blue100,
    position: 'absolute',
    bottom: 80,
    left: 50,
    borderRadius: 50,
  },
});
