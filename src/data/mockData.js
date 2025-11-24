/**
 * Mock data for network map
 * This simulates what will eventually come from Supabase
 *
 * Database schema:
 * - people: id, first_name, last_name, profile_picture, bio
 * - locations: id, person_id, label, latitude, longitude
 */

// People table mock data
export const people = [
  {
    id: 1,
    first_name: "Lucas",
    last_name: "Silva",
    profile_picture: "https://i.pravatar.cc/200?img=12",
    bio: "Software engineer passionate about web development and open source",
  },
  {
    id: 2,
    first_name: "Kaio",
    last_name: "Santos",
    profile_picture: "https://i.pravatar.cc/200?img=33",
    bio: "Data scientist exploring machine learning and AI applications",
  },
  {
    id: 3,
    first_name: "Maya",
    last_name: "Patel",
    profile_picture: "https://i.pravatar.cc/200?img=45",
    bio: "Electrical engineer working on hardware-software integration",
  },
  {
    id: 4,
    first_name: "James",
    last_name: "Chen",
    profile_picture: "https://i.pravatar.cc/200?img=68",
    bio: "AI researcher focused on natural language processing",
  },
  {
    id: 5,
    first_name: "Sofia",
    last_name: "Rodriguez",
    profile_picture: "https://i.pravatar.cc/200?img=47",
    bio: "Entrepreneur building sustainable tech solutions",
  },
  {
    id: 6,
    first_name: "Ahmed",
    last_name: "Hassan",
    profile_picture: "https://i.pravatar.cc/200?img=59",
    bio: "Mechanical engineer developing renewable energy systems",
  },
  {
    id: 7,
    first_name: "Emma",
    last_name: "Johnson",
    profile_picture: "https://i.pravatar.cc/200?img=25",
    bio: "UX designer creating accessible and inclusive products",
  },
  {
    id: 8,
    first_name: "Yuki",
    last_name: "Tanaka",
    profile_picture: "https://i.pravatar.cc/200?img=52",
    bio: "Robotics engineer building autonomous systems",
  },
  {
    id: 9,
    first_name: "Pedro",
    last_name: "Madureira",
    profile_picture: "https://i.pravatar.cc/200?img=22",
    bio: "Improv + chemistry",
  },
  {
    id: 10,
    first_name: "Helio",
    last_name: "Nitrogen",
    profile_picture: "https://i.pravatar.cc/200?img=24",
    bio: "coffee addict, ironman, cs teacher",
  },
];

// Locations table mock data
export const locations = [
  // Lucas's locations
  {
    id: 1,
    person_id: 1,
    label: "Northwestern University",
    latitude: 42.050703,
    longitude: -87.678376,
    connection: "College",
  },
  {
    id: 2,
    person_id: 1,
    label: "São Paulo, Brazil",
    latitude: -23.579313,
    longitude: -46.639187,
    connection: "Hometown",
  },
  // Kaio's locations
  {
    id: 3,
    person_id: 2,
    label: "Northwestern University",
    latitude: 42.050703,
    longitude: -87.678376,
    connection: "College",
  },
  {
    id: 4,
    person_id: 2,
    label: "Belo Horizonte, Brazil",
    latitude: -19.927092,
    longitude: -43.953965,
    connection: "Hometown",
  },
  // Maya's locations
  {
    id: 5,
    person_id: 3,
    label: "Stanford University",
    latitude: 37.429464,
    longitude: -122.169719,
    connection: "Grad School",
  },
  {
    id: 6,
    person_id: 3,
    label: "Mumbai, India",
    latitude: 19.075983,
    longitude: 72.877426,
    connection: "Hometown",
  },
  {
    id: 7,
    person_id: 3,
    label: "Mountain View, CA",
    latitude: 37.422,
    longitude: -122.084,
    connection: "Work",
  },
  // James's locations
  {
    id: 8,
    person_id: 4,
    label: "MIT",
    latitude: 42.360253,
    longitude: -71.092003,
    connection: "College",
  },
  {
    id: 9,
    person_id: 4,
    label: "Hong Kong",
    latitude: 22.396428,
    longitude: 114.109497,
    connection: "Hometown",
  },
  // Sofia's locations
  {
    id: 10,
    person_id: 5,
    label: "UC Berkeley",
    latitude: 37.871899,
    longitude: -122.258515,
    connection: "College",
  },
  {
    id: 11,
    person_id: 5,
    label: "Mexico City, Mexico",
    latitude: 19.432608,
    longitude: -99.133209,
    connection: "Hometown",
  },
  // Ahmed's locations
  {
    id: 12,
    person_id: 6,
    label: "Northwestern University",
    latitude: 42.050703,
    longitude: -87.678376,
    connection: "College",
  },
  {
    id: 13,
    person_id: 6,
    label: "Cairo, Egypt",
    latitude: 30.04442,
    longitude: 31.235712,
    connection: "Hometown",
  },
  // Emma's locations
  {
    id: 14,
    person_id: 7,
    label: "Stanford University",
    latitude: 37.429464,
    longitude: -122.169719,
    connection: "College",
  },
  {
    id: 15,
    person_id: 7,
    label: "London, UK",
    latitude: 51.507351,
    longitude: -0.127758,
    connection: "Hometown",
  },
  // Yuki's locations
  {
    id: 16,
    person_id: 8,
    label: "MIT",
    latitude: 42.360253,
    longitude: -71.092003,
    connection: "College",
  },
  {
    id: 17,
    person_id: 8,
    label: "Tokyo, Japan",
    latitude: 35.689487,
    longitude: 139.691706,
    connection: "Hometown",
  },
  {
    id: 18,
    person_id: 8,
    label: "MIT Research Lab",
    latitude: 42.361145,
    longitude: -71.089264,
    connection: "Work",
  },
  {
    id: 19,
    person_id: 9,
    label: "Ari de Sá Cavalcante",
    latitude: -3.745609541860808,
    longitude: -38.49246048706968,
    connection: "School",
  },
  {
    id: 20,
    person_id: 10,
    label: "Home",
    latitude: 31.2555372007631,
    longitude: 121.44630961706912,
    connection: "Home",
  },
];

/**
 * Helper function to join people with their locations
 * Simulates a SQL JOIN or Supabase query with relations
 */
export const getPeopleWithLocations = () => {
  return people.map((person) => ({
    ...person,
    locations: locations.filter((loc) => loc.person_id === person.id),
  }));
};

/**
 * Helper function to get a person by ID with their locations
 */
export const getPersonById = (personId) => {
  const person = people.find((p) => p.id === personId);
  if (!person) return null;

  return {
    ...person,
    locations: locations.filter((loc) => loc.person_id === personId),
  };
};

/**
 * Helper function to get all locations with person info
 * Useful for rendering markers with person details
 */
export const getLocationsWithPeople = () => {
  return locations.map((location) => {
    const person = people.find((p) => p.id === location.person_id);
    return {
      ...location,
      person,
    };
  });
};
