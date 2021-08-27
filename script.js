window.onload = () => {
    document.getElementById('base_price_form').addEventListener('submit', (e) => {
        e.preventDefault();
        const loanAmount = parseInt(document.getElementById('loan_amount').value, 10);
        const duration = parseInt(document.getElementById('loan_duration').value, 10);
        const interestRate = parseFloat(document.getElementById('apr').value);
        const monthlyEffectiveRate = Math.fround((interestRate / 100) / 12);
        const rateExponent = Math.pow(1+monthlyEffectiveRate, duration);
        const monthlyPayment = loanAmount * ((monthlyEffectiveRate * rateExponent) / (rateExponent - 1));
        const totalCost = monthlyPayment * duration;
        const costOfInterest = totalCost - loanAmount;
        document.getElementById('total_cost').textContent = totalCost.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        document.getElementById('monthly_payment').textContent = monthlyPayment.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        document.getElementById('interest').textContent = costOfInterest.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        document.getElementById('total_cost_wrapper').style.display = 'inline-block';
    });

    document.getElementById('non_use_recurring_form').addEventListener('submit', (e) => {
        e.preventDefault();
        const storageCost = parseInt(document.getElementById('storage_cost').value, 10);
        const annualInspCost = parseInt(document.getElementById('annual_insp_cost').value, 10);
        const insuranceCost = parseInt(document.getElementById('insurance_cost').value, 10);
        const annualInspMonthlyInstallment = annualInspCost / 12;
        const totalNonUseRecurringCost = annualInspMonthlyInstallment + storageCost + insuranceCost;
        document.getElementById('non_use_recurring_monthly_cost').textContent = totalNonUseRecurringCost.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        document.getElementById('non_use_recurring_wrapper').style.display = 'inline-block';
    });

    document.getElementById('use_recurring_form').addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('use_recurring_error').style.display = 'none';
        const fuelCost = parseFloat(document.getElementById('fuel_cost').value);
        const maintenanceCost = parseInt(document.getElementById('maint_cost').value, 10);
        const overhaulCost = parseInt(document.getElementById('overhaul_cost').value, 10);
        const timeBetweenOverhaul = parseInt(document.getElementById('overhaul_tbo').value, 10);
        const timeSinceLastOverhaul = parseInt(document.getElementById('overhaul_tso').value, 10);
        let hoursUntilOverhaul;
        if (timeSinceLastOverhaul > timeBetweenOverhaul) {
            document.getElementById('use_recurring_error').classList.remove('warning', 'error'); // Clear classes on the element
            document.getElementById('use_recurring_error').textContent = 'This plane needs an immediate overhaul!';
            document.getElementById('use_recurring_error').classList.add('warning');
            document.getElementById('use_recurring_error').style.display = 'inline-block';
            hoursUntilOverhaul = timeBetweenOverhaul;
        } else {
            hoursUntilOverhaul = timeBetweenOverhaul - timeSinceLastOverhaul;
        }
        const overhaulHourly = overhaulCost / hoursUntilOverhaul;
        const effectiveHourlyCost = overhaulHourly + fuelCost + maintenanceCost;
        document.getElementById('effective_hourly_cost').textContent = effectiveHourlyCost.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        document.getElementById('time_to_next_overhaul').textContent = hoursUntilOverhaul.toFixed();
        document.getElementById('overhaul_installment_cost').textContent = overhaulHourly.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        document.getElementById('overhaul_wrapper').style.display = 'inline-block';
        document.getElementById('effective_hourly_wrapper').style.display = 'inline-block';
    });
};