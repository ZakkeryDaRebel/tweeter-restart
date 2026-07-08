interface Props {
  isBottomField: boolean;
  setAlias: (newAlias: string) => void;
  setPassword: (newPass: string) => void;
  checkAuthentication: (event: React.KeyboardEvent<HTMLElement>) => void;
}

const AuthenticationFields = (props: Props) => {
  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          aria-label="alias"
          placeholder="name@example.com"
          onKeyDown={props.checkAuthentication}
          onChange={(event) => props.setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className={`form-floating ${props.isBottomField ? "mb-3" : ""}`}>
        <input
          type="password"
          className={`form-control ${props.isBottomField ? "bottom" : ""}`}
          id="passwordInput"
          aria-label="password"
          placeholder="Password"
          onKeyDown={props.checkAuthentication}
          onChange={(event) => props.setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
