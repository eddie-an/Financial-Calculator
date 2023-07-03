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

    const handleCompoundingPeriod = (value) => {
        setCompoundingPeriod(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(compoundingPeriod);
        calculation(mode);
    }

    
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

    const switchMode = (selectedMode) => { // function that runs when switching modes
        const allFields = document.getElementsByClassName("CompoundingInterest-fields");
        for (let i=0; i<4; i++)
        {
            allFields[i].removeAttribute("disabled"); // enable all fields initially
            allFields[i].value = ""; // clear all field values
        }

        const allRadioButtons = document.getElementsByName("CompoundingInterest-compounding-period");
        for (let i=0; i<9; i++)
        {
            allRadioButtons[i].checked = false; // uncheck all radio buttons
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
        
        else if (selectedMode === "timePeriod") {
            setMode("timePeriod");
            selectedId = "CompoundingInterest-time-period-field";
        }

        const fieldToRemove = document.getElementById(selectedId);
        fieldToRemove.setAttribute("disabled", "disabled"); // disable certain fields
    }

    return (
        <>
            <h4>This is compounding interest</h4>

            <button onClick={()=>switchMode("futureValue")}>Future Value</button>
            <button onClick={()=>switchMode("interestRate")}>Annual Percentage Rate</button>
            <button onClick={()=>switchMode("principal")}>Principal</button>
            <button onClick={()=>switchMode("timePeriod")}>Time Period</button>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <br/>
                <p>Annual Percentage Rate (in percentage)</p>
                <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-interest-rate-field" onChange={handleInterestRate} step="any" required/>

                <p>Compounding Period</p>
                <input type="radio" id="CompoundingInterest-annually" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("annually")} required></input>
                <label htmlFor="CompoundingInterest-annually">Annually</label>
                <input type="radio" id="CompoundingInterest-semi-annually" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("semi-annually")} required></input>
                <label htmlFor="CompoundingInterest-semi-annually">Semi-Annually</label>
                <input type="radio" id="CompoundingInterest-quarterly" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("quarterly")} required></input>
                <label htmlFor="CompoundingInterest-quarterly">Quarterly</label>
                <input type="radio" id="CompoundingInterest-monthly" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("monthly")} required></input>
                <label htmlFor="CompoundingInterest-monthly">Monthly</label>
                <input type="radio" id="CompoundingInterest-semi-monthly" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("semi-monthly")} required></input>
                <label htmlFor="CompoundingInterest-semi-monthly">Semi-Monthly</label>
                <input type="radio" id="CompoundingInterest-bi-weekly" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("bi-weekly")} required></input>
                <label htmlFor="CompoundingInterest-bi-weekly">Bi-Weekly</label>
                <input type="radio" id="CompoundingInterest-weekly" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("weekly")} required></input>
                <label htmlFor="CompoundingInterest-weekly">Weekly</label>
                <input type="radio" id="CompoundingInterest-daily" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("daily")} required></input>
                <label htmlFor="CompoundingInterest-daily">Daily</label>
                <input type="radio" id="CompoundingInterest-continuously" name="CompoundingInterest-compounding-period" onClick={()=> handleCompoundingPeriod("continuously")} required></input>
                <label htmlFor="CompoundingInterest-continuously">Continuously</label>
                
                <br></br>
                <p>Time Period (years)</p>
                <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-time-period-field" onChange={handleTimePeriod} min='0' step="1" required/>

                <p>Principal</p>
                <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-principal-field" onChange={handlePrincipal} min='0' step="0.01" required/>

                <p>Future Value</p>
                <input type="number" className="CompoundingInterest-fields" id="CompoundingInterest-future-value-field" onChange={handleFutureValue} min='0' step="0.01" disabled required/>

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

export default CompoundingInterest;