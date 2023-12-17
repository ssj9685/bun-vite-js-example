import { useState } from "react";
import { ErrorMessage } from "~/components/ErrorMessage";

/**
 * @typedef {import("react").InputHTMLAttributes} InputHTMLAttributes
 * @typedef {import("react").MutableRefObject} MutableRefObject
 * @typedef {{visible: (value: string, focused: boolean)=>boolean, text: string}[]} CustomErrors
 * @typedef {InputHTMLAttributes & {customErrors?: CustomErrors, errorMessage?: {empty: string, valid: string}, target: MutableRefObject, render: () => void}} Props
 */

/**
 *
 * @param {Props} props
 * @returns {import("react").ReactElement}
 */
export function Input(props) {
  const { customErrors, pattern, errorMessage, target, name, render, ...rest } =
    props;

  const object = target.current[name];

  // 값을 수정하고 싶어! -> object(주소값 불변)를 가져온다. or setState 넘겨준다. useState/useRef
  // value = '11'
  // object랑 원시 값의 타입과는 어떤 차이점이 있을까요? -> 여러값들이 있고 하나만 있어요
  // let, const: 주소값을 변경하는 행위를 금지
  // [], {} Map, Set -> const로 선언이 되어도 내부는 변경가능
  // const object = {}; -> object.value = '11'; object의 주소값을 변경하는 행위 금지
  // console.log(object) -> {value: '11'};
  const value = object.value;

  // 저번 시간엔 비즈니스 로직을 분리하였다.
  // 컴포넌트를 설계할 때 관심사를 분리해야한다. -> 전체가 봐야하는 상태/본인만 알아도 되는 상태
  // 나중에 이 상태값이 다른 형제들에게 필요하다면 -> 형제들을 포함하는 컴포넌트로 상태를 올려줘야한다.
  /**
   * @type {[boolean, (value:boolean) => void]}
   */
  const [focused, setFocused] = useState();

  const getErrors = (v) => {
    const valid = new RegExp(pattern ?? "").test(v);

    const empty = v === "";
    const customError =
      customErrors?.some((error) => error.visible(v, focused) === true) ??
      false;

    const emptyError = focused === false && empty;
    const validError = !empty && valid === false;

    return {
      customError,
      emptyError,
      validError,
    };
  };

  const { customError, emptyError, validError } = getErrors(value);
  const error = customError || emptyError || validError;

  const onChange = (event) => {
    const v = event.target.value;
    object.value = v; //랜더링이 발생하지 않는다.

    // setState는 기본적으로 (동기 순서보장/비동기 순서보장x)
    // promise1.then(promise2), await promise1; await promise2, promise1 promise2
    const { customError, emptyError, validError } = getErrors(v);

    // input onChange를 했는데, 어라 한개씩 밀리네?

    object.error = customError || emptyError || validError;
    render();

    // 콜백 callback cb
    // call back -> 뒤를 불러라, 거꾸로 불러라 ... 뒤에서 불러라
    // 내부에서 구현하지 않고 외부에서 구현 -> 코드 유연성
    props.onChange?.(event);
  };

  const onFocus = (e) => {
    setFocused(true);

    props.onFocus?.(e);
  };

  const onBlur = (e) => {
    setFocused(false);

    props.onBlur?.(e);
  };

  return (
    <div className="center">
      <input
        className={error ? "invalid-input" : ""}
        {...rest}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {emptyError && errorMessage?.empty && (
        <ErrorMessage text={errorMessage.empty} />
      )}
      {validError && errorMessage?.valid && (
        <ErrorMessage text={errorMessage.valid} />
      )}
      {customErrors?.map((error, key) => {
        const { visible, text } = error;
        if (!visible(value, focused)) {
          return null;
        }

        return <ErrorMessage key={key} text={text} />;
      })}
    </div>
  );
}
