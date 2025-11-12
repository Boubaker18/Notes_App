import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import NoteItem from "../components/NoteItem";
import NoteInput from "../components/NoteInput";
import { getNotes } from "../services/note-service";
import { useAuth } from "../src/contexts/AuthContext";

export default function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const { user, isAuthenticated } = useAuth();

  // Redirect to Auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Auth');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  // Function to fetch notes from the database
  const fetchNotes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      // Call the getNotes service function with userId
      const fetchedNotes = await getNotes(user.$id);
      // Update state with the fetched notes
      setNotes(fetchedNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pull to refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotes();
    setRefreshing(false);
  };

  // Add the new note to the state
  const handleNoteAdded = (newNote) => {
    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setModalVisible(false);
  };

  // Handle note deletion by removing it from state
  const handleNoteDeleted = (noteId) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.$id !== noteId)
    );
  };

  // Handle note update by updating it in state
  const handleNoteUpdated = (updatedNote) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.$id === updatedNote.$id ? updatedNote : note
      )
    );
  };

  // Show loading indicator while fetching data
  if (loading && notes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading notes...</Text>
      </View>
    );
  }

  // Show error message if there was a problem
  if (error && notes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNotes}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <NoteItem
              note={item}
              onEdit={handleNoteUpdated}
              onDelete={handleNoteDeleted}
            />
          )}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.notesList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3498db']}
              tintColor="#3498db"
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyText}>You don't have any notes yet.</Text>
          <Text style={styles.emptySubtext}>
            Tap the + button to create your first note!
          </Text>
        </View>
      )}

      <NoteInput
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleNoteAdded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 100,
    backgroundColor: "#3498db",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#3498db",
    fontWeight: "bold",
    marginTop: -2,
  },
  notesList: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
