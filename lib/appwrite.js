import { Platform } from "react-native";
import { Account, Client, Databases, TablesDB } from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID) // Your project ID

  switch(Platform.OS) {
    case 'ios':
      client.setPlatform('com.caleb.scavengerhuntapp');
      break;

  }
  

  const databases = new Databases(client);
  const tablesDB = new TablesDB(client);
  

  const account = new Account(client); 
export { account, client, databases, tablesDB };
