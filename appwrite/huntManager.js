import { tablesDB } from '@/lib/appwrite';

export const huntManager = {
  
    getHunts: async () => {
      try {
        const hunts = await tablesDB.listRows(
          process.env.EXPO_PUBLIC_DATABASE_ID,
          'hunts'
        );
        console.log('Fetched hunts:', hunts);
        return { success: true, hunts: hunts.rows };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
};
