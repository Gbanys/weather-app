from typing import Any
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai.chat_models import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from agent.tools import get_weather_data_from_location
from langchain_core.messages import AIMessage, HumanMessage
from dotenv import load_dotenv
import os

load_dotenv()

model = ChatOpenAI(model="gpt-4")
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant"),
        ("placeholder", "{chat_history}"),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ]
)

def createAgent() -> AgentExecutor:
    tools = [get_weather_data_from_location]
    agent = create_tool_calling_agent(model, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    return agent_executor


def transform_message_history(history) -> list:
    transformed_history = []

    for msg in history:
        if msg['type'] == "user":
            transformed_history.append(HumanMessage(content=msg['message']))
        elif msg['type'] == "ai":
            transformed_history.append(AIMessage(content=msg['message']))
    
    return transformed_history


def callAgent(input: str, history: list[str]) -> dict[str, Any]:
    transformed_message_history = transform_message_history(history)
    agent_executor = createAgent()
    response = agent_executor.invoke(
        {
            "input": input,
            "chat_history": transformed_message_history
        }
    )
    return {"response": response["output"]}