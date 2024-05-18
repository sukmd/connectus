import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import MainContainer from '@/components/containers/MainContainer';
import CustomButton from '@/components/buttons/CustomButton';
import IconItemButton from '@/components/containers/IconItemButton';
import ProfileOverview from '@/components/my/ProfileOverview';
import LightText from '@/components/text/LightText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';
import {MyStackParamList} from '@/navigations/stack/MyStackNavigator';
import useAuthStore from '@/store/useAuthStore';
import {defaultColors} from '@/constants/colors';

export default function MyHomeScreen({
  navigation,
}: StackScreenProps<MyStackParamList>) {
  const gotoAchievements = () => {
    navigation.navigate('MyAchievements');
  };
  const gotoHistory = () => {
    navigation.navigate('MyWalkHistory');
  };

  // 로그아웃 기능 수행
  const {invalidate} = useAuthStore();

  return (
    <ScrollView>
      <MainContainer style={styles.maincontainer}>
        <ProfileOverview />
        <MainContainer style={styles.listGroup}>
          <IconItemButton
            iconType="MaterialCommunityIcons"
            iconName="table-key"
            text="이벤트 등록 권한 신청"
          />
          <CustomButton backgroundColor="transparent">
            <View style={styles.detailButton}>
              <Ionicons name="information-circle" size={24} color="white" />
              <LightText>이벤트 등록 권한 신청?</LightText>
            </View>
          </CustomButton>
        </MainContainer>
        <MainContainer style={styles.listGroup}>
          <IconItemButton
            iconType="MaterialIcons"
            iconName="person"
            text="아바타 변경"
          />
          <IconItemButton
            iconType="Ionicons"
            iconName="trophy"
            text="업적"
            onPress={gotoAchievements}
          />
          <IconItemButton
            iconType="MaterialIcons"
            iconName="list"
            text="외출 기록"
            onPress={gotoHistory}
          />
          <IconItemButton
            iconType="MaterialIcons"
            iconName="chat"
            text="작성 댓글"
          />
          <IconItemButton
            iconType="Ionicons"
            iconName="heart"
            text="좋아요 기록"
          />
        </MainContainer>
        <MainContainer style={styles.listGroup}>
          <IconItemButton
            onPress={invalidate}
            backgroundColor={defaultColors.errorContainer}
            iconType="MaterialIcons"
            iconName="logout"
            text="로그아웃"
          />
        </MainContainer>
      </MainContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    gap: 30,
  },
  detailButton: {
    padding: 10,
    alignSelf: 'baseline',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  listGroup: {
    padding: 0,
    gap: 5,
    alignContent: 'stretch',
  },
  logoutText: {
    color: defaultColors.onErrorContainer,
  },
});
