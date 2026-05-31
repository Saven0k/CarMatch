export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  image_url: string;
  match_percent: number;
  reason: string;
}

export interface User {
  id: number;
  username: string;
}

export interface QuizFormData {
  age: number;
  favorite_color: string;
  favorite_drink: string;
  lifestyle: string;
}

export interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}