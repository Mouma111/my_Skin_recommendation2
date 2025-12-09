import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Define skin diseases and their characteristics
DISEASES = {
    'Acne': {
        'locations': ['face', 'forehead', 'cheeks', 'chin', 'back', 'chest'],
        'colors': ['red', 'pink', 'white', 'yellow'],
        'textures': ['bumpy', 'raised', 'pustular', 'nodular'],
        'sizes': ['small', 'medium'],
        'duration_range': (3, 90),
        'itching_prob': 0.2,
        'pain_prob': 0.4,
        'scaling_prob': 0.1,
        'spreading_prob': 0.3,
        'age_range': (12, 35)
    },
    'Eczema': {
        'locations': ['hands', 'arms', 'legs', 'face', 'neck', 'behind_knees', 'inside_elbows'],
        'colors': ['red', 'pink', 'dark_red', 'brown'],
        'textures': ['dry', 'scaly', 'rough', 'cracked'],
        'sizes': ['medium', 'large'],
        'duration_range': (7, 180),
        'itching_prob': 0.9,
        'pain_prob': 0.3,
        'scaling_prob': 0.8,
        'spreading_prob': 0.6,
        'age_range': (0, 80)
    },
    'Psoriasis': {
        'locations': ['elbows', 'knees', 'scalp', 'lower_back', 'hands', 'feet'],
        'colors': ['red', 'pink', 'silver', 'white'],
        'textures': ['scaly', 'thick', 'raised', 'plaque'],
        'sizes': ['medium', 'large'],
        'duration_range': (14, 365),
        'itching_prob': 0.7,
        'pain_prob': 0.5,
        'scaling_prob': 0.95,
        'spreading_prob': 0.5,
        'age_range': (15, 70)
    },
    'Ringworm': {
        'locations': ['scalp', 'body', 'groin', 'feet', 'hands'],
        'colors': ['red', 'pink'],
        'textures': ['circular', 'ring_shaped', 'scaly', 'raised_edges'],
        'sizes': ['small', 'medium'],
        'duration_range': (5, 60),
        'itching_prob': 0.8,
        'pain_prob': 0.2,
        'scaling_prob': 0.7,
        'spreading_prob': 0.7,
        'age_range': (5, 60)
    },
    'Rosacea': {
        'locations': ['face', 'cheeks', 'nose', 'forehead', 'chin'],
        'colors': ['red', 'pink', 'purple'],
        'textures': ['flushed', 'bumpy', 'thickened'],
        'sizes': ['medium', 'large'],
        'duration_range': (30, 365),
        'itching_prob': 0.3,
        'pain_prob': 0.4,
        'scaling_prob': 0.2,
        'spreading_prob': 0.4,
        'age_range': (30, 70)
    },
    'Contact_Dermatitis': {
        'locations': ['hands', 'face', 'neck', 'arms', 'legs'],
        'colors': ['red', 'pink'],
        'textures': ['bumpy', 'blistered', 'swollen', 'rough'],
        'sizes': ['small', 'medium', 'large'],
        'duration_range': (2, 21),
        'itching_prob': 0.85,
        'pain_prob': 0.5,
        'scaling_prob': 0.4,
        'spreading_prob': 0.3,
        'age_range': (0, 80)
    },
    'Hives': {
        'locations': ['body', 'arms', 'legs', 'face', 'back'],
        'colors': ['red', 'pink', 'skin_colored'],
        'textures': ['raised', 'welts', 'bumpy'],
        'sizes': ['small', 'medium', 'large'],
        'duration_range': (1, 14),
        'itching_prob': 0.95,
        'pain_prob': 0.2,
        'scaling_prob': 0.05,
        'spreading_prob': 0.8,
        'age_range': (0, 80)
    },
    'Melanoma': {
        'locations': ['back', 'legs', 'arms', 'face', 'chest'],
        'colors': ['brown', 'black', 'red', 'blue', 'multi_colored'],
        'textures': ['irregular', 'asymmetric', 'raised', 'changing'],
        'sizes': ['small', 'medium', 'large'],
        'duration_range': (30, 730),
        'itching_prob': 0.3,
        'pain_prob': 0.2,
        'scaling_prob': 0.3,
        'spreading_prob': 0.4,
        'age_range': (30, 80)
    },
    'Warts': {
        'locations': ['hands', 'feet', 'fingers', 'face'],
        'colors': ['skin_colored', 'brown', 'gray', 'white'],
        'textures': ['rough', 'raised', 'bumpy', 'grainy'],
        'sizes': ['small', 'medium'],
        'duration_range': (30, 365),
        'itching_prob': 0.1,
        'pain_prob': 0.3,
        'scaling_prob': 0.2,
        'spreading_prob': 0.5,
        'age_range': (5, 60)
    },
    'Vitiligo': {
        'locations': ['face', 'hands', 'arms', 'feet', 'around_body_openings'],
        'colors': ['white', 'pale', 'depigmented'],
        'textures': ['smooth', 'flat'],
        'sizes': ['small', 'medium', 'large'],
        'duration_range': (60, 1825),
        'itching_prob': 0.05,
        'pain_prob': 0.05,
        'scaling_prob': 0.05,
        'spreading_prob': 0.6,
        'age_range': (10, 70)
    }
}

def generate_sample(disease, disease_characteristics):
    """Generate a single sample for a disease"""
    char = disease_characteristics
    
    sample = {
        'disease': disease,
        'location': random.choice(char['locations']),
        'color': random.choice(char['colors']),
        'texture': random.choice(char['textures']),
        'size': random.choice(char['sizes']),
        'duration_days': random.randint(*char['duration_range']),
        'itching': 1 if random.random() < char['itching_prob'] else 0,
        'pain': 1 if random.random() < char['pain_prob'] else 0,
        'scaling': 1 if random.random() < char['scaling_prob'] else 0,
        'spreading': 1 if random.random() < char['spreading_prob'] else 0,
        'age': random.randint(*char['age_range']),
        'gender': random.choice(['male', 'female']),
        'family_history': random.choice([0, 1]),
        'seasonal_variation': random.choice([0, 1])
    }
    
    return sample

# Generate balanced dataset
samples_per_disease = 500  # Adjust this for larger dataset
data = []

for disease, characteristics in DISEASES.items():
    for _ in range(samples_per_disease):
        sample = generate_sample(disease, characteristics)
        data.append(sample)

# Create DataFrame
df = pd.DataFrame(data)

# Shuffle the dataset
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Save dataset
df.to_csv('skin_disease_dataset.csv', index=False)

# Print dataset information
print(f"Dataset created successfully!")
print(f"\nDataset shape: {df.shape}")
print(f"\nClass distribution:")
print(df['disease'].value_counts())
print(f"\nDataset preview:")
print(df.head(10))
print(f"\nDataset info:")
print(df.info())
print(f"\nNumerical features statistics:")
print(df.describe())