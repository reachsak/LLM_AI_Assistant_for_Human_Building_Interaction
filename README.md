
# Large Language Model for Human-Building Interaction

## Manuscript
[Autonomous Building Cyber-Physical Systems Using Decentralized Autonomous Organizations, Digital Twins, and Large Language Model](https://arxiv.org/abs/2410.19262)

## Project Overview
The Project aims to facilitate the human-building interaction within smart buildings using open-sourced LLM such as LLaMA 3. This AI assistant provides smart and personalized assistance to occupants through web apps. Users can communicate with the AI virtual assistant through text and voice input to control various building facilities, adjust setpoints for the specific building smart facilities, or turn systems on or off as needed. The assistant also provides real-time information on indoor environmental conditions by accessing live sensor data reading from the IoT device. The Text-to-Speech (TTS) and Speech-to-Text (STT) models are powered by open-source tools and models such as Whisper and Piper.

<img src="/fig2.png" style="float: left; margin-right: 20px; max-width: 200px;">

## Summary
<img src="/fig1.png" style="float: left; margin-right: 20px; max-width: 200px;">
<img src="/equipment.png" style="float: left; margin-right: 20px; max-width: 200px;">

## Video Demo
[![Watch the demo video](https://img.youtube.com/vi/0SyZHvmadZA/0.jpg)](https://www.youtube.com/watch?v=0SyZHvmadZA)  
*Click on the image to view the demo video.*


### Requirements
- Open-source Large language model (e.g., LLaMA)
- Generative AI inference tool: llama.cpp
- Python 3.10
- Raspberry Pi and IoT sensors
- Open-source Text-to-Speech (TTS) model: Whisper
- Open-source Speech-to-Text (STT) model: Piper

---

## 🛠️ Detailed Setup Guide

Follow the steps below to set up the AI assistant for human-building interaction:

### Step 1: Run the Locally Hosted Large Language Model (LLM)
You must use [`llama.cpp`](https://github.com/ggml-org/llama.cpp) for LLM inference. This tool supports **grammar-based function calling**, which is essential for interacting with smart building systems.

> ⚠️ **Note**: [`Ollama`](https://ollama.com) is currently **not recommended**, as it may not support grammar syntax needed for function calling. However, you can check the latest updates on their site in case support has been added.

For function calling , please refer to [llama-cpp-agent](https://github.com/Maximilian-Winter/llama-cpp-agent)


### Step 2: Install the Frontend Interface for the AI Assistant
Navigate to the frontend directory:

```bash
cd LLM_AI_Assistant_for_Human_Building_Interaction/LLM\ Frontend/frontend
```

Install the required packages:

```bash
npm install
```

This will set up the web-based UI for interacting with the AI assistant via text or voice.

### Step 3: Run the Function Calling Backend Server
Navigate to the backend function call server:

```bash
cd LLM_AI_Assistant_for_Human_Building_Interaction/LLM\ backend/functioncallserver
```

Run the Python server that enables the LLM to communicate with your smart appliances:

```bash
python3 functioncallserver.py
```

Once running, you can begin interacting with the AI assistant through the frontend interface.

### Step 4: Configure Smart Appliance Control Scripts
Make sure the function calling script has the ability to interact with your smart home appliances (e.g., smart fan, lighting, air purifier).  

Refer to this guide for configuration details and sample scripts:  
👉 [Smart Appliance Setup and Control Scripts](https://github.com/reachsak/smart_home_appliance_config/tree/main)

This includes how to connect to devices, required tokens, supported platforms (e.g., Xiaomi, Yeelight), and example control commands.
