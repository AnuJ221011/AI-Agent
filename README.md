# 🤖 AI Agent with Google Gemini

This is a simple **AI Agent project** built using **Node.js** and **Google Gemini API**.  
The agent can understand user queries, call custom functions, and return results in a conversational manner.  

---

## 📌 Features
- Interactive CLI (Command Line Interface) chatbot using `readline-sync`
- Powered by **Google Gemini 2.5 Flash** model
- Supports **function calling** with custom tools:
  - 🔢 **Sum** → Returns the sum of two numbers
  - 🔎 **Prime** → Checks if a number is prime
  - 💰 **Crypto Price** → Fetches the latest cryptocurrency prices using CoinGecko API
- Maintains conversation history

---

## 🛠️ Tech Stack
- **Node.js**
- **Google GenAI SDK (`@google/genai`)**
- **readline-sync** for CLI input
- **fetch API** for external data calls

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AnuJ221011/ai-agent.git
cd ai-agent
```

### 2. Install Dependencies
```bash
npm install
```

### 4. Setup API Keys
```js
const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY_HERE" });
```

### 5. Run the Agent
```bash
node index.js
```
---

## 💡 Usage
Once running, you can ask:

Ask me anything---> sum of 10 and 20
Calling function for help: sum
The sum of 10 and 20 is 30.

Ask me anything---> is 13 prime?
Calling function for help: prime
Yes, 13 is a prime number.

Ask me anything---> get price of bitcoin
Calling function for help: getCryptoPrice
The current price of Bitcoin is 117898.00 USD


## Project Structure

.
├── index.js          # Main entry point
├── package.json      # Dependencies and scripts
├── .gitignore        # Ignore node_modules and env files
└── README.md         # Project documentation



## License

This project is licensed under the [MIT License](LICENSE).