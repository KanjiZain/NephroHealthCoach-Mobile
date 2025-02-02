import BmiRecordsScreen from '@/components/ItemListing/BmiRecordsScreen';
import DietRecordsScreen from '@/components/ItemListing/DietRecordsScreen';
import TestRecordsScreen from '@/components/ItemListing/TestRecordsScreen';
import DietItem from '@/components/skeletoncards/pages/category/DietPlan';
import BmiItem from '@/components/skeletoncards/pages/category/items';
import TestItem from '@/components/skeletoncards/pages/category/test';
import SignIn from '@/screens/auth/Signin';
import Signup from '@/screens/auth/Signup';
import SplashScreen from '@/screens/auth/splash';
import Chatbot from '@/screens/main/Chatbot';
import Home from '@/screens/main/Home';

export const NAVIGATION_ROUTES = {
  AUTH: {
    SPLASH: 'Splash',
    SIGNIN: 'SignIn',
    SIGNUP: 'SignUp',
  },
  MAIN: {
    HOME: 'Home',
    BMI: 'Bmi',
    DIET: 'Diet',
    HISTORY: 'History',
    TEST: 'Test',
    CHAT: 'CHAT',
    BmiListing: 'BmiListing',
    TestListing: 'TestListing',
    DietListing: 'DietListing',
  },
};

export const NAVIGATION_ROUTES_AUTH = [
  {
    name: 'Splash',
    component: SplashScreen,
    options: {headerShown: false},
  },
  {
    name: 'SignIn',
    component: SignIn,
    options: {headerShown: false},
  },
  {
    name: 'SignUp',
    component: Signup,
    options: {headerShown: false},
  },
];

export const NAVIGATION_ROUTES_MAIN = [
  {
    name: 'Home',
    component: Home,
    options: {headerShown: false},
  },
  {
    name: 'Bmi',
    component: BmiRecordsScreen,
    options: {headerShown: false},
  },
  {
    name: 'Diet',
    component: DietRecordsScreen,
    options: {headerShown: false},
  },
  {
    name: 'Test',
    component: TestRecordsScreen,
    options: {headerShown: false},
  },
  {
    name: 'CHAT',
    component: Chatbot,
    options: {headerShown: false},
  },
  {
    name: 'BmiListing',
    component: BmiItem,
    options: {headerShown: false},
  },
  {
    name: 'DietListing',
    component: DietItem,
    options: {headerShown: false},
  },
  {
    name: 'TestListing',
    component: TestItem,
    options: {headerShown: false},
  },
];
