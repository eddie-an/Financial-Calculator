import { useState } from "react";

function CompoundingInterest() {
    const [ interestRate, setInterestRate ] = useState(0);
    const [ timePeriod, setTimePeriod ] = useState(0);
    const [ principal, setPrincipal ] = useState(0);
    const [ futureValue, setFutureValue ] = useState(0);
    const [ compoundingPeriod, setCompoundingPeriod] = useState("");
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
        const numberOfCompoundingPeriods = {
            'annually': 1,
            'semi-annually': 2,
            'quarterly': 4,
            'monthly': 12,
            'semi-monthly': 24,
            'bi-weekly': 26,
            'weekly': 52,
            'daily': 365
        };

        let effectiveAnnualRate; // This is the interest rate that will be used in subsequent calculations
        if (mode !== "interestRate" && compoundingPeriod !== "continuously") {
            const decimalInterestRate = interestRate / 100;
            const m = numberOfCompoundingPeriods[compoundingPeriod];
            effectiveAnnualRate = (1 + (decimalInterestRate/m)) ** m - 1;
            console.log(effectiveAnnualRate);
        }
        else if (mode !== "interestRate" && compoundingPeriod === "continuously") {
            const decimalInterestRate = interestRate / 100;
            effectiveAnnualRate = Math.exp(decimalInterestRate) - 1;
            console.log(effectiveAnnualRate);
        }
        
        let ans;
        if (mode === "futureValue") {
            const multiplicationFactor = (1 + effectiveAnnualRate) ** timePeriod;
            ans = principal * multiplicationFactor;
        }
        else if (mode === "interestRate" && compoundingPeriod !== "continuously") {
            const ear = ((futureValue/principal) ** (1/timePeriod)) - 1;
            const m = numberOfCompoundingPeriods[compoundingPeriod];
            const multiplicationFactor = ((ear + 1) ** (1/m)) - 1;
            ans = m * multiplicationFactor * 100;
        }
        else if (mode === "interestRate" && compoundingPeriod === "continuously") {
            const ear = ((futureValue/principal) ** (1/timePeriod)) - 1;
            ans = Math.log(1 + ear) * 100;
        }

        else if (mode === "principal") {
            const divisionFactor = (1 + effectiveAnnualRate) ** timePeriod;
            ans = futureValue / divisionFactor;
        }
        else if (mode === "timePeriod") {
            const numerator = Math.log(futureValue/principal);
            const denominator = Math.log(1 + effectiveAnnualRate);
            ans = numerator / denominator;
        }
        setAnswer(ans);
    }

    /**
     * This method is run when switching modes by updating the 'mode' state variable.
     * All input fields are cleared when this function is run.
     * @param {String} selectedMode Specifies which variable the user wants to calculate
     */
    const switchMode = (selectedMode) => { // function that runs when switching modes
        const allFields = document.getElementsByClassName("input-fields");
        for (let i=0; i<allFields.length; i++)
        {
            allFields[i].removeAttribute("disabled");
            allFields[i].value = ""; // clear all field values
        }

        const allItems = document.getElementsByClassName("input-container");
        for (let i=0; i<allItems.length; i++)
        {
            allItems[i].classList.remove("hidden");
        }

        const allRadioButtons = document.getElementsByName("compounding-period");
        for (let i=0; i<allRadioButtons.length; i++)
        {
            allRadioButtons[i].checked = false; // uncheck all radio buttons
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
        setCompoundingPeriod("");
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
            <h4>This is compounding interest</h4>

            <p>Calculate: </p>
            <div className="mode-button-container">
                <button className="mode-buttons" id="principal-mode-button" onClick={()=>switchMode("principal")}>Principal</button>
                <button className="mode-buttons" id="interest-rate-mode-button" onClick={()=>switchMode("interestRate")}>Annual Percentage Rate</button>
                <button className="mode-buttons" id="time-period-mode-button" onClick={()=>switchMode("timePeriod")}>Time Period</button>
                <button className="mode-buttons active-mode" id="future-value-mode-button" onClick={()=>switchMode("futureValue")}>Future Value</button>
            </div>

            <div className="form">
                <form onSubmit={ (e) => handleSubmit(e) }>
                    <div className="input-container" id="principal-container">
                        <label htmlFor="principal-field" className="input-labels" id="principal-label">Principal</label>
                        <input type="number" className="input-fields" id="principal-field" onChange={handlePrincipal} min='0' step="0.01" required/>
                    </div>
                    <div className="input-container" id="interest-rate-container">
                        <label htmlFor="interest-rate-field" className="input-labels" id="interest-rate-label">Annual Percentage Rate (%)</label>
                        <input type="number" className="input-fields" id="interest-rate-field" onChange={handleInterestRate} step="any" required/>
                    </div>
                    <div className="input-container" id="compounding-period-container">
                        <p className="input-labels" id="compounding-period-label">Compounding Period</p>
                        <input type="radio" id="compounding-annually" name="compounding-period" onClick={()=> setCompoundingPeriod("annually")} required></input>
                        <label htmlFor="compounding-annually">Annually</label>
                        <input type="radio" id="compounding-semi-annually" name="compounding-period" onClick={()=> setCompoundingPeriod("semi-annually")} required></input>
                        <label htmlFor="compounding-semi-annually">Semi-Annually</label>
                        <input type="radio" id="compounding-quarterly" name="compounding-period" onClick={()=> setCompoundingPeriod("quarterly")} required></input>
                        <label htmlFor="compounding-quarterly">Quarterly</label>
                        <input type="radio" id="compounding-monthly" name="compounding-period" onClick={()=> setCompoundingPeriod("monthly")} required></input>
                        <label htmlFor="compounding-monthly">Monthly</label>
                        <input type="radio" id="compounding-semi-monthly" name="compounding-period" onClick={()=> setCompoundingPeriod("semi-monthly")} required></input>
                        <label htmlFor="compounding-semi-monthly">Semi-Monthly</label>
                        <input type="radio" id="compounding-bi-weekly" name="compounding-period" onClick={()=> setCompoundingPeriod("bi-weekly")} required></input>
                        <label htmlFor="compounding-bi-weekly">Bi-Weekly</label>
                        <input type="radio" id="compounding-weekly" name="compounding-period" onClick={()=> setCompoundingPeriod("weekly")} required></input>
                        <label htmlFor="compounding-weekly">Weekly</label>
                        <input type="radio" id="compounding-daily" name="compounding-period" onClick={()=> setCompoundingPeriod("daily")} required></input>
                        <label htmlFor="compounding-daily">Daily</label>
                        <input type="radio" id="compounding-continuously" name="compounding-period" onClick={()=> setCompoundingPeriod("continuously")} required></input>
                        <label htmlFor="compounding-continuously">Continuously</label>
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

            <div className="answer">
                <h3>{answer}</h3>
            </div>
        </>

    );
}

export default CompoundingInterest;