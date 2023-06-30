import { useState } from "react";

function CompoundingInterest() {
    const [ interestRate, setInterestRate ] = useState(0);
    const [ numberOfYears, setNumberOfYears ] = useState(0);
    const [ principal, setPrincipal ] = useState(0);
    const [ futureValue, setFutureValue ] = useState(0);
    const [ mode, setMode ] = useState("futureValue");

    const handleInterestRate = (event) => {
        setInterestRate(event.target.value);
    }

    const handleNumberOfYears = (event) => {
        setNumberOfYears(event.target.value);
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
        if (mode === "futureValue") {
            const decimalInterestRate = interestRate / 100;
            const multiplicationFactor = 1 + (numberOfYears * decimalInterestRate);
            const answer = principal * multiplicationFactor;
            console.log(answer);
        }
        else if (mode === "interestRate") {
            const numerator = futureValue - principal;
            const denominator = principal * numberOfYears;
            const answer = (numerator / denominator ) * 100;
            console.log(answer);
        }

        else if (mode === "principal") {
            const decimalInterestRate = interestRate / 100;
            const divisionFactor = 1 + (numberOfYears * decimalInterestRate);
            const answer = futureValue / divisionFactor;
            console.log(answer);
        }
    }

    const switchMode = (selectedMode) => { // function that runs when switching modes
        const allFields = document.getElementsByClassName("CompoundingInterest-fields");
        for (let i=0; i<4; i++)
        {
            allFields[i].removeAttribute("disabled"); // enable all fields initially
            allFields[i].value = ""; // clear all field values
        }

        setInterestRate(0); // reset all state variables
        setNumberOfYears(0);
        setPrincipal(0);
        setFutureValue(0);

        let selectedId;
        if (selectedMode === "futureValue") {
            setMode("futureValue");
            selectedId = "CompoundingInterest-future-value-field";
        }

        else if (selectedMode === "interestRate") {
            setMode("interestRate");
            selectedId = "CompoundingInterest-interest-rate-field";
        }

        else if (selectedMode === "principal") {
            setMode("principal");
            selectedId = "CompoundingInterest-principal-field";
        }



        const fieldToRemove = document.getElementById(selectedId);
        fieldToRemove.setAttribute("disabled", "disabled"); // disable certain fields
    }

    return (
        <>
            <h4>This is compounding interest</h4>

            <button onClick={()=>switchMode("futureValue")}>Future Value</button>
            <button onClick={()=>switchMode("interestRate")}>Interest Rate</button>
            <button onClick={()=>switchMode("principal")}>Principal</button>
            <form onSubmit={ (e) => handleSubmit(e) }>
            <br/>
            <p>Interest Rate (in percentage)</p>
            <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-interest-rate-field" onChange={handleInterestRate} step="any" required/>

            <p>Number of Years</p>
            <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-number-of-years-field" onChange={handleNumberOfYears} min='0' step="1" required/>

            <p>Principal</p>
            <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-principal-field" onChange={handlePrincipal} min='0' step="0.01" required/>

            <p>Future Value</p>
            <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-future-value-field" onChange={handleFutureValue} min='0' step="0.01" disabled required/>

            <div className='submit-button-container'>
                <input type="submit" id='submit-button' value="Calculate" />
            </div>

            </form>

        </>
    );
}

export default CompoundingInterest;