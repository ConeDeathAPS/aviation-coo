window.onload = () => {
    document.getElementById('base_price_form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('e', e);
        const loanAmount = parseInt(document.getElementById('loan_amount').value, 10);
        const duration = parseInt(document.getElementById('loan_duration').value, 10);
        const interestRate = parseFloat(document.getElementById('apr').value);
        const monthlyEffectiveRate = Math.fround((interestRate / 100) / 12);
        const rateExponent = Math.pow(1+monthlyEffectiveRate, duration);
        const monthlyPayment = loanAmount * ((monthlyEffectiveRate * rateExponent) / (rateExponent - 1));
        const totalCost = monthlyPayment * duration;
        const costOfInterest = totalCost - loanAmount;
        document.getElementById('total_cost').textContent = totalCost.toLocaleString(undefined, { minimumFractionDigits: 2});
        document.getElementById('monthly_payment').textContent = monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2});
        document.getElementById('interest').textContent = costOfInterest.toLocaleString(undefined, { minimumFractionDigits: 2});
        document.getElementById('total_cost_wrapper').style.display = 'inline-block';
    });
};