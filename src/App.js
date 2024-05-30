
import './App.css';
import Header from './component/header/header';
import Sidebar from './component/container/sidebar/sidebar';
import Navbar from './component/container/navbar/navbar';
import Container from './component/container/container';
import Login from './component/login/login';
import { SocketProvider } from './socket/socketProvider';


function App() {
  return (
    <div className="trello">
      <SocketProvider>
    <Header></Header>
    <Container></Container>
    </SocketProvider>
    
    </div>

    
    
  );
}

export default App;
