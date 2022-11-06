const MissionUtils = require("@woowacourse/mission-utils");

// 1. 컴퓨터가 뽑은 랜덤 숫자 3개 배열로 만드는 함수
function randomNums() {
  let nums = [];
  while (nums.length < 3) {
    let number = MissionUtils.Random.pickNumberInRange(1, 9);
    if (!nums.includes(number)) {
      nums.push(number);
    }
  }
  return nums;
}

// 2. 사용자에게 숫자 3개 받는 함수
function readNums() {
  let user;
  MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (answer) => {
    user = answer.split("").map((string) => Number(string));
    user.map((num) => {
      if (isNaN(num)) {
        throw "Not a number";
      }
    });
    if (user.includes(0)) {
      throw "0 exists";
    } else if (user.length !== 3) {
      throw "Not three digits";
    }
  });
  return user;
}

// 3. 컴퓨터 숫자와 사용자 숫자 비교하는 함수
function compareNums(computer, user) {
  let ball = 0;
  let strike = 0;

  for (let i = 0; i < user.length; i++) {
    if (user[i] === computer[i]) {
      strike++;
    } else if (computer.includes(user[i])) {
      ball++;
    }
  }
  return [ball, strike];
}

// 4. 3번에 비교한 결과를 바탕으로 출력해주는 함수
function printResult(score) {
  let ball = score[0];
  let strike = score[1];
  if (strike === 3) {
    MissionUtils.Console.print("3스트라이크");
    MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    return true;
  } else if (ball === 0 && strike === 0) {
    MissionUtils.Console.print("낫싱");
  } else if (strike === 0) {
    MissionUtils.Console.print(`${ball}볼`);
  } else if (ball === 0) {
    MissionUtils.Console.print(`${strike}스트라이크`);
  } else {
    MissionUtils.Console.print(`${ball}볼 ${strike}스트라이크`);
  }
  return false;
}

class App {
  play() {
    let check = 1;
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    // let computer = [];
    while (check === 1) {
      let computer = randomNums();
      let user;
      let score;
      let result;

      while (1) {
        user = readNums();
        score = compareNums(computer, user);
        result = printResult(score);
        if (result) break;
      }

      MissionUtils.Console.readLine(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요. ",
        (answer) => {
          if (answer === 2) check = 2;
        }
      );
      if (check === 2) break;
    }
  }
}

module.exports = App;
