import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "~/components/Input";
import { localStorageUtil } from "~/utils/local-storage";
import { useCheckEmail } from "~/apis/check-email";
import { useInput } from "~/hooks/use-input";

export default function SignUpPage() {
  const naviate = useNavigate();

  useEffect(() => {
    if (localStorageUtil.accessToken.get()) {
      naviate("/folder");
    }
  }, [naviate]);

  const { target, render } = useInput({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    confirmedPassword: {
      value: "",
      error: false,
    },
  });
  // 라이브러리는 남이 (잘)만든 코드 -> 나보다 잘만듬, 유지보수를 대신 해줌, 공짜다
  // react-hook-form 쓰세요.

  const { email, password, confirmedPassword } = target.current;

  const { response, refetch } = useCheckEmail(email.value);
  // tanstack query 쓰세요.

  const buttonDisabled =
    email.value === "" ||
    password.value === "" ||
    confirmedPassword.value === "" ||
    email.error ||
    password.error ||
    confirmedPassword.error;

  const alreadyExistError = response?.status === 409;

  const handleOnChange = () => {
    if (!alreadyExistError && email.error) {
      return;
    }

    if (email.value === "") {
      return;
    }

    refetch(email.value);
  };

  /**
   * 컴포넌트를 만들 때 원칙
   * 1. 반복되는 상태를 찾는다
   * 2. 반복되는 로직을 찾는다
   * 3. 반복되지 않는 부분을 찾는다
   */

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
        gap: "16px",
        marginBottom: "50px",
      }}
    >
      <Input
        name="email"
        target={target}
        pattern="^.+@.+\..{2,4}$"
        render={render}
        placeholder="이메일을 입력해주세요."
        onChange={handleOnChange}
        errorMessage={{
          empty: "이메일을 입력해주세요.",
          valid: "올바른 이메일 주소가 아닙니다.",
        }}
        customErrors={[
          {
            visible: () => alreadyExistError,
            text: "이미 사용 중인 이메일입니다.",
          },
        ]}
      />

      <Input
        name="password"
        type="password"
        target={target}
        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
        render={render}
        placeholder="비밀번호를 입력해주세요."
        errorMessage={{
          empty: "비밀번호를 입력해주세요.",
          valid: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
        }}
      />

      <Input
        name="confirmedPassword"
        type="password"
        target={target}
        render={render}
        placeholder="비밀번호를 확인해주세요."
        customErrors={[
          {
            visible: (value, focused) =>
              focused === true && password.value !== value,
            text: "비밀번호가 일치하지 않아요.",
          },
        ]}
      />

      <button
        onClick={() => {
          naviate("/sign-in");
        }}
      >
        로그인
      </button>
      <button disabled={buttonDisabled}>회원가입</button>
    </div>
  );
}
