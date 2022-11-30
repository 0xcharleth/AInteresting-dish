import { IonButton, IonInput, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/react';
import { useState } from 'react';
import './ExploreContainer.css';
import '../pages/api/generate'
import { Configuration, OpenAIApi } from 'openai';
import { environment } from "../env/env";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const configuration = new Configuration({
    apiKey: environment.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  const basePromptPrefix = "Give me a dish to make with the following ingredients:";
//tester


//tester end


  const generateAction = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(environment.OPENAI_API_KEY)
      },
      body: JSON.stringify({
        'prompt': `${basePromptPrefix}${userInput}`,
        "model": "text-davinci-003",
        'temperature': 0.7,
        'max_tokens': 1000,
        'top_p': 1,
        'frequency_penalty': 0,
        'presence_penalty': 0.5,
        'stop': ["\"\"\""],
    
      })
    };
    fetch('https://api.openai.com/v1/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
         
          console.log("OpenAI replied...", data.choices[0].text)
          setApiOutput(`${ data.choices[0].text}`);
          setIsGenerating(false);

      }).catch(err => {
        console.log("Ran out of tokens for today! Try tomorrow!");
      });
    }

  

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)


  const onUserChangedText = (event:any) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  
  };


  return (
    <IonList>
 

 <IonItem className="prompt-container">
        <IonLabel>Regular textarea</IonLabel>
        <IonTextarea className="prompt-box" spellcheck placeholder="Type something here" value={userInput}  onIonChange={onUserChangedText}></IonTextarea>
      </IonItem>
      <IonButton expand="block" className="generate-button" onClick={generateAction}>Generate</IonButton>
      {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}

  </IonList>
  );
};

export default ExploreContainer;
