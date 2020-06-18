## Development

### Data Scrap

> [The Movie Database API](https://developers.themoviedb.org/3/movies/get-popular-movies) 의 영화 데이터를 가져와 사용했습니다.

#### 1. Data 가져오기

- `requests` 패키지를 통해 TMDB API Server 로 요청을 보내고, 응답 결과를 모델링 구조에 맞게 바꾼 후, .json 파일로 저장했습니다.
- 요청

```python
import requests

for page in range(1, 51):
    url = "https://api.themoviedb.org/3/movie/popular?api_key=44084423a3ad71eb2acee3298e9a25e8&language=ko-KR&page=" + str(page)
    res = requests.get(url).json()
    movies = res["results"]
```

- 응답 결과 핸들링

```python
ret = []

for movie in movies:
    # 포스터가 없는 영화 데이터
    if not movie["poster_path"]:
        continue
    # inner dic 객체 내에 필요한 fields 구조로 저장
    inner = dict()
    ret.append(inner)
```

- .json 파일로 저장

```python
import json

file = open("moviedata.json", "w+")
file.write(json.dumps(ret))
```

#### :wrench: Refactoring

- TMDB API 데이터 변화에 대한 대응
  - 매번 데이터를 가져오는 방식이 아니기 때문에, 데이터 변화에 대한 대응 방안이 추가적으로 필요할 것 같습니다.  
  - [TMDB API | Changes](https://developers.themoviedb.org/3/changes/get-movie-change-list) 를 통해 최대 14일간 발생한 영화 데이터 변화를 응답받을 수 있습니다.

#### 2. Data 를 DB에 반영하기

- 반영 전 DB 스키마 생성이 완료되어 있어야 합니다.
- 반영

```
$ python manage.py loaddata data/moviedata.json
```

### Frontend

#### App 공통화면

##### 1. Header 및 Nav bar

- `<router-link>` 를 통해각 기능별 페이지와 연결했습니다.

##### 2. Sidebar

- `App.vue` 파일의 data 중 `isSideBar(Bool)` 와 `v-if` 디렉티브를 활용해 Sidebar를 열고 닫았습니다. 이때, Nav bar의 toggle button을 통해 이를 조작할 수 있도록 구현했습니다.
- `App.vue` 파일의 data 중 `isLoggedIn(Bool)` 과 `v-if` 디렉티브를 활용해 Sidebar 내부요소를 다르게 구현했습니다. 이때, `isLoggedIn` 은 `vue-cookies`를 통해 cookie 내에 auth-token 유무를 통해 체크합니다. 

##### :bulb: Point

- 모바일 UX 에 대한 고려
  - 앱을 모바일 상황에 맞춰 개발하려 노력했습니다.
  - 모바일에서는 작은 크기의 버튼을 통해 Sidebar를 닫는 것이 불편할 것이라고 판단하여, 버튼뿐만 아니라 여백을 클릭했을 때에도 Sidebar가 닫히도록 구현했습니다.

#### User 관련 기능

##### 1. Login

- 사용자 입력 데이터를 백엔드 서버로 전송해 로그인합니다. 
- 정상적으로 로그인 되는 경우, 응답에 담긴 토큰을 cookie에 넣고 `isLoggedIn` 데이터를 true로 바꾸며, 현재 유저에 대한 정보를 `currentUser` 데이터에 저장합니다. 

##### 2. Signup

- 사용자 입력 데이터를 백엔드 서버로 전송해 가입을 진행합니다. 
- 정상적으로 가입 되는 경우, 자동 로그인이 되도록 구현했습니다. 

##### 3. Logout 

- Request Header에 Authorization 정보를 담아 백엔드 서버로 전송해 로그아웃합니다. 이때 Authorization 정보는 cookie에 담긴 auth-token을 가져와 사용합니다.
- 정상적으로 로그아웃 되는 경우, cookie에서 auth-token을 삭제하고 `isLoggedIn` 및 `currentUser` 데이터를 초기화 합니다.

##### 4. Profile

- Profile 페이지에서는 해당 유저가 작성한 리뷰들과 좋아요를 누른 리뷰들을 모두 보여줍니다. 이때 리뷰를 클릭하면 해당 리뷰 디테일 페이지로 이동합니다. 

- Sidebar의 My Page를 통해 본인의 프로필 페이지로, 리뷰의 작성자를 클릭해 타인의 프로필 페이지로 갈 수 있습니다. 
- My Page 클릭 시 `currentUser` 의 프로필 페이지로 이동하도록 구현했습니다. 

##### :wrench: Refactoring

- Vuex
  - 앱의 구조가 크게 복잡하지 않다고 판단하여 `props & emit` 을 통해 페이지 혹은 컴포넌트 간 정보를 주고 받도록 구현했습니다. 
  - 그러나 유저 관련 기능 뿐 아니라 커뮤니티 기능 중에서도, 현재 유저 정보가 필요한 경우가 많이 있었습니다.
  - Vuex 를 통해 정보를 중앙화한다면 더 간단하게 전체 기능을 구현할 수 있을 것 같습니다. 

#### Movie 관련 기능

##### 1. 영화 리스트

- DB에 있는 모든 영화를 목록화 하여 보여줍니다. 개별 영화 클릭 시, 해당 영화의 디테일 페이지로 이동합니다.
- 개별 영화 아이템들은 포스터, 평점, 제목, 개봉일의 정보를 포함하고 있습니다. 

##### :bulb: Point

- 반응형 디자인
  - 모바일 화면 뿐 아니라, 데스크탑 등 화면이 커지는 경우에 대해 반응형 디자인을 구현했습니다.
  - 특히 영화 리스트 페이지에서는, 화면이 커지면 row 당 영화 아이템 수가 2개에서 3개로 늘어나도록 구현했습니다. 
- 무한 스크롤 구현
  - 1만 개의 데이터를 초기에 모두 불러오는 경우, 불필요한 데이터 전송으로 인해 비용과 시간이 낭비된다고 판단했습니다.
  - `scrollMonitor` 패키지를 통해, 유저가 현재 데이터들을 모두 본 이후에 새로운 데이터를 요청하여 가져오도록 구현했습니다. 
  - 페이지 최하단에 `bottomSensor` 를 두고, 이 sensor 가 viewport에 들어올 때마다 새로운 axios 요청을 보내는 방식으로 구현했습니다. 

##### :wrench: Refactoring

- 정렬 기준
  - 현재는 `pk` 를 기준으로 영화들을 정렬합니다.
  - 정렬 기준을 유저가 선택할 수 있도록 한다면 더 나은 UX가 가능할 것 같습니다. 

##### 2. 영화 디테일

- 개별 영화의 예고 영상 및 정보들과 해당 영화에 대한 리뷰들을 모아볼 수 있는 페이지입니다. 
- 영화 리뷰들 좌상단에 있는 새글쓰기 버튼을 통해, 해당 영화에 대한 리뷰를 작성할 수 있습니다. 

##### :bulb: Point

- Youtube Data API 활용
  - 영화의 예고 영상을 표시하기 위해 Youtube Data APi를 활용했습니다. 
  - `movie.title` + `"예고편"` 으로 검색한 후 첫번째 영상을 가져오는 방식으로 구현했습니다. 
  - 이때 API KEY는 환경변수에 저장하여 사용했습니다. 

- Pagination 활용
  - 사용자 편의성을 위해 영화 리뷰들의 목록을 Pagination을 통해 구현했습니다.

##### :wrench: Refactoring

- 리뷰 작성 경로
  - 데이터 구조 상, 리뷰 클래스에는 영화가 필수 값으로 지정되어 있습니다. 때문에 영화를 선택한 후에 리뷰를 작성하도록, 영화 디테일 화면에서 리뷰 작성이 가능하도록 경로를 설계했습니다.
  - 리뷰를 작성하는 경로가 리뷰를 읽는 경로와 크게 다르다면 사용자에게 혼란을 줄 수 있다고 생각하지만, 데이터 구조 한계를 해결하는 방법을 찾지 못했습니다.
  - 영화를 포함한 리뷰와 일반 글을 분리하여 모델링하는 방법이 일차적인 해결법이 될 수 있다고 생각합니다. 

##### 3. 영화 추천

- 로그인 한 유저에 한해, 한 편의 영화를 추천해줍니다. 클릭 시 개별 영화 페이지로 이동합니다. 
- 유저의 리뷰 기록을 바탕으로 선호 장르를 파악한 후, 선호 장르 내 영화 한 편을 추천하는 알고리즘을 구현했습니다. 리뷰 기록이 없는 유저의 경우에는 평점이 8점 이상인 영화 중 한 편을 추천합니다. 

##### :wrench: Refactoring

- 추천 퀄리티
  - 추천 알고리즘 상, 리뷰 기록이 없는 유저에게는 커스터마이징 된 추천을 제공할 수 없는 문제가 있습니다.
  - 영화에도 좋아요를 누를 수 있도록 만들고, 가입 직후 단계에서 선호하는 영화에 대한 데이터를 얻는다면 리뷰 기록이 없는 신규회원 등에 대해서도 커스터마이징 된 추천을 제공할 수 있을 것 같습니다.

#### Review 관련 기능

##### 1. 리뷰 리스트

- 전체 리뷰들에 대한 목록 페이지입니다. 개별 리뷰를 클릭하면 해당 리뷰의 디테일 페이지로 이동합니다. 
- Pagination을 통해 구현했습니다. 

##### 2. 리뷰 디테일

- 리뷰 제목, 내용, 영화 제목, 좋아요 개수 등 리뷰 정보와 댓글 목록 및 생성 버튼을 포함합니다.
- `currentUser` 와 `review.user` 가 동일하다면 수정 및 삭제 버튼이 표시됩니다. 이때, 댓글도 마찬가지로 작성자의 경우 삭제 버튼이 표시됩니다.

##### :bulb: Point

- ajax 요청을 통해 좋아요를 구현했습니다. 
- 현재 유저가 좋아요를 아직 누르지 않았다면 좋아요를, 이미 눌렀다면 좋아요 취소를 실행합니다. 