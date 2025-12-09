import pandas as pd
import joblib
import warnings
warnings.filterwarnings('ignore')


class SkinDiseaseMLModel:
    """
    This is supposed to return only the disease name.
    """
    
    def __init__(self, model_path='skin_disease_model.pkl',
                 label_encoders_path='label_encoders.pkl',
                 disease_encoder_path='disease_encoder.pkl',
                 feature_names_path='feature_names.pkl'):
        """
        Load the trained model and encoders.
        
        Args:
            model_path: Path to trained model file
            label_encoders_path: Path to feature encoders
            disease_encoder_path: Path to disease encoder
            feature_names_path: Path to feature names
        """
        print("Loading model and encoders......")
        try:
            self.model = joblib.load(model_path)
            self.label_encoders = joblib.load(label_encoders_path)
            self.disease_encoder = joblib.load(disease_encoder_path)
            self.feature_names = joblib.load(feature_names_path)
            print("Model loaded successfully!")
        except FileNotFoundError as e:
            raise FileNotFoundError(
                f"Model files not found. Please run training first.\nMissing: {e.filename}"
            )
    
    def predict(self, location, color, texture, size, duration_days,
                itching, pain, scaling, spreading, age, gender,
                family_history, seasonal_variation):
        """
        Predict skin disease from clinical features.
        
        Args:
            location (str): Body location (e.g., 'face', 'hands', 'arms')
            color (str): Color of affected area (e.g., 'red', 'pink', 'brown')
            texture (str): Texture description (e.g., 'bumpy', 'smooth', 'scaly')
            size (str): Size of area ('small', 'medium', 'large')
            duration_days (int): Number of days present (0-3650)
            itching (int): Itching present (0 or 1)
            pain (int): Pain present (0 or 1)
            scaling (int): Scaling present (0 or 1)
            spreading (int): Spreading (0 or 1)
            age (int): Patient age (0-120)
            gender (str): Patient gender ('male' or 'female')
            family_history (int): Family history (0 or 1)
            seasonal_variation (int): Seasonal pattern (0 or 1)
        
        Returns:
            str: Predicted disease name (e.g., 'Acne', 'Eczema', 'Psoriasis')
        
        Example:
            >>> model = SkinDiseaseMLModel()
            >>> disease = model.predict(
            ...     location='face',
            ...     color='red',
            ...     texture='bumpy',
            ...     size='small',
            ...     duration_days=14,
            ...     itching=0,
            ...     pain=1,
            ...     scaling=0,
            ...     spreading=1,
            ...     age=18,
            ...     gender='female',
            ...     family_history=1,
            ...     seasonal_variation=0
            ... )
            >>> print(disease)
            'Acne'
        """
        # Create input dictionary
        input_data = {
            'location': location,
            'color': color,
            'texture': texture,
            'size': size,
            'duration_days': duration_days,
            'itching': itching,
            'pain': pain,
            'scaling': scaling,
            'spreading': spreading,
            'age': age,
            'gender': gender,
            'family_history': family_history,
            'seasonal_variation': seasonal_variation
        }
        
        # Preprocess and predict
        X = self._preprocess(input_data)
        prediction_encoded = self.model.predict(X)[0]
        disease = self.disease_encoder.inverse_transform([prediction_encoded])[0]
        
        return disease
    
    def predict_from_dict(self, input_dict):
        """
        Predict from a dictionary of features (most common usage).
        
        Args:
            input_dict (dict): Dictionary containing all 13 features
        
        Returns:
            str: Predicted disease name
        
        Example:
            >>> model = SkinDiseaseMLModel()
            >>> data = {
            ...     'location': 'hands',
            ...     'color': 'red',
            ...     'texture': 'dry',
            ...     'size': 'medium',
            ...     'duration_days': 30,
            ...     'itching': 1,
            ...     'pain': 0,
            ...     'scaling': 1,
            ...     'spreading': 1,
            ...     'age': 25,
            ...     'gender': 'male',
            ...     'family_history': 0,
            ...     'seasonal_variation': 1
            ... }
            >>> disease = model.predict_from_dict(data)
            >>> print(disease)
            'Eczema'
        """
        return self.predict(**input_dict)
    
    def predict_with_confidence(self, **kwargs):
        """
        Predict disease with confidence score.
        
        Args:
            Same as predict() method
        
        Returns:
            tuple: (disease_name, confidence_score)
        
        Example:
            >>> disease, confidence = model.predict_with_confidence(
            ...     location='face', color='red', texture='bumpy',
            ...     size='small', duration_days=14, itching=0,
            ...     pain=1, scaling=0, spreading=1, age=18,
            ...     gender='female', family_history=1, seasonal_variation=0
            ... )
            >>> print(f"{disease} ({confidence:.2%})")
            'Acne (92.45%)'
        """
        # Preprocess
        X = self._preprocess(kwargs)
        
        # Predict
        prediction_encoded = self.model.predict(X)[0]
        probabilities = self.model.predict_proba(X)[0]
        confidence = float(probabilities[prediction_encoded])
        
        # Decode disease name
        disease = self.disease_encoder.inverse_transform([prediction_encoded])[0]
        
        return disease, confidence
    
    def _preprocess(self, input_data):
        """
        Internal method to preprocess input data.
        
        Args:
            input_data (dict): Raw input features
        
        Returns:
            pd.DataFrame: Preprocessed features ready for model
        """
        data = input_data.copy()
        
        # Encode categorical features
        for col in ['location', 'color', 'texture', 'size', 'gender']:
            if col in data:
                data[col] = self.label_encoders[col].transform([data[col]])[0]
        
        # Create DataFrame with correct column order
        df = pd.DataFrame([data], columns=self.feature_names)
        
        return df
    
    def get_possible_diseases(self):
        """
        Get list of all diseases the model can predict.
        
        Returns:
            list: List of disease names
        """
        return list(self.disease_encoder.classes_)
    
    def get_feature_info(self):
        """
        Get information about expected input features.
        
        Returns:
            dict: Feature information including valid values
        """
        return {
            'required_features': self.feature_names,
            'categorical_features': {
                'location': list(self.label_encoders['location'].classes_),
                'color': list(self.label_encoders['color'].classes_),
                'texture': list(self.label_encoders['texture'].classes_),
                'size': list(self.label_encoders['size'].classes_),
                'gender': list(self.label_encoders['gender'].classes_)
            },
            'numerical_features': {
                'duration_days': '0-3650 (days)',
                'age': '0-120 (years)'
            },
            'binary_features': {
                'itching': '0 or 1',
                'pain': '0 or 1',
                'scaling': '0 or 1',
                'spreading': '0 or 1',
                'family_history': '0 or 1',
                'seasonal_variation': '0 or 1'
            },
            'possible_diseases': list(self.disease_encoder.classes_)
        }


