# FinalProject API

### Library

#### JSON serializer
- django rest framework

#### Oauth: Token based Authroization 
- django rest auth
- django all auth

#### CORS policy
- django corsheader

#### API documentation
- drf yasg

### :bulb: point Class Based View
- django rest framework가 제공하는 `APIView` 클래스를 상속받음으로써 `GET`, `POST`, `PUT`, `DELETE` 요청에 따라 각기 다른 응답을 구현했습니. 
- drf가 제공하는 또 다른 클래스인 `PageNumberPagination` 클래스를 상속받아 pagination과 관련된 기능을 구현했습니다.
- Function Based View에 비해 간결하게 코드를 작성할 수 있었으며, 더욱 **restful한 url 구성**이 가능했습니다.
##### exapmle 
```python
from rest_framework.decorators import permission_classes, APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'

class ArticleDetail(APIView):
    def get(self, request):
        pass
    @permission_classes([IsAuthenticated])
    def post(self,request,pk):
        pass
```

### API Guide
:home: https://finprojectapi.herokuapp.com/swagger/

#### 1. Movies: 전체 영화 조회하기, Search: 영화 검색하기
- request : `GET` `/api/v1/community/movies/[?q="keyworkd"]`
- default : 영화의 pk 순서대로 10개의 영화가 출력됩니다. 
- search: 키워드 존재 시(사용자가 search 메뉴를 통해 영화를 검색 시) 파라미터에 담긴 키워드가 제목에 포함된 영화를 출력합니다.
- :bulb: pagination `/?page=<int:pk>` : 한 페이지에 10개씩 영화를 담았고 스크롤이 아래로 내려갈 때 마다 페이지 수가 1씩 늘어나면서 새로운 영화 10개가 조회됩니다. 
- response : 
```json
[
  {
    "id": 339095,
    "genres": [{"id": 1,"name": "horror"},{"id": 3,"name": "adventure"},{...}...],
    "title": "The Last Days of American Crime",
    "overview": "일주일 후면 ...",
    "poster_path": "/ygCQnDEqUEIamBpdQdDYnFfxvgM.jpg",
    "release_date": "2020-06-05",
    "popularity": 122.637,
    "vote_count": 114,
    "vote_average": 5.6,
    "adult": false,
    "articles": []
  },
  {...},
  {...},
   ...
]
```
#### 2. Home: Best 2 Movies, 2 Articles
- request: `GET` `/api/v1/community/movies/home/` , `/api/v1/community/articles/home/`
- usage
    - 요청 시 `popularity`를 기준으로 **가장 높은 순위를 기록한 영화 2개를 추출**해 홈 화면에 노출시키기 위해 영화 2개를 응답한다. 
    - 요청 시 **"좋아요"를 가장 많이 기록한 게시글 3개**를 홈 화면에 노출시키기 위해 게시글 3개를 응답한다.  
#### 3. Community: 모든 게시글 조회하기
- request: `GET`  `/api/v1/community/articles/`
- response
```json
[
    {
      "id": 4,
      "movie": {...},
      "user": {...},
      "title": "좋아요 2개",
      "content": "달린 글을\r\n작\r\n성\r\n중\r\n입\r\n니\r\n다",
      "rank": 3,
      "created_at": "2020-06-14T15:06:48.704752+09:00",
      "updated_at": "2020-06-14T15:06:48.704798+09:00",
      "like_users": [{...}],
      "comments": [{...},{...},...]
    }, {...}, {...}, {...}
]
```
#### 3-1. Community: 개별 게시글 조회하기
- request: `GET` `/api/v1/community/articles/<int:article_pk>/`
- usage: 개별 **아티클의** id 넘버를 통해 개별 아티클의 모든 정보를 조회 가능
#### 3-2. 개별 게시글 생성하기 
- request: `POST` `/api/v1/community/articles/<int:movie_pk>/`
- usage: 해당 영화에 대한 리뷰를 작성하기 위해 **영화의** id 넘버를 통해 POST 요청을 전송
#### 3-3. 개별 게시글 수정하기
- request: `PUT` `/api/v1/community/articles/<int:article_pk>/`
- usage: 해당 영화에 대한 리뷰를 작성하기 위해 **게시글의** id 넘버를 통해 PUT 요청을 전송
#### 3-4. 개별 게시글 삭제하기
- request: `DELETE` `/api/v1/community/articles/<int:article_pk>/`
- usage: 해당 영화에 대한 리뷰를 작성하기 위해 **게시글의** id 넘버를 통해 PUT 요청을 전송

#### :bulb: 포인트 3-5. 아티클 생성,수정,삭제 시 평점 업데이트
- usage
    - 사용자가 새로운 게시글을 작성하거나 수정 및 삭제 시 영화의 평점에 반영되는 구조입니다. 
    - 게시글과 관련된 영화의 평점 정보와 평점에 참여한 사람 수를 불러와 사용자가 새롭게 업데이트 하는 내용을 반영해 영화 데이터를 수정하는 방식입니다. 
- `rankcalculate.py`
```python
class RankCalculate:
    def __init__(self, query, request):
        self.query = query
        self.request = request

    def AddNewRank(self):
        pass
    def UpdateNewRank(self,prev_rank):
        pass
    def DeleteRank(self,prev_rank):
        pass
```

