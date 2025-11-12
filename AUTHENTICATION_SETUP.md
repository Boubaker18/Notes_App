# Authentication Setup Guide

This guide will help you set up authentication in the Notes App using Appwrite.

## Prerequisites

Before you begin, make sure you have:
- Completed the Appwrite setup from `APPWRITE_SETUP.md`
- Created an Appwrite project
- Configured your database and collection

## Step 1: Configure Appwrite Authentication

### 1.1 Enable Email/Password Authentication

1. Go to your Appwrite Console: https://cloud.appwrite.io
2. Select your NotesApp project
3. Navigate to **Auth** in the left sidebar
4. The Email/Password provider should be enabled by default
5. If not, click on **Email/Password** and enable it

### 1.2 Configure Security Settings (Optional)

You can configure additional security settings:
- **Password length**: Minimum 8 characters (recommended)
- **Password dictionary**: Enable to prevent common passwords
- **Personal data**: Enable to prevent passwords containing personal data

## Step 2: Update Database Collection Permissions

Since we're now filtering notes by user, we need to update our collection permissions:

1. Go to **Databases** in your Appwrite Console
2. Select your **NotesDB** database
3. Select the **notes** collection
4. Click on **Settings**
5. Update **Permissions**:

   Instead of "Any", set permissions for authenticated users:
   
   - **Create**: Role: Users (authenticated)
   - **Read**: Role: Users (authenticated)
   - **Update**: Role: Users (authenticated)
   - **Delete**: Role: Users (authenticated)

   This ensures that only logged-in users can access notes.

## Step 3: Test the Authentication Flow

### 3.1 Register a New User

1. Start your app: `npm start`
2. You should see the Login/Register screen
3. Switch to "Register" mode
4. Fill in:
   - Name: Your name
   - Email: Your email address
   - Password: At least 8 characters
5. Tap "Register"

### 3.2 Verify Registration

After successful registration:
- You should be automatically logged in
- You'll be redirected to the Home screen
- You'll see a welcome message with your name
- A logout button will appear in the header

### 3.3 Test Login

1. Tap the "Logout" button
2. Confirm logout
3. You'll return to the Auth screen
4. Enter your email and password
5. Tap "Login"
6. You should be redirected to the Home screen

### 3.4 Test Notes with Authentication

1. Navigate to "View My Notes"
2. Create a new note
3. Your note will be associated with your user ID
4. Logout and login with a different account
5. You won't see notes from the first account

## Step 4: Verify in Appwrite Console

### 4.1 Check Users

1. Go to **Auth** > **Users** in Appwrite Console
2. You should see your registered user(s)
3. Click on a user to see details

### 4.2 Check Notes Collection

1. Go to **Databases** > **NotesDB** > **notes**
2. Click on **Documents**
3. You should see your notes
4. Each note should have a `userId` field matching your user's ID

## Architecture Overview

### Authentication Flow

```
App Start
    ↓
Check if user logged in (AuthContext)
    ↓
    ├─> Yes → Navigate to Home Screen
    │         ↓
    │         User can view/create notes
    │         ↓
    │         Notes filtered by userId
    │
    └─> No → Navigate to Auth Screen
              ↓
              Login or Register
              ↓
              Create session with Appwrite
              ↓
              Navigate to Home Screen
```

### File Structure

```
NotesApp/
├── src/
│   ├── services/
│   │   ├── auth-service.js       # Authentication logic
│   │   ├── appwrite-config.js    # Appwrite client setup
│   │   └── note-service.js       # Note CRUD with userId filtering
│   ├── contexts/
│   │   └── AuthContext.js        # Global auth state management
│   ├── navigation/
│   │   └── AuthNavigator.js      # Route management based on auth
│   ├── screens/
│   │   └── AuthScreen.js         # Login/Register UI
│   └── components/
│       └── LogoutButton.js       # Logout functionality
├── screens/
│   ├── HomeScreen.js             # Updated with auth checks
│   └── NotesScreen.js            # Updated with userId filtering
└── App.js                        # Root component with AuthProvider
```

### Key Components

#### AuthService (`src/services/auth-service.js`)
- `createAccount(email, password, name)` - Register new user
- `login(email, password)` - Login existing user
- `getCurrentUser()` - Get current session
- `logout()` - End current session

#### AuthContext (`src/contexts/AuthContext.js`)
- Provides global auth state to all components
- Manages user session across app
- Exposes: `user`, `loading`, `isAuthenticated`, `login`, `register`, `logout`

#### AuthNavigator (`src/navigation/AuthNavigator.js`)
- Renders different navigation stacks based on auth status
- AuthStack (unauthenticated): Only shows Auth screen
- AppStack (authenticated): Shows Home and Notes screens

## Common Issues and Solutions

### Issue 1: "Cannot find module 'appwrite'"

**Solution**: Make sure Appwrite SDK is installed:
```bash
npm install appwrite
```

### Issue 2: "User creation failed"

**Possible causes**:
- Email already registered
- Password too short (< 8 characters)
- Invalid email format

**Solution**: Check error message and adjust input accordingly.

### Issue 3: "Session not found"

**Solution**: This means the user is not logged in. The app should automatically redirect to the Auth screen.

### Issue 4: Notes from other users are visible

**Solution**: 
1. Check that `userId` is being set correctly in `note-service.js`
2. Verify collection permissions in Appwrite Console
3. Make sure you're passing `user.$id` when calling `getNotes()`

### Issue 5: "Cannot read property '$id' of null"

**Solution**: This means `user` is null. Add auth checks before accessing user properties:
```javascript
if (!user) return;
// or
const userId = user?.$id;
```

## Security Best Practices

### 1. Never Store Credentials in Code
- Use environment variables for Appwrite config
- Don't commit `.env` file to git

### 2. Use Proper Collection Permissions
- Don't use "Any" in production
- Set specific permissions for authenticated users
- Consider document-level permissions for fine-grained control

### 3. Validate User Input
- Validate email format
- Enforce password requirements
- Sanitize user inputs before saving

### 4. Handle Sensitive Data
- Don't log passwords or session tokens
- Clear sensitive data from state on logout
- Use HTTPS in production

## Next Steps

Now that authentication is working:

1. **Add Password Reset**: Implement password recovery flow
2. **Email Verification**: Require email verification for new accounts
3. **OAuth Providers**: Add Google, GitHub, etc. login options
4. **Profile Management**: Allow users to update their profile
5. **Advanced Permissions**: Implement document-level permissions in Appwrite

## Additional Resources

- [Appwrite Authentication Docs](https://appwrite.io/docs/authentication)
- [React Navigation Auth Flow](https://reactnavigation.org/docs/auth-flow)
- [Appwrite Security](https://appwrite.io/docs/security)

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify Appwrite Console settings
3. Review this guide
4. Check Appwrite documentation
5. Check the app logs for detailed error messages
