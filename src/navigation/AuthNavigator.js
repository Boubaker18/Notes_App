import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Import screens
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../../screens/HomeScreen';
import NotesScreen from '../../screens/NotesScreen';

const Stack = createStackNavigator();

// Auth stack - screens for unauthenticated users
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      component={AuthScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// App stack - screens for authenticated users
const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3498db',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ title: 'Notes App' }}
    />
    <Stack.Screen 
      name="Notes" 
      component={NotesScreen}
      options={{ title: 'My Notes' }}
    />
  </Stack.Navigator>
);

// Main navigator component
const AuthNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default AuthNavigator;
