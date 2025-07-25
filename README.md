# 🎬 React Native Movie App

A sleek, mobile-first movie discovery app built with React Native and TypeScript. This app fetches data from The Movie Database (TMDB) API and showcases popular movies, trending content, and detailed movie views—all wrapped in a smooth, performant UI. The app also aggregates a trending movies list via saving searches to Appwrite.

## 📱 Features

- 🔍 Browse trending, upcoming, and top-rated movies
- 🎞 View detailed movie info including poster, description, genres, and release date
- 🧠 Smart loading states and image caching for better performance
- ⚡ Smooth navigation between screens with stack-based routing
- 📱 Fully responsive design tailored for iOS and Android

## 🛠 Tech Stack

- **React Native** – cross-platform mobile app framework
- **TypeScript** – static type checking
- **React Navigation** – seamless screen transitions
- **Fetch** – for HTTP requests
- **TMDB API** – for real-time movie data
- **Appwrite** - for aggregating trending movies & favoriting movies
- **Expo** – easy development/testing

## 🗂 Project Structure
```
├── app/              # Screens, tabs, and layout
├── services/         # API config and TMDB endpoints and useFetch custom hook
├── components/       # Reusable UI components
├── constants/        # Static icon and image imports
├── interfaces/       # TypeScript interfaces and models
└── assets/           # Images, backgrounds, fonts, & icons
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/thatsehannah/react-native-movie-app.git
cd react-native-movie-app
```

## 2. Install dependencies

```bash
npm install
```

## 3. Add your TMDB API key

Create a .env file in the root directory:

```
EXPO_PUBLIC_MOVIE_API_KEY=your_api_key
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_METRICS_COLLECTION_ID=your_collection_id
EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID=your_collection_id
```
> You can get a free API key from https://www.themoviedb.org/documentation/api. You will have to create an Appwrite account and create a project to get the proper keys. Learn more at https://appwrite.io/.

## 4. Run the app

Using expo:
```bash
npx expo start
```

Using the React Native CLI:
```bash
npx react-native run-ios
# or
npx react-native run-android
```

## 🧪 To Do
- Add search functionality
- Integrate user favorites with Appwrite (in progress)
- Add UI skeleton loaders for a polished UX

## Screenshots
<img width="300" height="650" alt="IMG_2741" src="https://github.com/user-attachments/assets/9d2a1343-8cc1-4ad8-84d1-13050b4047b5" />
<img width="300" height="650" alt="IMG_2742" src="https://github.com/user-attachments/assets/520169b0-8080-4256-8605-9b666b024e92" />
<img width="300" height="650" alt="IMG_2743" src="https://github.com/user-attachments/assets/d60b58be-2ee4-404d-abb3-bc7b3badd08d" />


## Learnings
This project gave me hands-on experience working with API consumption, using NativeWind for styling, implementing navigation, using a cloud database to persist data (Appwrite), and be able to apply my React.js knowledge to build this app.

---

Credit to [JS Mastery](https://www.youtube.com/watch?v=f8Z9JyB2EIE) for this course.
