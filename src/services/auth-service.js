import { ID, Account } from 'appwrite';
import client from '../../services/appwrite-config';

class AuthService {
  constructor() {
    // Initialize Appwrite Account service
    this.account = new Account(client);
  }

  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's name
   * @returns {Promise} Session object
   */
  async createAccount(email, password, name) {
    try {
      // Create a new account using Appwrite SDK
      const userAccount = await this.account.create(
        ID.unique(), // Generate a unique ID
        email,
        password,
        name
      );

      // If account creation is successful, automatically log the user in
      if (userAccount) {
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  /**
   * Log in an existing user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} Session object
   */
  async login(email, password) {
    try {
      // Create an email session using Appwrite SDK
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  /**
   * Get current session/user
   * @returns {Promise} User object or null
   */
  async getCurrentUser() {
    try {
      // Get current account information
      return await this.account.get();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null; // Return null if no user is logged in
    }
  }

  /**
   * Log out the current user
   * @returns {Promise}
   */
  async logout() {
    try {
      // Delete current session
      return await this.account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
