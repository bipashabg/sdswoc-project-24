import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import '../../styles/chatbot.css';

const AssistBasedOnFeeling = ({ previousStep }) => {
    const feeling = previousStep && previousStep.value ? previousStep.value.toLowerCase() : '';

  if (feeling.includes('happy') || feeling.includes('good')) {
    return (
      <div>
        That's great to hear! If there's anything specific you'd like to talk about or ask, feel free to let me know.
      </div>
    );
  } else if (feeling.includes('sad') || feeling.includes('bad') || feeling.includes('not good')) {
    return (
      <div>
        I'm sorry to hear that you're feeling this way. It's important to talk to someone you trust about it. If you'd like, we can discuss ways to improve your mood.
      </div>
    );
  } else {
    return (
      <div>
        I see, how can we provide further assistance?
      </div>
    );
  }
};

function Chatbot() {
  const steps = [
    {
      id: 'Greet',
      message: "Hello, welcome to Unwind's Companion bot",
      trigger: 'AskFeeling',
    },
    {
      id: 'AskFeeling',
      message: 'How are you feeling today?',
      trigger: 'FeelingResponse',
    },
    {
      id: 'FeelingResponse',
      user: true,
      trigger: 'AssistBasedOnFeeling',
    },
    {
      id: 'AssistBasedOnFeeling',
      component: <AssistBasedOnFeeling />,
      trigger: 'MentalHealthOptions',
    },
    {
      id: 'MentalHealthOptions',
      options: [
        { value: 'stress', label: 'Dealing with Stress', trigger: 'StressDetails' },
        { value: 'anxiety', label: 'Coping with Anxiety', trigger: 'AnxietyDetails' },
        { value: 'depression', label: 'Managing Depression', trigger: 'DepressionDetails' },
        { value: 'self-care', label: 'Self-Care Tips', trigger: 'SelfCareDetails' },
        { value: 'new-chat', label: 'Start a New Chat', trigger: 'Greet' }, // Option after the first label
      ],
    },
    {
      id: 'StressDetails',
      message: 'Stress is a common issue. To manage stress, consider practicing mindfulness, taking breaks, and maintaining a healthy work-life balance.',
      trigger: 'NewChatOptionStress', // Add a trigger for the new option
    },
    {
      id: 'NewChatOptionStress',
      options: [
        { value: 'new-chat', label: 'Start a New Chat', trigger: 'Greet' }, // Option after the Stress message
      ],
    },
    {
      id: 'AnxietyDetails',
      message: 'Anxiety is challenging. Try deep breathing exercises, meditation, and reach out to friends or professionals for support.',
      trigger: 'NewChatOptionAnxiety', // Add a trigger for the new option
    },
    {
      id: 'NewChatOptionAnxiety',
      options: [
        { value: 'new-chat', label: 'Start a New Chat', trigger: 'Greet' }, // Option after the Anxiety message
      ],
    },
    {
      id: 'DepressionDetails',
      message: 'Depression can be tough. Ensure you talk to someone you trust, engage in activities you enjoy, and seek professional help when needed.',
      trigger: 'NewChatOptionDepression', // Add a trigger for the new option
    },
    {
      id: 'NewChatOptionDepression',
      options: [
        { value: 'new-chat', label: 'Start a New Chat', trigger: 'Greet' }, // Option after the Depression message
      ],
    },
    {
      id: 'SelfCareDetails',
      message: 'Self-care is crucial for mental well-being. Include activities like exercise, sufficient sleep, and hobbies in your routine.',
      trigger: 'NewChatOptionSelfCare', // Add a trigger for the new option
    },
    {
      id: 'NewChatOptionSelfCare',
      options: [
        { value: 'new-chat', label: 'Start a New Chat', trigger: 'Greet' }, // Option after the Self-Care message
      ],
    },
  ];



  return (
    <>
      <Segment floated="right" className="custom-chatbot">
        <ChatBot
          headerTitle="Companion Bot"
          steps={steps}
          floatingIcon={<Icon name="comment alternate" />}
        />
      </Segment>
    </>
  );
}

export default Chatbot;
