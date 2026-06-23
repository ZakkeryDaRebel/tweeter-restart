import { useState } from "react";

interface Props {
  doAuthentication: () => void;
}

const AuthenticationFields = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  const checkAuthentication = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !!alias && !!password) {
      props.doAuthentication();
    }
  };

  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onKeyDown={checkAuthentication}
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          placeholder="Password"
          onKeyDown={checkAuthentication}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
