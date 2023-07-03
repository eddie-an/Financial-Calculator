import { useState } from "react";

function UniformSeriesCashFlow() {
    const [ interestRate, setInterestRate ] = useState(0);
    const [ timePeriod, setTimePeriod ] = useState(0);
    const [ principal, setPrincipal ] = useState(0);
    const [ futureValue, setFutureValue ] = useState(0);
    const [ cashFlow, setCashFlow ] = useState(0);
    const [ compoundingPeriod, setCompoundingPeriod] = useState("");
    const [ paymentPeriod, setPaymentPeriod] = useState("");
    const [ endOfPeriodPay, setEndOfPeriodPay] = useState(); // true when payments are at the end of each period
    const [ answer, setAnswer ] = useState(0);
    const [ mode, setMode ] = useState("cashFlowGivenPrincipal");

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

    const handleCashFlow = (event) => {
        setCashFlow(event.target.value);
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
        const numberOfPeriods = {
            'annually': 1,
            'semi-annually': 2,
            'quarterly': 4,
            'monthly': 12,
            'semi-monthly': 24,
            'bi-weekly': 26,
            'weekly': 52,
            'daily': 365
        };

        let effectiveAnnualRate;
        if (mode !== "interestRate" && compoundingPeriod !== "continuously") {
            const decimalInterestRate = interestRate / 100;
            const m = numberOfPeriods[compoundingPeriod];
            effectiveAnnualRate = (1 + (decimalInterestRate/m)) ** m - 1;
            console.log(effectiveAnnualRate);
        }
        else if (mode !== "interestRate" && compoundingPeriod === "continuously") {
            const decimalInterestRate = interestRate / 100;
            effectiveAnnualRate = Math.exp(decimalInterestRate) - 1;
            console.log(effectiveAnnualRate);
        }
        
        const n = numberOfPeriods[paymentPeriod];
        let effectivePeriodicRate = ((1 + effectiveAnnualRate) ** (1/n)) - 1;
        
        let ans;
        if (endOfPeriodPay === true) { // when payments are made at the end of each period
            const totalNumberOfPayments = n * timePeriod;
            if (mode === "futureValue") {
                const numerator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments ) - 1;
                ans = (cashFlow * numerator ) / effectivePeriodicRate;
            }
            else if (mode === "principal") {
                const numerator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments) - 1;
                const denominator = effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                ans = (cashFlow * numerator ) / denominator;
            }
            else if (mode === "cashFlowGivenPrincipal") {
                const numerator = effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                const denominator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments) - 1;
                ans = (principal * numerator ) / denominator;
            }
            else if (mode === "cashFlowGivenFutureValue") {
                const denominator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments ) - 1;
                ans = (futureValue * effectivePeriodicRate ) / denominator;
            }
        }
        else { // when payments are made at the beginning of each period
            const totalNumberOfPayments = n * timePeriod - 1;
            if (mode === "futureValue") {
                const numerator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments ) - 1 + effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                ans = (cashFlow * numerator ) / effectivePeriodicRate;
            }
            else if (mode === "principal") {
                const numerator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments ) - 1 + effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                const denominator = effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                ans = (cashFlow * numerator ) / denominator;
            }
            else if (mode === "cashFlowGivenPrincipal") {
                const numerator = effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                const denominator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments ) - 1 + effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                ans = (principal * numerator ) / denominator;
            }
            else if (mode === "cashFlowGivenFutureValue") {
                const denominator = ((1 + effectivePeriodicRate) ** totalNumberOfPayments ) - 1 + effectivePeriodicRate * ((1 + effectivePeriodicRate) ** totalNumberOfPayments);
                ans = (futureValue * effectivePeriodicRate ) / denominator;
            }
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

        const compoundingPeriodButtons = document.getElementsByName("compounding-period");
        for (let i=0; i<compoundingPeriodButtons.length; i++)
        {
            compoundingPeriodButtons[i].checked = false; // uncheck all radio buttons
        }

        const paymentPeriodButtons = document.getElementsByName("payment-period");
        for (let i=0; i<paymentPeriodButtons.length; i++)
        {
            paymentPeriodButtons[i].checked = false; // uncheck all radio buttons
        }
        
        const paymentTimingButtons = document.getElementsByName("payment-timing");
        for (let i=0; i<paymentTimingButtons.length; i++)
        {
            paymentTimingButtons[i].checked = false; // uncheck all radio buttons
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
        setCashFlow(0);
        setCompoundingPeriod("");
        setPaymentPeriod("");
        setEndOfPeriodPay();
        setAnswer(0);

        let selectedId1, selectedId2, selectedButtonId;
        if (selectedMode === "futureValue") {
            setMode("futureValue");
            selectedId1 = "future-value";
            selectedId2 = "principal";
            selectedButtonId = "future-value-mode-button";
        }

        else if (selectedMode === "principal") {
            setMode("principal");
            selectedId1 = "principal";
            selectedId2 = "future-value";
            selectedButtonId = "principal-mode-button"
        }
        
        else if (selectedMode === "cashFlowGivenPrincipal") {
            setMode("cashFlowGivenPrincipal");
            selectedId1 = "cash-flow"
            selectedId2 = "future-value";
            selectedButtonId = "cash-flow-given-principal-mode-button";
        }
        else if (selectedMode === "cashFlowGivenFutureValue") {
            setMode("cashFlowGivenFutureValue");
            selectedId1 = "cash-flow"
            selectedId2 = "principal";
            selectedButtonId = "cash-flow-given-future-value-mode-button";
        }

        const itemToRemove1 = document.getElementById(`${selectedId1}-container`);
        const fieldToDisable1 = document.getElementById(`${selectedId1}-field`)
        itemToRemove1.classList.add("hidden");
        fieldToDisable1.setAttribute("disabled", "disabled");

        const itemToRemove2 = document.getElementById(`${selectedId2}-container`);
        const fieldToDisable2 = document.getElementById(`${selectedId2}-field`)
        itemToRemove2.classList.add("hidden");
        fieldToDisable2.setAttribute("disabled", "disabled");

        const buttonToHighLight = document.getElementById(`${selectedButtonId}`);
        buttonToHighLight.classList.add("active-mode");
    }

    return (
        <>
            <h4>This is uniform series cash flow</h4>

            <p>Calculate: </p>
            <div className="mode-button-container">
                <button className="mode-buttons active-mode" id="cash-flow-given-principal-mode-button" onClick={()=>switchMode("cashFlowGivenPrincipal")}>Cash Flow Given Principal</button>
                <button className="mode-buttons" id="cash-flow-given-future-value-mode-button" onClick={()=>switchMode("cashFlowGivenFutureValue")}>Cash Flow Given Future Value</button>
                <button className="mode-buttons" id="principal-mode-button" onClick={()=>switchMode("principal")}>Principal</button>
                <button className="mode-buttons" id="future-value-mode-button" onClick={()=>switchMode("futureValue")}>Future Value</button>
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
                <div className="input-container hidden" id="cash-flow-container">
                    <label htmlFor="cash-flow-field" className="input-labels" id="cash-flow-label">Cash Flow (payment or deposit)</label>
                    <input type="number" className="input-fields" id="cash-flow-field" onChange={handleCashFlow} min='0' step="0.01" disabled required/>
                </div>
                <div className="input-container" id="payment-period-container">
                    <p className="input-labels" id="payment-period-label">Payment/Deposit Period</p>
                    <input type="radio" id="paid-annually" name="payment-period" onClick={()=> setPaymentPeriod("annually")} required></input>
                    <label htmlFor="paid-annually">Annually</label>
                    <input type="radio" id="paid-semi-annually" name="payment-period" onClick={()=> setPaymentPeriod("semi-annually")} required></input>
                    <label htmlFor="paid-semi-annually">Semi-Annually</label>
                    <input type="radio" id="paid-quarterly" name="payment-period" onClick={()=> setPaymentPeriod("quarterly")} required></input>
                    <label htmlFor="paid-quarterly">Quarterly</label>
                    <input type="radio" id="paid-monthly" name="payment-period" onClick={()=> setPaymentPeriod("monthly")} required></input>
                    <label htmlFor="paid-monthly">Monthly</label>
                    <input type="radio" id="paid-semi-monthly" name="payment-period" onClick={()=> setPaymentPeriod("semi-monthly")} required></input>
                    <label htmlFor="paid-semi-monthly">Semi-Monthly</label>
                    <input type="radio" id="paid-bi-weekly" name="payment-period" onClick={()=> setPaymentPeriod("bi-weekly")} required></input>
                    <label htmlFor="paid-bi-weekly">Bi-Weekly</label>
                    <input type="radio" id="paid-weekly" name="payment-period" onClick={()=> setPaymentPeriod("weekly")} required></input>
                    <label htmlFor="paid-weekly">Weekly</label>
                    <input type="radio" id="paid-daily" name="payment-period" onClick={()=> setPaymentPeriod("daily")} required></input>
                    <label htmlFor="paid-daily">Daily</label>
                </div>
                <div className="input-container" id="payment-timing-container">
                    <p className="input-labels" id="payment-timing-label">Paid/Deposited at the</p>
                    <input type="radio" id="paid-at-beginning" name="payment-timing" onClick={()=> setEndOfPeriodPay(false)} required></input>
                    <label htmlFor="paid-at-beginning">Beginning of each period</label>
                    <input type="radio" id="paid-at-end" name="payment-timing" onClick={()=> setEndOfPeriodPay(true)} required></input>
                    <label htmlFor="paid-at-end">End of each period</label>
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

export default UniformSeriesCashFlow;