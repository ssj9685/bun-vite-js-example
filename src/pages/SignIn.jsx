import { useRef } from "react";

import { Input } from "~/components/Input";
import { signIn } from "~/apis/login";
import { localStorageUtil } from "~/utils/local-storage";
import { useInput } from "~/hooks/use-input";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigator = useNavigate();

  const { target, render } = useInput({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });

  const buttonRef = useRef(null);

  const { email, password } = target.current;

  const buttonDisabled =
    email.value === "" ||
    password.value === "" ||
    email.error ||
    password.error;

  const onEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      buttonRef.current?.click();
    }
  };

  const onSignInButtonClick = async () => {
    const result = await signIn({
      email: email.value,
      password: password.value,
    });

    // 실패하고 나서 토스트 알림창이 떠야한다. -> error, ui -> 커스텀훅

    if (result.status === 200) {
      localStorageUtil.accessToken.set(result.data.data.accessToken);
      navigator("/folder");
    }
  };

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
        onKeyDown={onEnterKeyDown}
        placeholder="이메일을 입력해주세요."
        erorrMessage={{
          empty: "이메일을 입력해주세요.",
          valid: "올바른 이메일 주소가 아닙니다.",
        }}
      />

      <Input
        name="password"
        type="password"
        target={target}
        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
        render={render}
        onKeyDown={onEnterKeyDown}
        placeholder="비밀번호를 입력해주세요."
        erorrMessage={{
          empty: "비밀번호를 입력해주세요.",
          valid: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
        }}
      />

      <button
        ref={buttonRef}
        disabled={buttonDisabled}
        onClick={onSignInButtonClick}
      >
        로그인
      </button>
      <button onClick={() => navigator("/")}>회원가입</button>
    </div>
  );
}
