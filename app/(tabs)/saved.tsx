import SavedCard from "@/components/SavedCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { FlatList, Image, ImageBackground, Text, View } from "react-native";

const Saved = () => {
  const {
    data: savedMovies,
    loading,
    error,
    refetch,
  } = useFetch(getSavedMovies, false);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View className='bg-primary flex-1'>
      <ImageBackground
        source={images.bg}
        className='flex-1'
      >
        <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image
            source={icons.logo}
            className='w-12 h-10'
          />
        </View>
        <View className='px-5'>
          <Text className='text-lg text-white font-bold mt-5 mb-3'>
            Saved Movies
          </Text>
          <FlatList
            data={savedMovies}
            renderItem={({ item }) => <SavedCard movie={item} />}
            keyExtractor={(item) => item.movie_id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
            }}
            ListEmptyComponent={
              !loading && !error ? (
                <View className='mt-10 px-5'>
                  <Text className='text-center text-gray-500'>
                    No saved movies
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Saved;
