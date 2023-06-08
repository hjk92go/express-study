네트워크지식

1. 프로토콜(Protocol)
   이전 영상에서 저는 서버 프로그램을 만들기 위해 http라는 코어 모듈을 로드했습니다. 이때 http라는 단어는 클라이언트와 서버 간의 '통신 규약' 혹인 '프로토콜'의 이름이라고 했는데요. 프로토콜(protocol)이란 '약속', '규약'이라는 뜻의 영어 단어로, 컴퓨터 네트워크에서는 '클라이언트와 서버가 서로 통신하기 위해 사용하는 규약'을 의미합니다. 그러니까 클라이언트는 어떤 식으로 데이터를 보내줘야 하고, 서버는 또 어떤 식으로 데이터를 보내줘야 하는지에 관한 규약이라는 거죠. 프로토콜에는 ftp, telnet, ssh, pop3, smtp, http, https 등 다양한 것들이 있는데요. 이 중에서도 웹 개발을 할 때는, 브라우저 주소창에서 쉽게 볼 수 있는 http, https 라는 프로토콜이 중요합니다.

잠깐 코드잇 사이트의 URL을 브라우저에서 복사해서 살펴볼까요?

94fq89svd-m(rev).png

맨 앞에 https라는 단어를 볼 수 있는데요. https는 http보다 좀 더 안전한 방식(s는 secure의 줄임말입니다)의 프로토콜입니다.

프로토콜을 지키면서 통신을 한다는 게 뭔지, https가 http보다 안전한 방식이라는 게 무슨 의미인지는 사실 네트워크를 깊게 공부해야 알 수 있습니다. 그런 내용은 나중에 코드잇의 네트워크 관련 토픽이 생길 때 다뤄보도록 합시다. 지금 여러분이 기억하고 가야 할 것은 클라이언트와 서버가 요청과 응답을 주고받을 때는 항상 프로토콜이 필요하고, 프로토콜의 종류에는 여러 가지가 있다는 사실입니다.

2. 특수한 IP 주소, 127.0.0.1
   이전 영상에서 저는 제 컴퓨터에서 실행 중인 서버 프로그램에 접속하기 위해 127.0.0.1이라는 IP 주소를 썼습니다. 127.0.0.1이라는 IP 주소는 특별한 주소라고 했었죠? 왜냐하면, 이 주소는 외부의 다른 컴퓨터가 아니라 컴퓨터 자기 자신을 나타내는 주소로 특별히 약속된 주소이기 때문입니다. 그래서 이 IP 주소는 외부의 서버와 통신하기 위해 사용되는 것이 아니라

개발자들이 자신이 만든 서버 프로그램을 테스트하기 위한 용도
로 주로 사용됩니다.

https://bakey-api.codeit.kr/api/files/resource?root=static&seqId=3718&directory=Untitled%201.png&name=Untitled+1.png

위 이미지에 보이는 것처럼 당분간은 127.0.0.1 주소만 사용할 거니까 그 의미를 확실하게 기억하고 가세요.

\*참고로 127.0.0.1 자리에 localhost라고 써도 똑같이 내 컴퓨터에 접속할 수 있습니다. 궁금한 분들은 직접 실험해보세요. 간혹 다른 곳에서는 내가 만든 서버 프로그램을 테스트하기 위해 127.0.0.1 말고 localhost를 쓰는 경우도 있기 때문에 알려드립니다. 보다 자세한 설명은 이 페이지를 참조하세요.

3. 포트(Port) 번호란?
   https://bakey-api.codeit.kr/api/files/resource?root=static&seqId=3718&directory=Untitled%202.png&name=Untitled+2.png

위 이미지를 보면 IP 주소 뒤에 :3000이라고 하는 포트 번호가 붙어있습니다. '포트 번호'는 이전 영상에서도 간단하게 언급했는데요. 포트 번호란 클라이언트가 서버에 요청을 보내려고 할 때, 서버에서 실행되고 있는 여러 프로그램 중 어느 프로그램과 통신할 것인지를 나타내기 위해 지정하는 번호입니다. 서버에서 실행되는 모든 프로그램 중 클라이언트와의 통신이 필요한 것들은 처음에 '포트 번호'를 할당받은 상태에서 실행됩니다. 아래 이미지를 보세요.

https://bakey-api.codeit.kr/api/files/resource?root=static&seqId=3718&directory=Untitled%203.png&name=Untitled+3.png

지금 서버에서 각 프로그램이 서로 다른 포트 번호를 할당받아서 실행되고 있죠? 이럴 때 클라이언트는 원하는 프로그램의 포트 번호를 지정하고 접속하면 됩니다.

잠깐, 이전 영상에서 썼던 코드를 보면

const http = require('http');

const server = http.createServer(function (request, response) {
response.end('<h1>Hello World<h1>');
});

server.listen(3000);

이 코드에서

server.listen(3000);

이 부분이 바로 server 객체가 3000번 포트를 할당받아 실행되도록 하는 부분입니다. 즉, 제가 만든 서버 프로그램은 포트 번호 3000번을 갖고 실행 중이었고, 그래서 제가 브라우저에서 포트 번호 3000번을 써주고 접속했던 겁니다. 포트 번호가 왜 필요한지 이제 아시겠죠?

4. 종합
   자, 이제 이번 노트의 내용을 종합해서 이전 영상의 내용을 복습해볼게요. 이전 영상에서 브라우저의 주소창에 입력했던

http://127.0.0.1:3000

이 주소는

제 컴퓨터에서(127.0.0.1)

3000번 포트 번호를 가지고 실행되고 있던(:3000) 서버 프로그램과

http라는 프로토콜로 통신을 시작하겠다는

뜻이었던 겁니다.