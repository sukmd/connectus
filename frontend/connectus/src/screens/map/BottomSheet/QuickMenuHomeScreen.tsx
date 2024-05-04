import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/core';
import MainText from '@/components/text/MainText';
import colors from '@/constants/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomSheetStackParamList} from '@/navigations/stack/BottomSheetQuickStackNavigator';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<BottomSheetStackParamList>,
  StackNavigationProp<MapStackParamList>
>;

export default function QuickMenuHomeScreen() {
  const navigation = useNavigation<Navigation>();

  const handlePressCreateFeed = () => {
    navigation.navigate('FeedCreate');
  };

  const handlePressCreateGather = () => {
    navigation.navigate('GatherCreate');
  };

  const handlePressChatList = () => {
    navigation.navigate('ChatList');
  };

  const handlePressQuit = () => {
    navigation.navigate('MapResult');
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable style={styles.moveButton} onPress={handlePressCreateFeed}>
        <MainText>방명록 작성</MainText>
      </Pressable>
      <Pressable style={styles.moveButton} onPress={handlePressChatList}>
        <MainText>채팅</MainText>
      </Pressable>
      <Pressable style={styles.moveButton} onPress={handlePressCreateGather}>
        <MainText>모여라 작성</MainText>
      </Pressable>
      <Pressable
        style={[styles.moveButton, styles.quitButton]}
        onPress={handlePressQuit}>
        <MainText>산책 종료</MainText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    gap: 15,
  },
  moveButton: {
    padding: 15,
    backgroundColor: colors.buttonBackground,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quitButton: {
    backgroundColor: colors.primaryColorBlue,
  },
});
