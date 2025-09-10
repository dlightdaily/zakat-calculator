// Zakat Calculator JavaScript

class ZakatCalculator {
    constructor() {
        this.nisabValue = 10034; // Current Nisab value based on 3 troy ounces of gold
        this.zakatRate = 0.025; // 2.5%
        this.initializeEventListeners();
        this.updateNisabDisplay();
    }

    initializeEventListeners() {
        // Get all input fields
        this.inputs = document.querySelectorAll('input[type="number"]');
        
        // Add event listeners to all inputs for real-time calculation
        this.inputs.forEach(input => {
            input.addEventListener('input', () => this.calculateZakat());
            input.addEventListener('change', () => this.calculateZakat());
        });

        // Calculate button
        document.getElementById('calculate-btn').addEventListener('click', () => {
            this.calculateZakat();
            this.showCalculationAnimation();
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => this.resetCalculator());

        // Initial calculation
        this.calculateZakat();
    }

    updateNisabDisplay() {
        document.getElementById('nisab-amount').textContent = this.formatCurrency(this.nisabValue, false);
    }

    getInputValue(id) {
        const input = document.getElementById(id);
        return parseFloat(input.value) || 0;
    }

    calculateTotalAssets() {
        const personalAssets = [
            'cash',
            'gold-silver',
            'stocks',
            'dividends',
            'retirement',
            'loans-given',
            'receivables'
        ];

        const businessAssets = [
            'business-cash',
            'inventory',
            'business-receivables',
            'real-estate',
            'fixed-assets',
            'mobile-assets'
        ];

        const allAssets = [...personalAssets, ...businessAssets];
        
        return allAssets.reduce((total, assetId) => {
            return total + this.getInputValue(assetId);
        }, 0);
    }

    calculateTotalDeductions() {
        const deductions = [
            'debts',
            'zakat-paid'
        ];

        return deductions.reduce((total, deductionId) => {
            return total + this.getInputValue(deductionId);
        }, 0);
    }

    calculateZakat() {
        const totalAssets = this.calculateTotalAssets();
        const totalDeductions = this.calculateTotalDeductions();
        const netWealth = Math.max(0, totalAssets - totalDeductions);
        
        let zakatDue = 0;
        let nisabStatus = '';

        if (netWealth >= this.nisabValue) {
            zakatDue = netWealth * this.zakatRate;
            nisabStatus = 'above-nisab';
        } else {
            nisabStatus = 'below-nisab';
        }

        this.updateResults(totalAssets, totalDeductions, netWealth, zakatDue, nisabStatus);
    }

    updateResults(totalAssets, totalDeductions, netWealth, zakatDue, nisabStatus) {
        // Update result values
        document.getElementById('total-assets').textContent = this.formatCurrency(totalAssets);
        document.getElementById('total-deductions').textContent = this.formatCurrency(totalDeductions);
        document.getElementById('net-wealth').textContent = this.formatCurrency(netWealth);
        document.getElementById('zakat-due').textContent = this.formatCurrency(zakatDue);

        // Update Nisab status
        const statusElement = document.getElementById('nisab-status');
        statusElement.className = `nisab-status ${nisabStatus}`;
        
        if (nisabStatus === 'above-nisab') {
            if (zakatDue > 0) {
                statusElement.innerHTML = `
                    <p><strong>Zakat is obligatory!</strong> Your wealth exceeds the Nisab threshold.</p>
                    <p>You are required to pay <strong>${this.formatCurrency(zakatDue)}</strong> as Zakat.</p>
                `;
            }
        } else if (nisabStatus === 'below-nisab') {
            const shortfall = this.nisabValue - netWealth;
            if (netWealth > 0) {
                statusElement.innerHTML = `
                    <p><strong>Zakat is not obligatory.</strong> Your wealth is below the Nisab threshold.</p>
                    <p>You need an additional <strong>${this.formatCurrency(shortfall)}</strong> to reach the Nisab.</p>
                `;
            } else {
                statusElement.innerHTML = `
                    <p>Enter your assets above to calculate your Zakat obligation.</p>
                `;
            }
        }

        // Add animation class
        const resultsCard = document.querySelector('.results-card');
        resultsCard.classList.remove('updated');
        setTimeout(() => resultsCard.classList.add('updated'), 10);
    }

    formatCurrency(amount, includeCents = true) {
        if (includeCents) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        } else {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }
    }

    resetCalculator() {
        // Clear all input fields
        this.inputs.forEach(input => {
            input.value = '';
        });

        // Reset results
        this.updateResults(0, 0, 0, 0, 'below-nisab');

        // Add reset animation
        const form = document.querySelector('.calculator-form');
        form.style.opacity = '0.5';
        setTimeout(() => {
            form.style.opacity = '1';
        }, 200);

        // Focus on first input
        document.getElementById('cash').focus();
    }

    showCalculationAnimation() {
        const calculateBtn = document.getElementById('calculate-btn');
        const originalText = calculateBtn.textContent;
        
        calculateBtn.textContent = 'Calculating...';
        calculateBtn.disabled = true;
        
        setTimeout(() => {
            calculateBtn.textContent = originalText;
            calculateBtn.disabled = false;
        }, 1000);
    }

    // Utility method to validate inputs
    validateInputs() {
        let isValid = true;
        this.inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (input.value !== '' && (isNaN(value) || value < 0)) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
        return isValid;
    }

    // Method to export results (could be extended for PDF generation, etc.)
    exportResults() {
        const totalAssets = this.calculateTotalAssets();
        const totalDeductions = this.calculateTotalDeductions();
        const netWealth = Math.max(0, totalAssets - totalDeductions);
        const zakatDue = netWealth >= this.nisabValue ? netWealth * this.zakatRate : 0;

        const results = {
            calculationDate: new Date().toLocaleDateString(),
            nisabValue: this.nisabValue,
            totalAssets: totalAssets,
            totalDeductions: totalDeductions,
            netWealth: netWealth,
            zakatDue: zakatDue,
            isZakatObligatory: netWealth >= this.nisabValue
        };

        return results;
    }
}

// Utility functions for enhanced user experience
function addInputFormatting() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        // Add thousand separators on blur
        input.addEventListener('blur', function() {
            if (this.value) {
                const value = parseFloat(this.value);
                if (!isNaN(value)) {
                    // Store the raw value for calculations
                    this.dataset.rawValue = value;
                }
            }
        });

        // Remove formatting on focus for easier editing
        input.addEventListener('focus', function() {
            if (this.dataset.rawValue) {
                this.value = this.dataset.rawValue;
            }
        });
    });
}

// Enhanced accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels and descriptions
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input, index) => {
        input.setAttribute('aria-describedby', `help-${input.id}`);
        input.setAttribute('role', 'spinbutton');
    });

    // Add keyboard navigation for results
    const resultsCard = document.querySelector('.results-card');
    resultsCard.setAttribute('role', 'region');
    resultsCard.setAttribute('aria-label', 'Zakat calculation results');
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the main calculator
    const calculator = new ZakatCalculator();
    
    // Add enhanced features
    addInputFormatting();
    addAccessibilityFeatures();
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading state management
    window.addEventListener('beforeunload', function() {
        document.body.classList.add('calculating');
    });

    // Console log for debugging (can be removed in production)
    console.log('Zakat Calculator initialized successfully');
    
    // Make calculator available globally for debugging
    window.zakatCalculator = calculator;
});

// Service Worker registration for offline functionality (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // This would register a service worker if we had one
        // navigator.serviceWorker.register('/sw.js');
    });
}

