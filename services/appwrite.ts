import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const METRICS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_METRICS_COLLECTION_ID!;
const SAVED_MOVIES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

//track the searches made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  //check if a record of that search has already been stored
  //if a document is found increment the count field
  //if a document is not found -
  //create a new document in Appwrite database -> initialize count to 1

  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      METRICS_COLLECTION_ID,
      [Query.equal("searchTerm", query)]
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        METRICS_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
      console.log(
        `${existingMovie.title}'s count has been updated to ${existingMovie.count}`
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        METRICS_COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
      console.log(`${movie.title} has been added to the metric collection`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//showing top 5 movies
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      METRICS_COLLECTION_ID,
      [Query.limit(5), Query.orderDesc("count")]
    );

    return result.documents as unknown as TrendingMovie[]; //since typescript won't allow the direct cast to TrendingMovie (because we can't fully guarantee that what's returned from Appwrite will match TrendingMovie[]), unknown acts a bridge which allows you to ultimately cast result.documents to whatever type you desire
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateSavedCollection = async (
  movie: SavedMovie,
  action: "add" | "remove"
): Promise<boolean> => {
  try {
    if (action === "remove") {
      const result = await database.listDocuments(
        DATABASE_ID,
        SAVED_MOVIES_COLLECTION_ID,
        [Query.equal("movie_id", movie.movie_id)]
      );

      if (result.documents.length > 0) {
        const existingSavedMovie = result.documents[0];

        await database.deleteDocument(
          DATABASE_ID,
          SAVED_MOVIES_COLLECTION_ID,
          existingSavedMovie.$id
        );

        return true;
      }

      return false;
    }

    if (action === "add") {
      await database.createDocument(
        DATABASE_ID,
        SAVED_MOVIES_COLLECTION_ID,
        ID.unique(),
        {
          movie_id: movie.movie_id,
          title: movie.title,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );

      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//getting saved movies
export const getSavedMovies = async (): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID
    );

    return result.documents as unknown as SavedMovie[]; //since typescript won't allow the direct cast to TrendingMovie (because we can't fully guarantee that what's returned from Appwrite will match TrendingMovie[]), unknown acts a bridge which allows you to ultimately cast result.documents to whatever type you desire
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
