import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Pages/MainPage/main.js';
import Policy from './Pages/Policy/Policy.jsx';
import PolicyPrivayPage from './Pages/Policy/privacyPolicy.jsx';
import ArticlePage from './Pages/ArticlePage/ArticlePage.jsx';
import FAQPage from './Pages/FAQPage/FAQPage.jsx';
import PaymentFailed from './Pages/FailPage/FailPage.jsx';
import PaymentSuccess from './Pages/SuccessPage/SuccessPage.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js'
import "./i18n";
import StorePage from './Pages/StorePage/StorePage.jsx';
import ProductMobile from './Pages/ProductPage/ProductMobile.jsx';
import { ThemeProvider } from './theme/ThemeProvider';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          {/* <nav>s
            <Link to="/">Home</Link>
            clearLocalStorageOnce();
            return (
          </nav>*/}

          <Routes>
            <Route path="/" element={ <Main/>} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/policy-privacy" element={<PolicyPrivayPage/>} />
            <Route path="/article" element={<ArticlePage/>} />
            <Route path="/faq" element={<FAQPage/>} />
            <Route path="/store" element={<StorePage/>} />
            <Route path="/product" element={<ProductMobile/>} />
           
          </Routes>

          {/* <Main/> */}
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
