
const ATMDeposit = ({ onChange, isDeposit, positive }) => {
    const choice = ['Deposit', 'Withdrawal'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input className="submit" type="submit" disabled={!positive} width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [tranMode, setTranMode] = React.useState('');
    const [positiveBal, setPositiveBal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React. useState("");
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(Number(event.target.value));
      if (Number(event.target.value) <= 0) {
        return setPositiveBal(false);
      }
      if (tranMode === 'Withdrawal' && Number(event.target.value) > totalState) {
        setPositiveBal(false);
        setErrorMessage('Cannot Over-Draw, please deposit funds.')

      } else {
        setPositiveBal(true);
      }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);

      setPositiveBal(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      console.log(event.target.value);
      setTranMode(event.target.value);
      setPositiveBal(false);
      if (event.target.value === 'Deposit') {
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <>
          <h2 id="total">{status}</h2>
          <label>Select Transaction</label>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">
              Deposit
            </option>
            <option id="withdrawal-selection" value="Withdrawal">
              Withdrawal
            </option>
          </select>
          {tranMode && (
            <ATMDeposit
              onChange={handleChange}
              isDeposit={isDeposit}
              positive={positiveBal}
            ></ATMDeposit>
          )}

        {errorMessage && (
            <p className="error" > {errorMessage} </p>
            )}


        </>
      </form>
    );
  };

  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  