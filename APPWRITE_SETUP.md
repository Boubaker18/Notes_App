# Configuration Appwrite pour Notes App

## 📋 Prérequis

1. Un compte Appwrite (gratuit) sur [https://cloud.appwrite.io/](https://cloud.appwrite.io/)
2. Le projet NotesApp déjà installé

## 🚀 Étapes de Configuration

### 1. Créer un Compte et un Projet Appwrite

1. Allez sur [https://cloud.appwrite.io/](https://cloud.appwrite.io/)
2. Créez un compte ou connectez-vous
3. Cliquez sur "Create Project"
4. Nommez votre projet "NotesApp"
5. Notez votre **Project ID** (vous en aurez besoin plus tard)

### 2. Créer une Base de Données

1. Dans votre projet, allez dans **Databases**
2. Cliquez sur "Create Database"
3. Nommez-la **"NotesDB"**
4. Notez le **Database ID**

### 3. Créer une Collection

1. Dans votre database "NotesDB", cliquez sur "Create Collection"
2. Nommez-la **"notes"**
3. Notez le **Collection ID**

### 4. Ajouter les Attributs

Ajoutez les attributs suivants à votre collection "notes" :

| Attribute Key | Type     | Size | Required | Array |
|--------------|----------|------|----------|-------|
| title        | String   | 255  | ✅ Yes   | ❌ No  |
| content      | String   | 10000| ✅ Yes   | ❌ No  |
| userId       | String   | 255  | ✅ Yes   | ❌ No  |
| createdAt    | DateTime | -    | ✅ Yes   | ❌ No  |
| updatedAt    | DateTime | -    | ✅ Yes   | ❌ No  |

**Comment ajouter un attribut :**
1. Cliquez sur "Create Attribute"
2. Sélectionnez le type
3. Entrez la clé (nom)
4. Définissez la taille si nécessaire
5. Cochez "Required" si nécessaire
6. Cliquez sur "Create"

### 5. Configurer les Permissions

1. Allez dans l'onglet **Settings** de votre collection
2. Dans **Permissions**, ajoutez :
   - **Create** : `Any`
   - **Read** : `Any`
   - **Update** : `Any`
   - **Delete** : `Any`

> ⚠️ **Note** : Ces permissions sont pour le développement. En production, utilisez des permissions basées sur l'utilisateur authentifié.

### 6. Créer des Index (Optionnel mais recommandé)

Pour de meilleures performances :

1. Allez dans l'onglet **Indexes**
2. Créez un index :
   - **Key** : `userId_index`
   - **Type** : Key
   - **Attributes** : `userId` (ASC)
3. Créez un autre index :
   - **Key** : `createdAt_index`
   - **Type** : Key
   - **Attributes** : `createdAt` (DESC)

### 7. Configurer le Fichier .env

1. Ouvrez le fichier `.env` à la racine de votre projet NotesApp
2. Remplacez les valeurs par vos propres informations :

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=votre-project-id-ici
APPWRITE_DATABASE_ID=votre-database-id-ici
APPWRITE_COLLECTION_ID=votre-collection-id-ici
```

**Où trouver ces informations :**
- **APPWRITE_ENDPOINT** : `https://cloud.appwrite.io/v1` (ne change pas)
- **APPWRITE_PROJECT_ID** : Dans Settings du projet
- **APPWRITE_DATABASE_ID** : Dans l'URL de votre database ou Settings
- **APPWRITE_COLLECTION_ID** : Dans l'URL de votre collection ou Settings

### 8. Redémarrer l'Application

Après avoir modifié le fichier `.env` :

```powershell
# Arrêtez l'application (Ctrl+C dans le terminal)
# Puis redémarrez
npm start
```

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. Lancez l'application
2. Naviguez vers l'écran "My Notes"
3. Essayez de créer une note
4. Vérifiez dans votre console Appwrite que la note apparaît

## 🔧 Dépannage

### Erreur : "Invalid API Key"
- Vérifiez que votre `APPWRITE_PROJECT_ID` est correct
- Assurez-vous d'avoir redémarré l'application après modification du `.env`

### Erreur : "Collection not found"
- Vérifiez que `APPWRITE_DATABASE_ID` et `APPWRITE_COLLECTION_ID` sont corrects
- Vérifiez que la collection existe bien dans votre projet

### Erreur : "Unauthorized"
- Vérifiez les permissions de votre collection
- Assurez-vous que "Any" est autorisé pour Create, Read, Update, Delete

### Les changements du .env ne sont pas pris en compte
1. Arrêtez complètement l'application
2. Supprimez le cache :
   ```powershell
   npx expo start --clear
   ```

## 📱 Fonctionnalités Implémentées

✅ **Create** : Créer de nouvelles notes  
✅ **Read** : Afficher toutes les notes  
✅ **Update** : Modifier des notes existantes  
✅ **Delete** : Supprimer des notes  
✅ **Refresh** : Rafraîchir la liste (pull to refresh)  
✅ **Loading states** : Indicateurs de chargement  
✅ **Error handling** : Gestion des erreurs  

## 🎯 Prochaines Étapes

Pour améliorer l'application, vous pourriez :

1. **Ajouter l'authentification** : Utiliser Appwrite Auth pour gérer les utilisateurs
2. **Filtrer par utilisateur** : Afficher uniquement les notes de l'utilisateur connecté
3. **Recherche** : Ajouter une barre de recherche
4. **Catégories** : Organiser les notes par catégories
5. **Mode hors ligne** : Utiliser AsyncStorage pour le cache local

## 📚 Ressources

- [Documentation Appwrite](https://appwrite.io/docs)
- [Appwrite React Native SDK](https://appwrite.io/docs/getting-started-for-react-native)
- [Appwrite Console](https://cloud.appwrite.io/console)

---

**Besoin d'aide ?** Consultez la documentation Appwrite ou ouvrez une issue sur GitHub.
