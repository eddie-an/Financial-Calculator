import { useState } from "react";

function SimpleInterest() {
    const [ interestRate, setInterestRate ] = useState(0);
    const [ timePeriod, setTimePeriod ] = useState(0);
    const [ principal, setPrincipal ] = useState(0);
    const [ futureValue, setFutureValue ] = useState(0);
    const [ answer, setAnswer ] = useState(0);
    const [ mode, setMode ] = useState("futureValue");

    const handleInterestRate = (event) => {
        setInterestRate(event.target.value);
    }

    const handleTimePeriod = (event) => {
        setTimePeriod(event.target.value);
    }

    const handlePrincipal = (event) => {
        setPrincipal(event.target.value);
    }

    const handleFutureValue = (event) => {
        setFutureValue(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        calculation(mode);
    }

    const calculation = (mode) => {
        let ans;
        if (mode === "futureValue") {
            const decimalInterestRate = interestRate / 100;
            const multiplicationFactor = 1 + (timePeriod * decimalInterestRate);
            ans = principal * multiplicationFactor;
        }
        else if (mode === "interestRate") {
            const numerator = futureValue - principal;
            const denominator = principal * timePeriod;
            ans = (numerator / denominator ) * 100;
        }

        else if (mode === "principal") {
            const decimalInterestRate = interestRate / 100;
            const divisionFactor = 1 + (timePeriod * decimalInterestRate);
            ans = futureValue / divisionFactor;
        }
        else if (mode === "timePeriod") {
            const numerator = futureValue - principal;
            const denominator = principal * interestRate;
            ans = (numerator / denominator ) * 100;
        }
        setAnswer(ans);

    }

    const switchMode = (selectedMode) => { // function that runs when switching modes
        const allFields = document.getElementsByClassName("SimpleInterest-fields");
        for (let i=0; i<4; i++)
        {
            allFields[i].removeAttribute("disabled"); // enable all fields initially
            allFields[i].value = ""; // clear all field values
        }

        setInterestRate(0); // reset all state variables
        setTimePeriod(0);
        setPrincipal(0);
        setFutureValue(0);
        setAnswer(0);

        let selectedId;
        if (selectedMode === "futureValue") {
            setMode("futureValue");
            selectedId = "SimpleInterest-future-value-field";
        }

        else if (selectedMode === "interestRate") {
            setMode("interestRate");
            selectedId = "SimpleInterest-interest-rate-field";
        }

        else if (selectedMode === "principal") {
            setMode("principal");
            selectedId = "SimpleInterest-principal-field";
        }
        
        else if (selectedMode === "timePeriod") {
            setMode("timePeriod");
            selectedId = "SimpleInterest-time-period-field";
        }

        const fieldToRemove = document.getElementById(selectedId);
        fieldToRemove.setAttribute("disabled", "disabled"); // disable certain fields
    }

    return (
        <>
            <h4>This is simple interest</h4>

            <button onClick={()=>switchMode("futureValue")}>Future Value</button>
            <button onClick={()=>switchMode("interestRate")}>Interest Rate</button>
            <button onClick={()=>switchMode("principal")}>Principal</button>
            <button onClick={()=>switchMode("timePeriod")}>Time Period</button>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <br/>
                <p>Interest Rate (in percentage)</p>
                <input type="number" className="SimpleInterest-fields" id="SimpleInterest-interest-rate-field" onChange={handleInterestRate} step="any" required/>

                <p>Time Period (years)</p>
                <input type="number" className="SimpleInterest-fields" id="SimpleInterest-time-period-field" onChange={handleTimePeriod} min='0' step="1" required/>

                <p>Principal</p>
                <input type="number" className="SimpleInterest-fields" id="SimpleInterest-principal-field" onChange={handlePrincipal} min='0' step="0.01" required/>

                <p>Future Value</p>
                <input type="number" className="SimpleInterest-fields" id="SimpleInterest-future-value-field" onChange={handleFutureValue} min='0' step="0.01" disabled required/>

                <div className='submit-button-container'>
                    <input type="submit" id='submit-button' value="Calculate" />
                </div>

            </form>

            <div className="answer">
                <h3>{answer}</h3>
            </div>

        </>

    );
}

export default SimpleInterest;