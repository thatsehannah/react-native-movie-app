import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

type SavedCardProps = {
  movie: SavedMovie;
};

const SavedCard = ({ movie }: SavedCardProps) => {
  const { movie_id, title, poster_path } = movie;

  return (
    <Link
      href={`/movies/${movie_id}`}
      asChild
    >
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={{ uri: poster_path }}
          className='w-32 h-52 rounded-lg'
          resizeMode='cover'
        />
        <Text
          className='text-sm font-bold mt-2 text-light-200'
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedCard;
