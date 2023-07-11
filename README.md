## Description

A front end web development project. This website performs financial calculations.
###### Still a work in progress (Mobile support needs to be implemented)

### Inspiration

After taking a course on engineering economics, I learned about microeconomic & macroeconomic policies as well as interest rate calculations. I wanted to create an application that calculates simple and compounding interest, as well as mortgage payments and annuities.

## Formulas Used

### Simple Interest Calculations

To calculate simple interest rate, the following formula and its variation was used

```math
F = P(1 + in)
```

where\
$`F`$ = Future value\
$`P`$ = Principal\
$`i`$ = Interest rate\
$`n`$ = Number of years

---

### Compounding Interest Calculations

To calculate compounding interest rate, the following formula was used.

```math
F = {P({1 + {r \over n}})}^{nt}
```

where\
$`F`$ = Future value\
$`P`$ = Principal\
$`r`$ = Annual percentage rate\
$`n`$ = Number of times interest compounded in a year\
$`t`$ = Number of years

---

### Uniform Series Cash Flow Calcuations

To perform the uniform series cash flow calculations, the effective annual rate (EAR) is first calculated. Unlike the annual percentage rate (APR), the EAR accounts for any interest rate that compounds more than once a year.

##### Generally, this is the effective annual rate formula:
```math
EAR = (1 + {APR \over m})^{m} - 1
```

where\
$`EAR`$ = Effective Annual Rate\
$`APR`$ = Annual Percentage Rate\
$`m`$ = Number of times APR compounded in a year

##### For continuous compounding, this is the effective annual rate formula:

```math
EAR = e^{r} - 1
```

where\
$`EAR`$ = Effective Annual Rate\
$`r`$ = Annual Percentage Rate

For example, a 3% APR that is compounded monthly is equivalent to a monthly interest rate of `0.25%`. ($`3 / 12 = 0.25`$). Because it is compounded monthly, the `3% APR` actually becomes `3.0416% EAR` when interest on interest is accounted for.

Now that the effective annual rate (EAR) has been calculated, the amount of principal is ACTUALLY paid as interest every year is properly reflected. Then, the effective periodic rate (EPR) is be calculated. Sometimes the interest compounding period differs from the payment period. A good example is mortgages in Canada. Typically, the interest for mortgages are compounded semi-annually, whereas the payments are monthly. EPR is the interest rate for a given payment/deposit period. 

##### The following formula was used to calculate the EPR:
```math
EPR = (1 + EAR ) ^ {1 \over n} - 1
```

where\
$`EPR`$ = Effective Periodic Rate\
$`EAR`$ = Effective Annual Rate\
$`n`$ = Number of payments in a year

The EPR that has been calculated is the interest rate that will be used for subsequent uniform series cash flow calculations.

For uniform series cash flow calculations, payments/deposits can occur at the beginning or end of each payment/deposit period. Different formulas are used in each scenario.

#### Uniform Series Present Worth Factor 
##### End of each payment/deposit period:
```math
P = A{{{{(1+i)}^{n}} - 1 } \over {i{(1 + i)}^{n}}}
```

where\
$`P`$ = Principal\
$`A`$ = Cash Flow in each payment/deposit period\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments

##### Beginning of each payment/deposit period:
```math
P = A{{{{(1+i)}^{(n - 1)}} - 1 + i{(1+i)}^{(n - 1)}} \over {i{(1 + i)}^{(n - 1)}}}
```

where\
$`P`$ = Principal\
$`A`$ = Cash Flow in each payment/deposit period\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments

#### Uniform Series Capital Recovery Factor

##### End of each payment/deposit period:
```math
A = P{{i{(1 + i)}^{n}} \over {{{(1+i)}^{n}} - 1 }}
```

where\
$`A`$ = Cash Flow in each payment/deposit period\
$`P`$ = Principal\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments


##### Beginning of each payment/deposit period:
```math
A = P{{i{(1 + i)}^{(n - 1)}} \over {{{(1+i)}^{(n - 1)}} - 1 + i{(1+i)}^{(n - 1)}}}
```

where\
$`A`$ = Cash Flow in each payment/deposit period\
$`P`$ = Principal\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments

#### Uniform Series Compound Amount Factor

##### End of each payment/deposit period:
```math
F = A{{{{(1+i)}^{n}} - 1 } \over {i}}
```

where\
$`F`$ = Future Value\
$`A`$ = Cash Flow in each payment/deposit period\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments

##### Beginning of each payment/deposit period:
```math
F = A{{{{(1+i)}^{(n - 1)}} - 1 + i{(1+i)}^{(n - 1)}} \over {i}}
```

where\
$`F`$ = Future Value\
$`A`$ = Cash Flow in each payment/deposit period\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments

#### Uniform Series Sinking Fund Factor

##### End of each payment/deposit period:
```math
A = F{{i} \over {{{(1+i)}^{n}} - 1 }}
```

where\
$`A`$ = Cash Flow in each payment/deposit period\
$`F`$ = Future Value\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments


##### Beginning of each payment/deposit period:
```math
A = F{{i} \over {{{(1+i)}^{(n - 1)}} - 1 + i{(1+i)}^{(n - 1)}}}
```

where\
$`A`$ = Cash Flow in each payment/deposit period\
$`F`$ = Future Value\
$`i`$ = Effective Periodic Rate\
$`n`$ = Total number of payments
