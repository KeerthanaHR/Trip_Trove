export interface Destination {
  id: string;
  name: string;
  region: string;
  category: string[];
  description: string;
  shortDescription: string;
  bestTimeToVisit: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  thingsToSee?: string[];
}

export const destinations: Destination[] = [
  {
    id: "hampi",
    name: "Hampi",
    region: "North Karnataka",
    category: ["Heritage", "History", "Architecture"],
    description: "Hampi, the capital city of the Vijayanagara Empire, is a UNESCO World Heritage Site known for its stunning ruins of temples, palaces, and monuments. Spread across a vast area, this ancient city preserves the magnificent legacy of one of South India's greatest kingdoms. The stone chariot at Vittala Temple, Virupaksha Temple, and the massive Lakshmi Narasimha statue are among the iconic sights that mesmerize visitors. Surrounded by boulder-strewn landscapes, Hampi offers a unique blend of history, spirituality, and natural beauty.",
    shortDescription: "UNESCO World Heritage Site with stunning ruins of the Vijayanagara Empire",
    bestTimeToVisit: "October to February",
    image: "https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 15.3350,
      lng: 76.4600
    }
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    region: "South Karnataka",
    category: ["Heritage", "Architecture", "Royal"],
    description: "The Mysore Palace, officially known as the Mysuru Palace, is the former palace of the royal family of Mysore. It is now one of the most famous tourist attractions in India, after the Taj Mahal, and has more than 6 million annual visitors. The palace was built in 1912 for the 24th Ruler of the Wodeyar Dynasty and is a fine example of Indo-Saracenic architecture. On Sundays and national holidays, the palace is spectacularly illuminated with nearly 100,000 lights, creating a breathtaking golden glow that attracts tourists and locals alike.",
    shortDescription: "Magnificent royal palace with Indo-Saracenic architecture and spectacular illuminations",
    bestTimeToVisit: "September to March",
    image: "https://images.unsplash.com/photo-1600100598629-200722fda2fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 12.3052,
      lng: 76.6552
    }
  },
  {
    id: "badami-caves",
    name: "Badami Cave Temples",
    region: "North Karnataka",
    category: ["Heritage", "History", "Spirituality"],
    description: "The Badami Cave Temples are a complex of ancient Hindu and Jain cave temples carved into the red sandstone surroundings of Badami in the 6th and 7th centuries. The caves showcase exceptional examples of Chalukyan architecture and feature intricately carved sculptures and friezes. Each cave is dedicated to different deities, with stunning representations of Vishnu, Shiva, and Mahavira. Beyond the caves, Badami offers the beautiful Agastya Lake surrounded by ancient temples and the impressive Badami Fort on the cliff above.",
    shortDescription: "Ancient rock-cut temples with magnificent sculptures from the Chalukya era",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1600100598626-28e4078364bd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFkYW1pJTIwY2F2ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 15.9239,
      lng: 75.6794
    }
  },
  {
    id: "coorg",
    name: "Coorg",
    region: "Western Ghats",
    category: ["Nature", "Hill Station", "Wildlife"],
    description: "Coorg, also known as Kodagu, is a misty hill station nestled in the Western Ghats. Famous for its coffee plantations, this region enchants visitors with verdant landscapes, cascading waterfalls, and dense forests. The Abbey Falls, Dubare Elephant Camp, and Raja's Seat (a scenic viewpoint) are popular attractions. Coorg is also home to the Nagarhole National Park, which harbors a rich diversity of wildlife including elephants, tigers, and numerous bird species. The district has a unique Kodava culture known for its hospitality, distinctive cuisine, and martial traditions.",
    shortDescription: "Misty hill station with coffee plantations, waterfalls, and rich biodiversity",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1580891587477-3ab84d823a39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vcmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 12.4244,
      lng: 75.7382
    }
  },
  {
    id: "gokarna",
    name: "Gokarna",
    region: "Coastal Karnataka",
    category: ["Beach", "Spirituality", "Adventure"],
    description: "Gokarna is a small temple town on the western coast of Karnataka that has become increasingly popular as a beach destination. It is home to ancient temples including the famous Mahabaleshwar Temple with its Atmalinga. What sets Gokarna apart are its pristine beaches - Om Beach (shaped like the Hindu symbol 'Om'), Kudle Beach, Half Moon Beach, and Paradise Beach - each offering a unique experience. The town perfectly balances its spiritual heritage with beach tourism, making it a place where visitors can find both religious significance and relaxed coastal vibes.",
    shortDescription: "Tranquil coastal town with pristine beaches and ancient temples",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1584731740820-84ed7653f103?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z29rYXJuYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 14.5479,
      lng: 74.3188
    }
  },
  {
    id: "bandipur",
    name: "Bandipur National Park",
    region: "South Karnataka",
    category: ["Wildlife", "Nature", "Safari"],
    description: "Bandipur National Park is a major wildlife sanctuary that protects several endangered species including tigers, elephants, and Indian bison. Part of the Nilgiri Biosphere Reserve, this park is covered by deciduous forests and supports diverse flora and fauna. Safari rides through the park offer visitors the chance to spot wildlife in their natural habitat. The park plays a crucial role in conservation efforts and represents one of India's premier tiger reserves. The nearby Himavad Gopalaswamy Hill provides panoramic views of the park and surrounding landscapes.",
    shortDescription: "Premier tiger reserve with rich biodiversity and safari experiences",
    bestTimeToVisit: "October to May",
    image: "https://images.unsplash.com/photo-1551527102-acfc74abf147?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFuZGlwdXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 11.6716,
      lng: 76.6342
    }
  },
  {
    id: "jog-falls",
    name: "Jog Falls",
    region: "Western Ghats",
    category: ["Nature", "Waterfall", "Scenic"],
    description: "Jog Falls is one of India's tallest waterfalls, where the Sharavathi River plunges from a height of 830 feet (253 meters). Unlike tiered waterfalls, Jog Falls descends in a single drop, creating a spectacular sight especially during the monsoon season when the water flow is at its peak. The falls comprise four distinct cascades - Raja, Rani, Rover, and Rocket - each with its own character and beauty. The surrounding area offers multiple viewpoints to appreciate this natural wonder, along with hiking trails through the lush forests of the Western Ghats.",
    shortDescription: "India's tallest waterfall with four magnificent cascades",
    bestTimeToVisit: "July to October",
    image: "https://images.unsplash.com/photo-1544156831-c8a1883d3fdd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8am9nJTIwZmFsbHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 14.2344,
      lng: 74.7949
    }
  },
  {
    id: "chikmagalur",
    name: "Chikmagalur",
    region: "Western Ghats",
    category: ["Hill Station", "Nature", "Coffee"],
    description: "Chikmagalur is a picturesque hill station known as the 'Coffee Land of Karnataka' for its vast coffee estates that dot the landscape. It offers breathtaking views of the Western Ghats and is home to peaks like Mullayanagiri (Karnataka's highest peak) and Baba Budangiri. Adventure enthusiasts can enjoy trekking, while nature lovers can explore the region's diverse flora and fauna. The area's pleasant climate, combined with the aroma of coffee plantations and stunning viewpoints like Kemmangundi and Z Point, make Chikmagalur a refreshing retreat from urban life.",
    shortDescription: "Coffee country with lush plantations and the highest peaks in Karnataka",
    bestTimeToVisit: "September to May",
    image: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpa21hZ2FsdXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 13.3161,
      lng: 75.7720
    }
  },
  {
    id: "murudeshwar",
    name: "Murudeshwar",
    region: "Coastal Karnataka",
    category: ["Beach", "Spirituality", "Architecture"],
    description: "Murudeshwar is renowned for housing the world's second-tallest Shiva statue (123 feet) overlooking the Arabian Sea. The statue is part of the Murudeshwar Temple complex situated on a hill called Kanduka Giri. The temple's 20-story gopura (tower) provides panoramic views of the coastline and is a significant architectural achievement. Beyond its religious importance, Murudeshwar offers beautiful beaches for relaxation and water sports. The surrounding waters are ideal for scuba diving and snorkeling, with rich marine life and clear visibility making it a growing center for underwater exploration in Karnataka.",
    shortDescription: "Coastal town featuring the world's second-tallest Shiva statue and pristine beaches",
    bestTimeToVisit: "October to May",
    image: "https://images.unsplash.com/photo-1623776025811-0fac82759617?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVydWRlc2h3YXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 14.0943,
      lng: 74.4882
    }
  },
  {
    id: "udupi",
    name: "Udupi",
    region: "Coastal Karnataka",
    category: ["Heritage", "Cuisine", "Beach"],
    description: "Udupi is famous for the Krishna Temple (Krishna Matha), founded by Madhvacharya, the proponent of Dvaita philosophy. The temple is known for its unique tradition of worship and the 'Kanakana Kindi', a small window through which Lord Krishna is said to have revealed himself to his devotee. Beyond its religious significance, Udupi is renowned for its distinctive cuisine that has spread worldwide. The region also features beautiful beaches like Malpe and St. Mary's Island, known for its unique hexagonal basalt rock formations. Udupi offers a harmonious blend of spirituality, culinary excellence, and coastal beauty.",
    shortDescription: "Temple town known for Krishna Matha, distinctive cuisine, and beautiful beaches",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1590338260802-a968b4b40d67?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWR1cGl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 13.3409,
      lng: 74.7421
    }
  },
  {
    id: "belur",
    name: "Belur",
    region: "Central Karnataka",
    category: ["Heritage", "Architecture", "History"],
    description: "Belur, once the capital of the Hoysala Empire, is home to the Chennakesava Temple, a masterpiece of Hoysala architecture. Built by King Vishnuvardhana in the 12th century, this temple is adorned with intricate sculptures and friezes depicting scenes from Hindu mythology. The elaborate artwork showcases extraordinary craftsmanship, with no two sculptures being identical. The temple stands on a star-shaped platform and features detailed bracket figures of celestial nymphs or 'Madanikas' in various poses. Belur, along with nearby Halebidu, represents the pinnacle of artistic achievement during the Hoysala era.",
    shortDescription: "Ancient Hoysala capital with the magnificent Chennakesava Temple",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1643382255428-e644761163a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVsdXIlMjBob3lzYWxhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 13.1654,
      lng: 75.8648
    }
  },
  {
    id: "halebidu",
    name: "Halebidu",
    region: "Central Karnataka",
    category: ["Heritage", "Architecture", "History"],
    description: "Halebidu, formerly known as Dwarasamudra, was the capital of the Hoysala Empire in the 12th century. Its crown jewel is the Hoysaleswara Temple, dedicated to Lord Shiva, which exemplifies the exquisite craftsmanship of Hoysala artisans. The temple walls are covered with an astonishing variety of sculptures depicting gods, goddesses, animals, birds, and scenes from daily life. The intricate stone carvings include detailed portrayals of dancers, musicians, mythological narratives, and geometric designs. Though the city was ransacked by invaders in the 14th century (hence the name Halebidu, meaning 'old city'), the temples stand as a testament to the artistic legacy of the Hoysala dynasty.",
    shortDescription: "Former Hoysala capital with the ornate Hoysaleswara Temple",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1599493056649-1b4beef11c8c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFsZWJpZHV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 13.2124,
      lng: 75.9960
    }
  },
  {
    id: "pattadakal",
    name: "Pattadakal",
    region: "North Karnataka",
    category: ["Heritage", "Architecture", "UNESCO"],
    description: "Pattadakal, a UNESCO World Heritage Site, showcases a remarkable blend of North Indian Nagara and South Indian Dravidian architectural styles in its complex of 7th and 8th-century temples. It served as the cultural capital and coronation place for the Chalukya kings. The Virupaksha Temple, built by Queen Lokamahadevi to commemorate her husband's victory over the Pallavas, is the largest and most impressive structure in the complex. The site demonstrates the evolution of temple architecture during the Chalukya period and represents an outstanding artistic achievement. Together with nearby Aihole and Badami, Pattadakal forms part of the triumvirate of early Chalukyan art.",
    shortDescription: "UNESCO site featuring a harmonious blend of northern and southern architectural styles",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1626108870272-1af94703f956?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGF0dGFkYWthbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 15.9500,
      lng: 75.8167
    }
  },
  {
    id: "aihole",
    name: "Aihole",
    region: "North Karnataka",
    category: ["Heritage", "Architecture", "History"],
    description: "Known as the 'Cradle of Indian Temple Architecture', Aihole has over 125 stone temples dating from the 4th to the 12th century. It served as an experimental ground where Chalukyan architects evolved their early temple styles before implementing them in Badami and Pattadakal. The Durga Temple (named for its fortress-like appearance, not the goddess) is the most famous, with its unique apsidal design. Other notable structures include the Lad Khan Temple, Huchimalli Temple, and the Buddhist chaitya-style Durga Temple. The Archaeological Museum in Aihole houses sculptures and artifacts that offer insights into the artistic developments of the Chalukyan era.",
    shortDescription: "Experimental ground for early Hindu temple architecture with over 125 stone temples",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1623394999771-e6c1b98cf714?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWlob2xlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 16.0239,
      lng: 75.8818
    }
  },
  {
    id: "kudremukh",
    name: "Kudremukh",
    region: "Western Ghats",
    category: ["Nature", "Trekking", "Wildlife"],
    description: "Kudremukh, meaning 'horse face' in Kannada (named after a mountain shape resembling a horse's face), is a mountain range and national park in the Western Ghats. The region is characterized by dense forests, rolling meadows, and pristine streams, making it one of Karnataka's most biodiverse areas. The trek to Kudremukh peak (1,892 meters) is challenging but rewarding, offering stunning views of the Lakya Dam, Shola forests, and surrounding landscapes. The national park protects numerous endangered species including lion-tailed macaques, tigers, and King Cobras. The Kadambi Waterfalls and Hanuman Gundi Falls are popular attractions around Kudremukh.",
    shortDescription: "Biodiverse national park with challenging treks and lush landscapes",
    bestTimeToVisit: "October to May",
    image: "https://images.unsplash.com/photo-1594476664596-afb01c2d249e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a3VkcmVtdWtofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 13.1923,
      lng: 75.2698
    }
  },
  {
    id: "kabini",
    name: "Kabini",
    region: "South Karnataka",
    category: ["Wildlife", "Safari", "Nature"],
    description: "Kabini, named after the river that flows through it, is one of India's premier wildlife destinations. Part of the Nagarhole National Park, it's known for its high density of Asian elephants and leopards. The Kabini backwaters, formed by the Kabini Dam, attract large herds of elephants during summer, creating spectacular sighting opportunities. Safari options include jeep drives and boat rides, each offering different wildlife viewing experiences. The area supports diverse ecosystems including deciduous forests and water bodies, creating habitats for varied species including tigers, gaur, wild dogs, and over 250 bird species. Luxury eco-resorts around Kabini provide comfortable bases for wildlife exploration.",
    shortDescription: "Premier wildlife destination with abundant elephants, leopards, and boat safaris",
    bestTimeToVisit: "October to May",
    image: "https://images.unsplash.com/photo-1591790718936-948f8366f5c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2FiaW5pfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    location: {
      lat: 11.9876,
      lng: 76.3543
    }
  }
];

