import mongoose from "mongoose";
import connectDB from "../config/db.js";
import SkinIssue from "../models/SkinIssue.js";

connectDB();

const seedData = [
  {
    name: "eczema",
    keywords: ["eczema","Eczema"],
    condition: "Eczema or Dermatitis",
    doctors: [
      {
        name: "Dr. Mouma Barik",
        specialization: "Dermatologist",
        experience: "12 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.5
      },
      {
        name: "Dr. Avilasa Maji",
        specialization: "Allergist",
        experience: "8 years",
        hospital: "Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.2
      },
      {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Sirsan Das",
        specialization: "Allergist",
        experience: "6 years",
        hospital: "Manipal Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.0
      }
    ]
  },
  {
    name: "acne",
    keywords: ["Acne"],
    condition: "Acne (Pimples)",
    doctors: [
      {
        name: "Dr. Somparna Gantait",
        specialization: "Cosmetic Dermatologist",
        experience: "10 years",
        hospital: "KIMS Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.3
      },
      {
        name: "Dr. Rima Kar",
        specialization: "Cosmetic Dermatologist",
        experience: "5 years",
        hospital: "Ruby General Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.1
      },
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
      {
        name: "Dr. Mouma Barik",
        specialization: "Dermatologist",
        experience: "12 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.5
      },
    ]
  },
  {
    name: "psoriasis",
    keywords: ["psoriasis","Psoriasis"],
    condition: "psoriasis",
    doctors: [
      {
        name: "Dr. Mouma Barik",
        specialization: "Dermatologist",
        experience: "12 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.5
      },
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
       {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Arindam Sinha",
        specialization: "Rheumatologist",
        experience: "16 years",
        hospital: "Lilavati Hospital & Research Centre",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.8
      }
    ]
  },
  {
    name: "ringworm",
    keywords: ["ringworm","Ringworm"],
    condition: "Ringworm (Fungal Infection)",
    doctors: [
     
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
      {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Ritwika Mahapatra",
        specialization: "General Physician",
        experience: "22 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.8
      },
      {
        name: "Dr. Anjita Catterjee",
        specialization: "Dermatologist",
        experience: "22 years",
        hospital: "Nanavati Max Super Speciality Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.5
      }
    ]
  },
  {
    name:  "rosacea",
    keywords: [ "rosacea","Rosacea"],
    condition: "Roseacea",
    doctors: [
     
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
      {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Swastika Dutta",
        specialization: "Cosmetic Skin Specialist",
        experience: "14 years",
        hospital: "IRIS Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.5
      },
      {
        name: "Dr. Tarun Sen",
        specialization: "Cosmetic Skin Specialist",
        experience: "10 years",
        hospital: "Kokilaben Dhirubhai Ambani Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.8
      }
    ]
  },
 {
    name: "contact_dermatitis",
    keywords: ["contact_dermatitis","Contact_Dermatitis"],
    condition: "Contact_Dermatitis",
    doctors: [
      {
        name: "Dr. sourav ghosh",
        specialization: "Immunologist",
        experience: "7 years",
        hospital: "Apollo Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.8
      },
      {
        name: "Dr. hardik mehta",
        specialization: "Immunologist",
        experience: "5 years",
        hospital: "Manipal Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.8
      },
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
      {
        name: "Dr. Mouma Barik",
        specialization: "Dermatologist",
        experience: "12 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.5
      },
    ]
  },
  {
    name: "hives",
    keywords: ["hives","Hives"],
    condition: "Hives (Urticaria)",
    doctors: [
     
      {
        name: "Dr. Mouma Barik",
        specialization: "Dermatologist",
        experience: "12 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.5
      },
      {
        name: "Dr. Avilasa Maji",
        specialization: "Allergist",
        experience: "8 years",
        hospital: "Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.2
      },
      {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Sirsan Das",
        specialization: "Allergist",
        experience: "6 years",
        hospital: "Manipal Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.0
      }
    ]
  },
  {
    name: "melanoma",
    keywords: ["melanoma","Melanoma"],
    condition: "Melanoma (Skin Cancer)",
    doctors: [
     
      {
        name: "Dr. Amit Mahapatra",
        specialization: "Dermato-Oncologist",
        experience: "22 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.8
      },
      {
        name: "Dr. Krishna Banerjee",
        specialization: "Oncologist",
        experience: "8 years",
        hospital: "Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.2
      },
      {
        name: "Dr. Ayush Sharma",
        specialization: "Dermato-Oncologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Rohan Mitra",
        specialization: "Dermato-Oncologist",
        experience: "26 years",
        hospital: "Manipal Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.0
      }
    ]
  },
  {
    name: "warts",
    keywords: ["warts","Warts"],
    condition: "warts",
    doctors: [
     
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
      {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. Ritwika Mahapatra",
        specialization: "General Physician",
        experience: "22 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.8
      },
      {
        name: "Dr. Anjita Catterjee",
        specialization: "General Physician",
        experience: "11 years",
        hospital: "Nanavati Max Super Speciality Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.5
      }
    ]
  },
  {
    name: "vitiligo",
    keywords: ["vitiligo","Vitiligo"],
    condition: "Vitiligo",
    doctors: [
     
      {
        name: "Dr. Kamal Hasan",
        specialization: "Dermatologist",
        experience: "10 years",
        hospital: "BLK-Max Super Speciality Hospital",
        location: "Delhi",
        contact: "XXXXXXXXXX",
        rating: 4.7
      },
      {
        name: "Dr. Ashmi Saha",
        specialization: "Dermatologist",
        experience: "16 years",
        hospital: "Narayana Hospital",
        location: "Bangalore",
        contact: "XXXXXXXXXX",
        rating: 4.0
      },
      {
        name: "Dr. RadheSyam Pramanik",
        specialization: "Immunologist",
        experience: "17 years",
        hospital: "Apollo Hospital",
        location: "Kolkata",
        contact: "XXXXXXXXXX",
        rating: 4.8
      },
      {
        name: "Dr. Lovely Majumdar",
        specialization: "Immunologist",
        experience: "8 years",
        hospital: "Nanavati Max Super Speciality Hospital",
        location: "Mumbai",
        contact: "XXXXXXXXXX",
        rating: 4.5
      }
    ]
  }
];


const importData = async () => {
  try {
    await SkinIssue.deleteMany();
    await SkinIssue.insertMany(seedData);
    console.log("Data Seeded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
