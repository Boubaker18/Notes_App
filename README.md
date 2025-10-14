# Notes App - React Native Tutorial

A simple notes application built with React Native and Expo as part of a mobile development tutorial.

## Features

- ✅ View a list of notes
- ✅ Create new notes
- ✅ Edit existing notes
- ✅ Delete notes
- ✅ Beautiful Material Design-inspired UI
- ✅ Modal-based input interface
- ✅ Navigation between screens

## Project Structure

```
NotesApp/
├── App.js                    # Main app with navigation setup
├── screens/
│   ├── HomeScreen.js        # Welcome screen
│   └── NotesScreen.js       # Main notes screen with CRUD operations
├── components/
│   ├── NoteItem.js          # Reusable note item component
│   └── NoteInput.js         # Reusable note input modal component
├── assets/                   # Static assets (images, icons)
├── package.json             # Project dependencies
└── app.json                 # Expo configuration
```

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - Development toolchain and services
- **React Navigation** - Navigation library
  - @react-navigation/native
  - @react-navigation/stack
  - react-native-screens
  - react-native-safe-area-context
  - react-native-gesture-handler

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device (optional, for testing on physical device)

### Installation

1. The project is already created. If you need to reinstall dependencies:

```powershell
npm install
```

2. Start the development server:

```powershell
npx expo start
```

3. Run on different platforms:

```powershell
# Run on web browser
npm run web

# Run on Android emulator/device
npm run android

# Run on iOS simulator (macOS only)
npm run ios
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
- State management with useState hooks

### Navigation
- Stack Navigator setup
- Screen configuration
- Passing navigation props
- Navigating between screens

### Component Architecture
- Functional components
- Props and callbacks
- Component composition
- Separation of concerns

### CRUD Operations
- Create: Add new notes
- Read: Display notes in a list
- Update: Edit existing notes
- Delete: Remove notes

## Code Highlights

### Component Refactoring
The app demonstrates good practices by extracting reusable components:
- `NoteItem` - Displays individual note with edit/delete actions
- `NoteInput` - Modal for creating/editing notes

### State Management
Uses React hooks for local state:
```javascript
const [notes, setNotes] = useState(initialNotes);
const [modalVisible, setModalVisible] = useState(false);
const [noteText, setNoteText] = useState("");
const [editingNote, setEditingNote] = useState(null);
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
