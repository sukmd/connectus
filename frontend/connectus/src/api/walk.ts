// 산책에서 사용할 api들을 정리한 파일입니다
import {LatLng} from 'react-native-maps';
import {axiosInstance} from './axios';
import {postType} from '@/types';
import {Image} from 'react-native';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

/**
 * 산책 공유 페이지에서 경로를 좋아요를 할 때 호출할 api입니다.
 */
const routeLike = async (walkId: number, userId: number) => {
  const body = {walkId, userId};
  const {data} = await axiosInstance.put('/walk/route-like', body);
  return data;
};

/**
 * @todo post에 대한 타이핑 지정 필요
 */
type createRoutetype = {
  userId: number;
  title: string;
  route: LatLng[];
  walkTime: number;
  walkDistance: number;
  postList: postType[];
  participateEvent: number | null;
  image: Image;
};

/**
 * 산책을 작성할때 (마지막에 산책 완료를 하면서 저장버튼 터치 시)호출할 api입니다
 */
const createRoute = async (body: createRoutetype) => {
  console.log('creat body : ', body);
  const formData = new FormData();
  formData.append('image', {
    uri: body.image,
    type: 'image/jpeg',
    name: 'test.jpg',
  });
  formData.append('title', body.title);
  formData.append('userId', body.userId);
  formData.append('walkTime', body.walkTime);
  formData.append('walkDistance', body.walkDistance);

  body.postList.forEach((post, index) => {
    console.log('post', post);
    formData.append(`postList[${index}].content`, post.content);
    formData.append(`postList[${index}].authorId`, post.authorId);
    formData.append(`postList[${index}].image`, post.image);
  });

  body.route.forEach((positoin, index) => {
    formData.append(`route[${index}].latitude`, positoin.latitude);
    formData.append(`route[${index}].longitude`, positoin.longitude);
  });

  formData.append('completeAchivement[0].achievementId', 1);
  formData.append('completeAchivement[0].isSuccess', true);

  try {
    console.log('요청은 가니?');
    const {data} = await axios({
      method: 'POST',
      url: 'https://api.connectus.social/walk',
      // data: {...body, image: formData},
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiZ21zMjQ1QG5hdmVyLmNvbSIsImlzc3VlZEF0IjoiTWF5IDE0LCAyMDI0LCA0OjUyOjA5IFBNIiwiaXNzdWVyIjoidXNlci1zZXJ2aWNlIiwidXNlcklkIjo3fSwiaXNzIjoidXNlci1zZXJ2aWNlIiwiaWF0IjoxNzE1NzA1NTI5LCJleHAiOjE3MTU4MDU1Mjl9.WRxuYnFOd5ribLfGvgiROtipLA70b_JpKsEtplk4mLlP4fRmBOkALm8LxqxtfgykXm4ii9oB-f2EahJZjOe-Bg`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param walkId {number} 조회할 산책의 id값을 param으로 전달합니다.
 */
const getRouteDetail = async (walkId: number) => {
  const {data} = await axiosInstance.get(`/walk/${walkId}`);
  return data;
};

/**
 * 작성자를 기준으로 산책 기록을 상세하게 조회합니다.
 * @param userId 해당 유저의 아이디를 받아옵니다.
 * @returns
 */
const getUserRoute = async (userId: string) => {
  const {data} = await axiosInstance.get(`walk/user/${userId}`);
  return data;
};

/**
 * 이번 산책에서 달성한 업적 목록들을 반환할 axios요청입니다.
 */
const getCompletedAchievement = async () => {
  const {data} = await axiosInstance.get('/walk/end-walk');
  return data;
};

/**
 * 해당 산책 기록을 공유하기위해 호출하는 axios요청입니다.
 */
const shareRoute = async (walkId: number, userId: number) => {
  const body = {walkId, userId};
  const {data} = await axiosInstance.patch('/walk/route-share', body);
  return data;
};

/**
 * 공유한 산책 경로의 공유를 취소하는 코드입니다.
 * @param walkId
 * @param userId
 * @returns
 */
const cancelShareRoute = async (walkId: number, userId: number) => {
  const body = {walkId, userId};
  const {data} = await axiosInstance.patch('/walk/route-protect', body);
  return data;
};

/**
 * 따라걷기 버튼을 눌럿을때, 해당 post를 같이 걸은 사람의 수를 증가시켜줍니다.
 * @param walkId 산책 기록 id
 * @param userId 요청을 보내는 유저 id
 * @returns
 */
const updateWalker = async (walkId: number, userId: number) => {
  const body = {walkId, userId};
  const {data} = await axiosInstance.patch('/walk/route-track', body);
  return data;
};

export {
  routeLike,
  getRouteDetail,
  createRoute,
  getUserRoute,
  getCompletedAchievement,
  shareRoute,
  updateWalker,
  cancelShareRoute,
};
