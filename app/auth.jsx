import { ThemedView } from '@/components/themed-view';
import { account } from '@/lib/appwrite';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ID } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountInfo, setAccountInfo] = useState({
    email: '',
    confirm_email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUpWithEmail = async () => {
    try {
      setIsLoading(true);
      await account.create({ 
        userId: ID.unique(), 
        email, 
        password 
      });
      await account.createEmailPasswordSession({ email, password });
      router.replace('/scavenger-hunt');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async () => {
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession({ email: accountInfo.email, password: accountInfo.password });
      router.replace('./(tabs)');
    } catch (error) {
      Alert.alert('Sign In Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = () => {
    if (!accountInfo.email || !accountInfo.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isSignUp) {
      signUpWithEmail();
    } else {
      signInWithEmail();
    }   
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
      <Text style={styles.title}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </Text>

      {isSignUp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={accountInfo.first_name}
            onChangeText={(text) => setAccountInfo({ ...accountInfo, first_name: text })}
            autoCapitalize="words"
          />
            <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={accountInfo.last_name}
            onChangeText={(text) => setAccountInfo({ ...accountInfo, last_name: text })}
            autoCapitalize="words"
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={accountInfo.email}
        onChangeText={(text) => setAccountInfo({ ...accountInfo, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Email"
          value={accountInfo.confirm_email}
          onChangeText={(text) => setAccountInfo({ ...accountInfo, confirm_email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={accountInfo.password}
        onChangeText={(text) => setAccountInfo({ ...accountInfo, password: text })}
        secureTextEntry
        placeholderTextColor="#888"
      />

        {isSignUp && (
        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={accountInfo.confirm_password}
            onChangeText={(text) => setAccountInfo({ ...accountInfo, confirm_password: text })}
            secureTextEntry
            placeholderTextColor="#888"
          />
        )}
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleAuth}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.switchText}>
          {isSignUp 
            ? 'Already have an account? Sign In' 
            : "Don't have an account? Sign Up"
          }
        </Text>
      </TouchableOpacity>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Change from center to flex-start
    padding: 20,
    paddingTop: 100, // Increase top padding significantly
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40, // Increase top margin
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#007AFF',
    fontSize: 14,
  },
});