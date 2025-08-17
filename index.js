import readlineSync from "readline-sync";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({apiKey: "AIzaSyC1kC6EXdopbu6M_F0UF05WRfdJOMrF2BM"});

const History = [];

function sum({num1 , num2}) {
    return num1 + num2;
}

function prime({num}){
    for (let i = 2; i < num; i++) {
        if(num % i == 0){
            return false;
        }
    }
    return true;
}

async function getCryptoPrice({coin}){

   const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`)
   const data = await response.json();

   return data;
}

const sumDeclaration = {
    name: 'sum',
    description: 'Returns the sum of two numbers.',
    parameters: {
        type: 'OBJECT',
        properties: {
            num1: {
                type: 'NUMBER',
                description: 'IT will be the first number for addition ex: 10',
            },
            num2: {
                type: 'NUMBER',
                description: 'IT will be the second number for addition ex: 20',
            },
        },
        required: ['num1', 'num2'],
    },
}

const primeDeclaration = {
    name: 'prime',
    description: 'Get if the number is prime or not.',
    parameters: {
        type: 'OBJECT',
        properties: {
            num: {
                type: 'NUMBER',
                description: 'IT will be the number to check if it is prime or not ex: 13',
            },
        },
        required: ['num'],
    },
}

const cryptoDeclaration = {
    name: 'getCryptoPrice',
    description: 'Get the current price of a crypto currency like Bitcoin.',
    parameters: {
        type: 'OBJECT',
        properties: {
            coin: {
                type: 'STRING',
                description: 'IT will be the name of the crypto currency ex: bitcoin',
            },
        },
        required: ['coin'],
    },
}

const availableTools = {
    sum: sum,
    prime: prime,
    getCryptoPrice: getCryptoPrice
}

async function runAgent(userProblem){

    History.push({
        role: 'user',
        parts: [{text: userProblem}]
    });


    while(true) {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: History,
            config: {
                systemInstruction: `You are an AI Agent, you have access of 3 available tools likes
                to find sum of two numbers, to check if a number is prime or not and to get the current price of a crypto currency like Bitcoin.
                
                Use these tools whenever required to confirm user query.
                If user ask general question you can answer it directly if you don't need help of these 3 tools`,
                tools: [{
                    functionDeclarations: [sumDeclaration , primeDeclaration , cryptoDeclaration],
                }],
            },
        });

        const parts = response.candidates[0].content.parts;
        const functionCall = parts.find(p => p.functionCall)?.functionCall;

        if(functionCall){
            const {name , args} = functionCall;

            console.log('Calling function for help =>', name);

            const funCall = availableTools[name];
            const result = await funCall(args);

            const functionResponsePart = {
                name: name,
                response: {
                    result
                }
            }

            //model
            History.push({
                role: 'model',
                parts: [
                    {
                        functionCall
                    }
                ]
            });

            History.push({
                role: 'function',
                parts: [
                    {
                        functionResponse: functionResponsePart,
                    }
                ]
            });

        }
        else {
            const text = parts.find(p => p.text)?.text || "No response";
            History.push({ role: 'model', parts: [{ text }] });
            console.log(text);
            break;
        }
    }
}


async function main() {
    while (true) {
        const userProblem = readlineSync.question("Ask me anything---> ");
        await runAgent(userProblem);
    }
}

main();