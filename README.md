# Notes App - React Native with Appwrite Backend

A full-stack notes application built with React Native, Expo, and Appwrite as the backend service with complete user authentication.

## ✨ Features

- ✅ **User Authentication** - Register and login with email/password
- ✅ **Secure Sessions** - Persistent user sessions with Appwrite
- ✅ **User-specific Notes** - Each user sees only their own notes
- ✅ **Full CRUD Operations** with Appwrite backend
- ✅ Create new notes with title and content
- ✅ View all notes in a beautiful list
- ✅ Edit existing notes
- ✅ Delete notes with confirmation
- ✅ Pull-to-refresh functionality
- ✅ Loading states and error handling
- ✅ Beautiful Material Design-inspired UI
- ✅ Modal-based input interface
- ✅ Navigation between screens with auth protection
- ✅ Cloud synchronization via Appwrite
- ✅ Empty state UI for better UX

## 📁 Project Structure

```
NotesApp/
├── App.js                    # Root component with AuthProvider
├── src/
│   ├── services/
│   │   ├── auth-service.js       # Authentication logic (login, register, logout)
│   │   ├── appwrite-config.js    # Appwrite client configuration
│   │   ├── database-service.js   # Database operations service
│   │   └── note-service.js       # Note CRUD with userId filtering
│   ├── contexts/
│   │   └── AuthContext.js        # Global auth state management
│   ├── navigation/
│   │   └── AuthNavigator.js      # Route management based on auth status
│   ├── screens/
│   │   └── AuthScreen.js         # Login/Register UI
│   └── components/
│       └── LogoutButton.js       # Logout functionality
├── screens/
│   ├── HomeScreen.js        # Welcome screen with auth check
│   └── NotesScreen.js       # Main notes screen with user filtering
├── components/
│   ├── NoteItem.js          # Reusable note item component
│   ├── NoteInput.js         # Reusable note input modal with auth
│   └── EditNoteModal.js     # Modal for editing notes
├── assets/                   # Static assets (images, icons)
├── .env                      # Environment variables (not in git)
├── .env.example             # Example environment variables
├── babel.config.js          # Babel configuration for env variables
├── AUTHENTICATION_SETUP.md  # Authentication setup guide
├── APPWRITE_SETUP.md        # Appwrite backend setup guide
├── QUICK_START.md           # Quick start guide
├── package.json             # Project dependencies
└── app.json                 # Expo configuration
```

## 🛠️ Technologies Used

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** (SDK 54) - Development toolchain and services
- **React Navigation** - Navigation library
  - @react-navigation/native
  - @react-navigation/native-stack
  - react-native-screens
  - react-native-safe-area-context

### Backend
- **Appwrite** - Open-source backend server
  - Authentication (Email/Password)
  - Database for notes storage
  - User session management
  - Real-time capabilities
  - Scalable cloud infrastructure

### Development
- **react-native-dotenv** - Environment variables management
- **babel-preset-expo** - Babel configuration for Expo

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device (optional, for testing on physical device)
- Appwrite account (free) at [https://cloud.appwrite.io/](https://cloud.appwrite.io/)

### Installation

1. Clone the repository (if not already done):

```powershell
git clone https://github.com/Boubaker18/Notes_App.git
cd NotesApp
```

2. Install dependencies:

```powershell
npm install
```

3. **Configure Appwrite** (IMPORTANT):

See detailed setup instructions in [APPWRITE_SETUP.md](./APPWRITE_SETUP.md) and [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)

Quick steps:
- Create an Appwrite account at [https://cloud.appwrite.io/](https://cloud.appwrite.io/)
- Create a project called "NotesApp"
- Enable Email/Password authentication in Auth settings
- Create a database called "NotesDB"
- Create a collection called "notes" with attributes: `title`, `content`, `userId`, `createdAt`, `updatedAt`
- Set collection permissions for authenticated users
- Copy `.env.example` to `.env` and add your Appwrite credentials:

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_DATABASE_ID=your-database-id
APPWRITE_COLLECTION_ID=your-collection-id
```

4. Start the development server:

```powershell
npm start
```

5. Run on different platforms:

```powershell
# Run on web browser (easiest for testing)
Press 'w' in the terminal

# Run on Android emulator/device
Press 'a' in the terminal

# Run on iOS simulator (macOS only)
Press 'i' in the terminal

# Or scan the QR code with Expo Go app
```

### Using Expo Go

1. Install Expo Go from the App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in the terminal after running `npx expo start`
3. The app will load on your device

## Key Concepts Covered

### React Native Basics
- Components (View, Text, TouchableOpacity, FlatList, Modal, TextInput)
- StyleSheet and styling
- Flexbox layout
- State management with useState and useContext hooks
- Side effects with useEffect

### Authentication
- User registration and login
- Session management with Appwrite
- Protected routes based on auth status
- Context API for global auth state
- Secure credential handling

### Navigation
- Stack Navigator setup
- Screen configuration
- Passing navigation props
- Navigating between screens
- Conditional navigation based on auth status
- Auth flow implementation

### Component Architecture
- Functional components
- Props and callbacks
- Component composition
- Separation of concerns
- Context consumers
- Custom hooks (useAuth)

### CRUD Operations with User Filtering
- Create: Add new notes linked to user
- Read: Display only user's notes
- Update: Edit existing notes
- Delete: Remove notes
- Filter by userId in database queries

## Code Highlights

### Component Refactoring
The app demonstrates good practices by extracting reusable components:
- `NoteItem` - Displays individual note with edit/delete actions
- `NoteInput` - Modal for creating notes with auth integration
- `EditNoteModal` - Modal for editing existing notes
- `LogoutButton` - Reusable logout functionality
- `AuthNavigator` - Conditional navigation based on auth state

### State Management
Uses React hooks and Context API for state:
```javascript
// Local state
const [notes, setNotes] = useState([]);
const [modalVisible, setModalVisible] = useState(false);

// Global auth state with Context
const { user, isAuthenticated, login, register, logout } = useAuth();
```

### Authentication Flow
```javascript
// Check auth status on app load
useEffect(() => {
  const checkUserStatus = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  };
  checkUserStatus();
}, []);

// Conditional rendering based on auth
return isAuthenticated ? <AppStack /> : <AuthStack />;
```

### Efficient List Rendering
Uses `FlatList` for optimal performance with large lists:
```javascript
<FlatList
  data={notes}
  renderItem={({ item }) => (
    <NoteItem note={item} onEdit={editNote} onDelete={deleteNote} />
  )}
  keyExtractor={(item) => item.id}
/>
```

## Troubleshooting

### PowerShell Execution Policy Error
If you encounter the npm script execution error:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Legacy Expo CLI Warning
Use the modern local CLI instead:
```powershell
npx expo start
```
instead of the global `expo` command.

## Next Steps

To enhance this app, you could:
- Add persistent storage (AsyncStorage, SQLite, or a backend)
- Implement categories/tags for notes
- Add search functionality
- Include timestamps and sort options
- Add note colors or themes
- Implement swipe-to-delete gestures
- Add note sharing functionality

## Learning Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Hooks Guide](https://react.dev/reference/react)

## License

This is a tutorial project for educational purposes.
