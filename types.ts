
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: number | string;
  name: string;
  role: string; // Usaremos para o Modelo do Carro
  text: string;
  avatar?: string;
  rating: number;
}
