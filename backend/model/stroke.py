# train.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
import joblib


url = "full_data.csv"
df = pd.read_csv(url)

print("✅ Columns:", df.columns.tolist())  # Debug print

# Prepare data
X = df[['gender', 'age', 'hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'avg_glucose_level', 'bmi', 'smoking_status']]
y = df["stroke"]

categorical_column = ['gender', 'ever_married', "work_type", "Residence_type", "smoking_status"]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_column
        )
    ],
    remainder="passthrough"
)

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train = preprocessor.fit_transform(X_train)
X_test = preprocessor.transform(X_test)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Test model
accuracy = model.score(X_test, y_test)
print("✅ Model accuracy: ", accuracy*100, "%")

# Save
joblib.dump(model, "stroke_model.pkl")
print("✅ Model saved as stroke_model.pkl")
