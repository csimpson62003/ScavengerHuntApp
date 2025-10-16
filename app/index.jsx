import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoading, isAuthenticated, verifySession } = useAuth();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!isLoading) {
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (isAuthenticated) {
          // Verify the session is still valid
          const sessionResult = await verifySession();
          if (sessionResult.valid) {
            // Navigate to scavenger hunt screen
            router.replace('/(tabs)');
          } else {
            // Session invalid, go to sign-in
            router.replace('/sign-in');
          }
        } else {
          // No session, go to sign-in
          router.replace('/sign-in');
        }
      }
    };

    handleAuthentication();
  }, [isLoading, isAuthenticated, router, verifySession]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Replace with your app logo */}
        <ThemedText style={styles.logo}>🕵️</ThemedText>
        <ThemedText style={styles.title}>Scavenger Hunt</ThemedText>
      </View>
      
      <View style={styles.loadingContainer}>
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});