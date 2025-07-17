import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ImageBackground, ScrollView, View } from "react-native";

export default function Index() {
  return (
    <View className='flex-1 bg-primary'>
      <ImageBackground
        source={images.bg}
        className='flex-1'
      >
        <ScrollView
          className='flex-1 px-5'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          <Image
            source={icons.logo}
            className='w-12 h-10 mt-20 mb-5 mx-auto'
          />
          <View className='flex-1 mt-5'>
            <SearchBar />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
