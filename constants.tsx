import { Shield, Droplets, Zap, Eye, Car, Brush } from 'lucide-react';

export const PHONE_NUMBER = "5548991632244";
export const INSTAGRAM = "@aurumlegacydetail";
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
    id: 'basico',
    name: 'Básico',
    tagline: 'Manutenção Essencial',
    description: 'A limpeza ideal para o dia a dia, mantendo seu carro limpo e organizado.',
    priceStart: 'R$ 60,00',
    durationMinutes: 60,
    categoryPricing: {
      SMALL: { price: 'R$ 60,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 70,00', durationMinutes: 70 },
      LARGE: { price: 'R$ 80,00', durationMinutes: 80 }
    },
    features: [
      'Pré-lavagem com Snow Foam',
      'Lavagem Manual Detalhada',
      'Limpeza de Rodas e Pneus',
      'Secagem Técnica',
      'Aspiração Interna Completa',
      'Limpeza de Vidros',
      'Pretinho nos Pneus'
    ]
  },
  {
    id: 'intermediario',
    name: 'Intermediário',
    tagline: 'Brilho e Proteção',
    description: 'Um upgrade no cuidado, com aplicação de cera e atenção aos detalhes.',
    priceStart: 'R$ 120,00',
    durationMinutes: 120,
    categoryPricing: {
      SMALL: { price: 'R$ 120,00', durationMinutes: 120 },
      MEDIUM: { price: 'R$ 140,00', durationMinutes: 140 },
      LARGE: { price: 'R$ 160,00', durationMinutes: 160 }
    },
    features: [
      'Todos os itens do Básico',
      'Descontaminação de Rodas',
      'Aplicação de Cera Protetora',
      'Condicionamento de Plásticos Ext.',
      'Limpeza Detalhada de Painel',
      'Limpeza de Tapetes',
      'Perfume Interno'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Experiência Completa',
    description: 'O tratamento definitivo para renovar completamente seu veículo.',
    priceStart: 'R$ 250,00',
    durationMinutes: 240,
    categoryPricing: {
      SMALL: { price: 'R$ 250,00', durationMinutes: 240 },
      MEDIUM: { price: 'R$ 300,00', durationMinutes: 280 },
      LARGE: { price: 'R$ 350,00', durationMinutes: 320 }
    },
    features: [
      'Todos os itens do Intermediário',
      'Lavagem Técnica de Motor',
      'Higienização de Bancos',
      'Hidratação de Couro (se houver)',
      'Oxi-sanitização',
      'Revitalização de Plásticos Int.',
      'Limpeza de Saídas de Ar'
    ]
  }
];

