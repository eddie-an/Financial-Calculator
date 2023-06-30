import { useState } from "react";

function SimpleInterest() {
    const [ interestRate, setInterestRate ] = useState(0);
    const [ numberOfYears, setNumberOfYears ] = useState(0);
    const [ principal, setPrincipal ] = useState(0);

    const handleInterestRate = (event) => {
        setInterestRate(event.target.value);
    }

    const handleNumberOfYears = (event) => {
        setNumberOfYears(event.target.value);
    }

    const handlePrincipal = (event) => {
        setPrincipal(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const decimalInterestRate = interestRate / 100;
        const multiplicationFactor = 1 + (numberOfYears * decimalInterestRate);
        const futureValue = principal * multiplicationFactor;
        console.log(futureValue);
    }



    return (
        <>
            <h4>This is simple interest</h4>

            <form onSubmit={ (e) => handleSubmit(e) }>
            <br/>
            <p>Interest Rate (in percentage)</p>
            <input type="number" onChange={handleInterestRate} step="any" required/>

            <p>Number of Years</p>
            <input type="number" onChange={handleNumberOfYears} min='0' step="1" required/>

            <p>Principal</p>
            <input type="number" onChange={handlePrincipal} min='0' step="0.01" required/>

            <div className='submit-button-container'>
                <input type="submit" id='submit-button' value="Calculate" />
            </div>

            </form>

        </>

    );
}

export default SimpleInterest;