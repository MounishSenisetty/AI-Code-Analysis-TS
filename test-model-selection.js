// Test file for AI Assistant Extension - Model Selection Integration
// This file can be used to test various AI Assistant features

console.log("AI Assistant Model Selection Test");

// Test 1: Basic JavaScript function for vulnerability scanning
function authenticateUser(username, password) {
    // Potential security issue: Direct SQL query (for testing vulnerability detection)
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    // Potential issue: No input validation
    if (username && password) {
        // Simulate authentication
        return executeQuery(query);
    }
    return false;
}

// Test 2: Function for code explanation testing
function complexAlgorithm(arr) {
    // Complex sorting and filtering logic (good for explanation testing)
    return arr
        .filter((item, index) => index % 2 === 0)
        .sort((a, b) => b - a)
        .map(item => item * 2)
        .reduce((acc, val) => acc + val, 0);
}

// Test 3: Function for refactoring suggestions
function messyFunction(data) {
    // Intentionally messy code for refactoring suggestions
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== null && data[i] !== undefined) {
            if (typeof data[i] === 'string') {
                result.push(data[i].toUpperCase());
            } else if (typeof data[i] === 'number') {
                result.push(data[i] * 2);
            }
        }
    }
    return result;
}

// Test 4: Function for test case generation
class Calculator {
    add(a, b) {
        return a + b;
    }
    
    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    }
    
    // Complex method that needs comprehensive testing
    calculateTax(income, deductions) {
        if (income < 0 || deductions < 0) {
            throw new Error("Invalid input");
        }
        
        const taxableIncome = Math.max(0, income - deductions);
        let tax = 0;
        
        if (taxableIncome <= 10000) {
            tax = taxableIncome * 0.1;
        } else if (taxableIncome <= 50000) {
            tax = 1000 + (taxableIncome - 10000) * 0.2;
        } else {
            tax = 9000 + (taxableIncome - 50000) * 0.3;
        }
        
        return Math.round(tax * 100) / 100;
    }
}

// Instructions for testing:
// 1. Select different parts of this code
// 2. Use both Ctrl+Shift+P commands and sidebar buttons
// 3. Try different AI models for each operation
// 4. Verify model selection appears for both interfaces

module.exports = { authenticateUser, complexAlgorithm, messyFunction, Calculator };
