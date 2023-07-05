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

    /**
     * This method updates the 'answer' state variable by performing interest rate calculations
     * @param {String} mode Specifies which variable the user wants to calculate
     */
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

    /**
     * This method is run when switching modes by updating the 'mode' state variable.
     * All input fields are cleared when this function is run.
     * @param {String} selectedMode Specifies which variable the user wants to calculate
     */
    const switchMode = (selectedMode) => {
        const allFields = document.getElementsByClassName("input-fields");
        for (let i=0; i<allFields.length; i++)
        {
            allFields[i].removeAttribute("disabled");
            allFields[i].value = ""; // clear all field values
        }

        const allContainers = document.getElementsByClassName("input-container");
        for (let i=0; i<allContainers.length; i++)
        {
            allContainers[i].classList.remove("hidden");
        }

        const modeButtons = document.getElementsByClassName("mode-buttons");
        for (let i=0; i<modeButtons.length; i++)
        {
            modeButtons[i].classList.remove("active-mode");
        }

        setInterestRate(0); // reset all state variables
        setTimePeriod(0);
        setPrincipal(0);
        setFutureValue(0);
        setAnswer(0);

        let selectedId;
        if (selectedMode === "futureValue") {
            setMode("futureValue");
            selectedId = "future-value";
        }

        else if (selectedMode === "interestRate") {
            setMode("interestRate");
            selectedId = "interest-rate";
        }

        else if (selectedMode === "principal") {
            setMode("principal");
            selectedId = "principal";
        }
        
        else if (selectedMode === "timePeriod") {
            setMode("timePeriod");
            selectedId = "time-period";
        }

        const itemToRemove = document.getElementById(`${selectedId}-container`);
        const fieldToDisable = document.getElementById(`${selectedId}-field`)
        const buttonToHighLight = document.getElementById(`${selectedId}-mode-button`);
        itemToRemove.classList.add("hidden");
        buttonToHighLight.classList.add("active-mode");
        fieldToDisable.setAttribute("disabled", "disabled");
    }

    return (
        <>
            <div className="title-container">
                <p className="title">Simple Interest Calculator</p>
                <p className="mode-prompt">Choose one of the following to calculate:</p>
            </div>
            <div className="mode-button-container">
                <button className="mode-buttons" id="principal-mode-button" onClick={()=>switchMode("principal")}>Principal</button>
                <button className="mode-buttons" id="interest-rate-mode-button" onClick={()=>switchMode("interestRate")}>Interest Rate</button>
                <button className="mode-buttons" id="time-period-mode-button" onClick={()=>switchMode("timePeriod")}>Time Period</button>
                <button className="mode-buttons active-mode" id="future-value-mode-button" onClick={()=>switchMode("futureValue")}>Future Value</button>
            </div>
            <div className="form-container">
            <form onSubmit={ (e) => handleSubmit(e) }>
                <div className="input-container" id="principal-container">
                    <label htmlFor="principal-field" className="input-labels" id="principal-label">Principal</label>
                    <input type="number" className="input-fields" id="principal-field" onChange={handlePrincipal} min='0' step="0.01" required/>
                </div>
                <div className="input-container" id="interest-rate-container">
                    <label htmlFor="interest-rate-field" className="input-labels" id="interest-rate-label">Interest Rate (%)</label>
                    <input type="number" className="input-fields" id="interest-rate-field" onChange={handleInterestRate} step="any" required/>
                </div>
                <div className="input-container" id="time-period-container">
                    <label htmlFor="time-period-field" className="input-labels" id="time-period-label">Time Period (years)</label>
                    <input type="number" className="input-fields" id="time-period-field" onChange={handleTimePeriod} min='0' step="1" required/>
                </div>
                <div className="input-container hidden" id="future-value-container">
                    <label htmlFor="future-value-field" className="input-labels" id="future-value-label">Future Value</label>
                    <input type="number" className="input-fields" id="future-value-field" onChange={handleFutureValue} min='0' step="0.01" disabled required/>
                </div>
                <div className='submit-button-container'>
                    <input type="submit" id='submit-button' value="Calculate" />
                </div>
            </form>
            </div>

            <div className="answer-container">
                <h3>{answer}</h3>
            </div>

        </>

    );
}

export default SimpleInterest;