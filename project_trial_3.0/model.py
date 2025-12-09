import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.pipeline import Pipeline
import joblib
import warnings
warnings.filterwarnings('ignore')

# Load the dataset
print("Loading dataset")
df = pd.read_csv('skin_disease_dataset.csv')
print(f"Dataset loaded: {df.shape}")

# Separate features and target
X = df.drop('disease', axis=1)
y = df['disease']

# Encoding the categorical features
print("\nEncoding categorical features.")
label_encoders = {}
categorical_features = ['location', 'color', 'texture', 'size', 'gender']

for col in categorical_features:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# Save label encoders
joblib.dump(label_encoders, 'label_encoders.pkl')
print("Label encoders saved!")

# Encode target variable
disease_encoder = LabelEncoder()
y_encoded = disease_encoder.fit_transform(y)
joblib.dump(disease_encoder, 'disease_encoder.pkl')
print(f"Disease encoder saved and the classes: {list(disease_encoder.classes_)}")

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)
print(f"\nTraining set: {X_train.shape}")
print(f"Test set: {X_test.shape}")

# Create and train multiple models
print("\n" + "="*60)
print("TRAINING MULTIPLE MODELS")
print("="*60)

models = {
    'Random Forest': RandomForestClassifier(
        n_estimators=200,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    ),
    'Gradient Boosting': GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.1,
        max_depth=7,
        random_state=42
    ),
    'Logistic Regression': Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', LogisticRegression(
            max_iter=1000,
            multi_class='multinomial',
            random_state=42
        ))
    ]),
    'SVM': Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', SVC(
            kernel='rbf',
            C=10,
            gamma='scale',
            random_state=42,
            probability=True
        ))
    ])
}

results = {}

for name, model in models.items():
    print("\n")
    print(f"\nTraining {name}")
    
    # Train the model
    model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    results[name] = accuracy
    
    print(f"{name} Accuracy: {accuracy:.4f}")
    
    # Cross-validation score
    cv_scores = cross_val_score(model, X_train, y_train, cv=5)
    print(f"Cross-validation scores: {cv_scores}")
    print(f"Mean CV score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

# Select best model
best_model_name = max(results, key=results.get)
best_model = models[best_model_name]

print(f"\n{'='*60}")
print(f"Best Model: {best_model_name}")
print(f"Accuracy: {results[best_model_name]:.4f}")
print(f"{'='*60}")

# Train final model on full training data
print("\nTraining final model on full training data")
best_model.fit(X_train, y_train)

# Save the best model
joblib.dump(best_model, 'skin_disease_model.pkl')
print(f"Model saved as 'skin_disease_model.pkl'")

# Detailed evaluation on test set
print("\n" + "="*60)
print("Details of evaluation on test set")
print("="*60)

y_pred = best_model.predict(X_test)

print("\nClassification Report:")
print(classification_report(
    y_test, 
    y_pred, 
    target_names=disease_encoder.classes_
))

print("\nConfusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Feature importance
if hasattr(best_model, 'feature_importances_'):
    print("\n" + "="*60)
    print("Feature Importance")
    print("="*60)
    
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(feature_importance)
elif hasattr(best_model, 'named_steps') and hasattr(best_model.named_steps['classifier'], 'feature_importances_'):
    print("\n" + "="*60)
    print("Feature Importance")
    print("="*60)
    
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': best_model.named_steps['classifier'].feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(feature_importance)

# Saving feature names
joblib.dump(list(X.columns), 'feature_names.pkl')
print("\nFeature names saved!")

print("\n" + "="*60)
print("Model training complete!")
print("="*60)
print("\nSaved files:")
print("- skin_disease_model.pkl")
print("- label_encoders.pkl")
print("- disease_encoder.pkl")
print("- feature_names.pkl")