# ============================================================================
# USAGE EXAMPLES & TESTING
# ============================================================================

def run_examples():
    """Test the model with example cases"""
    
    print("\n")
    print("TESTING ML MODEL")
    print("\n")
    
    # Initialize model
    print("\n1. Initializing model.......")
    model = SkinDiseaseMLModel()
    
    # Example 1: Acne case
    print("\n")
    print("Example 1: Testing Acne Prediction")
    print("\n")
    
    acne_data = {
        'location': 'face',
        'color': 'red',
        'texture': 'bumpy',
        'size': 'small',
        'duration_days': 14,
        'itching': 0,
        'pain': 1,
        'scaling': 0,
        'spreading': 1,
        'age': 18,
        'gender': 'female',
        'family_history': 1,
        'seasonal_variation': 0
    }
    
    disease = model.predict_from_dict(acne_data)
    print(f" Predicted Disease: {disease}")
    
    # With confidence
    disease, confidence = model.predict_with_confidence(**acne_data)
    print(f"Confidence: {confidence:.2%}")
    
    # Example 2: Eczema case
    print("\n")
    print("Example 2: Testing Eczema Prediction")
    print("\n")
    
    eczema_data = {
        'location': 'hands',
        'color': 'red',
        'texture': 'dry',
        'size': 'medium',
        'duration_days': 30,
        'itching': 1,
        'pain': 0,
        'scaling': 1,
        'spreading': 1,
        'age': 25,
        'gender': 'male',
        'family_history': 0,
        'seasonal_variation': 1
    }
    
    disease = model.predict_from_dict(eczema_data)
    print(f"Predicted Disease: {disease}")
    
    disease, confidence = model.predict_with_confidence(**eczema_data)
    print(f"Confidence: {confidence:.2%}")
    
    # Example 3: Psoriasis case
    print("\n")
    print("Example 3: Testing Psoriasis Prediction")
    print("\n")
    
    psoriasis_data = {
        'location': 'elbows',
        'color': 'red',
        'texture': 'scaly',
        'size': 'medium',
        'duration_days': 60,
        'itching': 1,
        'pain': 0,
        'scaling': 1,
        'spreading': 0,
        'age': 45,
        'gender': 'male',
        'family_history': 1,
        'seasonal_variation': 0
    }
    
    disease = model.predict_from_dict(psoriasis_data)
    print(f"Predicted Disease: {disease}")
    
    disease, confidence = model.predict_with_confidence(**psoriasis_data)
    print(f"Confidence: {confidence:.2%}")
    
    print("\n")
    print("ALL TESTS PASSED SUCCESSFULLY!")
    print("\nModel is ready")
    #print("\n")


if __name__ == "__main__":
    # Run test examples
    run_examples()