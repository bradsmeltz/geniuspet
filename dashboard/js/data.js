/**
 * GeniusPet Dashboard - Mock Data
 * This file contains all the demo data for the prototype
 */

const MockData = {
  // User data
  user: {
    id: 1,
    name: "Arthur",
    firstName: "Arthur",
    lastName: "Smith",
    email: "arthur@example.com",
    memberSince: "2024-01-15",
    plan: "free", // "free" | "mid" | "advanced"
    phoneVerified: true,
    phone: "+1 (555) 123-4567",
    // Product enrollments
    hasTeleVet: false,
    hasInsurance: false,
    hasRx: false
  },

  // Pets data
  pets: [
    {
      id: 1,
      name: "Louis",
      photo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop&crop=face",
      breed: "Nova Scotia Duck Tolling Retriever",
      age: "1 year",
      sex: "Male",
      weight: "33 lbs",
      color: "Red/Orange",
      microchipId: "985112345678901",

      // Profile completion flags
      hasPhoto: true,
      basicComplete: true,
      healthInfoComplete: false,
      emergencyContacts: [],
      behaviorComplete: true,

      // Additional info
      kidFriendly: true,
      okayWithPets: true,
      spayedNeutered: true,
      rabiesVaccine: true,

      // Health sections
      allergies: "",
      medicalIssues: "",
      medications: "",
      foodPreferences: "Dry kibble, loves carrots as treats",

      // Advanced (paid) sections
      routines: "",
      environment: "",
      comfort: "",
      preferences: "",

      // Alert features
      emailAlertsEnabled: true, // Always on for free
      smsAlertsEnabled: false,
      phoneCallAlertsEnabled: false,
      lostPetNetworkActive: false,
      gpsEnabled: false,

      // Stats
      totalScans: 5,
      lastScan: "2024-01-28",
      tagRegistered: "2024-01-20",
      tagId: "GP-2024-001234"
    },
    {
      id: 2,
      name: "Bella",
      photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face",
      breed: "Golden Retriever",
      age: "3 years",
      sex: "Female",
      weight: "65 lbs",
      color: "Golden",
      microchipId: "985112345678902",

      hasPhoto: true,
      basicComplete: true,
      healthInfoComplete: true,
      emergencyContacts: ["Mom - (555) 987-6543", "Vet - (555) 456-7890"],
      behaviorComplete: true,

      kidFriendly: true,
      okayWithPets: true,
      spayedNeutered: true,
      rabiesVaccine: true,

      allergies: "Chicken",
      medicalIssues: "Hip dysplasia - mild",
      medications: "Joint supplement daily",
      foodPreferences: "Salmon-based kibble",

      routines: "",
      environment: "",
      comfort: "",
      preferences: "",

      emailAlertsEnabled: true,
      smsAlertsEnabled: true,
      phoneCallAlertsEnabled: true,
      lostPetNetworkActive: true,
      gpsEnabled: true,

      totalScans: 12,
      lastScan: "2024-01-25",
      tagRegistered: "2023-06-10",
      tagId: "GP-2023-005678"
    },
    {
      id: 3,
      name: "Mia",
      photo: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=200&h=200&fit=crop&crop=face",
      breed: "Border Collie",
      age: "2 years",
      sex: "Female",
      weight: "42 lbs",
      color: "Black & White",
      microchipId: "985112345678903",

      hasPhoto: true,
      basicComplete: true,
      healthInfoComplete: true,
      emergencyContacts: ["Dad - (555) 222-3333", "Neighbor - (555) 444-5555"],
      behaviorComplete: true,

      kidFriendly: true,
      okayWithPets: true,
      spayedNeutered: true,
      rabiesVaccine: true,

      allergies: "",
      medicalIssues: "",
      medications: "",
      foodPreferences: "Grain-free kibble, loves blueberries",

      routines: "",
      environment: "",
      comfort: "",
      preferences: "",

      emailAlertsEnabled: true,
      smsAlertsEnabled: true,
      phoneCallAlertsEnabled: true,
      lostPetNetworkActive: true,
      gpsEnabled: true,

      totalScans: 8,
      lastScan: "2024-02-01",
      tagRegistered: "2023-09-15",
      tagId: "GP-2023-007890"
    },
    {
      id: 4,
      name: "Charlie",
      photo: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop&crop=face",
      breed: "French Bulldog",
      age: "4 years",
      sex: "Male",
      weight: "28 lbs",
      color: "Fawn",
      microchipId: "985112345678904",

      hasPhoto: true,
      basicComplete: true,
      healthInfoComplete: true,
      emergencyContacts: ["Partner - (555) 666-7777", "Dog Walker - (555) 888-9999"],
      behaviorComplete: true,

      kidFriendly: true,
      okayWithPets: false,
      spayedNeutered: true,
      rabiesVaccine: true,

      allergies: "Grain sensitivity",
      medicalIssues: "Brachycephalic - monitor breathing in heat",
      medications: "Allergy chews daily",
      foodPreferences: "Limited ingredient, duck-based",

      routines: "",
      environment: "",
      comfort: "",
      preferences: "",

      emailAlertsEnabled: true,
      smsAlertsEnabled: true,
      phoneCallAlertsEnabled: true,
      lostPetNetworkActive: true,
      gpsEnabled: true,

      totalScans: 15,
      lastScan: "2024-02-03",
      tagRegistered: "2023-03-20",
      tagId: "GP-2023-003456"
    }
  ],

  // Demo scenarios: each pet showcases a different product tier
  // Switching pets applies these user-level settings
  petScenarios: {
    1: { plan: 'free', hasTeleVet: false, hasInsurance: false, hasRx: false },      // Louis: Free tier
    2: { plan: 'advanced', hasTeleVet: false, hasInsurance: false, hasRx: false },   // Bella: Advanced Protection
    3: { plan: 'advanced', hasTeleVet: true, hasInsurance: false, hasRx: false },    // Mia: Advanced + TeleVet
    4: { plan: 'advanced', hasTeleVet: true, hasInsurance: true, hasRx: false }      // Charlie: Advanced + TeleVet + Insurance
  },

  // Community stats
  community: {
    membersNearby: 47,
    sheltersNearby: 10,
    networkRadius: "20 miles",
    totalMembers: 125000,
    petsReunited: 8500
  },

  // Scan history for activity page
  scanHistory: [
    {
      id: 1,
      petId: 1,
      date: "2024-01-28",
      time: "2:34 PM",
      type: "scan",
      location: "San Francisco, CA",
      description: "Tag scanned by finder"
    },
    {
      id: 2,
      petId: 1,
      date: "2024-01-20",
      time: "10:15 AM",
      type: "registration",
      location: null,
      description: "Tag registered"
    },
    {
      id: 3,
      petId: 2,
      date: "2024-01-25",
      time: "4:22 PM",
      type: "scan",
      location: "Palo Alto, CA",
      description: "Tag scanned at vet office"
    },
    {
      id: 4,
      petId: 3,
      date: "2024-02-01",
      time: "11:45 AM",
      type: "scan",
      location: "Mountain View, CA",
      description: "Tag scanned at dog park"
    },
    {
      id: 5,
      petId: 3,
      date: "2023-09-15",
      time: "9:00 AM",
      type: "registration",
      location: null,
      description: "Tag registered"
    },
    {
      id: 6,
      petId: 4,
      date: "2024-02-03",
      time: "3:15 PM",
      type: "scan",
      location: "San Jose, CA",
      description: "Tag scanned by neighbor"
    },
    {
      id: 7,
      petId: 4,
      date: "2023-03-20",
      time: "10:30 AM",
      type: "registration",
      location: null,
      description: "Tag registered"
    }
  ],

  // Pricing
  pricing: {
    advanced: {
      yearly: 89,
      quarterly: 14.95, // per month, billed quarterly
      lifetime: 297
    },
    family: {
      yearly: 149, // up to 4 pets
      additionalPet: 49
    },
    geniusVet: {
      monthly: 19.99
    },
    geniusInsure: {
      monthly: 29.99
    }
  },

  // Safety Score weights (100 pts total across 5 tiers)
  scoreWeights: {
    // TIER 1 - Profile Basics (max 40, free)
    hasPhoto: 5,
    basicComplete: 10,
    healthInfoComplete: 8,
    emergencyContacts: 10,
    phoneVerified: 5,
    behaviorComplete: 2,
    // TIER 2 - Advanced Protection (max 25, requires plan)
    smsAlertsEnabled: 7,
    lostPetNetworkActive: 10,
    gpsEnabled: 8,
    // TIER 3 - TeleVet (max 15)
    televetEnrolled: 15,
    // TIER 4 - Insurance (max 15)
    insuranceEnrolled: 15,
    // TIER 5 - Pet RX (max 5, coming soon)
    rxEnrolled: 5
  },

  // Tier definitions for UI
  scoreTiers: {
    profile:  { label: 'Pet Profile',         max: 40, icon: 'clipboard-list', color: 'teal' },
    advanced: { label: 'Advanced Protection',  max: 25, icon: 'shield',         color: 'blue' },
    televet:  { label: 'TeleVet',             max: 15, icon: 'stethoscope',    color: 'teal' },
    insurance:{ label: 'Pet Insurance',        max: 15, icon: 'heart-handshake',color: 'gold' },
    rx:       { label: 'Pet RX',              max: 5,  icon: 'pill',           color: 'purple' }
  },

  // Feature tier requirements
  featureTiers: {
    // Alerts
    emailAlerts: 'free',
    smsAlerts: 'advanced',
    phoneCallAlerts: 'advanced',
    gpsLocation: 'advanced',
    lostPetNetwork: 'advanced',
    // Profile sections
    healthMedical: 'free',
    behaviorSocial: 'free',
    petPreferences: 'mid',
    dailyRoutines: 'mid',
    environmentComfort: 'mid'
  }
};

// Freeze to prevent accidental mutations
Object.freeze(MockData);
Object.freeze(MockData.user);
MockData.pets.forEach(pet => Object.freeze(pet));
Object.freeze(MockData.community);
Object.freeze(MockData.pricing);
Object.freeze(MockData.scoreWeights);
Object.freeze(MockData.scoreTiers);
Object.freeze(MockData.petScenarios);