export const additionalDestinations: Destination[] = [
  {
    id: "dandeli",
    name: "Dandeli",
    region: "Western Ghats",
    category: ["Adventure", "Wildlife", "Nature"],
    description: "Dandeli is an adventure hub nestled in the Western Ghats, famous for white water rafting on the Kali River. The dense forests of Dandeli Wildlife Sanctuary are home to black panthers, tigers, elephants, and over 300 bird species, making it a paradise for wildlife enthusiasts. Adventure seekers can enjoy activities like kayaking, natural jacuzzi baths, and night camping. The area also features beautiful spots like Syntheri Rocks, Kavala Caves, and the scenic Sathodi Falls.",
    shortDescription: "Adventure paradise with white water rafting and rich wildlife",
    bestTimeToVisit: "October to May",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: {
      lat: 15.2493,
      lng: 74.6198
    },
    thingsToSee: [
      "White Water Rafting on Kali River",
      "Dandeli Wildlife Sanctuary",
      "Syntheri Rocks",
      "Kavala Caves",
      "Sathodi Falls"
    ]
  },
  {
    id: "nandi-hills",
    name: "Nandi Hills",
    region: "South Karnataka",
    category: ["Hill Station", "Sunrise", "History"],
    description: "Nandi Hills is a picturesque hill station located near Bangalore, famous for its breathtaking sunrise views. The ancient Nandi Temple atop the hill gives it its name. Historical significance comes from Tipu Sultan's summer retreat and fort. Visitors can enjoy paragliding, cycling, and trekking, or simply soak in the panoramic views of lush greenery and mist-covered landscapes. The hills are also home to a variety of bird species, making it a favorite spot for birdwatchers.",
    shortDescription: "Scenic hill station near Bangalore famous for spectacular sunrises",
    bestTimeToVisit: "Year-round (October to June is ideal)",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: {
      lat: 13.3702,
      lng: 77.6835
    },
    thingsToSee: [
      "Sunrise Point",
      "Tipu's Drop",
      "Nandi Temple",
      "Tipu's Summer Residence",
      "Brahmashram"
    ]
  },
  {
    id: "agumbe",
    name: "Agumbe",
    region: "Western Ghats",
    category: ["Rainforest", "Nature", "Scenic"],
    description: "Known as the 'Cherrapunji of the South' for its high rainfall, Agumbe is a beautiful village in the Western Ghats famous for its rainforest ecosystem and spectacular sunsets. It's a biodiversity hotspot known for the king cobra and hosts the Agumbe Rainforest Research Station. The lush green landscapes feature numerous waterfalls including Onake Abbi, Barkana, and Jogigundi. The area also served as the setting for the famous TV series 'Malgudi Days', adding cultural significance to its natural beauty.",
    shortDescription: "Rainforest village with spectacular sunsets and rich biodiversity",
    bestTimeToVisit: "November to February",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: {
      lat: 13.5009,
      lng: 75.0954
    },
    thingsToSee: [
      "Sunset View Point",
      "Onake Abbi Falls",
      "Barkana Falls",
      "Jogigundi Falls",
      "Agumbe Rainforest Research Station"
    ]
  },
  {
    id: "mangalore",
    name: "Mangalore",
    region: "Coastal Karnataka",
    category: ["Beach", "Culture", "Cuisine"],
    description: "Mangalore, officially known as Mangaluru, is a major port city on the Arabian Sea. It's known for its distinct culture, beautiful beaches, and diverse cuisine. The city features a blend of temples, churches, and mosques reflecting its cultural diversity. Beaches like Panambur, Tannirbhavi, and Sasihithlu offer scenic coastal experiences. Mangalore is famous for its seafood dishes and unique Mangalorean cuisine, including Kori Rotti and Neer Dosa. The city also serves as a gateway to many tourist destinations in Karnataka.",
    shortDescription: "Vibrant port city with beautiful beaches and unique cuisine",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: {
      lat: 12.9141,
      lng: 74.8560
    },
    thingsToSee: [
      "Panambur Beach",
      "Tannirbhavi Beach",
      "Kadri Manjunath Temple",
      "St. Aloysius Chapel",
      "Sultan Battery"
    ]
  },
  {
    id: "bidar",
    name: "Bidar",
    region: "North Karnataka",
    category: ["Heritage", "History", "Architecture"],
    description: "Bidar is a historic city known for its impressive Bidar Fort and unique Bidriware metalcraft. The fort, built in the 15th century, features Persian, Turkish, and Indian architectural influences. The city is home to the ancient Mahmud Gawan Madrasa, an impressive Islamic learning center, and numerous tombs of Bahmani and Barid Shahi rulers. The black soil of Bidar is key to the famous Bidriware, a metal handicraft inlaid with silver. The city offers a glimpse into medieval Indian history with its well-preserved monuments.",
    shortDescription: "Historic city famous for Bidar Fort and Bidriware metalcraft",
    bestTimeToVisit: "October to March",
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: {
      lat: 17.9104,
      lng: 77.5199
    },
    thingsToSee: [
      "Bidar Fort",
      "Mahmud Gawan Madrasa",
      "Bahmani Tombs",
      "Chaubara",
      "Bidriware Artisans"
    ]
  }
];

export const allDestinations = [...destinations, ...additionalDestinations];

export function getDestinationById(id: string): Destination | undefined {
  return allDestinations.find(destination => destination.id === id);
}

export function getNearbyDestinations(id: string, limit: number = 3): Destination[] {
  const destination = getDestinationById(id);
  if (!destination) return [];
  
  let nearby = allDestinations.filter(d => 
    d.id !== id && (
      d.region === destination.region || 
      d.category.some(c => destination.category.includes(c))
    )
  );
  
  if (nearby.length < limit) {
    const otherDestinations = allDestinations.filter(d => 
      d.id !== id && 
      !nearby.some(nd => nd.id === d.id)
    );
    
    nearby = [...nearby, ...otherDestinations];
  }
  
  return nearby
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
}