export const ADD_ONS = [
  {
    id: 'motor',
    name: 'Lavagem Técnica de Motor',
    description: 'Limpeza detalhada e segura do cofre do motor, com proteção de verniz para plásticos e borrachas.',
    price: 'R$ 80,00',
    durationMinutes: 60,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 80,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 100,00', durationMinutes: 70 },
      LARGE: { price: 'R$ 120,00', durationMinutes: 80 }
    }
  },
  {
    id: 'higienizacao-bancos',
    name: 'Higienização de Bancos',
    description: 'Limpeza profunda com extratora para remoção de sujeira, manchas e ácaros dos tecidos.',
    price: 'R$ 150,00',
    durationMinutes: 120,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 150,00', durationMinutes: 120 },
      MEDIUM: { price: 'R$ 180,00', durationMinutes: 140 },
      LARGE: { price: 'R$ 210,00', durationMinutes: 160 }
    }
  },
  {
    id: 'hidratacao-couro',
    name: 'Hidratação de Couro',
    description: 'Limpeza e condicionamento dos bancos de couro para evitar ressecamento e rachaduras.',
    price: 'R$ 100,00',
    durationMinutes: 60,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 100,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 120,00', durationMinutes: 70 },
      LARGE: { price: 'R$ 140,00', durationMinutes: 80 }
    }
  },
  {
    id: 'farois',
    name: 'Restauração de Faróis',
    description: 'Lixamento técnico e polimento para remover amarelado e oxidação, devolvendo transparência.',
    price: 'R$ 80,00',
    durationMinutes: 60,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 80,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 80,00', durationMinutes: 60 },
      LARGE: { price: 'R$ 80,00', durationMinutes: 60 }
    }
  },
  {
    id: 'chuva-acida',
    name: 'Remoção de Chuva Ácida',
    description: 'Tratamento específico para vidros com manchas d\'água incrustadas, melhorando a visibilidade.',
    price: 'R$ 100,00',
    durationMinutes: 60,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 100,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 120,00', durationMinutes: 70 },
      LARGE: { price: 'R$ 140,00', durationMinutes: 80 }
    }
  },
  {
    id: 'descontaminacao',
    name: 'Descontaminação de Pintura',
    description: 'Uso de Clay Bar para remover impurezas ásperas do verniz, deixando a pintura lisa.',
    price: 'R$ 150,00',
    durationMinutes: 60,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 150,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 180,00', durationMinutes: 70 },
      LARGE: { price: 'R$ 210,00', durationMinutes: 80 }
    }
  },
  {
    id: 'impermeabilizacao',
    name: 'Impermeabilização de Bancos',
    description: 'Proteção nano-tecnológica para tecidos, repelindo líquidos e evitando manchas.',
    price: 'R$ 200,00',
    durationMinutes: 60,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 200,00', durationMinutes: 60 },
      MEDIUM: { price: 'R$ 240,00', durationMinutes: 70 },
      LARGE: { price: 'R$ 280,00', durationMinutes: 80 }
    }
  },
  {
    id: 'oxi',
    name: 'Oxi-sanitização',
    description: 'Eliminação de odores, fungos e bactérias do interior do veículo e ar condicionado.',
    price: 'R$ 100,00',
    durationMinutes: 30,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 100,00', durationMinutes: 30 },
      MEDIUM: { price: 'R$ 100,00', durationMinutes: 30 },
      LARGE: { price: 'R$ 100,00', durationMinutes: 30 }
    }
  },
  {
    id: 'polimento',
    name: 'Polimento Comercial',
    description: 'Polimento de etapa única para realçar o brilho e remover riscos superficiais (swirls).',
    price: 'R$ 350,00',
    durationMinutes: 240,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 350,00', durationMinutes: 240 },
      MEDIUM: { price: 'R$ 420,00', durationMinutes: 280 },
      LARGE: { price: 'R$ 490,00', durationMinutes: 320 }
    }
  },
  {
    id: 'vitrificacao',
    name: 'Vitrificação de Pintura',
    description: 'Proteção cerâmica de alta dureza (9H) por até 3 anos. Brilho intenso e repelência.',
    price: 'R$ 800,00',
    durationMinutes: 360,
    allowStandalone: false,
    categoryPricing: {
      SMALL: { price: 'R$ 800,00', durationMinutes: 360 },
      MEDIUM: { price: 'R$ 960,00', durationMinutes: 420 },
      LARGE: { price: 'R$ 1120,00', durationMinutes: 480 }
    }
  }
];

