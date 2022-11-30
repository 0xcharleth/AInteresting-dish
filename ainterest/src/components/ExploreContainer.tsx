import { IonButton, IonInput, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/react';
import { useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [userInput, setUserInput] = useState('');
 
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
      <IonButton expand="block">Block</IonButton>
    

  </IonList>
  );
};

export default ExploreContainer;
