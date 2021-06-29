import './App.css';
import ConsentAgreement from './lib/ConsentAgreement';
import UnauthorizedPage from './lib/containers/UnauthorizedPage';


function App() {
	return (
		<div className="App">
			<ConsentAgreement
			/>
			<UnauthorizedPage/>
		</div>
	);
}

export default App;
