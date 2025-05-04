from supabase import create_client, Client
from dotenv import load_dotenv
import os
from flask import jsonify
import hashlib
import uuid
import json

load_dotenv()
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase : Client = create_client(supabase_url, supabase_key)

# Initialize database - simpler approach without exec_sql
def initialize_database():
    try:
        print("Checking database connection...")
        # Simple check to see if we can connect to the database
        test_result = supabase.table("_test_connection").select("*").limit(1).execute()
        print("Database connection successful")
    except Exception as e:
        print(f"Database connection check: {str(e)}")
    
    try:
        # Instead of trying to create tables directly with SQL,
        # we'll handle schema issues at runtime when they occur
        print("Database initialization complete")
    except Exception as e:
        print(f"Database initialization error: {str(e)}")

def signup(name, email, password):
    try:
        # Check if user already exists
        existing_user = supabase.table("users").select("*").eq("email", email).execute()
        
        if len(existing_user.data) > 0:
            return {"success": False, "message": "User with this email already exists"}
        
        # Hash the password before storing
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Generate a unique user ID
        user_id = str(uuid.uuid4())
        
        # Insert new user
        user_data = {
            "id": user_id,
            "name": name,
            "email": email,
            "password": hashed_password
        }
        
        result = supabase.table("users").insert(user_data).execute()
        
        if result.data:
            return {"success": True, "message": "User registered successfully", "user_id": user_id, "user": {"id": user_id, "name": name, "email": email}}
        else:
            return {"success": False, "message": "Failed to register user"}
            
    except Exception as e:
        error_message = str(e)
        print(f"Signup error: {error_message}")
        return {"success": False, "message": f"Error: {error_message}"}

def login(email, password):
    try:
        # Hash the password to compare with stored hash
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Query user by email and password
        result = supabase.table("users").select("*").eq("email", email).eq("password", hashed_password).execute()
        
        if len(result.data) > 0:
            user = result.data[0]
            # Create a session for the user (you could implement JWT tokens here)
            return {
                "success": True, 
                "message": "Login successful", 
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"]
                }
            }
        else:
            return {"success": False, "message": "Invalid email or password"}
            
    except Exception as e:
        error_message = str(e)
        print(f"Login error: {error_message}")
        return {"success": False, "message": f"Error: {error_message}"}

def create_api_routes(app):
    # Initialize database when the app starts
    try:
        initialize_database()
    except Exception as e:
        print(f"Failed to initialize database: {str(e)}")
    
    @app.route('/api', methods=['GET'])
    def api_root():
        return jsonify({"message": "API is running"})
    
    @app.route('/api/signup', methods=['POST'])
    def api_signup():
        from flask import request
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        if not all([name, email, password]):
            return jsonify({"success": False, "message": "Missing required fields"}), 400
            
        result = signup(name, email, password)
        return jsonify(result)
    
    @app.route('/api/login', methods=['POST'])
    def api_login():
        from flask import request
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({"success": False, "message": "Missing required fields"}), 400
            
        result = login(email, password)
        return jsonify(result)
        
        