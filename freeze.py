from flask_frozen import Freezer
from app import create_app
import os

app = create_app()
app.config['FREEZER_DESTINATION'] = os.path.abspath('build')
app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'
app.config['FREEZER_EXTENSION'] = '.html'

freezer = Freezer(app)

# Debug: Print paths for confirmation
repo_root = os.path.abspath(os.path.dirname(__file__))
print(f"Repo root: {repo_root}")
print(f"Freezer destination: {app.config['FREEZER_DESTINATION']}")  # Fix: Use app.config

# Debug: Print registered routes
with app.app_context():
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f" - {rule}")

if __name__ == '__main__':
    # Add before freezer.freeze()
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
    print("Generated files:")
    for root, dirs, files in os.walk(app.config['FREEZER_DESTINATION']):
        for file in files:
            print(f" - {os.path.join(root, file)}")