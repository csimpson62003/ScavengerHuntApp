import { account, tablesDB } from '@/lib/appwrite';
import { ID } from 'react-native-appwrite';

export const authManager = {
  // Sign in with email and password
  signInWithEmail: async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession({ email, password });
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign up with email, password, and name
  signUpWithEmail: async (email, password, firstName, lastName) => {
    try {
      const name = `${firstName} ${lastName}`.trim();
      
      // Create account
      const user = await account.create({ 
        userId: ID.unique(), 
        email, 
        password,
        name
      }).then(async response => {
        await tablesDB.createRow({
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
    tableId: 'users',
    rowId: ID.unique(),
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email
    }
  });
        return response;
      });
      

      //Create User in DB
      // Create session
      const session = await account.createEmailPasswordSession({ email, password });
      
      return { success: true, user, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const session = await account.getSession('current');
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await account.deleteSession('current');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
