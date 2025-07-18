import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | ReactNode | null;
}) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}</Text>
    {typeof value === "string" || typeof value === "number" ? (
      <Text className='text-light-100 font-bold text-sm mt-2'>
        {value || "N/A"}
      </Text>
    ) : (
      <View className='flex flex-row gap-2'>{value}</View>
    )}
  </View>
);

const MovieValuePill = ({ children }: { children: ReactNode }) => {
  return (
    <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-2 mt-2'>
      {children}
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const formatReleaseDate = (releaseDate: string) => {
    const date = new Date(releaseDate);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <View className='bg-primary flex-1'>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          className='mt-10 self-center'
        />
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                }}
                className='w-full h-[550px]'
                resizeMode='stretch'
              />
            </View>
            <View className='flex-col items-start justify-center mt-5 px-5'>
              <Text className='text-white font-bold text-xl'>
                {movie?.title}
              </Text>
              <View className='flex-row items-center gap-x-1 mt-2'>
                <Text className='text-light-200 text-sm'>
                  {movie?.release_date?.split("-")[0]}
                </Text>
                <Text className='text-light-200 text-sm'>
                  {movie?.runtime} m
                </Text>
              </View>
              <MovieValuePill>
                <Image
                  source={icons.star}
                  className='size-4'
                />
                <Text className='text-white font-bold text-sm'>
                  {Math.round(movie?.vote_average ?? 0)}/10
                </Text>
                <Text className='text-light-200 text-sm'>
                  ({movie?.vote_count} votes)
                </Text>
              </MovieValuePill>
              <MovieInfo
                label='Overview'
                value={movie?.overview}
              />
              <MovieInfo
                label='Genres'
                value={movie?.genres?.map((g) => (
                  <MovieValuePill key={g.id}>
                    <Text className='text-white font-bold text-sm'>
                      {g.name}
                    </Text>
                  </MovieValuePill>
                ))}
              />
              <View className='flex flex-row w-2/3 justify-between'>
                <MovieInfo
                  label='Release date'
                  value={
                    movie?.release_date
                      ? `${formatReleaseDate(movie?.release_date)} (Worldwide)`
                      : "N/A"
                  }
                />
                <MovieInfo
                  label='Status'
                  value={movie?.status}
                />
              </View>
              <View className='flex flex-row w-1/2 justify-between'>
                <MovieInfo
                  label='Budget'
                  value={`$${movie?.budget! / 1_000_000} million`}
                />
                <MovieInfo
                  label='Revenue'
                  value={`$${(movie?.revenue! / 1_000_000).toFixed(1)} million`}
                />
              </View>
              <MovieInfo
                label='Production Companies'
                value={
                  movie?.production_companies?.map((c) => c.name).join(" • ") ||
                  "N/A"
                }
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
            onPress={() =>
              movie?.homepage ? Linking.openURL(movie?.homepage) : null
            }
            disabled={movie?.homepage?.length === 0}
          >
            <Text className='text-white font-semibold text-base'>
              Visit Homepage
            </Text>
            <Image
              source={icons.arrow}
              className='size-5 ml-1 mt-0.5'
              tintColor='#fff'
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MovieDetails;
