import { useState } from "react";
import { ErrorMessage } from "~/components/ErrorMessage";

export function Input(props) {
  const { customErrors, pattern, erorrMessage, target, name, render, ...rest } =
    props;

  const object = target.current[name];

  const value = object.value;
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

  const onChange = (e) => {
    const v = e.target.value;
    object.value = v;
    const { customError, emptyError, validError } = getErrors(v);

    object.error = customError || emptyError || validError;
    render();
    props.onChange?.(e);
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
      {emptyError && erorrMessage?.empty && (
        <ErrorMessage text={erorrMessage.empty} />
      )}
      {validError && erorrMessage?.valid && (
        <ErrorMessage text={erorrMessage.valid} />
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
