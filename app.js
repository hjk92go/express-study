//Express란, node.js 환경의 서버프로그램을 만들때 사용하는 프레임워크

//Express로 API Server를 만듬

// 서버에는 2가지 종류가 있음
// 1. 웹페이지를 Response의 Body에 담아서 보내주는 서버와
// 2. 클라이언트가 요청한 작업을 처리하고 그 처리한 결과를 Response의 Body에 담아서 보내주는 서버
// 예시
// 1번)화면을 그리는데 필요한 재료를 Response의 Body에 담아서 보냄
// 2번)Api Server들은 작업결과를 Response의 Body에 Json형식으로 담아서 보냄

//실습
//1. 현재 디렉토리를 패키지로 만드는 방법 -> npm init
//2. 패키지 이름 적어주고 전부 enter, 기본으로설정
//3. express를 설치해야한다!

//express패키지에서 공개하는것을 먼저 가져온다.
const express = require("express");

//express패키지는 함수하나를 외부에 공개한다.
const app = express(); //express를 만든 객체에는 관습적으로 app이라는 이름을 붙인다.

//실습 챕2_api서버만들기_members.js파일을api서버로 만들어보자!
const members = require("./members");

app.get("/api/members", (req, res) => {
  //보통api서버는 패스부분에 api라는 말을 적어 줄때가 많음(도메인이 있으면 도메인에 쓰기도함)
  res.send(members); //send메소드엔 다양한 타입값을 넣을수있음,
  //배열을 넣을경우 배열을 JSON문자열로 변환한 결과를 리스폰스의 바디에 담아서 보내주게 된다.
});

app.get("/api/members/:id", (req, res) => {
  //members/뒤에 오는값을 id변수에 대입하라는 뜻
  //이 위치에는 다양한 값, 가변적인 값들이 들어 올수 있는데 그 값들을 id에 담으라는 것.
  //이러한 변하는 값을 담는 부분을 익스프레스에서는 Route Parameter(라우트 파라미터)라고 한다.

  //id에 담긴값을 가져오는 방법
  //Route Parameter의 값은 req객체의 params라고 하는 객체의 프로퍼티로 설정되게 됨
  const { id } = req.params; //const id = req.params.id; 와 동일한 코드임 / 중요!! 잘기억할것

  //find는 인자로 들어온 콜백함수가 true를 리턴하는 배열의 여러요소들 중에 첫번째 요소을 리턴한다.
  //주의할점!! member객체의 id 프로퍼티 값은 number타입인데
  //라우트 파라미터의 id값은 string 타입이라서 타입을 맞춰줘야한다.

  const members = members.find((m) => m.id === Number(id));

  if (member) {
    res.send(member); //해당 직원값이 있다면 그 직원정보를 리스폰스에 담아서 보내기
  } else {
    //find 메소드는 배열에 일치하는 값이 하나도 없으면 undefined를 리턴한다.
    //undefined는 JS에서 false로 간주되는 값을 의미

    res.status(404).send({ message: "there is no such member" }); //해당값이 없다면 상태코드도 적절한 코드를 설정해주는것이 좋다.
    //요청한 정보가 없다는것을 의미=> 404를 많이 씀
    //상태값을 지정해주려면, res의 status메소드를 사용하면된다.
    //바디에다가 해당직원의 값이 없다는걸 나타내자. 바로 .send메소드 사용하면됨.
    //더 좋은건, 이런문장도 하나의 json객체 안에 넣어서 보내주는것이 더 좋은방버법이다.
    //그래야 추가정보를 확장하기가 쉽다.
    //ex, message라는 프로퍼티를 만들어서 사용.
  }
});

//외부의 client가 보낸 request(요청)의 url의 패스(경로) 부분이 /hello라면 아래의 함수가 실행된다.
app.get("/hello", (req, res) => {
  res.send("<h1>Hello Express</h1>"); //response객체의 send메소드 이용을 이용해서 응답
}); //이런식으로 특정조건이 만족될때 실행되는 함수를 콜백이라고 하는데,
//특정 패스에 대응하는 콜백을 '라우트 핸들러(route handler)라고도 한다.'
//이 라우트는 서버가 리퀘스트의 패스부분을 보고 알맞은 작업을 수행하는것을 말한다.
//핸들러는 그 작업을 담당하는 존재를 의미한다.

//외부에서 리퀘스트가 오는것을 기다리도록 하는 메소드
//이것까지 써줘야 프로그램이 외부의 리퀘스트를 받을 수 있다.
app.listen(3000, () => {
  //listen안의 3000은 포트번호 3000번을 의미
  console.log("Server is listening..."); //서버가 외부 리퀘스트를 들을 준비를 마치고 나면 자동으로 실행됨 (실행여부를 확인할수있어서 넣는것이 좋음)
});
//위와 같이 작성하게 되면, 포트번호 3000번에서 실행하겠다는 뜻이 된다.(나중에 우리가 작성한 api서버도 포트번호 3000번으로 접속해야 한다.)

//포트번호란? 서버안에서 실행되늰 여러 프로그램들 중 특정 프로그램을 식별 할 수 있게 해주는 번호

//230611
//06 리소스란?
//서버에 저장되어 있는 수많은 정보들을 모드 리소스(Resource)라고 합니다.

//특정 팀에 속한 직원정보 조회하기

//http://localhost:3000/api/members?team=engineering에서
//?team=engineering이런식으로 team에 값을 넣어주면 된다.
//이부분을 쿼리라고하는데, Query는 서버에 있는 데이터를 조회할 때 기준을 정하기 위해 사용한다.

app.get("/api/members", (req, res) => {
  //team이라는 파라미터의 값을 가져오는 코드임
  const { team } = req.query; // =const team = req.query.team;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});

//post리퀘스트를 보내는 방법_새로운 리소스 추가

///api/members 로 들어오는 post리퀘스트 처리가능
app.post("/api/members", (req, res) => {
  //추가하게될 정보는 리퀘스트 바디에 들어와있음
  console.log(req.body); //출력코드
  //강의에서는 rest client를 이용해서 입력함

  //객체를 추가하는 코드
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

//post 리퀘스트에 바디를 담아서 보낼때 추가해야할 코드!

// express 객체의 이 json이라는 메소드는 어떤함수를 리턴함
// 그 함수는 서버로 온 리퀘스트 바디에 json데이터가 존재할경우에\
// 그것을 추출해서 리퀘스트 바디의 body프로터피의 값으로 설정해준다.
// 이런식으로 리퀘스트가 라우트 핸들러에 의해 처리되기 전에
// 추가적으로 필요한 전처리를 수행하는 함수를 익스프레스에서는 미들웨어라고 한다.
app.use(express.json()); //이 미들웨어를 추가해줘야댐

//공개오픈소스
//https://github.com/expressjs/express
