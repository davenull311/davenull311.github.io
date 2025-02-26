from flask_frozen import Freezer
from app import create_app
import os
import shutil

app = create_app()
app.config['FREEZER_DESTINATION'] = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'build')
app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_EXTENSION'] = '.html'

# Ensure static files are properly handled
app.config['FREEZER_STATIC_IGNORE'] = []

freezer = Freezer(app)

# Debug: Print paths for confirmation
repo_root = os.path.abspath(os.path.dirname(__file__))
print(f"Repo root: {repo_root}")
print(f"Freezer destination: {app.config['FREEZER_DESTINATION']}")

# Debug: Print registered routes
with app.app_context():
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f" - {rule}")

if __name__ == '__main__':
    # Clean build directory if it exists
    if os.path.exists(app.config['FREEZER_DESTINATION']):
        shutil.rmtree(app.config['FREEZER_DESTINATION'])
    
    @freezer.register_generator
    def url_generator():
        # Make sure each route gets frozen with proper structure
        yield {'endpoint': 'index'}
        yield {'endpoint': 'about'}
        yield {'endpoint': 'skills'}
        yield {'endpoint': 'projects'}
        yield {'endpoint': 'resume'}
        yield {'endpoint': 'contact'}
    
    freezer.freeze()
    
    # Debug: List generated files
    print("Generated files:")
    for root, dirs, files in os.walk(app.config['FREEZER_DESTINATION']):
        for file in files:
            print(f" - {os.path.join(root, file)}")