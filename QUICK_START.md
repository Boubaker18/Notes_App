# Quick Start Guide - Notes App

## ✅ Project Setup Complete!

Your React Native Notes App has been successfully created and configured.

## 📁 Project Structure

```
NotesApp/
├── App.js                    # Main app with navigation
├── screens/
│   ├── HomeScreen.js        # Welcome screen
│   └── NotesScreen.js       # Notes CRUD screen
├── components/
│   ├── NoteItem.js          # Note display component
│   └── NoteInput.js         # Note input modal
├── package.json
├── app.json
└── README.md
```

## 🚀 How to Run the App

### Start the Development Server

```powershell
cd c:\Users\tozeu\Desktop\Lab1\NotesApp
npm start
```

Or use the full command:
```powershell
Set-Location -Path "c:\Users\tozeu\Desktop\Lab1\NotesApp"; npm start
```

### Test on Different Platforms

Once the server is running, press:

- **`w`** - Open in web browser (easiest for quick testing)
- **`a`** - Open in Android emulator (requires Android Studio)
- **`i`** - Open in iOS simulator (macOS only)

Or scan the QR code with:
- **Android**: Expo Go app from Play Store
- **iOS**: Camera app (opens in Expo Go)

## 📱 App Features

### HomeScreen
- Welcome message
- "Go to Notes" button → navigates to NotesScreen

### NotesScreen
- **View** all notes in a scrollable list
- **Add** new notes (tap the + button)
- **Edit** existing notes (tap Edit)
- **Delete** notes (tap Delete)
- Empty state when no notes exist

## 🎯 Key Learning Points

### 1. Navigation Setup
```javascript
// App.js uses Stack Navigator
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Notes" component={NotesScreen} />
</Stack.Navigator>
```

### 2. State Management
```javascript
// Using React hooks for state
const [notes, setNotes] = useState(initialNotes);
const [modalVisible, setModalVisible] = useState(false);
```

### 3. Component Composition
```javascript
// Reusable components with props
<NoteItem 
  note={item} 
  onEdit={editNote} 
  onDelete={deleteNote} 
/>
```

### 4. List Rendering
```javascript
// FlatList for efficient rendering
<FlatList
  data={notes}
  renderItem={({ item }) => <NoteItem note={item} />}
  keyExtractor={(item) => item.id}
/>
```

## 🔧 Troubleshooting

### PowerShell Script Execution Error
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Metro Bundler Issues
```powershell
# Clear cache and restart
npx expo start --clear
```

### Port Already in Use
```powershell
# Kill the process on port 8081
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess -Force
```

## 📚 Tutorial Sections Covered

- ✅ Environment Setup
- ✅ Project Structure
- ✅ UI Components & Styling
- ✅ Navigation Setup
- ✅ CRUD Operations
- ✅ Component Refactoring
- ✅ Best Practices

## 🎨 Customization Ideas

Try modifying:
1. **Colors** - Change `#3498db` in styles to your favorite color
2. **Fonts** - Add custom fonts using expo-font
3. **Icons** - Install @expo/vector-icons for icons
4. **Persistence** - Add AsyncStorage to save notes permanently

## 📝 Next Steps

To continue learning:
1. Add **search** functionality to filter notes
2. Implement **categories** or tags
3. Add **timestamps** to notes
4. Style with a **dark mode** theme
5. Add **swipe gestures** for delete
6. Implement **persistent storage**

## 🌐 Web Testing (Easiest)

Press **`w`** in the terminal to open in your browser at:
```
http://localhost:8081
```

This is the quickest way to test without setting up emulators!

## 📖 Additional Resources

- Full README.md with detailed documentation
- React Native Docs: https://reactnative.dev/
- Expo Docs: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/

---

**Your app is ready! Press `w` to test it in the browser now!** 🎉
