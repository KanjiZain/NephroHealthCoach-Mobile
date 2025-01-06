import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faUtensils,
  faVials,

} from '@fortawesome/free-solid-svg-icons';
import {NAVIGATION_ROUTES} from './screenName';

const GENDERS = ['Male', 'Female', 'Other'];

export const GenderListWithLabel = GENDERS.map(month => ({
  label: month,
  value: month,
}));

export const HomeMenus = [
  {title: 'BMI', icon: faUser as IconProp, route: 'BMI'},
  {title: 'Diet Plans', icon: faUtensils as IconProp, route: 'DIET'},
  {title: 'Tests', icon: faVials as IconProp, route: 'Test'},
];

export const titleToRouteMap: {
  [key: string]: keyof typeof NAVIGATION_ROUTES.MAIN;
} = {
  BMI: 'BMI',
  'Diet Plans': 'DIET',
  Tests: 'TEST',
};
