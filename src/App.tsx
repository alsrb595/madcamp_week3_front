import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import PurchasePage from './pages/PurchasePage';
import SalesPage from './pages/SalesPage';
import NavBar from './components/NavBar';
import './App.css';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TagPage from './pages/TagPage';
import EditProfilePage from './pages/EditProfilePage';
import TipPage from './pages/TipPage';
import PostTipPage from './pages/PostTipPage';
import ViewTipPage from './pages/ViewTipPage';
import MyProductPage from './pages/MyProductPage';
import SuccessLogin from './components/SuccessLogin';
import ProductUploadPage from './pages/ProductUploadPage';
import NewTagPage from './pages/newTagPage';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tagpage" element={<NewTagPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/purchases" element={<PurchasePage />} />
        <Route path="/login" element={<LoginPage baseroute="/" />} />
        <Route path="profile/login" element={<LoginPage baseroute="/profile" />} />
        <Route path="cart/login" element={<LoginPage baseroute="/cart" />} />
        <Route path="sales/login" element={<LoginPage baseroute="/sales" />} />
        <Route path="purchases/login" element={<LoginPage baseroute="/purchases" />} />
        <Route path="/sell" element={<MyProductPage/>}/>
        <Route path="/uploadproduct" element={<ProductUploadPage/>}/>
        <Route path="/success" element={<SuccessLogin />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/photo-tips" element={<TipPage />} />
        <Route path="/posttip" element={<PostTipPage />} />
        <Route path="/viewtip/:postId" element={<ViewTipPage />} />
      </Routes>
    </div>
  );
};

export default App;
