import { huntManager } from '@/appwrite/huntManager';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ScavengerHuntScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [hunts, setHunts] = useState([]); // Placeholder for hunts data


  useEffect(() => {   
    const getHuntData = async () => {
      const fetchedHunts = await huntManager.getHunts().then(res => {
        if (res.hunts) {
          setHunts(res.hunts);
        } else {
          console.error('Error fetching hunts:', res.error);
        }
      });
    };
    getHuntData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Scavenger Hunt</Text>
      
      {user && (
        <Text style={styles.welcomeText}>
          Welcome, {user.name}!
        </Text>
      )}
      <Text style={styles.subtitle}>🔍 My Hunts</Text>
      <FlatList 
        data={[]}
        keyExtractor={(item) => item['$id']}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
