document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // Initial bot greeting
    setTimeout(() => {
        addBotMessage("Hello! I'm Olabode chatbot. How can I help you today?");
    }, 500);
    
    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        userInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot thinking
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const botResponse = generateBotResponse(message);
            addBotMessage(botResponse);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
    
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<div class="message-content">${escapeHtml(message)}</div>`;
        chatMessages.insertBefore(messageDiv, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.insertBefore(messageDiv, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    function generateBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        // 1. Greetings
        if (/(hi|hello|hey|greetings|sup|what's up|weitin sup|happen|hello there|howdy)/.test(lowerCaseMessage)) {
            const greetings = [
                "Hello there! How can I help you today?",
                "Hi! What can I do for you?",
                "Hey! How's it going?",
                "Greetings! How can I assist you?",
                "Sup! How can I help you?",
                "What's up? How can I be of service?",
                "egbon! mo wa pa?",
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        else if (/(egbon|kilosele)/.test(lowerCaseMessage)) {
            const greetings = [
                "Omo iya mi, bawo ni?",
                "Se alafia ni?",
                "ILe nko?",
                "Gbayi! kini mo le se fun'o?",
                "Baba alagbala, se o wa da'da?",
                "egbon! mo wa pa?",
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // 2. Farewells
        else if (/(bye|goodbye|see ya|cya|exit|quit)/.test(lowerCaseMessage)) {
            return "Goodbye! Feel free to <a href='/' onclick='window.location.reload()'>return</a> if you have more questions.";
        }

        // 3. Thanks/Appreciation
        else if (/(thanks|thank you|appreciate|thx|ty)/.test(lowerCaseMessage)) {
            return "You're welcome! Is there anything else I can help with?";
        }

        // 4. Time/Date queries
        else if (/(time|current time|what time is it)/.test(lowerCaseMessage)) {
            return `The current time is ${new Date().toLocaleTimeString()}. <a href="https://time.is/" target="_blank">Check exact time</a>`;
        }
        else if (/(date|today's date|what day is it)/.test(lowerCaseMessage)) {
            return `Today's date is ${new Date().toLocaleDateString()}. <a href="https://www.timeanddate.com/" target="_blank">More date info</a>`;
        }

        // 5. Bot identity
        else if (/(who are you|your name|what are you)/.test(lowerCaseMessage)) {
            return "I'm Olabode Chatbot, your friendly AI assistant! <a href='#help' onclick='showHelp()'>Learn what I can do</a>";
        }

        // 6. Help requests
        else if (/(help|support|assistance)/.test(lowerCaseMessage)) {
            return `I can help with:
                <ul>
                    <li><a href="#" onclick="simulateQuestion('What time is it?')">Time queries</a></li>
                    <li><a href="#" onclick="simulateQuestion('Tell me a joke')">Jokes</a></li>
                    <li><a href="#" onclick="simulateQuestion('Calculate 5+3')">Simple math</a></li>
                    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">JavaScript help</a></li>
                </ul>`;
        }

        // 7. Jokes/Humor
        else if (/(joke|funny|make me laugh)/.test(lowerCaseMessage)) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
                "Why don't skeletons fight each other? They don't have the guts! <a href='https://www.reddit.com/r/cleanjokes/' target='_blank'>More jokes</a>"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        // 8. Weather queries
        else if (/(weather|forecast|temperature)/.test(lowerCaseMessage)) {
            return "I don't have real-time weather data, but you can check: <a href='https://www.weather.com' target='_blank'>Weather.com</a> or <a href='https://www.accuweather.com' target='_blank'>AccuWeather</a>";
        }

        // 9. JavaScript help
        else if (/(javascript|js|ecmascript)/.test(lowerCaseMessage)) {
            return `JavaScript resources:
                <ul>
                    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">MDN JavaScript Docs</a></li>
                    <li><a href="https://javascript.info" target="_blank">Modern JavaScript Tutorial</a></li>
                    <li><a href="https://eloquentjavascript.net" target="_blank">Eloquent JavaScript</a></li>
                </ul>`;
        }

        // 10. Math questions (simple)
        else if (/(calculate|what is|math)/.test(lowerCaseMessage)) {
            try {
                const mathMatch = lowerCaseMessage.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
                if (mathMatch) {
                    const num1 = parseInt(mathMatch[1]);
                    const operator = mathMatch[2];
                    const num2 = parseInt(mathMatch[3]);
                    
                    let result;
                    switch(operator) {
                        case '+': result = num1 + num2; break;
                        case '-': result = num1 - num2; break;
                        case '*': result = num1 * num2; break;
                        case '/': result = num1 / num2; break;
                        default: throw new Error();
                    }
                    return `The answer is ${result}. <a href="https://www.wolframalpha.com/" target="_blank">Need more complex math?</a>`;
                }
            } catch (e) {
                return "I can do simple math like '5+3' or '10*2'. Try asking me!";
            }
        }

        // Default responses
        const randomResponses = [
            "That's interesting! Tell me more.",
            "I'm not sure I understand. Could you rephrase that? <a href='#help' onclick='showHelp()'>See what I can help with</a>",
            "I'm still learning. Could you ask me something else?"
        ];
        return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }

    // Helper functions for interactive elements
    function simulateQuestion(question) {
        document.getElementById('user-input').value = question;
        document.getElementById('send-button').click();
    }

    function showHelp() {
        simulateQuestion('help');
    }
});