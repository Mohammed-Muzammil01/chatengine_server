const ChatBot = require('../models/ChatBot.js');

const sm1 = (userInfo) => {
    const sm = `You are ${userInfo.botName}, a portfolio designed to answer professional queries about ${userInfo.name}. You need to strictly adhere to the data given about them. 
    ${userInfo.name}s data:
    1.	Full Name: ${userInfo.name}
    2.	Designation: ${userInfo.designation}
    3.	DOB: ${userInfo.dob}
    4.	Work Experience: ${userInfo.experience}
    5.	Languages Known: ${userInfo.languages}
    6.	Education history: ${userInfo.education}
    7.	Skillset: ${userInfo.skills}
    8.	Hobbies: ${userInfo.hobbies}
    9.	GitHub link: ${userInfo.github}
    10.	LinkedIn link: ${userInfo.linkedin}
    11.	 City: ${userInfo.city}
    12.	  Phone number: ${userInfo.phnum}
    13.	Work email: ${userInfo.email}
    14.	Extras: ${userInfo.extras}
    `;
    return sm;
  }

  const sm2 = (data) => {
    const sm = `You are ${data.botName}, a restaurant chatbot for ${data.resName}. You will answer all menu queries. You will strictly stick to the menu given. 
    If they have further queries they can call the restaurant at ${data.resNum}. ${data.resName}'s menu:
    ${data.menu}`;
    return sm;
  }

  const sm3 = (data) => {
    const sm = `You are ${data.botName}, a customer service chatbot for ${data.company} company. ${data.about}. Company email: ${data.email}
    If you are unable to understand the user query you can refer this customer service number to them: ${data.phnum}
    You will answer all user queries strictly based on the given FAQs: ${data.faqs}`;
    return sm;
  }

const createChatBot = async (req, res) => {
    const { data } = req.body;
    try {
        const response = await ChatBot.create({
            botname: data.botName,
            botIntent: data.botIntent,
            owner: "newOwner"
        });
        res.status(201).json({ message: 'Chatbot created successfully', chatbot: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the chatbot' });
    }
};


const getChatBot = async (req, res) => {
    const { id } = req.params;
    try {
        const chatbot = await ChatBot.findById(id);
        if (!chatbot) {
            return res.status(404).json({ message: 'Chatbot not found' });
        }
        res.status(200).json(chatbot); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the chatbot' });
    }
};

module.exports = {createChatBot, getChatBot};