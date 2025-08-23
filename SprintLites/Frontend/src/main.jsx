import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom';
import UserProvider from '../Context/userContext.jsx';
import PrjectProvider from '../Context/ProjectsContext.jsx';
import SprintProvider from '../Context/SprintContext.jsx';
import IssuesProvider from '../Context/IssuesContext.jsx';
import MeProvider from '../Context/MEContext.jsx';
import CommentProvider from '../Context/CommentsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <UserProvider>
      <PrjectProvider>
        <SprintProvider>
          <IssuesProvider>
            <MeProvider>
              <CommentProvider>
                    <App/> 
              </CommentProvider>      
            </MeProvider>
                 
          </IssuesProvider>
           
        </SprintProvider>
                 
      </PrjectProvider>      
     </UserProvider>
   
     </BrowserRouter>
    
  </StrictMode>,
)
