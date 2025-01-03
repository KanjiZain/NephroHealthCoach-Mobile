import SignIn from '@/screens/auth/Signin';
import Signup from '@/screens/auth/Signup';
import SplashScreen from '@/screens/auth/splash';
import Bmi from '@/screens/main/Bmi';
import Chatbot from '@/screens/main/Chatbot';
import DietPlans from '@/screens/main/DietPlans';
import History from '@/screens/main/History';
import Home from '@/screens/main/Home';
import Tests from '@/screens/main/Tests';

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
    component: Bmi,
    options: {headerShown: false},
  },
  {
    name: 'Diet',
    component: DietPlans,
    options: {headerShown: false},
  },
  {
    name: 'History',
    component: History,
    options: {headerShown: false},
  },
  {
    name: 'Test',
    component: Tests,
    options: {headerShown: false},
  },
  {
    name: 'CHAT',
    component: Chatbot,
    options: {headerShown: false},
  },
];