##### 사용 예시
```python
# 새 글 작성 
new_rank = RankCalculate(movie,request)
new_rank.AddNewRank()

# 기존 글 수정 및 삭제 
article = get_object_or_404(Article, pk=pk)
prev_rank = article.rank
new_rank = RankCalculate(article,request)
new_rank.UpdateNewRank(prev_rank) # 수정
new_rank.DeleteRank(prev_rank) # 삭
```
#### :bulb: 포인트 3.6. 게시글(댓글) 작성자 본인만 수정 및 삭제 허용하기
> 프론트 단에서 게시글 및 댓글 작성자가 본인이 아닐 경우 사용자 뷰에서 보이지 않게 로직을 구현했으나
> 포스트맨이나 swagger 등을 통해 요청을 보낼 경우 막을 수 없다는 문제가 발생한다. 
> 이를 보완하기 위해 백앤드에서 게시글 작성자가 **본인이 아닐 경우 401 unauthorized 메시지를 출력**하게 구현하였다. 

##### 사용 예시
```python
if request.user.username == article.user.username:
            ...
    return Response(serializer.data)
else :
    return Response({
        "msg":"401 unAuthorized 잘못된 접근입니다.",
        "articleUser": article.user.username,
        "requestUser": request.user.username
    })
```

#### 4. Community: 댓글 작성하기
- request: `POST` `/api​/v1​/community​/articles​/<int:article_pk>​/comments​/`
- usage: **게시글** id 넘버를 통해 게시글에 달리는 댓글 작성 요청 가능

#### 4-1. Community: 댓글 삭제하기
- request: `DELETE` `/api​/v1​/community​/articles​/<int:comment_pk>​/comments​/`
- usage: **댓글** id 넘버를 통해 게시글에 달리는 댓글 삭제 요청 가능

#### 5. Community: 좋아요 및 취소
- request: `GET` `/api/v1/community/articles/<int:article_pk>/likes/`
- usage: GET 요청 전송 시 좋아요를 누른 유저인지 확인을 한 이후 좋아요를 눌렀을 경우 눌렀음을, 반대의 경우도 마찬가지의 정보를 응답
- response
```json
{
    "liked": boolean,
    "count": Number
}
```

#### 6. For You : 영화 추천 알고리즘
- request: `GET` `/api/v1/community/movies/recommend/`
- description
    - 요청을 보내면, 백엔드에서 추천 알고리즘을 통해 **한 편의 영화**를 응답
    - :bulb: 포인트
        - 선호 장르 기반의 영화 추천
          - 유저의 리뷰 기록을 통해 선호 장르를 파악
          - 선호 장르의 영화 중 하나를 추천
          - 리뷰 기록이 없는 유저의 경우, 평점이 8 이상인 영화 중 하나를 추천

#### 7. 회원정보 조회하기
- request: `GET` `/api/v1/accounts/`
- description : GET 요청을 통해 현재 로그인한 유저의 정보를 응답
- :bulb: usage
> 요청을 통해 받은 응답을 Vue instance의 데이터에 담아둔다. 
> 이를 통해 로그인 시와 비로그인 시의 사용자 뷰를 다르게 보여줄 수 있으며
> 게시글(댓글)을 본인만 수정 및 삭제 기능에 접근할 수 있게 한다.

### 7-1. MyPage: 개별 회원정보 조회하기
- request: `GET` `/api/v1/accounts/<int:user_pk>/`
- description : GET 요청을 통해 해당 id 넘버를 가진 유저의 정보를 응답
- :bulb: usage
> 마이페이지에서 해당 유저가 작성한 게시글과 좋아요를 남긴 글들을 모두 불러올 수 있게 한다.

### :wrench: resolutions

#### 1. 정교한 모델링의 필요성
JSON resopnse에 넣어서 보내주어야 할 것들에 대한 정리가 명확하지 못하였기 때문에 프론트엔드 측의 요구사항을
처음부터 다 반영하지 못하는 일이 자주 발생하였습니다. 
예를 들어 프론트에서 영화정보를 요청 영화정보를 담아서 응답을 받을 수 있도록 serializer를 설계했지만,
프론트는 영화정보 안의 게시글도 원하는 상황이었습니다. 하지만 응답 JSON에는 게시글 정보가 들어있지 않았던 것과 같은 문제들의 연속이었습니다. 

따라서 프론트 측의 요청에 따라 serializer를 재설계해야 했고 이러한 일들이 프로젝트 내내 발생했습니다. 
헤로쿠 배포를 몇번 업데이트 했나 보았더니 프로젝트 6일차 기준으로 22번의 업데이트를 해야 했습니다. 

이를 통해 프론트엔드 개발자와 백앤드 개발자가 협업을 할 때 **어느 부분에 중점을 두고 소통을 해야 하는지**를 배울 수 있었습니다. 

#### 2. JWT 인증 방식의 사용
OAUTH 방식의 인증 방식을 통해 유저 정보를 가져오고 로그인 여부를 식별했지만 JWT 인증 방식을 시도하지 못했다는 점이 아쉬웠습니다. 
프론트에서 사용자 정보를 응답받는 GET 요청을 보내면 유저 정보를 JSON에 담아서 보냈지만 JWT 방식을 통해 더욱 보안이 우수한 응답을 구현하지 못했기 때문입니다. 