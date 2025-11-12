import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = ({ navigation }) => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get auth context
  const { user, login, register, isAuthenticated, loading } = useAuth();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigation.replace('Home'); // Redirect to Home if already logged in
    }
  }, [isAuthenticated, loading, navigation]);

  // Handle form submission
  const handleSubmit = async () => {
    setErrorMessage('');

    // Validation
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    if (!isLogin && !name) {
      setErrorMessage('Name is required for registration');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      let result;

      if (isLogin) {
        // Handle login
        result = await login(email, password);
      } else {
        // Handle registration
        result = await register(email, password, name);
      }

      if (result.success) {
        // Navigate to home screen on success
        navigation.replace('Home');
      } else {
        // Display error message
        const errorMsg = result.error?.message || 'Authentication failed';
        setErrorMessage(errorMsg);
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      const errorMsg = 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      Alert.alert('Error', errorMsg);
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle between login and register forms
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setName('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
        <Text style={styles.subtitle}>
          {isLogin
            ? 'Sign in to access your notes'
            : 'Create an account to get started'}
        </Text>

        {/* Name field (registration only) */}
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!isSubmitting}
          />
        )}

        {/* Email field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
        />

        {/* Password field */}
        <TextInput
          style={styles.input}
          placeholder="Password (min. 8 characters)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!isSubmitting}
        />

        {/* Error message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? 'Login' : 'Register'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Toggle between login and register */}
        <TouchableOpacity
          style={styles.switchButton}
          onPress={toggleAuthMode}
          disabled={isSubmitting}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 25,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#99c9ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
  },
  switchText: {
    color: '#007BFF',
    fontSize: 14,
  },
  errorText: {
    color: '#f44336',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default AuthScreen;