export const CAR_MODELS = [
  // Chevrolet
  "Chevrolet Onix", "Chevrolet Onix Plus", "Chevrolet Tracker", "Chevrolet Spin", "Chevrolet Montana", 
  "Chevrolet S10", "Chevrolet Equinox", "Chevrolet Trailblazer", "Chevrolet Cruze", "Chevrolet Camaro", 
  "Chevrolet Corvette", "Chevrolet Bolt", "Chevrolet Silverado", "Chevrolet Celta", "Chevrolet Classic", 
  "Chevrolet Prisma", "Chevrolet Cobalt", "Chevrolet Captiva", "Chevrolet Agile", "Chevrolet Meriva", 
  "Chevrolet Zafira", "Chevrolet Vectra", "Chevrolet Astra", "Chevrolet Omega", "Chevrolet Kadett", 
  "Chevrolet Monza", "Chevrolet Opala", "Chevrolet Chevette", "Chevrolet D20", "Chevrolet Blazer",
  "Chevrolet Corsa", "Chevrolet Corsa Sedan", "Chevrolet Corsa Wagon", "Chevrolet Pick-up Corsa",
  "Chevrolet Veraneio", "Chevrolet Bonanza", "Chevrolet A10", "Chevrolet C10", "Chevrolet D10",

  // Volkswagen
  "Volkswagen Polo", "Volkswagen T-Cross", "Volkswagen Nivus", "Volkswagen Saveiro", "Volkswagen Virtus", 
  "Volkswagen Taos", "Volkswagen Amarok", "Volkswagen Tiguan", "Volkswagen Jetta", "Volkswagen Golf", 
  "Volkswagen Gol", "Volkswagen Voyage", "Volkswagen Fox", "Volkswagen Up!", "Volkswagen SpaceFox", 
  "Volkswagen CrossFox", "Volkswagen Parati", "Volkswagen Santana", "Volkswagen Fusca", "Volkswagen Kombi", 
  "Volkswagen Passat", "Volkswagen Bora", "Volkswagen New Beetle", "Volkswagen Touareg", "Volkswagen ID.4", 
  "Volkswagen ID.Buzz", "Volkswagen Scirocco", "Volkswagen Pointer", "Volkswagen Logus", "Volkswagen Apollo",
  "Volkswagen Brasilia", "Volkswagen Variant", "Volkswagen TL", "Volkswagen SP2", "Volkswagen Karmann Ghia",

  // Fiat
  "Fiat Strada", "Fiat Argo", "Fiat Mobi", "Fiat Toro", "Fiat Pulse", "Fiat Fastback", "Fiat Cronos", 
  "Fiat Titano", "Fiat Fiorino", "Fiat Ducato", "Fiat Scudo", "Fiat 500e", "Fiat Uno", "Fiat Palio", 
  "Fiat Siena", "Fiat Grand Siena", "Fiat Punto", "Fiat Idea", "Fiat Bravo", "Fiat Stilo", "Fiat Linea", 
  "Fiat Doblo", "Fiat Weekend", "Fiat Marea", "Fiat Tempra", "Fiat Tipo", "Fiat 147", "Fiat Oggi", 
  "Fiat Panorama", "Fiat Elba", "Fiat Premio", "Fiat Coupé", "Fiat Topolino",

  // Hyundai
  "Hyundai HB20", "Hyundai HB20S", "Hyundai Creta", "Hyundai Tucson", "Hyundai Santa Fe", "Hyundai Palisade", 
  "Hyundai Kona", "Hyundai Ioniq 5", "Hyundai Azera", "Hyundai Sonata", "Hyundai Elantra", "Hyundai i30", 
  "Hyundai Veloster", "Hyundai Veracruz", "Hyundai HR", "Hyundai ix35", "Hyundai Accent", "Hyundai Genesis",
  "Hyundai Equus",

  // Toyota
  "Toyota Corolla", "Toyota Corolla Cross", "Toyota Hilux", "Toyota SW4", "Toyota Yaris", "Toyota RAV4", 
  "Toyota Camry", "Toyota Prius", "Toyota Etios", "Toyota Fielder", "Toyota Bandeirante", "Toyota Land Cruiser", 
  "Toyota Prado", "Toyota Supra", "Toyota GR86", "Toyota C-HR", "Toyota Sequoia", "Toyota Tundra", "Toyota Tacoma",
  "Toyota Corona", "Toyota Paseo", "Toyota Previa",

  // Honda
  "Honda HR-V", "Honda City", "Honda City Hatch", "Honda Civic", "Honda ZR-V", "Honda CR-V", "Honda Accord", 
  "Honda Fit", "Honda WR-V", "Honda Civic Si", "Honda Type R", "Honda Pilot", "Honda Ridgeline", "Honda Odyssey", 
  "Honda NSX", "Honda Prelude", "Honda CR-X",

  // Jeep
  "Jeep Compass", "Jeep Renegade", "Jeep Commander", "Jeep Wrangler", "Jeep Gladiator", "Jeep Grand Cherokee", 
  "Jeep Cherokee", "Jeep Patriot", "Jeep Liberty", "Jeep Willys", "Jeep CJ-5",

  // Nissan
  "Nissan Kicks", "Nissan Versa", "Nissan Sentra", "Nissan Frontier", "Nissan Leaf", "Nissan March", 
  "Nissan Tiida", "Nissan Livina", "Nissan Grand Livina", "Nissan X-Trail", "Nissan Pathfinder", 
  "Nissan 350Z", "Nissan 370Z", "Nissan GT-R", "Nissan Altima", "Nissan Maxima", "Nissan Murano",
  "Nissan Primera",

  // Renault
  "Renault Kwid", "Renault Duster", "Renault Oroch", "Renault Stepway", "Renault Logan", "Renault Sandero", 
  "Renault Captur", "Renault Master", "Renault Kangoo", "Renault Megane", "Renault Fluence", "Renault Clio", 
  "Renault Symbol", "Renault Scénic", "Renault Grand Scénic", "Renault Laguna", "Renault Twingo", "Renault Kardian",
  "Renault 19", "Renault 21", "Renault Trafic", "Renault Zoe", "Renault Megane E-Tech",

  // Ford
  "Ford Ranger", "Ford Maverick", "Ford Bronco", "Ford Territory", "Ford Mustang", "Ford F-150", "Ford Transit", 
  "Ford Ka", "Ford Fiesta", "Ford Focus", "Ford Ecosport", "Ford Fusion", "Ford Edge", "Ford Courier", 
  "Ford Escort", "Ford Verona", "Ford Versailles", "Ford Del Rey", "Ford Corcel", "Ford Galaxie", "Ford Landau",
  "Ford Belina", "Ford Pampa", "Ford Royale", "Ford F-1000", "Ford F-250", "Ford F-100",

  // Peugeot
  "Peugeot 208", "Peugeot 2008", "Peugeot 3008", "Peugeot e-2008", "Peugeot Partner", "Peugeot Expert", 
  "Peugeot Boxer", "Peugeot 308", "Peugeot 408", "Peugeot 207", "Peugeot 206", "Peugeot 307", "Peugeot RCZ", 
  "Peugeot 5008", "Peugeot 106", "Peugeot 205", "Peugeot 405", "Peugeot 406", "Peugeot 407", "Peugeot 607",
  "Peugeot Hoggar",

  // Citroën
  "Citroën C3", "Citroën C3 Aircross", "Citroën C4 Cactus", "Citroën Jumpy", "Citroën Jumper", "Citroën C4 Lounge", 
  "Citroën C4 Pallas", "Citroën C4 Picasso", "Citroën Grand C4 Picasso", "Citroën C5", "Citroën Xsara Picasso", 
  "Citroën Xsara", "Citroën C3 Picasso", "Citroën Aircross", "Citroën DS3", "Citroën DS4", "Citroën DS5",
  "Citroën ZX", "Citroën Xantia", "Citroën XM", "Citroën C8", "Citroën Berlingo", "Citroën C4 VTR",

  // Caoa Chery
  "Caoa Chery Tiggo 5x", "Caoa Chery Tiggo 7", "Caoa Chery Tiggo 8", "Caoa Chery Arrizo 6", "Caoa Chery iCar", 
  "Caoa Chery Tiggo 2", "Caoa Chery Tiggo 3x", "Caoa Chery QQ", "Caoa Chery Celer", "Caoa Chery Cielo",

  // BYD
  "BYD Dolphin", "BYD Dolphin Mini", "BYD Song Plus", "BYD Seal", "BYD Yuan Plus", "BYD Tan", "BYD Han", 
  "BYD King", "BYD Shark",

  // GWM
  "GWM Haval H6", "GWM Ora 03", "GWM Poer", "GWM Tank",

  // Mitsubishi
  "Mitsubishi L200", "Mitsubishi Pajero", "Mitsubishi Eclipse Cross", "Mitsubishi Outlander", "Mitsubishi ASX", 
  "Mitsubishi Lancer", "Mitsubishi Pajero TR4", "Mitsubishi Pajero Full", "Mitsubishi Pajero Dakar", 
  "Mitsubishi Pajero Sport", "Mitsubishi Grandis", "Mitsubishi Airtrek", "Mitsubishi 3000GT",

  // Ram
  "Ram Rampage", "Ram 1500", "Ram 2500", "Ram 3500", "Ram Classic", "Ram Dakota",

  // BMW
  "BMW X1", "BMW X3", "BMW X5", "BMW X6", "BMW X7", "BMW X2", "BMW X4", "BMW Série 3", "BMW Série 1", 
  "BMW Série 5", "BMW Série 7", "BMW Série 4", "BMW Série 2", "BMW M3", "BMW M4", "BMW M5", "BMW iX", 
  "BMW i4", "BMW iX1", "BMW iX3", "BMW i7", "BMW Z4",

  // Mercedes-Benz
  "Mercedes-Benz Classe C", "Mercedes-Benz Classe A", "Mercedes-Benz Classe E", "Mercedes-Benz GLA", 
  "Mercedes-Benz GLB", "Mercedes-Benz GLC", "Mercedes-Benz GLE", "Mercedes-Benz GLS", "Mercedes-Benz CLA", 
  "Mercedes-Benz Sprinter", "Mercedes-Benz Vito", "Mercedes-Benz Classe S", "Mercedes-Benz Classe G", 
  "Mercedes-Benz SLK", "Mercedes-Benz CLS", "Mercedes-Benz AMG GT",

  // Audi
  "Audi Q3", "Audi Q5", "Audi Q7", "Audi Q8", "Audi A3", "Audi A4", "Audi A5", "Audi A6", "Audi A7", 
  "Audi e-tron", "Audi e-tron GT", "Audi TT", "Audi R8", "Audi RS3", "Audi RS4", "Audi RS5", "Audi RS6",

  // Volvo
  "Volvo XC60", "Volvo XC40", "Volvo XC90", "Volvo C40", "Volvo EX30", "Volvo EX90", "Volvo S60", 
  "Volvo S90", "Volvo V60", "Volvo V40", "Volvo C30",

  // Land Rover
  "Land Rover Discovery", "Land Rover Discovery Sport", "Land Rover Defender", "Range Rover Evoque", 
  "Range Rover Velar", "Range Rover Sport", "Range Rover Vogue", "Land Rover Freelander",

  // Porsche
  "Porsche Macan", "Porsche Cayenne", "Porsche 911", "Porsche Panamera", "Porsche Taycan", "Porsche 718 Boxster", 
  "Porsche 718 Cayman",

  // Kia
  "Kia Sportage", "Kia Niro", "Kia Stonic", "Kia Bongo", "Kia Carnival", "Kia Cerato", "Kia Sorento", 
  "Kia Soul", "Kia Picanto", "Kia Mohave", "Kia Optima", "Kia Cadenza",

  // Suzuki
  "Suzuki Jimny", "Suzuki Vitara", "Suzuki Grand Vitara", "Suzuki SX4", "Suzuki Swift",

  // Subaru
  "Subaru Forester", "Subaru XV", "Subaru Outback", "Subaru Impreza", "Subaru WRX", "Subaru Legacy",

  // JAC Motors
  "JAC E-JS1", "JAC E-JS4", "JAC T40", "JAC T50", "JAC T60", "JAC T80", "JAC J2", "JAC J3", "JAC J5", "JAC J6",

  // Troller
  "Troller T4",

  // Mini
  "Mini Cooper", "Mini Countryman", "Mini Clubman",

  // Lexus
  "Lexus NX", "Lexus RX", "Lexus UX", "Lexus ES", "Lexus LS",

  // Jaguar
  "Jaguar F-Pace", "Jaguar E-Pace", "Jaguar I-Pace", "Jaguar F-Type", "Jaguar XE", "Jaguar XF",

  // Dodge
  "Dodge Journey", "Dodge Ram", "Dodge Durango", "Dodge Challenger", "Dodge Charger",

  // Chrysler
  "Chrysler 300C", "Chrysler Town & Country", "Chrysler PT Cruiser",

  // Smart
  "Smart Fortwo",

  // --- MOTOS ---

  // Honda
  "Honda CG 160", "Honda CG 150", "Honda CG 125", "Honda Titan", "Honda Fan", "Honda Start", "Honda Cargo",
  "Honda Biz 125", "Honda Biz 110i", "Honda Biz 100", "Honda Pop 110i", "Honda Pop 100", "Honda Lead 110",
  "Honda PCX 150", "Honda PCX 160", "Honda Elite 125", "Honda ADV 150", "Honda Forza 350",
  "Honda NXR 160 Bros", "Honda NXR 150 Bros", "Honda NXR 125 Bros", "Honda XRE 300", "Honda XRE 190", 
  "Honda NX 400 Falcon", "Honda NX 350 Sahara", "Honda XLX 350", "Honda XL 125", "Honda XR 250 Tornado", "Honda XR 200",
  "Honda CB 250F Twister", "Honda CB 300R", "Honda CBX 250 Twister", "Honda CBX 200 Strada", "Honda CBX 750F (7 Galo)",
  "Honda CB 500F", "Honda CB 500X", "Honda CB 500", "Honda Hornet CB 600F", "Honda CB 650R", "Honda CB 650F",
  "Honda CBR 650R", "Honda CBR 600RR", "Honda CBR 1000RR", "Honda Fireblade",
  "Honda NC 750X", "Honda NC 700X", "Honda Africa Twin", "Honda Transalp", "Honda Varadero",
  "Honda GL 1800 Gold Wing", "Honda Shadow 750", "Honda Shadow 600",

  // Yamaha
  "Yamaha Factor 150", "Yamaha Factor 125", "Yamaha YBR 125", "Yamaha YBR 150",
  "Yamaha Fazer 250", "Yamaha Fazer 150", "Yamaha Fazer 600", "Yamaha Fazer 1000",
  "Yamaha Crosser 150", "Yamaha Lander 250", "Yamaha Ténéré 250", "Yamaha Ténéré 660", "Yamaha Super Ténéré 1200",
  "Yamaha XTZ 125", "Yamaha XTZ 250", "Yamaha DT 180", "Yamaha DT 200", "Yamaha XT 600", "Yamaha XT 660",
  "Yamaha NMax 160", "Yamaha XMax 250", "Yamaha Fluo 125", "Yamaha Neo 125", "Yamaha Neo 115", "Yamaha Crypton",
  "Yamaha MT-03", "Yamaha MT-07", "Yamaha MT-09", "Yamaha MT-10",
  "Yamaha YZF-R3", "Yamaha YZF-R6", "Yamaha YZF-R1",
  "Yamaha Tracer 900", "Yamaha Tracer 700", "Yamaha XJ6", "Yamaha Midnight Star", "Yamaha Virago", "Yamaha Drag Star",
  "Yamaha RD 135", "Yamaha RD 350",

  // Suzuki
  "Suzuki GSX-S750", "Suzuki GSX-S1000", "Suzuki GSX-R1000", "Suzuki GSX-R750", "Suzuki GSX-R1300 Hayabusa",
  "Suzuki V-Strom 650", "Suzuki V-Strom 1000", "Suzuki V-Strom 1050",
  "Suzuki Burgman 125", "Suzuki Burgman 400", "Suzuki Burgman 650",
  "Suzuki Yes 125", "Suzuki Intruder 125", "Suzuki Intruder 250", "Suzuki Boulevard M800", "Suzuki Boulevard M1500",
  "Suzuki GS 500", "Suzuki Bandit 650", "Suzuki Bandit 1250", "Suzuki Inazuma 250", "Suzuki DR 400", "Suzuki DR 650",

  // BMW Motorrad
  "BMW R 1250 GS", "BMW R 1200 GS", "BMW F 850 GS", "BMW F 800 GS", "BMW F 750 GS", "BMW F 700 GS", "BMW G 650 GS",
  "BMW G 310 GS", "BMW G 310 R", 
  "BMW S 1000 RR", "BMW S 1000 R", "BMW S 1000 XR", "BMW M 1000 RR",
  "BMW R 18", "BMW R nineT", "BMW K 1600", "BMW F 900 R", "BMW C 400 X", "BMW C 650 GT",

  // Kawasaki
  "Kawasaki Ninja 300", "Kawasaki Ninja 400", "Kawasaki Ninja 650", "Kawasaki Ninja ZX-6R", "Kawasaki Ninja ZX-10R", "Kawasaki Ninja 1000",
  "Kawasaki Z300", "Kawasaki Z400", "Kawasaki Z650", "Kawasaki Z750", "Kawasaki Z800", "Kawasaki Z900", "Kawasaki Z1000",
  "Kawasaki Versys-X 300", "Kawasaki Versys 650", "Kawasaki Versys 1000",
  "Kawasaki Vulcan S", "Kawasaki Vulcan 900", "Kawasaki Vulcan 650",
  "Kawasaki ER-6n", "Kawasaki D-Tracker", "Kawasaki KLX",

  // Triumph
  "Triumph Tiger 800", "Triumph Tiger 900", "Triumph Tiger 1200", "Triumph Tiger Sport 660",
  "Triumph Street Triple", "Triumph Speed Triple", "Triumph Trident 660",
  "Triumph Bonneville T100", "Triumph Bonneville T120", "Triumph Street Twin", "Triumph Speed Twin",
  "Triumph Scrambler 400 X", "Triumph Speed 400", "Triumph Scrambler 900", "Triumph Scrambler 1200",
  "Triumph Rocket 3", "Triumph Thruxton", "Triumph Bobber",

  // Ducati
  "Ducati Panigale V4", "Ducati Panigale V2", "Ducati 959 Panigale", "Ducati 1199 Panigale",
  "Ducati Monster 797", "Ducati Monster 821", "Ducati Monster 1200", "Ducati Monster 937",
  "Ducati Multistrada V4", "Ducati Multistrada 1260", "Ducati Multistrada 950",
  "Ducati Diavel", "Ducati XDiavel", "Ducati Scrambler", 
  "Ducati Streetfighter V4", "Ducati Hypermotard",

  // Harley-Davidson
  "Harley-Davidson Iron 883", "Harley-Davidson 883 Roadster", "Harley-Davidson Forty-Eight",
  "Harley-Davidson Fat Boy", "Harley-Davidson Fat Bob", "Harley-Davidson Street Bob", "Harley-Davidson Low Rider S",
  "Harley-Davidson Breakout", "Harley-Davidson Softail Slim", "Harley-Davidson Heritage Classic",
  "Harley-Davidson Road King", "Harley-Davidson Street Glide", "Harley-Davidson Road Glide", "Harley-Davidson Ultra Limited",
  "Harley-Davidson Pan America", "Harley-Davidson Sportster S", "Harley-Davidson Nightster",
  "Harley-Davidson V-Rod", "Harley-Davidson Night Rod",

  // Royal Enfield
  "Royal Enfield Meteor 350", "Royal Enfield Classic 350", "Royal Enfield Hunter 350", "Royal Enfield Bullet 350",
  "Royal Enfield Himalayan", "Royal Enfield Scram 411",
  "Royal Enfield Interceptor 650", "Royal Enfield Continental GT 650", "Royal Enfield Super Meteor 650", "Royal Enfield Shotgun 650",

  // Bajaj
  "Bajaj Dominar 400", "Bajaj Dominar 200", "Bajaj Dominar 160", "Bajaj Avenger 160", "Bajaj Pulsar",

  // Dafra
  "Dafra Citycom 300", "Dafra Citycom S 300", "Dafra Maxsym 400", "Dafra Cruisym 150", "Dafra Cruisym 300",
  "Dafra Apache RTR 200", "Dafra NH 190", "Dafra Next 250", "Dafra Next 300", "Dafra Horizon 150", "Dafra Horizon 250",
  "Dafra Kansas 150", "Dafra Speed 150", "Dafra Riva 150", "Dafra Zig", "Dafra Super 100", "Dafra Smart 125",

  // Haojue
  "Haojue DR 160", "Haojue DK 150", "Haojue DK 160", "Haojue Chopper Road 150", "Haojue Master Ride 150",
  "Haojue Lindy 125", "Haojue VR 150", "Haojue NK 150",

  // Shineray
  "Shineray XY 50", "Shineray Jet 50", "Shineray Phoenix 50", "Shineray Jet 125", "Shineray Worker 125",
  "Shineray JEF 150", "Shineray SHI 175", "Shineray Rio 125", "Shineray Ray 50",

  // Kasinski
  "Kasinski Comet 250", "Kasinski Comet 650", "Kasinski Mirage 150", "Kasinski Mirage 250", "Kasinski Mirage 650",
  "Kasinski Prima 150", "Kasinski Win 110",

  // Sundown
  "Sundown Web 100", "Sundown Hunter 100", "Sundown Max 125", "Sundown Future 125", "Sundown STX 200", "Sundown V-Blade 250",

  // Traxx
  "Traxx Star 50", "Traxx Sky 50", "Traxx Sky 125", "Traxx Moby 50", "Traxx TSS 150", "Traxx TSS 250",

  // Voltz
  "Voltz EVS", "Voltz EV1", "Voltz EV1 Sport",

  // KTM
  "KTM 200 Duke", "KTM 390 Duke", "KTM 390 Adventure", "KTM 890 Adventure", "KTM 1290 Super Duke R",
  "KTM 300 EXC", "KTM 250 EXC-F", "KTM 350 EXC-F", "KTM 450 EXC-F",

  // Husqvarna
  "Husqvarna Svartpilen 401", "Husqvarna Vitpilen 401", "Husqvarna Norden 901",

  // Zontes
  "Zontes R310", "Zontes V310", "Zontes T310", "Zontes GK350", "Zontes 350E"
].sort();

export const TESTIMONIALS = [
  // Para adicionar novas avaliações, copie e cole o bloco abaixo com os dados do cliente:
  // {
  //   id: 4,
  //   name: "Nome do Cliente",
  //   role: "Carro do Cliente",
  //   text: "Texto da avaliação...",
  //   rating: 5
  // },
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
  `Quero tirar dúvidas`
);

export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;