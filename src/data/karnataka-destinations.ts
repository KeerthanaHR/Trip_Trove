
export interface Destination {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string[];
  bestTimeToVisit: string;
  thingsToSee: string[];
  nearbyDestinations: string[];
}

export const destinations: Destination[] = [
  {
    id: "hampi",
    name: "Hampi",
    description: "Hampi, a UNESCO World Heritage Site, is an ancient village featuring the ruins of the Vijayanagara Empire. Once one of the richest and largest cities in the world, it's now characterized by its stunning boulder-strewn landscape, ancient temple complexes, and intricate stone carvings that transport visitors back to the 14th century.",
    shortDescription: "Ancient ruins of the Vijayanagara Empire with stunning boulder landscapes and temple complexes.",
    image: "https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 15.3350,
      lng: 76.4600
    },
    category: ["Historical", "UNESCO World Heritage", "Architecture"],
    bestTimeToVisit: "October to February",
    thingsToSee: [
      "Virupaksha Temple",
      "Vittala Temple with Stone Chariot",
      "Hemakuta Hill",
      "Queen's Bath",
      "Elephant Stables"
    ],
    nearbyDestinations: ["badami", "hospet"]
  },
  {
    id: "mysore",
    name: "Mysore Palace",
    description: "The Mysore Palace, officially known as the Mysuru Palace, is a historical palace and the official residence of the Wadiyar dynasty who ruled the Kingdom of Mysore from 1399 to 1950. The palace is a three-story stone structure with marble domes and a 145-foot five-story tower. The palace is known for its Indo-Saracenic style of architecture which blends Hindu, Muslim, Rajput, and Gothic styles.",
    shortDescription: "Magnificent historical palace with Indo-Saracenic architecture and opulent interiors.",
    image: "https://images.unsplash.com/photo-1600100598629-200722fda2fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 12.3052,
      lng: 76.6552
    },
    category: ["Historical", "Architecture", "Royal Heritage"],
    bestTimeToVisit: "September to March",
    thingsToSee: [
      "Illuminated Palace (Sundays and holidays)",
      "Durbar Hall",
      "Royal Artifacts",
      "Royal Paintings",
      "Chamundi Hill"
    ],
    nearbyDestinations: ["coorg", "bandipur"]
  },
  {
    id: "badami",
    name: "Badami Cave Temples",
    description: "Badami Cave Temples, formerly known as Vatapi, are a complex of four Hindu, Jain, and possibly Buddhist cave temples located in Badami, Karnataka. The caves, carved out of the soft Badami sandstone on a hill cliff in the late 6th to 7th centuries, feature intricate carvings and sculptures depicting various deities of the Hindu pantheon and are considered important examples of Indian rock-cut architecture.",
    shortDescription: "Ancient cave temples with intricate carvings from the 6th century featuring Hindu and Jain art.",
    image: "https://images.unsplash.com/photo-1600100598626-28e4078364bd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFkYW1pJTIwY2F2ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 15.9199,
      lng: 75.6873
    },
    category: ["Historical", "Architecture", "Religious"],
    bestTimeToVisit: "October to March",
    thingsToSee: [
      "Cave 1 (Shiva Cave)",
      "Cave 2 (Vishnu Cave)",
      "Cave 3 (Largest, dedicated to Vishnu)",
      "Cave 4 (Jain Cave)",
      "Agastya Lake"
    ],
    nearbyDestinations: ["pattadakal", "aihole"]
  },
  {
    id: "coorg",
    name: "Coorg",
    description: "Coorg, also known as Kodagu, is a rural district in Karnataka state known for its breathtaking landscapes, coffee plantations, and unique culture. Referred to as the 'Scotland of India', Coorg features misty hills, lush forests, and cascading waterfalls. The region is home to the Kodavas, who have a distinct culture and martial traditions.",
    shortDescription: "Misty hill station with coffee plantations, waterfalls, and lush landscapes known as the Scotland of India.",
    image: "https://images.unsplash.com/photo-1580891587477-3ab84d823a39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vcmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 12.4244,
      lng: 75.7382
    },
    category: ["Hill Station", "Nature", "Adventure"],
    bestTimeToVisit: "October to March",
    thingsToSee: [
      "Abbey Falls",
      "Raja's Seat",
      "Dubare Elephant Camp",
      "Namdroling Monastery",
      "Tadiandamol Peak"
    ],
    nearbyDestinations: ["mysore", "wayanad"]
  },
  {
    id: "gokarna",
    name: "Gokarna",
    description: "Gokarna is a small temple town on the western coast of India, known for its pristine beaches and Hindu pilgrimage sites. The town is a laid-back alternative to the more commercialized beaches in neighboring states and features a number of beautiful beaches framed by rocky cliffs, clear waters, and sandy shores.",
    shortDescription: "Temple town with pristine beaches, pilgrimage sites, and a laid-back atmosphere.",
    image: "https://images.unsplash.com/photo-1580100898243-91624367fcc4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z29rYXJuYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 14.5479,
      lng: 74.3188
    },
    category: ["Beach", "Pilgrimage", "Nature"],
    bestTimeToVisit: "October to March",
    thingsToSee: [
      "Om Beach",
      "Half Moon Beach",
      "Paradise Beach",
      "Mahabaleshwar Temple",
      "Kudle Beach"
    ],
    nearbyDestinations: ["murudeshwar", "karwar"]
  },
  {
    id: "bandipur",
    name: "Bandipur National Park",
    description: "Bandipur National Park is a beautiful wildlife reserve nestled in the foothills of the Nilgiri Mountains. Established in 1974 as a tiger reserve under Project Tiger, it's known for its significant population of Bengal tigers, Indian elephants, spotted deer, and various species of birds. The park features diverse habitats including deciduous forests, shrublands, and riparian forests.",
    shortDescription: "Wildlife sanctuary known for tigers, elephants, and diverse flora and fauna.",
    image: "https://images.unsplash.com/photo-1580100898118-dc4752ddc1b8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFuZGlwdXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 11.6700,
      lng: 76.6338
    },
    category: ["Wildlife", "Nature", "Safari"],
    bestTimeToVisit: "October to May",
    thingsToSee: [
      "Bengal Tigers",
      "Indian Elephants",
      "Gaur (Indian Bison)",
      "Jungle Safari",
      "Gopalaswamy Betta"
    ],
    nearbyDestinations: ["mysore", "wayanad"]
  },
  {
    id: "jog-falls",
    name: "Jog Falls",
    description: "Jog Falls, created by the Sharavathi River, is the second-highest plunge waterfall in India. Located in the Western Ghats, these segmented falls drop 253 meters (830 feet) in four distinct cascades known locally as Raja, Rani, Rover, and Rocket. During the monsoon season, the falls are at their most spectacular as water thunders down into the valley below.",
    shortDescription: "India's second-highest plunge waterfall with four magnificent cascades in the Western Ghats.",
    image: "https://images.unsplash.com/photo-1629995233566-9aaf7a137200?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8am9nJTIwZmFsbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    location: {
      lat: 14.2236,
      lng: 74.7933
    },
    category: ["Waterfall", "Nature", "Photography"],
    bestTimeToVisit: "July to October",
    thingsToSee: [
      "The Four Cascades",
      "Sharavathi Valley",
      "Linganamakki Dam",
      "Watkins Platform",
      "Jog Falls View Point"
    ],
    nearbyDestinations: ["gokarna", "murdeshwar"]
  },
  {
    id: "chikmagalur",
    name: "Chikmagalur",
    description: "Chikmagalur is a hill station in Karnataka, known for its coffee plantations, lush forests, and mountain views. Located in the foothills of the Mullayanagiri range, it's often called the 'Coffee Land of Karnataka' as it was the place where coffee was first cultivated in India. The region offers pristine trekking routes, wildlife sanctuaries, and a pleasant climate year-round.",
    shortDescription: "Coffee-growing hill station with lush plantations, mountain peaks, and adventure opportunities.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpa21hZ2FsdXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    location: {
      lat: 13.3161,
      lng: 75.7720
    },
    category: ["Hill Station", "Nature", "Adventure"],
    bestTimeToVisit: "September to May",
    thingsToSee: [
      "Mullayanagiri Peak",
      "Baba Budangiri",
      "Hebbe Falls",
      "Coffee Plantations",
      "Kudremukh National Park"
    ],
    nearbyDestinations: ["coorg", "shimoga"]
  },
  {
    id: "murudeshwar",
    name: "Murudeshwar",
    description: "Murudeshwar is a coastal town famous for housing the world's second-tallest Shiva statue (123 feet) overlooking the Arabian Sea. The town is centered around the Murudeshwar Temple which sits on a hill surrounded by the sea on three sides. The combination of religious significance, spectacular architecture, and beautiful beaches makes it a popular destination.",
    shortDescription: "Coastal temple town with the world's second-tallest Shiva statue overlooking the Arabian Sea.",
    image: "https://images.unsplash.com/photo-1621532933396-41493bc17c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVydWRlc2h3YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    location: {
      lat: 14.0940,
      lng: 74.4869
    },
    category: ["Religious", "Beach", "Architecture"],
    bestTimeToVisit: "October to May",
    thingsToSee: [
      "Shiva Statue",
      "Murudeshwar Temple",
      "Murudeshwar Beach",
      "Gopura (Raja Gopura)",
      "Netrani Island"
    ],
    nearbyDestinations: ["gokarna", "jog-falls"]
  },
  {
    id: "udupi",
    name: "Udupi",
    description: "Udupi is a coastal city known for its Krishna Temple, distinctive cuisine, and beautiful beaches. It's one of the seven holy cities of Hinduism and a major pilgrimage site. Besides its religious significance, Udupi is famous for its vegetarian cuisine, which has influenced South Indian restaurants worldwide. The city blends spirituality, culture, and natural beauty.",
    shortDescription: "Coastal temple town famous for Krishna Temple, distinctive cuisine, and beautiful beaches.",
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWR1cGl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    location: {
      lat: 13.3409,
      lng: 74.7421
    },
    category: ["Religious", "Cuisine", "Beach"],
    bestTimeToVisit: "October to March",
    thingsToSee: [
      "Sri Krishna Temple",
      "Malpe Beach",
      "St. Mary's Island",
      "Kaup Beach & Lighthouse",
      "Manipal Museum"
    ],
    nearbyDestinations: ["mangalore", "murudeshwar"]
  }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};

export const getDestinationByName = (name: string): Destination | undefined => {
  return destinations.find(destination => destination.name.toLowerCase() === name.toLowerCase());
};

export const getNearbyDestinations = (id: string): Destination[] => {
  const destination = getDestinationById(id);
  if (!destination) return [];
  
  return destinations.filter(d => destination.nearbyDestinations.includes(d.id));
};
