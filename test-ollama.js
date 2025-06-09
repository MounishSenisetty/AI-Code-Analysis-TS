// Ollama Integration Test
// This script tests the Ollama integration by making a direct request

const { Ollama } = require('ollama');

async function testOllamaConnection() {
    console.log('🧪 Testing Ollama Integration...\n');
    
    const ollama = new Ollama({
        host: 'http://localhost:11434'
    });
    
    try {
        console.log('📋 Checking available models...');
        const models = await ollama.list();
        console.log('Available models:', models.models.map(m => m.name).join(', '));
        
        if (models.models.length === 0) {
            console.log('❌ No models found. Pull a model first:');
            console.log('   ollama pull llama3.2');
            return;
        }
        
        const testModel = models.models[0].name;
        console.log(`\n🤖 Testing with model: ${testModel}`);
        
        const response = await ollama.chat({
            model: testModel,
            messages: [
                {
                    role: 'user',
                    content: 'Write a simple hello world function in JavaScript.'
                }
            ],
            stream: false
        });
        
        console.log('\n✅ Ollama Response:');
        console.log(response.message.content);
        console.log('\n🎉 Ollama integration test successful!');
        
    } catch (error) {
        console.error('❌ Ollama test failed:', error.message);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 Solution: Start Ollama server with: ollama serve');
        } else if (error.message.includes('model')) {
            console.log('\n💡 Solution: Pull a model with: ollama pull llama3.2');
        }
    }
}

// Run the test
testOllamaConnection();
