## 🎫Ticket-Nest🎫

### 🎫 소개
공연 예매 서비스

### 🕰️ 개발 기간
- 2024.03.07 목 ~ 2024.03.14 목

### ⚙️ 개발 환경
- Backend: Nest.js
- Database: AWS RDS (MySQL)
- Version Control: GitHub
- API Documentation: zep

### 📌 주요 기능
- 공연 정보 조회: 시스템에 등록된 공연의 목록과 상세 정보를 조회할 수 있다.
- 공연 등록 : 공연별로 자유석과 지정석 선택 가능하도록 구분을 두어 자유석 공연 시 좌석 선택을 하지 않아도 되도록 처리.
- 공연 예매: 사용자는 특정 공연의 예매 가능한 좌석 정보를 확인하고, 원하는 좌석을 선택하여 예매할 수 있다.
- 예매 내역 조회: 로그인한 사용자의 예매 내역을 조회할 수 있으며, 목록은 예매 날짜 기준으로 최신 순으로 정렬됨
- 예매 취소: 예매한 공연 티켓을 취소 및 환불처리
- 동시성 처리: 다른 사용자가 동시에 같은 좌석을 예매하려 할 경우, 먼저 요청한 사용자에게 좌석이 할당되며, 나머지 사용자에게는 예매 실패 메시지가 반환됨
- 사용자 인증 및 권한 관리: JWT를 사용한 사용자 인증 및 권한 관리를 통해, 일부 기능에 대한 접근을 제한

### 🔒 환경변수
- DB_HOST
- DB_PORT=3306
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- DB_SYNC
- JWT_SECRET_KEY

 ### ✒ 문서
 - API : https://serious-airedale-c1e.notion.site/31eac16ad5c140dcb73391ee89f06580?v=50a5eb2d3bc24db9bc2f1bc1745b9714&pvs=4
 - Swagger : http://52.79.227.251:3000/api

