
import { Shield, Droplets, Wind, Zap, Eye, Car, Brush } from 'lucide-react';
import { Testimonial } from './types';

export const PHONE_NUMBER = "5548991632244";
export const INSTAGRAM = "@mfaurumlegacy";
export const ADDRESS = "Criciúma, SC (Próximo ao Centro)";

export const SERVICES = [
  {
    id: 'lavagem-completa',
    title: 'Lavagem Completa + Cera',
    description: 'Lavagem detalhada da lataria, caixas de roda e aplicação de cera de brilho protetora.',
    icon: Car
  },
  {
    id: 'higienizacao-interna',
    title: 'Higienização Interna',
    description: 'Limpeza profunda de bancos, carpetes e painel. Removemos manchas e odores.',
    icon: Brush
  },
  {
    id: 'limpeza-motor',
    title: 'Limpeza de Motor',
    description: 'Remoção de graxa e sujeira pesada com produtos seguros para a parte elétrica.',
    icon: Zap
  },
  {
    id: 'protecao-pintura',
    title: 'Proteção de Pintura',
    description: 'Aplicação de selante que mantém o carro limpo por muito mais tempo e protege a cor.',
    icon: Shield
  },
  {
    id: 'vidros',
    title: 'Limpeza de Vidros',
    description: 'Remoção de manchas d\'água e cristalização para melhor visibilidade na chuva.',
    icon: Droplets
  },
  {
    id: 'farois',
    title: 'Polimento de Faróis',
    description: 'Recuperamos a transparência dos faróis amarelados, aumentando sua segurança.',
    icon: Eye
  }
];

export const COMBOS = [
  {
    id: 'dia-a-dia',
    name: 'Combo do Dia a Dia',
    tagline: 'O queridinho da galera',
    description: 'A solução perfeita para manter o carro sempre apresentável e cheiroso.',
    priceLabel: 'Consulte Valor',
    features: ['Lavagem Externa', 'Aspiração Completa', 'Pretinho nas Rodas', 'Perfume Exclusivo']
  },
  {
    id: 'aurum-top',
    name: 'Aurum Top Brilho',
    tagline: 'Resultado de Carro Novo',
    description: 'Para quem quer aquele brilho extra e proteção para a pintura do veículo.',
    priceLabel: 'Orçamento Rápido',
    features: ['Lavagem Detalhada', 'Cera de Carnaúba', 'Limpeza de Painel', 'Descontaminação de Vidros']
  },
  {
    id: 'faxina-geral',
    name: 'Faxina Geral',
    tagline: 'Renovação Total',
    description: 'Ideal para carros que precisam de uma atenção especial na parte interna e motor.',
    priceLabel: 'Sob Consulta',
    features: ['Higienização de Bancos', 'Lavagem de Motor', 'Oxi-sanitização (Odores)', 'Proteção de Plásticos']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "João Pedro",
    role: "Chevrolet Onix",
    text: "O melhor custo-benefício de Criciúma. O carro volta parecendo que saiu da concessionária, muito capricho!",
    rating: 5
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Hyundai HB20",
    text: "Sempre levo meu carro lá. São rápidos, honestos e o preço é muito justo. Recomendo a lavagem com cera.",
    rating: 5
  },
  {
    id: 3,
    name: "Carlos Alberto",
    role: "VW Gol G6",
    text: "Fiz a higienização dos bancos e ficou 100%. Tiraram manchas que eu achei que nunca iam sair.",
    rating: 4
  }
];

const encodedMessage = encodeURIComponent(
  `Olá, MF Aurum Legacy!\n\n` +
  `Gostaria de solicitar um orçamento para meu carro.\n\n` +
  `Modelo do veículo: `
);

export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
