// Test file for AI Assistant Extension Model Selection Feature
// This file contains various code patterns to test AI analysis with different models

// Security vulnerability - SQL injection
function getUserData(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId; // Vulnerable to SQL injection
    return database.query(query);
}

// Complex function for refactoring suggestions
function processUserPayment(user, amount, currency, discount, taxRate, fees) {
    if (!user || !amount || amount <= 0) {
        throw new Error("Invalid input");
    }
    
    let finalAmount = amount;
    
    if (discount && discount > 0) {
        finalAmount = finalAmount - (finalAmount * discount / 100);
    }
    
    if (taxRate && taxRate > 0) {
        finalAmount = finalAmount + (finalAmount * taxRate / 100);
    }
    
    if (fees && fees.length > 0) {
        for (let i = 0; i < fees.length; i++) {
            finalAmount = finalAmount + fees[i];
        }
    }
    
    // Convert currency if needed
    if (currency !== 'USD') {
        finalAmount = convertCurrency(finalAmount, currency, 'USD');
    }
    
    return {
        originalAmount: amount,
        finalAmount: finalAmount,
        currency: 'USD',
        processed: true,
        timestamp: new Date()
    };
}

// Function that needs test cases
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }
    
    addItem(product, quantity = 1) {
        if (!product || quantity <= 0) {
            throw new Error("Invalid product or quantity");
        }
        
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        
        this.calculateTotal();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.calculateTotal();
    }
    
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}

// Async function with error handling
async function fetchUserProfile(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Transform user data
        return {
            id: userData.id,
            name: userData.full_name,
            email: userData.email_address,
            avatar: userData.profile_picture || '/default-avatar.png',
            isActive: userData.status === 'active',
            lastLogin: new Date(userData.last_login_timestamp)
        };
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw new Error('Unable to load user profile');
    }
}

// Complex algorithm for optimization suggestions
function findOptimalRoute(locations, startLocation) {
    // Inefficient implementation that could be optimized
    let shortestDistance = Infinity;
    let bestRoute = [];
    
    function getAllPermutations(arr) {
        if (arr.length <= 1) return [arr];
        
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
            const permutations = getAllPermutations(rest);
            
            for (const perm of permutations) {
                result.push([arr[i], ...perm]);
            }
        }
        return result;
    }
    
    const allRoutes = getAllPermutations(locations);
    
    for (const route of allRoutes) {
        let totalDistance = calculateDistance(startLocation, route[0]);
        
        for (let i = 0; i < route.length - 1; i++) {
            totalDistance += calculateDistance(route[i], route[i + 1]);
        }
        
        if (totalDistance < shortestDistance) {
            shortestDistance = totalDistance;
            bestRoute = route;
        }
    }
    
    return {
        route: [startLocation, ...bestRoute],
        totalDistance: shortestDistance
    };
}

function calculateDistance(point1, point2) {
    // Simplified distance calculation
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Export for testing
module.exports = {
    getUserData,
    processUserPayment,
    ShoppingCart,
    fetchUserProfile,
    findOptimalRoute
};
