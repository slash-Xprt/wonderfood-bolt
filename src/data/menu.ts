import type { MenuItem } from '../types';

export const MENU_CATEGORIES = [
  { id: 'burgers', name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
  { id: 'sides', name: 'Accompagnements', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300' },
  { id: 'desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Burger Classique",
    description: "Steak 100% bœuf avec laitue, tomate et notre sauce secrète",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    category: "burgers"
  },
  {
    id: 2,
    name: "Cheeseburger",
    description: "Burger classique avec cheddar fondu",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300",
    category: "burgers"
  },
  {
    id: 3,
    name: "Frites",
    description: "Frites dorées et croustillantes au sel de mer",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300",
    category: "sides"
  }
];