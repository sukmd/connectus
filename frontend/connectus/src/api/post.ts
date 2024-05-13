import {axiosInstance} from './axios';

/**
 *  id를 list형태로 서버에 전달해 feed의 상세정보를 요청하는 axios입니다.
 */
const getPostDetailList = async (id: number[]) => {
  const {data} = await axiosInstance.get('/post/mainPostList', {params: id});
  return data;
};

const getFeedDetail = async (walkId: number) => {
  const {data} = await axiosInstance.get(`/post/feed/${walkId}`, {
    params: walkId,
  });
  return data;
};

interface getPostDetailBody {
  postId: number;
  userId: number;
  distance: number;
}

/**
 * 방명록의 상세정보를 요청하는 axios 요청입니다.
 * 요청중 타이핑 에러가나면 any로 수정해서 사용합시다...
 * @param postId : 요청을 보낼 포스트 아이디
 * @param body : postId, userId, distance
 */
const getPostDetail = async (postId: number, body: getPostDetailBody) => {
  const {data} = await axiosInstance.get(`/post/${postId}`, {params: body});
  return data;
};

interface createPostCommentParams {
  postId: number;
  dto: {
    content: String;
    authorId: number;
  };
}

/**
 * feed에 댓글을 남기기위한 axios 요청입니다.
 * api명세서를 기반으로 type을 남겨두었으나 dto를 넣는지 확실하지 않아 일단 작성해두고 추후 확인하겠습니다.
 * @param postId 댓글을 남길 post의 id
 * @param body
 * @returns
 */
const createPostComment = async (
  postId: number,
  body: createPostCommentParams,
) => {
  const {data} = await axiosInstance.post(`/post/${postId}/comment`, body);
  return data;
};

interface getFeedListParams {
  longitude: number;
  latitude: number;
  pageNum: number;
}
/**
 * 하단바의 피드스크린에서 피드를 내려받을 axios request입니다.
 * @param params : longitude latitude pageNum
 * pageNum을 1씩 증가시키면서 요청을 이어나갑니다.
 */
const getFeedList = async (params: getFeedListParams) => {
  const {data} = await axiosInstance.get(`/post/feed/main`, {params: params});
  return data;
};

export {
  getPostDetailList,
  getPostDetail,
  createPostComment,
  getFeedList,
  getFeedDetail,
};