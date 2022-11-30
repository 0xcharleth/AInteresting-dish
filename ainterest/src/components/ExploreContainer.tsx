import { IonButton, IonInput, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonList>
 

 <IonItem>
        <IonLabel>Regular textarea</IonLabel>
        <IonTextarea placeholder="Type something here"></IonTextarea>
      </IonItem>
      <IonButton expand="block">Block</IonButton>
    

  </IonList>
  );
};

export default ExploreContainer;
