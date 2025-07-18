/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //here, refetch is a copy of the fetchData function within the useFetch hook (the fetchMovies api function that's passed into the useFetch hook is the function that will run within this fetchData function)
  //we're setting the autoFetch param to false so that we can trigger the callback function passed to useFetch using refetch after we have a searchQuery defined
  const {
    data: movies = [],
    loading: moviesLoading,
    error: moviesError,
    refetch: fetchSearchedMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  //this useeffect updates the searchcount based on the movies the search results (from fetchSearchedMovies in the useEffect below) returns
  //decided to abstract this logic out of the below useeffect (where I originally had it) because it was easier to decouple fetching the movies and updating the count so that updateSearchCount won't have to immediately rely on fetchSearchedMovies to return movies
  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
      console.log(`updating search count for ${movies?.[0].title}`);
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  useEffect(() => {
    //when the user stops typing after 1/2 second, the refetch function(fetchSearchedMovies) will fire so that we don't overload the api with requests every time a keystroke is performed
    const timeoutId = setTimeout(() => {
      console.log("timeoutId has been triggered");
      if (searchQuery.trim()) {
        console.log(`search query: |${searchQuery.trim()}|`);
        fetchSearchedMovies();
      } else {
        console.log("Reset has been triggered");
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <ImageBackground
        source={images.bg}
        className='flex-1'
      >
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          scrollEnabled
          className='px-5'
          ListHeaderComponent={
            <>
              <View className='w-full flex-row justify-center mt-20 items-center'>
                <Image
                  source={icons.logo}
                  className='w-12 h-10'
                />
              </View>
              <View className='my-5'>
                <SearchBar
                  placeholder='Search movies...'
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                />
              </View>

              {moviesLoading && (
                <ActivityIndicator
                  size='large'
                  color='#0000ff'
                  className='my-3'
                />
              )}

              {moviesError && (
                <Text className='text-red-500 px-5 my-3'>
                  Error: {moviesError.message}
                </Text>
              )}

              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() &&
                movies?.length > 0 && (
                  <Text className='text-xl text-white font-bold'>
                    Search Results for{" "}
                    <Text className='text-accent'>{searchQuery}</Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Search for a movie"}
                </Text>
              </View>
            ) : null
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Search;
